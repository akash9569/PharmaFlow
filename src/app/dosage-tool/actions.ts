'use server';

import {
  recommendDosage as recommendDosageFlow,
  type DosageRecommendationInput,
  type DosageRecommendationOutput,
} from '@/ai/flows/dosage-recommendation';

export async function recommendDosage(input: DosageRecommendationInput): Promise<DosageRecommendationOutput> {
  // Here you could add input validation, user authentication checks, or logging.
  try {
    const result = await recommendDosageFlow(input);
    return result;
  } catch (error) {
    console.error('Error in recommendDosage server action:', error);
    throw new Error('Failed to get dosage recommendation from AI model.');
  }
}
