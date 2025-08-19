import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutRectangleAreaCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Rectangle Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The **Rectangle Area & Perimeter Calculator** is a fundamental tool for anyone needing to calculate the basic properties of a rectangle. Whether you're a student learning geometry, a homeowner planning a room layout, or a contractor estimating materials, this calculator provides instant and accurate measurements for area and perimeter.</p>

                <h3>How to Use the Calculator</h3>
                <p>Simply enter the **length** and **width** of the rectangle into the designated fields. The calculator will automatically compute the area and perimeter.</p>

                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How is the area of a rectangle calculated?</AccordionTrigger>
                        <AccordionContent>
                            The area of a rectangle is the amount of space it covers. It's calculated by multiplying its length by its width. The formula is: `Area = Length × Width`. The result is expressed in square units (e.g., square meters).
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How is the perimeter of a rectangle calculated?</AccordionTrigger>
                        <AccordionContent>
                            The perimeter is the total distance around the outside of the rectangle. It's found by adding the lengths of all four sides. Since opposite sides are equal, the formula is: `Perimeter = 2 × (Length + Width)`.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Can I use this for a square?</AccordionTrigger>
                        <AccordionContent>
                            Yes. A square is a special type of rectangle where all four sides are equal. To calculate the area or perimeter of a square, simply enter the same value for both the length and the width.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-4">
                        <AccordionTrigger>What are some real-world applications?</AccordionTrigger>
                        <AccordionContent>
                           These calculations are used constantly in everyday life, such as:
                           <ul className="list-disc pl-5 mt-2">
                                <li>Figuring out how much paint or carpet is needed for a room.</li>
                                <li>Calculating the amount of fencing required for a yard.</li>
                                <li>Determining the floor space of a house or office.</li>
                           </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
