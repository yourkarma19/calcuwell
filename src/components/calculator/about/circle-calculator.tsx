
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutCircleCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Circle Formulas</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Circle Calculator is a dynamic tool for finding the properties of a circle from any single known measurement. Whether you know the radius, diameter, circumference, or area, this calculator can instantly compute the other three values. It's an essential tool for students, designers, engineers, and anyone working with geometric shapes.</p>
                
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Select the **Input Type** that corresponds to the measurement you know (e.g., Radius).</li>
                    <li>Enter the value for your known measurement.</li>
                </ol>
                <p>The calculator will automatically display the computed values for all four properties of the circle.</p>

                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is Pi (π)?</AccordionTrigger>
                        <AccordionContent>
                            Pi (π) is a fundamental mathematical constant representing the ratio of a circle's circumference to its diameter. It's an irrational number, approximately equal to 3.14159, and is crucial for all calculations involving circles and spheres.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Key Circle Formulas</AccordionTrigger>
                        <AccordionContent>
                            This calculator uses the following standard formulas:
                           <ul className="list-disc pl-5 space-y-2 mt-2">
                                <li><strong>Diameter (d):</strong> `d = 2 * r`</li>
                                <li><strong>Circumference (C):</strong> `C = 2 * π * r` or `C = π * d`</li>
                                <li><strong>Area (A):</strong> `A = π * r²`</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Radius vs. Diameter</AccordionTrigger>
                        <AccordionContent>
                            The **radius (r)** is the distance from the center of the circle to any point on its edge. The **diameter (d)** is the distance across the circle passing through the center. The diameter is always twice the length of the radius.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
