
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutLoanAffordabilityCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Loan Affordability</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Loan Affordability Calculator is a key first step for any borrower. It helps you see how much you can realistically borrow for a home, car, or personal expense. This tool provides a clear estimate based on your income and existing debts. It empowers you to set realistic goals and approach lenders with confidence.</p>

                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter your total gross **Annual Income**.</li>
                    <li>Provide your total **Monthly Debt Payments** (e.g., credit card bills, other loans).</li>
                    <li>Input the estimated **Interest Rate** and **Loan Term** for the new loan.</li>
                    <li>Adjust the **Debt-to-Income (DTI) Ratio** slider. 43% is a common maximum that lenders allow.</li>
                </ol>
                <p>The calculator will instantly show you the maximum loan you can likely afford and the estimated monthly payment.</p>
                
                <h3>Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is Debt-to-Income (DTI) Ratio?</AccordionTrigger>
                        <AccordionContent>
                            Your DTI ratio is the percentage of your gross monthly income that goes to paying your monthly debt payments. Lenders use it to measure your ability to manage monthly payments and repay debts. A lower DTI ratio shows a good balance between debt and income.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How can I improve my DTI?</AccordionTrigger>
                        <AccordionContent>
                           You can improve your DTI by increasing your income or reducing your monthly debt. Try to pay down existing loans or credit card balances. You should also avoid new debt before applying for a major loan.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger>Is this an official loan offer?</AccordionTrigger>
                        <AccordionContent>
                           No, this is an estimation tool for informational purposes only. The actual loan amount you qualify for may vary. It depends on your credit score, employment history, and the lender's specific rules. This tool gives you a strong starting point for your financial planning.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
