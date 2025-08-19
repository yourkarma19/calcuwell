"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutLogarithmCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Logarithm Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <p>The Logarithm Calculator helps you find the logarithm of a number to a specified base. Logarithms are the inverse of exponents. They answer the question: "To what power must we raise a base to get another number?" This tool is helpful for anyone working with exponential functions.</p>

        <h3>How to Use the Logarithm Calculator</h3>
        <ol>
            <li>Enter the **Number (x)** you want to find the logarithm of.</li>
            <li>Enter the **Base (b)** for the logarithm.</li>
        </ol>
        <p>The result of log(x) to the base(b) will be calculated and displayed instantly.</p>

        <h3>Logarithm FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a logarithm?</AccordionTrigger>
            <AccordionContent>
              A logarithm is the power to which a number (the base) must be raised to produce another number. For example, the logarithm of 100 to base 10 is 2. This is because 10² equals 100.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Common Log vs. Natural Log</AccordionTrigger>
            <AccordionContent>
              The **common logarithm (log)** uses base 10 and is common in science. The **natural logarithm (ln)** uses base *e* (about 2.718) and is important in math, physics, and finance for describing continuous growth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Why can't the base be 1?</AccordionTrigger>
            <AccordionContent>
              A base of 1 is not allowed because 1 raised to any power is always 1. This means you could never produce any other number, making the operation undefined for most values.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What is the Change of Base Formula?</AccordionTrigger>
            <AccordionContent>
              Most calculators have buttons only for common log (base 10) and natural log (base e). To find a logarithm with a different base, you can use the change of base formula: `logb(x) = logc(x) / logc(b)`. Our calculator uses this formula internally for its calculations.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
