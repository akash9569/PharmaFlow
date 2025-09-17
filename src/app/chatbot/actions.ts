'use server';

import {
  chat as chatFlow,
  type ChatInput,
  type ChatOutput,
} from '@/ai/flows/chatbot';

export async function chat(input: ChatInput): Promise<ChatOutput> {
  try {
    const result = await chatFlow(input);
    return result;
  } catch (error) {
    console.error('Error in chat server action:', error);
    throw new Error('Failed to get chat response from AI model.');
  }
}
