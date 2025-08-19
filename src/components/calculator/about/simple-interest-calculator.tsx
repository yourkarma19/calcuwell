
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutSimpleInterestCalculator() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Understanding Simple Interest</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The **Simple Interest Calculator** provides a straightforward way to determine the interest earned on a principal amount over a specific period. Unlike compound interest, simple interest is calculated only on the initial amount (the principal) and does not include interest on previously earned interest. It's often used for short-term loans or investments.</p>
                
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter the **Principal Amount** (the initial sum of money).</li>
                    <li>Set the annual **Interest Rate** (as a percentage).</li>
                    <li>Define the **Tenure** in years.</li>
                </ol>
                <p>The results will instantly show the total interest earned and the final amount (principal + interest).</p>

                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold">What is the formula for simple interest?</AccordionTrigger>
                        <AccordionContent>
                           <p>The formula is `I = P × R × T`, where:</p>
                           <ul className="list-disc pl-5">
                               <li><strong>I</strong> is the total interest earned.</li>
                               <li><strong>P</strong> is the principal amount.</li>
                               <li><strong>R</strong> is the annual interest rate in decimal form (e.g., 5% = 0.05).</li>
                               <li><strong>T</strong> is the time period in years.</li>
                           </ul>
                           <p>This calculator uses the rate as a percentage, so the formula is `(P * R * T) / 100`.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-semibold">Simple vs. Compound Interest: What's the main difference?</AccordionTrigger>
                        <AccordionContent>
                            <p>Simple interest is calculated solely on the original principal amount, so you earn the same amount of interest each year. In contrast, compound interest is calculated on both the principal and the accumulated interest from previous periods. This "interest on interest" effect means compound interest leads to much faster growth over time, especially for long-term investments.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-semibold">When is simple interest typically used?</AccordionTrigger>
                        <AccordionContent>
                           <p>Simple interest is most commonly used for short-term loans or financial products. For example, car loans and some personal loans often use simple interest. It's less common for long-term savings or investment accounts, where compound interest is the standard because it provides better returns.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
