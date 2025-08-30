'use server';
/**
 * @fileOverview An AI agent for diagnosing financial health.
 *
 * - diagnoseFinancialHealth - A function that analyzes user's financial data.
 * - DiagnoseFinancialHealthInput - The input type for the function.
 * - DiagnoseFinancialHealthOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const DiagnoseFinancialHealthInputSchema = z.object({
    monthlyIncome: z.number().describe("User's total monthly income after taxes."),
    monthlySavings: z.number().describe("Amount the user saves or invests per month."),
    monthlyDebt: z.number().describe("Total monthly payments for all debts (loans, credit cards)."),
    financialGoal: z.string().describe("The user's primary financial goal."),
    hasCreditCardDebt: z.boolean().describe("Whether the user has revolving credit card debt."),
});
export type DiagnoseFinancialHealthInput = z.infer<typeof DiagnoseFinancialHealthInputSchema>;

const DiagnoseFinancialHealthOutputSchema = z.object({
    score: z.number().min(0).max(100).describe("A financial health score from 0 to 100."),
    summary: z.string().describe("A brief, two-sentence summary of the user's financial situation."),
    actionPlan: z.array(z.string()).describe("A list of 3-5 concrete, actionable steps for the user to improve their financial health, tailored to their goal."),
});
export type DiagnoseFinancialHealthOutput = z.infer<typeof DiagnoseFinancialHealthOutputSchema>;

export async function diagnoseFinancialHealth(input: DiagnoseFinancialHealthInput): Promise<DiagnoseFinancialHealthOutput> {
    return diagnoseFinancialHealthFlow(input);
}

const prompt = ai.definePrompt({
    name: 'diagnoseFinancialHealthPrompt',
    input: { schema: DiagnoseFinancialHealthInputSchema },
    output: { schema: DiagnoseFinancialHealthOutputSchema },
    prompt: `You are a friendly and encouraging financial advisor. Analyze the user's financial data to provide a health score, a summary, and an action plan.

    User's Data:
    - Monthly Income: {{monthlyIncome}}
    - Monthly Savings: {{monthlySavings}}
    - Monthly Debt Payments: {{monthlyDebt}}
    - Primary Goal: {{financialGoal}}
    - Has Credit Card Debt: {{hasCreditCardDebt}}

    Your task:
    1.  **Calculate Ratios**:
        - Savings Rate = (monthlySavings / monthlyIncome) * 100
        - Debt-to-Income (DTI) Ratio = (monthlyDebt / monthlyIncome) * 100

    2.  **Determine the Score (0-100)**:
        - Start with a base score of 50.
        - Savings Rate: +2 points for every % above 15% (max 30 points). -2 points for every % below 10% (min -20 points).
        - DTI Ratio: +1 point for every % below 20% (max 20 points). -2 points for every % above 36% (min -30 points).
        - Credit Card Debt: If true, subtract 20 points.

    3.  **Write the Summary**:
        - Provide a concise, two-sentence summary.
        - Start with an encouraging tone, then state the key strength and the main area for improvement.

    4.  **Create the Action Plan**:
        - Provide 3-5 clear, actionable steps.
        - Tailor the advice to their primary financial goal. For example, if their goal is to pay off debt, prioritize steps related to that.
        - If they have credit card debt, the first step MUST be to create a plan to pay it off aggressively due to high interest rates.
    `,
});

const diagnoseFinancialHealthFlow = ai.defineFlow(
    {
        name: 'diagnoseFinancialHealthFlow',
        inputSchema: DiagnoseFinancialHealthInputSchema,
        outputSchema: DiagnoseFinancialHealthOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
