
"use server";
/**
 * @fileOverview An AI agent for diagnosing financial health.
 *
 * - diagnoseFinancialHealth - A function that analyzes user's financial data.
 * - DiagnoseFinancialHealthInput - The input type for the function.
 * - DiagnoseFinancialHealthOutput - The return type for the function.
 */

import { ai } from "@/ai/genkit";
import { z } from "zod";

const DiagnoseFinancialHealthInputSchema = z.object({
  monthlyIncome: z
    .number()
    .describe("User's total monthly income after taxes."),
  monthlySavings: z
    .number()
    .describe("Amount the user saves or invests per month."),
  monthlyDebt: z
    .number()
    .describe("Total monthly payments for all debts (loans, credit cards)."),
  financialGoal: z.string().describe("The user's primary financial goal."),
  hasCreditCardDebt: z
    .boolean()
    .describe("Whether the user has revolving credit card debt."),
});
export type DiagnoseFinancialHealthInput = z.infer<
  typeof DiagnoseFinancialHealthInputSchema
>;

const DiagnoseFinancialHealthOutputSchema = z.object({
  score: z
    .number()
    .min(0)
    .max(100)
    .describe("A financial health score from 0 to 100."),
  summary: z
    .string()
    .describe(
      "A brief, two-sentence summary of the user's financial situation.",
    ),
  actionPlan: z
    .array(z.string())
    .describe(
      "A list of 3-5 concrete, actionable steps for the user to improve their financial health, tailored to their goal.",
    ),
});
export type DiagnoseFinancialHealthOutput = z.infer<
  typeof DiagnoseFinancialHealthOutputSchema
>;

const InternalPromptInputSchema = DiagnoseFinancialHealthInputSchema.extend({
  savingsRate: z.number(),
  dtiRatio: z.number(),
  score: z.number(),
});

export async function diagnoseFinancialHealth(
  input: DiagnoseFinancialHealthInput,
): Promise<DiagnoseFinancialHealthOutput> {
  return diagnoseFinancialHealthFlow(input);
}

const prompt = ai.definePrompt({
  name: "diagnoseFinancialHealthPrompt",
  input: { schema: InternalPromptInputSchema },
  output: { schema: DiagnoseFinancialHealthOutputSchema },
  prompt: `You are a friendly and encouraging financial advisor. You have been provided with a user's financial data and a pre-calculated score. Your task is to provide a summary and an action plan.

    User's Data & Pre-Calculated Ratios:
    - Monthly Income: {{monthlyIncome}}
    - Monthly Savings: {{monthlySavings}}
    - Monthly Debt Payments: {{monthlyDebt}}
    - Primary Goal: {{financialGoal}}
    - Has Credit Card Debt: {{hasCreditCardDebt}}
    - Savings Rate: {{savingsRate}}%
    - Debt-to-Income (DTI) Ratio: {{dtiRatio}}%
    - Financial Health Score: {{score}}/100

    Your Task:
    1.  **Return the Score**: Use the pre-calculated score of {{score}} as the 'score' field in your output. Do not change it.

    2.  **Write the Summary**:
        - Provide a concise, two-sentence summary based on the score and ratios.
        - Start with an encouraging tone, then state the key strength and the main area for improvement.

    3.  **Create the Action Plan**:
        - Provide 3-5 clear, actionable steps.
        - Tailor the advice to their primary financial goal. For example, if their goal is to pay off debt, prioritize steps related to that.
        - If they have credit card debt, the first step MUST be to create a plan to pay it off aggressively due to high interest rates.
    `,
});

const diagnoseFinancialHealthFlow = ai.defineFlow(
  {
    name: "diagnoseFinancialHealthFlow",
    inputSchema: DiagnoseFinancialHealthInputSchema,
    outputSchema: DiagnoseFinancialHealthOutputSchema,
  },
  async (input: DiagnoseFinancialHealthInput) => {
    // Perform calculations in code, not in the prompt
    const { monthlyIncome, monthlySavings, monthlyDebt, hasCreditCardDebt } =
      input;

    const savingsRate =
      monthlyIncome > 0 ? (monthlySavings / monthlyIncome) * 100 : 0;
    const dtiRatio =
      monthlyIncome > 0 ? (monthlyDebt / monthlyIncome) * 100 : 0;

    let score = 50;

    // Savings Rate scoring
    if (savingsRate > 15) {
      score += Math.min(30, (savingsRate - 15) * 2);
    } else if (savingsRate < 10) {
      score -= Math.min(20, (10 - savingsRate) * 2);
    }

    // DTI Ratio scoring
    if (dtiRatio < 20) {
      score += Math.min(20, (20 - dtiRatio) * 1);
    } else if (dtiRatio > 36) {
      score -= Math.min(30, (dtiRatio - 36) * 2);
    }

    // Credit Card Debt penalty
    if (hasCreditCardDebt) {
      score -= 20;
    }

    // Clamp score between 0 and 100
    score = Math.max(0, Math.min(100, Math.round(score)));

    const internalInput = {
      ...input,
      savingsRate,
      dtiRatio,
      score,
    };

    const { output } = await prompt(internalInput);
    return output!;
  },
);

