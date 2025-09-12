
"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Ohm's Law?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ohm's Law states that the voltage across a component is equal to the current flowing through it multiplied by its resistance. The formula is V = I × R.",
      },
    },
    {
      "@type": "Question",
      name: "How can I remember the Ohm's Law formulas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a triangle. Cover the value you want (V, I, or R), and the other two show the calculation: V = I × R, I = V / R, R = V / I.",
      },
    },
    {
      "@type": "Question",
      name: "What is Power (P) and how does it relate to Ohm's Law?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Power (in Watts) is the rate of energy use. It's related to Ohm's Law by formulas like P = V × I. Our calculator can also solve for power.",
      },
    },
    {
      "@type": "Question",
      name: "Why is Ohm's Law important?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's essential for designing and troubleshooting circuits, helping engineers choose the right parts and manage current safely.",
      },
    },
  ],
};

export default function AboutOhmsLawCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Ohm&apos;s Law Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The **Ohm&apos;s Law Calculator** is a vital tool for anyone working with
          electronics. It helps you find the relationship between **Voltage
          (V)**, **Current (I)**, **Resistance (R)**, and **Power (P)**. Just
          enter any two values, and the calculator will find the other two.
        </p>
        <h3>How to Use the Calculator</h3>
        <ol>
          <li>Select the value you want to solve for (e.g., Voltage).</li>
          <li>Enter any two of the other known values.</li>
        </ol>
        <p>The calculator will automatically show the correct result.</p>
        <h3>Ohm&apos;s Law FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Ohm&apos;s Law?</AccordionTrigger>
            <AccordionContent>
              Ohm&apos;s Law is a basic rule in electronics. The formula is `V = I ×
              R`. It says that the voltage across a component is equal to the
              current flowing through it multiplied by its resistance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>The Ohm&apos;s Law Triangle</AccordionTrigger>
            <AccordionContent>
              An easy way to remember the formulas is to use a triangle. Cover
              the value you want, and the other two show you how to calculate
              it:
              <ul className="list-disc pl-5 mt-2">
                <li>**Find Voltage (V):** I × R</li>
                <li>**Find Current (I):** V / R</li>
                <li>**Find Resistance (R):** V / I</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What about Power (P)?</AccordionTrigger>
            <AccordionContent>
              Power (in Watts) is the rate of energy use in a circuit. It is
              related to Ohm&apos;s Law by formulas like `P = V × I`. Our
              calculator can also solve for power.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Why is Ohm&apos;s Law important?
            </AccordionTrigger>
            <AccordionContent>
              This law is essential for designing and troubleshooting circuits.
              It helps engineers choose the right parts, manage current safely,
              and find problems.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
