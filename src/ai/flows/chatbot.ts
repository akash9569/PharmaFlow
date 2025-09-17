'use server';

/**
 * @fileOverview A chatbot AI agent for pharmacy related questions.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {generateStream} from 'genkit';
import {z} from 'genkit';
import {Message, Role, content, role} from 'genkit/model';

const ChatInputSchema = z.object({
  message: z.string().describe("The user's message to the chatbot."),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        content: z.string(),
      })
    )
    .optional()
    .describe('The chat history.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export type ChatOutput = AsyncGenerator<string>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

function toGenkitMessages(history: ChatInput['history']): Message[] {
  const messages: Message[] = [];
  if (!history) {
    return messages;
  }
  for (const turn of history) {
    const r = role(turn.role as Role);
    messages.push({
      role: r,
      content: [content(turn.content)],
    });
  }
  return messages;
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.string(),
  },
  async input => {
    const history = toGenkitMessages(input.history);

    const {stream} = await generateStream({
      model: 'googleai/gemini-2.5-flash',
      history,
      prompt: `You are a friendly and knowledgeable pharmacy assistant chatbot named PharmaBot. Your goal is to provide helpful and accurate information about medications and general health topics.

You are not a substitute for a real healthcare professional. Always include the following disclaimer in your responses if you provide any health or medication related information: "Please remember, I'm an AI assistant and not a medical professional. Consult with a doctor or pharmacist for personalized medical advice."

Converse with the user based on the provided history and the new message.

New user message: ${input.message}

Your response should be helpful, clear, and empathetic.`,
    });

    const reader = stream().getReader();
    const decoder = new TextDecoder();
    return (async function* () {
      while (true) {
        const {done, value} = await reader.read();
        if (done) {
          break;
        }
        yield decoder.decode(value.bytes, {stream: true});
      }
    })();
  }
);
