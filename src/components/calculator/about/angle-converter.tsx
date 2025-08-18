import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutAngleConverter() {
    return (
        <Card>
            <CardHeader><CardTitle>Understanding Angle Units</CardTitle></CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What are degrees and radians?</AccordionTrigger>
                        <AccordionContent>
                            **Degrees (°)** are the most common unit for measuring angles, with a full circle containing 360°. **Radians (rad)** are the standard unit in mathematics and physics, where a full circle is 2π radians.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Why use radians?</AccordionTrigger>
                        <AccordionContent>
                            Radians simplify many mathematical formulas, especially in calculus and trigonometry, by relating the angle directly to the radius of a circle.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
