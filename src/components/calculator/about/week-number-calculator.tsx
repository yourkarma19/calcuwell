
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutWeekNumberCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Week Number Calculation</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Week Number Calculator helps you find the week of the year for any given date. This can be useful for project planning, scheduling, and reporting, especially in business contexts where work is often organized by week number.</p>
                
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Select the **Date** for which you want to find the week number.</li>
                    <li>Choose the **Week Definition** standard you want to use.</li>
                </ol>
                <p>The calculator will instantly display the week number for the selected date and year.</p>

                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the ISO 8601 standard?</AccordionTrigger>
                        <AccordionContent>
                           The **ISO 8601** standard is the international standard for week dates. In this system, weeks always start on a Monday. Week 1 of any year is the first week that contains a Thursday. This is the most common standard used in business across Europe and Asia.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How do other week definitions work?</AccordionTrigger>
                        <AccordionContent>
                           Some regions, particularly in North America, consider Sunday to be the start of the week. This calculator allows you to choose between systems where the week starts on Sunday or Monday. In these systems, Week 1 is simply the week that contains January 1st.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Why does the ISO week year sometimes differ from the calendar year?</AccordionTrigger>
                        <AccordionContent>
                           Because the ISO week year is based on which year the majority of the week's days fall in, the first few days of January can sometimes belong to the last week of the previous year, and the last few days of December can belong to the first week of the next year.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
