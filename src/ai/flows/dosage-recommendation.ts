'use server';

/**
 * @fileOverview Dosage recommendation AI agent.
 *
 * - recommendDosage - A function that handles the dosage recommendation process.
 * - DosageRecommendationInput - The input type for the recommendDosage function.
 * - DosageRecommendationOutput - The return type for the recommendDosage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DosageRecommendationInputSchema = z.object({
  symptoms: z.string().describe('The symptoms the user is experiencing.'),
  productName: z.string().optional().describe('The name of the product to get a dosage recommendation for, if known.'),
});
export type DosageRecommendationInput = z.infer<typeof DosageRecommendationInputSchema>;

const DosageRecommendationOutputSchema = z.object({
  productRecommendation: z
    .string()
    .describe('The recommended product based on the symptoms.'),
  dosageRecommendation: z.string().describe('The recommended dosage for the product based on the symptoms.'),
  disclaimer: z
    .string()
    .describe(
      'A disclaimer that the dosage recommendation is not a substitute for professional medical advice.'
    ).default('This is an AI suggestion, not medical advice. Please talk to a doctor or pharmacist for professional help.'),
});
export type DosageRecommendationOutput = z.infer<typeof DosageRecommendationOutputSchema>;

export async function recommendDosage(input: DosageRecommendationInput): Promise<DosageRecommendationOutput> {
  return recommendDosageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dosageRecommendationPrompt',
  input: {schema: DosageRecommendationInputSchema},
  output: {schema: DosageRecommendationOutputSchema},
  prompt: `You are a helpful AI assistant that provides dosage recommendations for pharmaceutical products.

You will take in user symptoms and provide a product recommendation and dosage recommendation.

Symptoms: {{{symptoms}}}
Product Name (if known): {{{productName}}}

Provide a clear product recommendation and a specific dosage recommendation based on the symptoms.

{{#if productName}}
Given the user specified the product, {{productName}}, focus on providing a dosage recommendation for that product, based on the symptoms provided. If the product is not appropriate for the symptoms, suggest a more suitable alternative.
{{/if}}`,
});

const recommendDosageFlow = ai.defineFlow(
  {
    name: 'recommendDosageFlow',
    inputSchema: DosageRecommendationInputSchema,
    outputSchema: DosageRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
