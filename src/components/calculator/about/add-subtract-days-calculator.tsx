import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutAddSubtractDaysCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle as="h2">About the Date Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our Add/Subtract Days Calculator is a simple tool for anyone who needs to quickly find a future or past date. It's great for setting a deadline, scheduling a follow-up, or finding a warranty period. This tool removes the need to count days on a calendar.</p>
            <h2>How to Use the Date Calculator</h2>
            <ol>
                <li>Pick a **Start Date** from the calendar.</li>
                <li>Enter the number of **Days to Add/Subtract**.</li>
                <li>Click either the **"Add Days"** or **"Subtract Days"** button.</li>
            </ol>
            <p>The resulting date will appear in the results card on the right.</p>
            <h2>Date Calculator FAQs</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How does this calculator work?</AccordionTrigger>
                        <AccordionContent>
                            This tool adds or subtracts the number of calendar days you enter from a start date. It handles all month and year changes, including leap years, so you get an accurate result every time.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is this useful for?</AccordionTrigger>
                        <AccordionContent>
                            It's perfect for a variety of planning tasks, such as:
                            <ul className="list-disc pl-5 mt-2">
                            <li>Scheduling appointments (e.g., a 60-day follow-up).</li>
                            <li>Setting project deadlines (e.g., finding the date 90 days from today).</li>
                            <li>Planning events or tracking personal milestones.</li>
                            <li>Calculating return periods or warranty expiration dates.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
