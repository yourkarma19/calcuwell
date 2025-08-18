import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AboutWorkingDaysCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Working Days Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The **Working Days Calculator** is a practical tool for professionals who need to plan projects, set deadlines, and manage schedules accurately. It calculates the number of business days between two dates, automatically excluding weekends (Saturdays and Sundays) to give you a realistic timeline for work-related tasks.</p>

                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Select a **Start Date** and an **End Date** using the calendars.</li>
                    <li>Click the **"Calculate Working Days"** button.</li>
                </ol>
                <p>The calculator will instantly tell you the total number of business days in that period.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Why are working days important?</AccordionTrigger>
                        <AccordionContent>
                            Calculating working days is crucial for accurate project planning, estimating delivery times, managing employee leave, and ensuring that contract deadlines are realistic. It removes the guesswork of manually counting days on a calendar.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Does this calculator account for public holidays?</AccordionTrigger>
                        <AccordionContent>
                            No, this calculator only excludes weekends. Public holidays vary significantly by country and region, so they are not included in the calculation. For precise planning, you should manually subtract any public holidays that fall within your calculated date range.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How is this different from the Business Day Calculator?</AccordionTrigger>
                        <AccordionContent>
                            The <Link href="/calculators/business-day-calculator" className="text-primary hover:underline">Business Day Calculator</Link> adds or subtracts a specific number of business days from a start date to find a future or past date. This Working Days Calculator, on the other hand, counts the total number of business days that fall between two given dates.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
