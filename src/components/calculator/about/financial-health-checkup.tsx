
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AboutFinancialHealthCheckup() {
    return (
        <Card>
            <CardHeader>
                <CardTitle as="h2">Understanding Your Financial Health</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>A financial health check-up is like a report card for your money. It provides a score and a summary of your current financial situation, helping you understand your strengths and identify areas for improvement. This tool uses key metrics like your savings rate and debt-to-income ratio to give you a clear picture of where you stand. Taking a moment to assess your financial health is the first step toward building a more secure and prosperous future. It empowers you to make informed decisions, set realistic goals, and take control of your financial journey.</p>

                <h3>How to Use This Tool</h3>
                <p>Our AI-powered tool simplifies the process of analyzing your financial situation. Just provide a few key pieces of information:</p>
                <ol>
                    <li><strong>Monthly Income:</strong> Enter your total take-home pay per month. This is your net income after taxes.</li>
                    <li><strong>Monthly Savings:</strong> Input the amount you regularly save or invest each month.</li>
                    <li><strong>Monthly Debt:</strong> Provide your total monthly loan payments (e.g., credit card bills, personal loans, car loans).</li>
                    <li><strong>Financial Goal:</strong> Select your primary financial objective, such as saving for a down payment or paying off debt.</li>
                    <li><strong>Credit Card Debt:</strong> Indicate if you carry unpaid credit card balances from month to month.</li>
                </ol>
                <p>After you submit your information, our AI will analyze your data and provide a personalized report. This report includes a financial health score, a summary of your situation, and a concrete action plan to help you improve.</p>

                <h3>Financial Health FAQs</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is a good savings rate?</AccordionTrigger>
                        <AccordionContent>
                            <p>A good savings rate depends on your goals and age, but a common guideline is the **50/30/20 rule**: 50% of your income for needs, 30% for wants, and **20% for savings and debt repayment**. Anything above 20% is considered excellent and will significantly accelerate your journey towards financial independence. If your rate is low, our <Link href="/calculators/savings-calculator" className="text-primary hover:underline">Savings Calculator</Link> can help you create a plan to increase it.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is a Debt-to-Income (DTI) Ratio?</AccordionTrigger>
                        <AccordionContent>
                            <p>Your DTI ratio is the percentage of your gross monthly income that goes towards paying your monthly debt payments. Lenders use it as a key indicator of your ability to manage monthly payments and repay debts. A DTI below 36% is generally considered good, while a ratio above 43% may make it difficult to get new loans. If your DTI is high, consider using the <Link href="/calculators/credit-card-payoff-calculator" className="text-primary hover:underline">Credit Card Payoff Calculator</Link> to create a strategy for tackling high-interest debt first.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How can I improve my financial health score?</AccordionTrigger>
                        <AccordionContent>
                           <p>Improving your financial health is a marathon, not a sprint. The best ways to improve your score are through consistent, positive habits:</p>
                           <ul className="list-disc pl-5">
                               <li>**Increase Your Savings:** Even a small increase can make a big difference over time. Automate transfers to your savings account each month.</li>
                               <li>**Pay Down High-Interest Debt:** Focus on paying off credit cards or personal loans, as they often have the highest interest rates and can be a major drain on your finances.</li>
                               <li>**Create a Budget:** Track your income and expenses to find areas where you can cut back and save more. Understanding where your money goes is the first step to controlling it.</li>
                               <li>**Build an Emergency Fund:** Aim to have 3-6 months of living expenses saved in an easily accessible account to cover unexpected events without going into debt.</li>
                           </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
