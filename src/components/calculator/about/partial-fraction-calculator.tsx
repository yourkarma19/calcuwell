
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPartialFractionCalculator() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>About Partial Fraction Decomposition</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <h2>What is Partial Fraction Decomposition?</h2>
                <p>
                    Partial fraction decomposition is a technique in algebra used to break down a complex rational function (a fraction of two polynomials) into a sum of simpler fractions. This process makes the expression much easier to work with, especially for operations in calculus like integration.
                </p>

                <h3>When is This Used?</h3>
                <ul>
                    <li>
                        <strong>Integral Calculus:</strong> This is the most common application. Integrating a complex rational function can be very difficult, but integrating the sum of its simpler partial fractions is often straightforward.
                    </li>
                    <li>
                        <strong>Laplace Transforms:</strong> In engineering and physics, this method is used to find the inverse Laplace transform, which is crucial for solving linear ordinary differential equations.
                    </li>
                </ul>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What about repeated linear factors?</AccordionTrigger>
                        <AccordionContent>
                            If the denominator has a repeated factor like `(x-a)²`, the decomposition must include a term for each power. For example, `A/(x-a) + B/(x-a)²`. Our calculator handles these cases automatically.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How does the calculator handle irreducible quadratic factors?</AccordionTrigger>
                        <AccordionContent>
                            For factors that cannot be broken down further, like `(x² + 1)`, the corresponding partial fraction has a linear numerator, such as `(Ax + B) / (x² + 1)`. The calculator correctly sets up and solves for these coefficients.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Can I use this to check my homework?</AccordionTrigger>
                        <AccordionContent>
                            Yes, absolutely. Our tool is designed to help you verify your work and understand the steps involved in reaching the correct solution. It's a great way to learn and build confidence.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
