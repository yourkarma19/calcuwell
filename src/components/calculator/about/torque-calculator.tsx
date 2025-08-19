
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutTorqueCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Torque</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Torque Calculator is a fundamental tool in physics and engineering used to calculate the rotational force, or torque. Torque is the measure of how much a force acting on an object causes that object to rotate. This calculator simplifies the calculation for a force applied perpendicularly to a lever arm.</p>
                
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter the amount of **Force** being applied in Newtons (N).</li>
                    <li>Enter the **Distance** from the axis of rotation (the pivot point) to the point where the force is applied. This is also known as the lever arm, measured in meters (m).</li>
                </ol>
                <p>The calculator will instantly compute the resulting torque in Newton-meters (Nm).</p>

                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the formula for Torque?</AccordionTrigger>
                        <AccordionContent>
                            When the force is applied perpendicular to the lever arm, the formula for torque (τ) is:
                            <p className="font-mono bg-muted p-2 rounded-md text-center my-2">τ = F × r</p>
                            Where `F` is the applied force and `r` is the distance from the pivot point.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What if the force is not perpendicular?</AccordionTrigger>
                        <AccordionContent>
                            If the force is applied at an angle (θ) to the lever arm, the formula becomes `τ = F × r × sin(θ)`. The `sin(θ)` term accounts for the fact that only the component of the force perpendicular to the lever arm contributes to the torque. This calculator assumes a perpendicular force (sin(90°) = 1).
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger>What are some real-world examples of torque?</AccordionTrigger>
                        <AccordionContent>
                            Torque is present in many everyday situations:
                            <ul className="list-disc pl-5 mt-2">
                                <li>Using a wrench to tighten a bolt.</li>
                                <li>Opening a door by pushing on the handle (the hinge is the pivot).</li>
                                <li>A car engine's crankshaft rotating to power the wheels.</li>
                                <li>Pedaling a bicycle.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
