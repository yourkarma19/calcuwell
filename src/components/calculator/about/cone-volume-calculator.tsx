
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutConeVolumeCalculator() {
    return (
      <Card>
        <CardHeader><CardTitle>About the Cone Calculator</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>The Cone Calculator is a useful tool for anyone working with 3D shapes. It helps find a cone's key properties, such as its volume, slant height, and surface area. This calculator is perfect for students and professionals who need quick and accurate calculations.</p>
            
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter the **Radius** of the cone's circular base.</li>
                <li>Enter the perpendicular **Height** of the cone (from the base to the tip).</li>
            </ol>
            <p>The calculator will instantly compute the volume, slant height, and total surface area of the cone.</p>

            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How is the volume of a cone calculated?</AccordionTrigger>
                    <AccordionContent>
                        The volume of a cone is one-third of the volume of a cylinder with the same base and height. The formula is `V = (1/3) * π * r² * h`.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is the slant height?</AccordionTrigger>
                    <AccordionContent>
                       The slant height ('s') is the distance from the tip of the cone down the side to a point on the edge of the base. It is not the same as the perpendicular height. It is needed to calculate the surface area of the cone's side. You can find it using the formula: `s = √(r² + h²)`.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How is the surface area calculated?</AccordionTrigger>
                    <AccordionContent>
                       The total surface area of a cone is the area of its circular base (`π * r²`) plus its side surface area (`π * r * s`), where 's' is the slant height.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                    <AccordionTrigger>What is a "right circular cone"?</AccordionTrigger>
                    <AccordionContent>
                       This calculator is for right circular cones. This is the most common type. It means the tip is directly above the center of the circular base. An oblique cone is one where the tip is not centered.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    );
}
