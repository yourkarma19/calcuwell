import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutGradePercentageCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle as="h2">About Grade Calculation</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>This simple tool helps you quickly calculate the percentage score of a test, quiz, or assignment. By entering the points you earned and the total points possible, you can instantly see your performance as a percentage and its corresponding letter grade based on a standard scale. It's a great way for students to track their progress and understand their grades.</p>
                <h2>How to Use This Grade Calculator</h2>
                <ol>
                    <li>Enter the total **Points Earned** (the score you received).</li>
                    <li>Enter the **Total Possible Points** for the assignment.</li>
                </ol>
                <p>The calculator will instantly show your grade as a percentage and a letter.</p>
                <h2>Grading FAQs</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How is the percentage calculated?</AccordionTrigger>
                        <AccordionContent>
                            The formula to calculate a grade percentage is a simple and fundamental one: `Percentage = (Points Earned / Total Possible Points) * 100`. This calculation gives you the proportion of points you received out of the total available.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is a standard grading scale?</AccordionTrigger>
                        <AccordionContent>
                            A standard grading scale is a system used to convert percentage scores into letter grades. While this can vary between schools, a very common scale used in the United States is:
                            <ul className="list-disc pl-5 mt-2">
                                <li>90% and above: A</li>
                                <li>80% - 89%: B</li>
                                <li>70% - 79%: C</li>
                                <li>60% - 69%: D</li>
                                <li>Below 60%: F</li>
                            </ul>
                            This calculator uses this standard scale to assign a letter grade.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
