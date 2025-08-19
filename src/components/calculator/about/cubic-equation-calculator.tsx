
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutCubicEquationCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Cubic Equation Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>This tool is designed to solve any cubic equation, which is a third-degree polynomial equation of the form `ax³ + bx² + cx + d = 0`. Solving cubic equations can be complex, and this calculator simplifies the process by finding all three roots, which can be real or complex numbers. It is an invaluable resource for students in algebra and calculus, as well as for engineers and scientists who encounter such equations in their work.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter the coefficients `a`, `b`, `c`, and `d` for your equation into the respective input boxes.</li>
                    <li>Click the "Solve" button.</li>
                    <li>The calculator will display the three roots of the equation (`x₁`, `x₂`, `x₃`).</li>
                </ol>
                <h3>Understanding the Solution</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What are the "roots" of an equation?</AccordionTrigger>
                        <AccordionContent>
                            The roots of an equation are the values of the variable (in this case, `x`) that make the equation true. For a cubic equation, there are always three roots. These roots can be all real numbers, or one real number and two complex conjugate numbers.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is the discriminant?</AccordionTrigger>
                        <AccordionContent>
                            The discriminant is a value calculated from the coefficients of the polynomial. Its sign determines the nature of the roots. For a cubic equation, if the discriminant is positive, there is one real root and two complex roots. If it's zero, there are three real roots with at least two being equal. If it's negative, there are three distinct real roots. Our calculator shows the discriminant in the "Show Work" section.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger>Why are cubic equations important?</AccordionTrigger>
                        <AccordionContent>
                            Cubic equations appear in many areas of science and engineering. They are used to model various physical phenomena, such as the volume of materials, thermodynamic properties, and fluid dynamics. In mathematics, they are a fundamental part of algebra and calculus.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
