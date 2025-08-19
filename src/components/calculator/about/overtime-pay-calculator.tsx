import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutOvertimePayCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Overtime Pay Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Overtime Pay Calculator helps you determine your total earnings for a pay period, including both your regular hours and any overtime hours worked. It allows you to adjust the overtime multiplier to match your company's policy, giving you an accurate estimate of your gross pay.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter your **Hourly Rate** of pay.</li>
                    <li>Input the number of **Regular Hours** you worked.</li>
                    <li>Enter the number of **Overtime Hours** worked.</li>
                    <li>Adjust the **Overtime Multiplier** (e.g., 1.5 for "time and a half").</li>
                </ol>
                <p>The calculator will instantly break down your pay into regular and overtime earnings and show you the total pay for the period.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is a standard overtime rate?</AccordionTrigger>
                        <AccordionContent>
                            The most common overtime rate is "time and a half," which means your overtime pay is 1.5 times your regular hourly rate. Some jobs or holidays may offer "double time," which is 2 times your regular rate.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Does this calculator include taxes or deductions?</AccordionTrigger>
                        <AccordionContent>
                            No, this calculator calculates your gross pay, which is your total earnings before any taxes, insurance, or retirement contributions are deducted. Your actual take-home pay will be lower than the amount shown here.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>When does overtime typically start?</AccordionTrigger>
                        <AccordionContent>
                           This varies by country and company policy, but a common standard is that overtime applies to any hours worked beyond 40 hours in a single week.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
