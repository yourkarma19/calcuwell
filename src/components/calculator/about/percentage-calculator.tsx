
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPercentageCalculator() {
    return (
        <Card>
        <CardHeader>
            <CardTitle>About the Percentage Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>The Percentage Calculator is a versatile tool designed to solve a variety of percentage-related problems that we encounter in daily life. Whether you're calculating a discount, figuring out a tip, or analyzing a statistical change, this calculator provides instant and accurate results. It simplifies complex calculations and helps you make informed decisions quickly.</p>

            <h3>How to Use the Percentage Calculator</h3>
            <p>This tool offers three distinct calculation modes. Simply select the one that matches your needs:</p>
            <ol>
                <li><strong>What is X% of Y?</strong> – Use this to find a specific percentage of a number. Enter the percentage in the first box and the total amount in the second.</li>
                <li><strong>X is what percent of Y?</strong> – Use this to determine what percentage one number represents of another.</li>
                <li><strong>Percentage change from X to Y</strong> – Use this to find the percentage increase or decrease from an original value to a new value.</li>
            </ol>
            
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold">How do you calculate a percentage manually?</AccordionTrigger>
                    <AccordionContent>
                        <p>To find the percentage of a number, convert the percentage to a decimal by dividing it by 100, then multiply it by the number. For example, to find 25% of 200, you would calculate `0.25 * 200`, which equals 50.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="font-semibold">How do you calculate percentage change?</AccordionTrigger>
                    <AccordionContent>
                       <p>To calculate the percentage change, subtract the old value from the new value, then divide that result by the old value. Finally, multiply by 100. The formula is: `((New Value - Old Value) / Old Value) * 100`.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="font-semibold">What are some real-world examples?</AccordionTrigger>
                    <AccordionContent>
                       <p>Percentages are used everywhere! This tool is perfect for:</p>
                        <ul className="list-disc pl-5">
                            <li>Calculating a 15% tip on a restaurant bill.</li>
                            <li>Figuring out a 30% discount on a sale item.</li>
                            <li>Determining the sales tax on a purchase.</li>
                            <li>Analyzing the percentage increase in your salary.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className="font-semibold">How do you calculate a reverse percentage?</AccordionTrigger>
                    <AccordionContent>
                       <p>To find the original amount before a percentage was added, you can use the formula: `Original Amount = Final Amount / (1 + (Percentage / 100))`. For example, if an item costs ₹110 after a 10% tax, the original price was `110 / (1 + 0.10) = 100`.</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    )
}
