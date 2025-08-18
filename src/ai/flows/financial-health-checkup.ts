
'use server';

/**
 * @fileOverview An AI-powered agent to analyze financial health.
 *
 * - analyzeFinancialHealth - A function that analyzes user's financial inputs.
 * - FinancialHealthInput - The input type for the analyzeFinancialHealth function.
 * - FinancialHealthOutput - The return type for the analyzeFinancialHealth function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const FinancialHealthInputSchema = z.object({
    monthlyIncome: z.number().positive('Monthly income must be positive.'),
    monthlySavings: z.number().min(0, 'Monthly savings cannot be negative.'),
    financialGoal: z.string().describe('The user\'s primary financial goal.'),
    monthlyDebt: z.number().min(0, 'Monthly debt cannot be negative.'),
    hasCreditCardDebt: z.boolean(),
});
export type FinancialHealthInput = z.infer<typeof FinancialHealthInputSchema>;

const FinancialHealthOutputSchema = z.object({
  score: z.number().min(0).max(100).describe('The user\'s overall financial health score out of 100.'),
  summary: z.string().describe('A 2-3 sentence AI-generated summary of the user\'s financial health.'),
  strengths: z.array(z.string()).describe('A list of positive aspects of the user\'s finances.'),
  actionPlan: z.array(z.object({
      title: z.string().describe('A short, actionable title for the recommendation.'),
      description: z.string().describe('A brief explanation of why this action is important.'),
      calculatorSlug: z.string().optional().describe('A relevant calculator slug for the user to try next.'),
  })).describe('A prioritized list of 1-3 actionable steps for the user to take.'),
});
export type FinancialHealthOutput = z.infer<typeof FinancialHealthOutputSchema>;


export async function analyzeFinancialHealth(input: FinancialHealthInput): Promise<FinancialHealthOutput> {
  return financialHealthFlow(input);
}

const prompt = ai.definePrompt({
    name: 'financialHealthPrompt',
    input: { schema: FinancialHealthInputSchema },
    output: { schema: FinancialHealthOutputSchema },
    prompt: `You are an expert financial advisor in India, providing a friendly and encouraging financial health check-up.

    Analyze the user's financial data below. Based on this data, provide a financial health score, a summary, strengths, and an action plan.

    **User's Financial Data:**
    - Monthly Take-home Salary: ₹{{{monthlyIncome}}}
    - Monthly Savings/Investments: ₹{{{monthlySavings}}}
    - Primary Financial Goal: {{{financialGoal}}}
    - Total Monthly EMI (Debt): ₹{{{monthlyDebt}}}
    - Has Unpaid Credit Card Debt: {{{hasCreditCardDebt}}}

    **Your Task:**

    1.  **Calculate Financial Ratios:**
        *   **Savings Rate:** (monthlySavings / monthlyIncome) * 100
        *   **Debt-to-Income (DTI) Ratio:** (monthlyDebt / monthlyIncome) * 100

    2.  **Determine the Financial Health Score (out of 100):**
        *   Start with a base score of 50.
        *   **Savings Rate:**
            *   Add 25 points if savings rate is > 20% (Excellent).
            *   Add 15 points if savings rate is between 10% and 20% (Good).
            *   Add 5 points if savings rate is between 1% and 10% (Needs Improvement).
            *   Subtract 10 points if savings rate is 0% or less.
        *   **DTI Ratio:**
            *   Add 25 points if DTI is < 15% (Excellent).
            *   Add 15 points if DTI is between 15% and 30% (Good).
            *   Subtract 15 points if DTI is between 31% and 45% (High).
            *   Subtract 30 points if DTI is > 45% (Very High).
        *   **Credit Card Debt:**
            *   Subtract 20 points if 'hasCreditCardDebt' is true. This is a major penalty due to high interest rates.

    3.  **Generate the Output:**
        *   **Score:** The final calculated score. Clamp it between 0 and 100.
        *   **Summary:** Write a 2-3 sentence, encouraging summary. Mention the score and the most important takeaway.
        *   **Strengths:** List 1-2 key positive points. If savings rate is good, mention it. If DTI is low, mention it. If both are bad, find something encouraging to say, like "You have a clear financial goal."
        *   **Action Plan (Prioritized, max 2 items):**
            *   **Priority 1: Credit Card Debt.** If 'hasCreditCardDebt' is true, the top action item MUST be to pay it off. Suggest the 'credit-card-payoff-calculator'.
            *   **Priority 2: High DTI.** If DTI is > 30% (and no credit card debt), the top action should be to reduce EMIs. Suggest the 'loan-comparison-calculator' to consider refinancing.
            *   **Priority 3: Low Savings.** If savings rate is < 10%, the main action should be to increase savings. Suggest the 'savings-calculator' or 'retirement-calculator' based on their goal.
            *   If all is good, suggest a goal-oriented action. E.g., if their goal is a house, suggest the 'mortgage-calculator'.
        *   The response should be friendly, clear, and tailored to an Indian context (using ₹ where appropriate).
    `,
});


const financialHealthFlow = ai.defineFlow(
    {
      name: 'financialHealthFlow',
      inputSchema: FinancialHealthInputSchema,
      outputSchema: FinancialHealthOutputSchema,
    },
    async (input) => {
      const { output } = await prompt(input);
      return output!;
    }
);
