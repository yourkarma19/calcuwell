import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutTrigonometryCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Trigonometry</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Our **Trigonometry Calculator** provides a powerful and easy-to-use interface for solving complex trigonometric problems. Whether you're a student tackling geometry homework, an engineer designing a structure, or a professional needing a quick calculation, this tool simplifies the process. It allows you to find the values of sine, cosine, tangent, and their inverse functions (arcsin, arccos, arctan) for any angle, specified in either degrees or radians.</p>

                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Select the trigonometric **Function** you want to use from the dropdown menu (e.g., sin, cos, asin).</li>
                    <li>Enter the **Value** (either an angle for sin/cos/tan, or a ratio for asin/acos/atan).</li>
                    <li>Choose the **Unit** for your angle (Degrees or Radians).</li>
                </ol>
                <p>The result of the calculation is displayed instantly.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What are Sine, Cosine, and Tangent?</AccordionTrigger>
                        <AccordionContent>
                            Sine (sin), Cosine (cos), and Tangent (tan) are the three primary trigonometric functions. They are defined as ratios of the sides of a right-angled triangle.
                            <ul className="list-disc pl-5 mt-2">
                                <li><strong>Sine (sin):</strong> Opposite / Hypotenuse</li>
                                <li><strong>Cosine (cos):</strong> Adjacent / Hypotenuse</li>
                                <li><strong>Tangent (tan):</strong> Opposite / Adjacent</li>
                            </ul>
                            The acronym **SOH-CAH-TOA** is often used to remember these fundamental ratios.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What are Inverse Trigonometric Functions?</AccordionTrigger>
                        <AccordionContent>
                            Inverse trigonometric functions (like asin, acos, atan, often written as sin⁻¹, cos⁻¹, tan⁻¹) are used to find the angle when you know the ratio of the sides. For example, if you know that the sine of an angle is 0.5, you can use arcsin (sin⁻¹) to find that the angle is 30 degrees.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Degrees vs. Radians</AccordionTrigger>
                        <AccordionContent>
                            Degrees and Radians are two different units for measuring angles. A full circle is 360 degrees or 2π radians. It's crucial to use the correct unit for your calculations, as using the wrong one will lead to incorrect results. Most advanced mathematical and physics formulas use radians for simplicity and consistency.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Real-World Applications</AccordionTrigger>
                        <AccordionContent>
                            Trigonometry is used in many fields, including astronomy (to measure distances to stars), navigation (GPS systems), engineering (to build structures), physics (to analyze waves), and video game development (to control object movement and camera angles).
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
