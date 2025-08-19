
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutTriangleAngleCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>How to Find Triangle Angles</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>This calculator is a powerful tool for any geometry or trigonometry student. It allows you to find the unknown angles of a triangle based on the information you have. The two primary methods used are the Law of Cosines and the Law of Sines, which are fundamental principles in trigonometry.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Select the type of information you have from the dropdown menu (e.g., three sides).</li>
                    <li>Enter the known values for the sides and/or angles.</li>
                    <li>The calculator will instantly compute the unknown angles.</li>
                </ol>
                <h3>Understanding the Formulas</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the Law of Cosines? (Used for SSS and SAS)</AccordionTrigger>
                        <AccordionContent>
                            The Law of Cosines relates the lengths of the sides of a triangle to the cosine of one of its angles. The formula is: `c² = a² + b² - 2ab cos(C)`. This can be rearranged to solve for an angle if you know all three sides. For example, to find angle C, the formula becomes: `C = arccos((a² + b² - c²) / 2ab)`. It is the primary tool used when you are given three sides (SSS).
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is the Law of Sines?</AccordionTrigger>
                        <AccordionContent>
                            The Law of Sines relates the sides of a triangle to the sines of their opposite angles. The formula is: `a/sin(A) = b/sin(B) = c/sin(C)`. This law is particularly useful when you know two angles and one side (AAS or ASA), or two sides and a non-included angle (SSA).
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
