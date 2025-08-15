'use server';

/**
 * @fileOverview AI-powered explanation of calculator formulas.
 *
 * - explainCalculatorFormula - A function that explains the formula used in a calculator.
 * - ExplainCalculatorFormulaInput - The input type for the explainCalculatorFormula function.
 * - ExplainCalculatorFormulaOutput - The return type for the explainCalculatorFormula function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainCalculatorFormulaInputSchema = z.object({
  calculatorName: z.string().describe('The name of the calculator.'),
  formula: z.string().describe('The formula to be explained.'),
});
export type ExplainCalculatorFormulaInput = z.infer<typeof ExplainCalculatorFormulaInputSchema>;

const ExplainCalculatorFormulaOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the formula in simple terms.'),
});
export type ExplainCalculatorFormulaOutput = z.infer<typeof ExplainCalculatorFormulaOutputSchema>;

export async function explainCalculatorFormula(input: ExplainCalculatorFormulaInput): Promise<ExplainCalculatorFormulaOutput> {
  return explainCalculatorFormulaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainCalculatorFormulaPrompt',
  input: {schema: ExplainCalculatorFormulaInputSchema},
  output: {schema: ExplainCalculatorFormulaOutputSchema},
  prompt: `You are an expert at explaining complex formulas in simple terms.

  Calculator Name: {{{calculatorName}}}

  Explain the following formula in simple terms:
  {{{formula}}}
  `,
});

const explainCalculatorFormulaFlow = ai.defineFlow(
  {
    name: 'explainCalculatorFormulaFlow',
    inputSchema: ExplainCalculatorFormulaInputSchema,
    outputSchema: ExplainCalculatorFormulaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
