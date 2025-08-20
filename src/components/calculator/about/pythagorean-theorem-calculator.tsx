import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AboutPythagoreanTheoremCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle as="h2">About the Pythagorean Theorem</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>This calculator helps you find the length of a missing side of a right-angled triangle using the Pythagorean theorem. This famous formula is a key part of geometry and has many practical uses.</p>
                
                <h3>How to Use the Pythagorean Theorem Calculator</h3>
                <ol>
                    <li>Select which side you need to solve for (side 'a', side 'b', or hypotenuse 'c').</li>
                    <li>Enter the lengths of the two sides that you know.</li>
                    <li>The calculator will instantly show the length of the missing side.</li>
                </ol>
                <p>Remember that the hypotenuse 'c' must always be the longest side. The calculator will show an error if this is not true.</p>

                <h3>Pythagorean Theorem FAQs</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold">What is the Pythagorean Theorem?</AccordionTrigger>
                        <AccordionContent>
                            <p>The Pythagorean theorem is a fundamental principle of Euclidean geometry. It states that for any right-angled triangle, the square of the length of the hypotenuse (the side opposite the right angle, denoted as 'c') is equal to the sum of the squares of the other two sides (denoted as 'a' and 'b'). The formula is written as: <strong>a² + b² = c²</strong>.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-semibold">What is a Hypotenuse?</AccordionTrigger>
                        <AccordionContent>
                           <p>The hypotenuse is the longest side of a right-angled triangle. It is always the side opposite the 90-degree angle. In the formula a² + b² = c², 'c' represents the hypotenuse.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-semibold">What are some real-world uses?</AccordionTrigger>
                        <AccordionContent>
                           <p>This theorem is not just for textbooks; it is used in many real-world applications, such as architecture (ensuring corners are square), navigation (calculating the shortest distance), and even in video game design for calculating distances and movements.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="font-semibold">Learn More</AccordionTrigger>
                        <AccordionContent>
                           <p>Read our detailed article on <Link href="/blog/what-is-the-pythagorean-theorem" className="text-primary hover:underline">What is the Pythagorean Theorem?</Link> to understand its history, proof, and further applications.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
