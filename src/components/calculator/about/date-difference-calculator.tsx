import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutDateDifferenceCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Date Difference Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Our Date Difference Calculator is an essential tool for anyone needing to find the exact duration between two dates. Whether you're tracking a project timeline, calculating an age, or simply curious about the time between two historical events, this tool provides a comprehensive breakdown in multiple units.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Select a **Start Date** and an **End Date** using the calendar pickers.</li>
                    <li>Click the **"Calculate Difference"** button.</li>
                </ol>
                <p>The results will instantly show the total duration in years, months, weeks, days, hours, and minutes.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How does the calculator handle the results?</AccordionTrigger>
                        <AccordionContent>
                            This calculator provides the total duration between two dates, expressed independently in different units. For example, it will show you the total number of months between the dates, and separately, the total number of days. It does not provide a combined "X years, Y months, and Z days" result like an age calculator would.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Does this calculator include the end date in the count?</AccordionTrigger>
                        <AccordionContent>
                            The calculation measures the number of full days between the start and end dates. For example, the difference between January 1st and January 3rd is two full days. It does not count the start date itself.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger>Does it account for leap years?</AccordionTrigger>
                        <AccordionContent>
                           Yes, the calculator accurately accounts for leap years in its calculations, ensuring that the total number of days is correct even when the period spans across a leap day (February 29th).
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
