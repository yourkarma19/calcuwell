import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutDateDifferenceCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Date Difference Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Our Date Difference Calculator is an essential tool to find the exact time between two dates. Whether you're tracking a project, calculating an age, or checking the time between historical events, this tool gives you a full breakdown in several units.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Choose a **Start Date** and an **End Date** from the calendars.</li>
                    <li>Click the **"Calculate Difference"** button.</li>
                </ol>
                <p>The results will show the total duration in years, months, weeks, days, hours, and minutes.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How does this calculator show the results?</AccordionTrigger>
                        <AccordionContent>
                            This calculator shows the total duration between two dates, expressed separately in different units. For example, it will show the total number of months and, separately, the total number of days. It does not provide a combined "X years, Y months, and Z days" result like our age calculator.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Does the calculation include the end date?</AccordionTrigger>
                        <AccordionContent>
                            The calculation measures the number of full calendar days between the start and end dates. For instance, the difference between January 1st and January 3rd is two full days. It does not count the start date in the total.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger>Does it account for leap years?</AccordionTrigger>
                        <AccordionContent>
                           Yes, the calculator accurately handles leap years in its calculations. This ensures the total number of days is correct even when the time period includes a leap day (February 29th).
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
