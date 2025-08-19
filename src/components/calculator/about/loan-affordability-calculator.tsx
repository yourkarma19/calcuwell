
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutLoanAffordabilityCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Loan Affordability</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Loan Affordability Calculator is a crucial first step for any prospective borrower. It helps you estimate how much you can realistically borrow for a home, car, or personal expense. By analyzing your income and existing financial commitments, this tool provides a clear estimate of the maximum loan amount you can likely manage. This empowers you to set realistic goals and approach lenders with confidence.</p>

                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter your total gross **Annual Income**.</li>
                    <li>Provide your total **Monthly Debt Payments** (e.g., credit card bills, other existing loans).</li>
                    <li>Input the estimated **Interest Rate** and **Loan Term** for the new loan you are considering.</li>
                    <li>Adjust the **Debt-to-Income (DTI) Ratio** slider. 43% is a common maximum that many lenders allow, but a lower ratio is generally better.</li>
                </ol>
                <p>The calculator will instantly show you the maximum loan you can likely afford and what your estimated monthly payment would be.</p>
                
                <h3>Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is Debt-to-Income (DTI) Ratio?</AccordionTrigger>
                        <AccordionContent>
                            Your DTI ratio is the percentage of your gross monthly income that goes toward paying your monthly debt payments. Lenders use it as a key metric to measure your ability to manage payments and repay debts. A lower DTI ratio indicates a healthy balance between your debt and income.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How can I improve my DTI?</AccordionTrigger>
                        <AccordionContent>
                           There are two main ways to improve your DTI ratio: increase your income or reduce your monthly debt. To reduce debt, focus on paying down existing loans or credit card balances. It is also wise to avoid taking on new debt right before you apply for a major loan like a mortgage.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger>Is this an official loan offer?</AccordionTrigger>
                        <AccordionContent>
                           No, this is an estimation tool for informational purposes only. The actual loan amount you qualify for may vary based on your credit score, employment history, and the specific policies of the lender. This tool should be used as a starting point for your financial planning.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
