
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutCompoundInterestCalculator() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Understanding Compound Interest</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The <strong>Compound Interest Calculator</strong> demonstrates one of the most powerful concepts in finance: how your money can grow exponentially over time. By reinvesting the interest you earn, your investment base gets larger, leading to even more interest in the next period. This "interest on interest" effect can significantly boost your savings over the long term.</p>
                
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter the <strong>Principal Amount</strong> you are starting with.</li>
                    <li>Set the estimated annual <strong>Interest Rate</strong>.</li>
                    <li>Choose the <strong>Investment Tenure</strong> in years.</li>
                    <li>Select the <strong>Compounding Frequency</strong> (how often interest is calculated and added).</li>
                </ol>
                <p>The results will show the total future value of your investment and the total interest earned.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold">What is the formula for compound interest?</AccordionTrigger>
                        <AccordionContent>
                           <p>The formula to calculate the future value (A) of an investment is:</p>
                           <p className="font-mono bg-muted p-2 rounded-md text-center my-2">A = P(1 + r/n)^(nt)</p>
                           <p>Where:</p>
                           <ul className="list-disc pl-5">
                               <li><strong>A</strong> = the future value of the investment/loan, including interest</li>
                               <li><strong>P</strong> = the principal investment amount (the initial deposit or loan amount)</li>
                               <li><strong>r</strong> = the annual interest rate (in decimal)</li>
                               <li><strong>n</strong> = the number of times that interest is compounded per year</li>
                               <li><strong>t</strong> = the number of years the money is invested or borrowed for</li>
                           </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-semibold">How does compounding frequency affect my savings?</AccordionTrigger>
                        <AccordionContent>
                            <p>The more frequently interest is compounded, the more you will earn. For example, interest compounded monthly will result in a slightly higher total amount than interest compounded annually at the same interest rate. This is because you start earning interest on your previously earned interest sooner and more often.</p>
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger className="font-semibold">Simple vs. Compound Interest: What's the real difference?</AccordionTrigger>
                        <AccordionContent>
                            <p><strong>Simple interest</strong> is calculated only on the original principal amount. Your interest earnings remain the same every year. <strong>Compound interest</strong> is calculated on the principal amount and also on the accumulated interest from previous periods. This means your investment grows at an accelerating rate, which makes a huge difference over many years.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
