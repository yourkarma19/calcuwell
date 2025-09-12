
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
      name: "How to Read a 4-Band Resistor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hold the resistor with the tolerance band (gold or silver) on the right. The first two bands are the first two digits of the resistance value. The third band is the multiplier (a power of 10). The fourth band is the tolerance.",
      },
    },
    {
      "@type": "Question",
      name: "What is Tolerance in a Resistor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tolerance indicates how accurate a resistor's value is. For example, a 100 Ω resistor with a 5% tolerance could have a real value between 95 Ω and 105 Ω. A smaller tolerance means the resistor is more precise.",
      },
    },
    {
      "@type": "Question",
      name: "What if there are 5 or 6 bands on the resistor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 5-band resistor adds a third digit for more precision (first three bands are digits). A 6-band resistor adds a final band that indicates the temperature coefficient, which describes how the resistance changes with temperature.",
      },
    },
  ],
};

export default function AboutResistorColorCodeCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Resistor Color Code Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The <strong>Resistor Color Code Calculator</strong> helps you figure
          out the value of a resistor by reading its colored bands. This is a
          key tool for anyone working with electronics. It lets you find a
          resistor's value without needing a multimeter. This calculator is for
          common 4-band resistors.
        </p>
        <h3>How to Use the Resistor Color Code Calculator</h3>
        <ol>
          <li>
            Hold the resistor with the gold or silver band on the right side.
            Read the colors from left to right.
          </li>
          <li>
            Select the color for each of the four bands from the dropdown menus.
          </li>
        </ol>
        <p>
          The calculator will instantly show the resistor's value in Ohms (Ω)
          and its tolerance.
        </p>
        <h3>Resistor Color Code FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How to Read a 4-Band Resistor</AccordionTrigger>
            <AccordionContent>
              The first two bands give you the first two digits of the
              resistance value. The third band is the multiplier. The last band
              shows the tolerance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is Tolerance?</AccordionTrigger>
            <AccordionContent>
              Tolerance tells you how accurate a resistor's value is. For
              example, a 100 Ω resistor with a 5% tolerance could have a real
              value between 95 Ω and 105 Ω.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What if there are 5 or 6 bands?</AccordionTrigger>
            <AccordionContent>
              A 5-band resistor adds a third digit for more precision. A 6-band
              resistor adds a final band that shows how the resistance changes
              with temperature.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
