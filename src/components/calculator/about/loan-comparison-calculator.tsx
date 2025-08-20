import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutLoanComparisonCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle as="h2">How to Choose the Right Loan?</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Choosing the right loan can save you thousands. Our Loan Comparison Calculator is a tool designed to help you make an informed decision by putting two loan offers side-by-side. By showing the differences in monthly payments, total interest, and overall cost, you can easily see the best financial option.</p>
                
                <h3>How to Use the Loan Comparison Calculator</h3>
                <ol>
                    <li>Enter the **Loan Amount**, **Interest Rate**, and **Tenure** for "Loan Option A".</li>
                    <li>Do the same for "Loan Option B".</li>
                    <li>Click the **"Compare Loans"** button.</li>
                </ol>
                <p>The tool will generate a clear verdict, a detailed table, and a chart to help you understand which loan is better for you.</p>

                <h3>Loan Comparison FAQs</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold">Should I always choose the loan with the lower EMI?</AccordionTrigger>
                        <AccordionContent>
                            <p>Not always. A lower EMI is easier on your monthly budget, but it often comes with a longer loan term. This means you could pay much more in total interest. This tool helps you see that trade-off. The best choice balances what you can afford each month with the lowest total cost.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-semibold">How much does the interest rate really matter?</AccordionTrigger>
                        <AccordionContent>
                            <p>A lot. Even a small difference of 0.5% in the interest rate can lead to large savings over a long term, especially for big loans like a home loan. Use this tool to see the exact difference in total interest paid between two rates.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-semibold">What other factors should I consider?</AccordionTrigger>
                        <AccordionContent>
                           <p>Besides the interest rate, consider other loan costs like processing fees and prepayment penalties. Also, check the lender's reputation for customer service. Sometimes a slightly higher EMI is worth it for better terms or service.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
