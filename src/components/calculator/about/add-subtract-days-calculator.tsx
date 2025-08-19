import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutAddSubtractDaysCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle as="h2">About the Date Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our Add/Subtract Days Calculator is a simple tool to find a future or past date. It is great for setting a deadline, scheduling a follow-up, or finding a warranty period. This tool avoids the need to count days manually on a calendar.</p>
            <h3>How to Use the Date Calculator</h3>
            <ol>
                <li>Choose a **Start Date** from the calendar.</li>
                <li>Enter the number of **Days to Add/Subtract**.</li>
                <li>Click either the **"Add Days"** or **"Subtract Days"** button.</li>
            </ol>
            <p>The resulting date will be shown instantly in the results card.</p>
            <h3>Date Calculator FAQs</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How does this calculator work?</AccordionTrigger>
                        <AccordionContent>
                            This tool simply adds or subtracts the number of days you enter from a given start date. It automatically handles all month and year changes, including leap years, so you get an accurate result every time.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is this tool used for?</AccordionTrigger>
                        <AccordionContent>
                            It is perfect for many planning tasks, such as:
                            <ul className="list-disc pl-5 mt-2">
                            <li>Scheduling appointments (e.g., a 60-day follow-up).</li>
                            <li>Setting project deadlines (e.g., finding the date 90 days from today).</li>
                            <li>Planning events or tracking personal goals.</li>
                            <li>Calculating return periods or warranty expiration dates.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
