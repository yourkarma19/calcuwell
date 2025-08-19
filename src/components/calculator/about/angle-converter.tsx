import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutAngleConverter() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Angle Converter</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Angle Converter is a simple yet essential tool for students, engineers, and scientists who need to switch between the two most common units of angle measurement: **degrees** and **radians**. This tool provides instant, accurate conversions, eliminating the need for manual calculations and helping to prevent errors in technical work.</p>
                
                <h3>How to Use the Converter</h3>
                <p>Enter a value in either the "Degrees" or "Radians" field. The other field will update automatically with the converted value. Use the swap button to easily reverse the direction of the conversion.</p>

                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What are degrees and radians?</AccordionTrigger>
                        <AccordionContent>
                            <p><strong>Degrees (°)</strong > are the most common unit for measuring angles in everyday life, with a full circle containing 360°. Each degree is a 1/360th part of a full rotation.</p>
                            <p><strong>Radians (rad)</strong > are the standard unit of angular measure in mathematics and physics. A radian is defined by the arc of a circle: one radian is the angle at the center of a circle where the arc length is equal to the radius. A full circle contains 2π radians.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Why do mathematicians and physicists prefer radians?</AccordionTrigger>
                        <AccordionContent>
                            Radians are preferred in higher-level mathematics because they simplify many important formulas, especially in calculus and trigonometry. Because radians are directly related to the radius of a circle, they create more natural and elegant equations without arbitrary constants (like the number 360).
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What is the conversion formula?</AccordionTrigger>
                        <AccordionContent>
                           <p>The conversion is based on the relationship that 180° = π radians.</p>
                           <ul className="list-disc pl-5">
                                <li>To convert degrees to radians: `Radians = Degrees × (π / 180)`</li>
                                <li>To convert radians to degrees: `Degrees = Radians × (180 / π)`</li>
                           </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
