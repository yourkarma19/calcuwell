import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutTrigonometryCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Trigonometry</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Our **Trigonometry Calculator** is a simple tool for solving trigonometry problems. It's useful for students, engineers, and anyone who needs a quick calculation. You can find the values of sine, cosine, and tangent, as well as their inverses (arcsin, arccos, arctan) for any angle.</p>

                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Choose the **Function** you need (like sin, cos, or asin).</li>
                    <li>Enter the **Value**. This will be an angle for sin/cos/tan, or a ratio for the inverse functions.</li>
                    <li>Select the correct **Unit** (Degrees or Radians).</li>
                </ol>
                <p>The result is shown instantly.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What are Sine, Cosine, and Tangent?</AccordionTrigger>
                        <AccordionContent>
                            These are the three main functions in trigonometry. They are based on the ratios of the sides of a right-angled triangle.
                            <ul className="list-disc pl-5 mt-2">
                                <li><strong>Sine (sin):</strong> Opposite / Hypotenuse</li>
                                <li><strong>Cosine (cos):</strong> Adjacent / Hypotenuse</li>
                                <li><strong>Tangent (tan):</strong> Opposite / Adjacent</li>
                            </ul>
                            You can remember this with the acronym **SOH-CAH-TOA**.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What are Inverse Trig Functions?</AccordionTrigger>
                        <AccordionContent>
                            Inverse functions (like asin or sin⁻¹) are used to find an angle when you know the ratio of its sides. For example, if you know the sine of an angle is 0.5, you can use `asin(0.5)` to find that the angle is 30 degrees.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Degrees vs. Radians</AccordionTrigger>
                        <AccordionContent>
                            Degrees and Radians are two different ways to measure angles. A full circle is 360 degrees or 2π radians. It's important to use the correct unit in your calculations to get the right answer.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Real-World Applications</AccordionTrigger>
                        <AccordionContent>
                            Trigonometry is used in many fields, like astronomy (to measure distances), navigation (GPS), engineering (to build bridges), and even video game design.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
