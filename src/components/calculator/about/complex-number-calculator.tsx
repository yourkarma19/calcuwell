import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutComplexNumberCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Complex Numbers</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>This calculator is a tool for working with complex numbers. Complex numbers are a key part of math and engineering. They help solve problems that regular numbers cannot. This tool lets you easily add, subtract, multiply, and divide them.</p>

                <h3>How to Use It</h3>
                <p>A complex number has two parts: a real part and an imaginary part. Enter the two parts for both numbers you want to use. Then, select the operation you want to perform.</p>

                <h3>Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is a complex number?</AccordionTrigger>
                        <AccordionContent>
                            A complex number has the form `a + bi`. The 'a' is the "real" part, which is a regular number. The 'b' is the "imaginary" part. Complex numbers are used in many areas of science and engineering, like electronics and signal processing.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is the imaginary unit 'i'?</AccordionTrigger>
                        <AccordionContent>
                           The imaginary unit 'i' is the solution to the equation x² = -1. It is defined as the square root of negative one (√-1). Since you can't find a real number that gives a negative result when multiplied by itself, 'i' was created to solve these kinds of problems.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger>How do you add or subtract them?</AccordionTrigger>
                        <AccordionContent>
                           It's simple: you just add or subtract the real parts together and the imaginary parts together, separately. For example, (3 + 2i) + (1 + 4i) = (3+1) + (2+4)i = 4 + 6i.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
