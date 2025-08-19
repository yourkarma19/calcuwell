import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutTimeCardCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Time Card Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Time Card Calculator is an essential tool for employees and employers to accurately track work hours and calculate gross pay for a pay period. It simplifies the process of adding up daily hours and subtracting break times, reducing errors and ensuring fair compensation.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>For each day of the week, enter your **Start Time** and **End Time** using the time pickers.</li>
                    <li>Enter the total duration of your unpaid **Break** in minutes for each day.</li>
                    <li>Enter your **Hourly Rate** of pay at the bottom.</li>
                </ol>
                <p>The calculator will instantly update the total weekly hours and your total gross pay in the summary section.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is Gross Pay?</AccordionTrigger>
                        <AccordionContent>
                            Gross pay is the total amount of money you earn before any deductions are subtracted. This calculator computes your gross pay. Your actual take-home pay (net pay) will be lower after taxes, insurance, and other deductions are taken out.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How are decimal hours calculated?</AccordionTrigger>
                        <AccordionContent>
                           This tool converts minutes into a decimal format for easy calculation. For example, 30 minutes is 0.5 hours, and 15 minutes is 0.25 hours. This allows for simple multiplication with your hourly rate.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Does this calculator handle overtime?</AccordionTrigger>
                        <AccordionContent>
                           No, this is a basic time card calculator and does not automatically calculate overtime pay. To calculate overtime, you would need to manually separate your regular hours from your overtime hours and use our <a href="/calculators/overtime-pay-calculator" className="text-primary hover:underline">Overtime Pay Calculator</a>.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
  
