
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AboutPythagoreanTheoremCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Pythagorean Theorem</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>This calculator helps you find the length of a missing side of a right-angled triangle using the Pythagorean theorem. This famous formula is a key part of geometry and has many practical uses.</p>
                
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Select which side you need to solve for (a, b, or c).</li>
                    <li>Enter the lengths of the two sides that you know.</li>
                    <li>The calculator will instantly show the length of the missing side.</li>
                </ol>
                <p>Remember that the hypotenuse 'c' must always be the longest side. The calculator will show an error if this is not true.</p>

                <h3>Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold">What is the Pythagorean Theorem?</AccordionTrigger>
                        <AccordionContent>
                            <p>The Pythagorean theorem is a basic rule of geometry. It states that for any right-angled triangle, the square of the hypotenuse (side 'c') is equal to the sum of the squares of the other two sides (a² + b² = c²).</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-semibold">What is a Hypotenuse?</AccordionTrigger>
                        <AccordionContent>
                           <p>The hypotenuse is the longest side of a right-angled triangle. It is always the side opposite the 90-degree angle. In the formula, 'c' represents the hypotenuse.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-semibold">What are some real-world uses?</AccordionTrigger>
                        <AccordionContent>
                           <p>This theorem is used in architecture, construction, and navigation. For example, it can find the diagonal distance across a room, determine the steepness of a ramp, or find the shortest path for a boat.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="font-semibold">Learn More</AccordionTrigger>
                        <AccordionContent>
                           <p>Read our detailed article on <Link href="/blog/what-is-the-pythagorean-theorem" className="text-primary hover:underline">What is the Pythagorean Theorem?</Link> to understand its history, proof, and applications.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
