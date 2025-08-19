import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutExponentPowerCalculator() {
    return (
        <Card>
          <CardHeader><CardTitle>About Exponents & Powers</CardTitle></CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>The **Exponent & Power Calculator** is a fundamental mathematical tool that helps you compute the result of a number raised to a certain power. This operation, known as exponentiation, is essential in many fields, including finance (for compound interest), science (for exponential growth), and computer science (for data scaling).</p>
            
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter the **Base (x)**, which is the number being multiplied.</li>
                <li>Enter the **Exponent (y)**, which is the number of times the base is multiplied by itself.</li>
            </ol>
            <p>The calculator will instantly display the result of `x` raised to the power of `y` (x^y).</p>

            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What does an exponent mean?</AccordionTrigger>
                <AccordionContent>
                  An exponent indicates how many times to multiply a number (the base) by itself. For example, in the expression 2⁴, the base is 2 and the exponent is 4. This means you multiply 2 by itself four times: 2 × 2 × 2 × 2 = 16.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What about negative exponents?</AccordionTrigger>
                <AccordionContent>
                  A negative exponent means to take the reciprocal of the base raised to the positive exponent. The formula is `x⁻ⁿ = 1 / xⁿ`. For example, 2⁻³ is the same as 1 / 2³, which equals 1/8 or 0.125.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What about fractional exponents?</AccordionTrigger>
                <AccordionContent>
                   A fractional exponent like `x¹/ⁿ` is another way of writing a root. For example, `9¹/²` is the same as the square root of 9 (√9), which is 3. Similarly, `8¹/³` is the cube root of 8 (∛8), which is 2.
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-4">
                <AccordionTrigger>What is an exponent of zero?</AccordionTrigger>
                <AccordionContent>
                   Any non-zero number raised to the power of zero is equal to 1. For example, 5⁰ = 1. This rule is a fundamental property of exponents that ensures mathematical consistency.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
    );
}

    