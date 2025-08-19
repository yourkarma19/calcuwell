
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutSphereVolumeSurfaceAreaCalculator() {
    return (
      <Card>
        <CardHeader><CardTitle>About the Sphere Calculator</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>The **Sphere Calculator** is a straightforward tool for computing the essential geometric properties of a sphere from a single measurement: its radius. This calculator is ideal for students learning 3D geometry, engineers, designers, and anyone who needs to quickly find the volume or surface area of a spherical object. It eliminates manual calculations and provides instant, accurate results.</p>
            
            <h3>How to Use the Calculator</h3>
            <p>Using the calculator is simple:</p>
            <ol>
                <li>Enter the **Radius** of the sphere into the input box.</li>
            </ol>
            <p>The calculator will automatically compute and display the sphere's volume, surface area, and diameter.</p>

            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How is the volume of a sphere calculated?</AccordionTrigger>
                    <AccordionContent>
                        The volume of a sphere is the total amount of space inside it. It is calculated using the formula `V = (4/3) * π * r³`, where 'r' is the radius of the sphere and π (pi) is approximately 3.14159.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How is the surface area of a sphere calculated?</AccordionTrigger>
                    <AccordionContent>
                       The surface area is the total area on the outer surface of the sphere. It is calculated with the formula `A = 4 * π * r²`, where 'r' is the radius. An interesting fact is that this is the same area as four circles with the same radius, or the area of the curved part of a cylinder that would perfectly enclose the sphere.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Real-World Applications</AccordionTrigger>
                    <AccordionContent>
                        Sphere calculations are used in many fields. For example, astronomers use them to estimate the volume of planets, engineers use them to design ball bearings and spherical tanks, and meteorologists use them to model weather patterns on a global scale.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Radius vs. Diameter</AccordionTrigger>
                    <AccordionContent>
                        The **radius (r)** is the distance from the center of the sphere to any point on its surface. The **diameter (d)** is the distance straight through the center of the sphere, from one side to the other. The diameter is always twice the length of the radius (d = 2r).
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    );
}
