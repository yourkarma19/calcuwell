import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutTangentLineCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle as="h2">About the Tangent Line Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>This calculator is designed for calculus students to find the equation of a line that is tangent to a function at a specific point. The tangent line represents the instantaneous rate of change of the function at that exact point. Understanding how to find it is a core concept in differential calculus.</p>
                <h3>How to Use the Tangent Line Calculator</h3>
                <ol>
                    <li>Enter the function `f(x)` you want to analyze.</li>
                    <li>Enter the specific point `x` where you want to find the tangent line.</li>
                    <li>Click "Find Tangent Line".</li>
                </ol>
                <p>The tool will provide the equation of the tangent line in slope-intercept form (`y = mx + b`) and show the detailed steps to arrive at the solution.</p>

                <h3>Tangent Line FAQs</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is a Tangent Line?</AccordionTrigger>
                        <AccordionContent>
                            A tangent line is a straight line that "just touches" a curve at a single point and has the same direction as the curve at that point. The slope of the tangent line is equal to the derivative of the function evaluated at that same point.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How is the tangent line found?</AccordionTrigger>
                        <AccordionContent>
                            The process involves a few key calculus steps:
                            <ol>
                                <li>Find the derivative of the function, `f'(x)`.</li>
                                <li>Evaluate the derivative at the given point `x=a` to find the slope `m` of the tangent line.</li>
                                <li>Find the y-coordinate of the point by calculating `f(a)`.</li>
                                <li>Use the point-slope formula `y - y₁ = m(x - x₁)` to find the equation of the line.</li>
                            </ol>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Why is this important in calculus?</AccordionTrigger>
                        <AccordionContent>
                            Finding the tangent line is a fundamental application of derivatives. The derivative of a function gives its rate of change. The tangent line provides a linear approximation of the function's behavior near a specific point, which is crucial in physics, engineering, and economics.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
