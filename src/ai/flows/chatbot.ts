'use server';

/**
 * @fileOverview A chatbot AI agent for pharmacy related questions.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe("The user's message to the chatbot."),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('The chat history.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z
    .string()
    .describe("The chatbot's response to the user's message."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  prompt: `You are a friendly and knowledgeable pharmacy assistant chatbot named PharmaBot. Your goal is to provide helpful and accurate information about medications and general health topics.

You are not a substitute for a real healthcare professional. Always include the following disclaimer in your responses if you provide any health or medication related information: "Please remember, I'm an AI assistant and not a medical professional. Consult with a doctor or pharmacist for personalized medical advice."

Converse with the user based on the provided history and the new message.

{{#if history}}
Chat History:
{{#each history}}
{{#if (eq this.role 'user')}}
User: {{{this.content}}}
{{/if}}
{{#if (eq this.role 'model')}}
PharmaBot: {{{this.content}}}
{{/if}}
{{/each}}
{{/if}}

New user message: {{{message}}}

Your response should be helpful, clear, and empathetic.`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
