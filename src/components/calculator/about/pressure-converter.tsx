
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
      name: "What is the standard unit of pressure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The standard SI (International System of Units) unit for pressure is the Pascal (Pa). One pascal is a very small amount of pressure, defined as one newton of force per square meter. Because it's so small, it's often more convenient to use kilopascals (kPa), where 1 kPa = 1,000 Pa.",
      },
    },
    {
      "@type": "Question",
      name: "What are some common pressure units?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bar: One bar is exactly 100,000 Pa and is very close to the average atmospheric pressure on Earth, making it a common unit in meteorology. Atmosphere (atm): A standard atmosphere is defined as exactly 101,325 Pa. It represents the average atmospheric pressure at sea level. PSI (Pounds per square inch): This is the standard unit of pressure in the imperial system, widely used in the United States for applications like measuring tire pressure.",
      },
    },
  ],
};

export default function AboutPressureConverter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Pressure Converter</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Pressure Converter is a tool for scientists, engineers, and
          students who need to work with different units of pressure. Pressure
          is defined as force applied per unit area. This calculator allows you
          to quickly convert between various metric and imperial units.
        </p>
        <h3>How to Use the Pressure Converter</h3>
        <ol>
          <li>Enter the value you wish to convert.</li>
          <li>Select the unit you are converting from (e.g., psi).</li>
          <li>Select the unit you want to convert to (e.g., bar).</li>
        </ol>
        <p>
          The result will be calculated instantly. Use the swap button to
          reverse the conversion.
        </p>
        <h3>Pressure Converter FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What is the standard unit of pressure?
            </AccordionTrigger>
            <AccordionContent>
              The standard SI unit for pressure is the **Pascal (Pa)**. It is a
              very small amount of pressure. It&apos;s often more convenient to use
              **kilopascals (kPa)**, where 1 kPa = 1,000 Pa.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Common Pressure Units Explained</AccordionTrigger>
            <AccordionContent>
              <p>
                **Bar:** One bar is 100,000 Pa and is very close to the
                average atmospheric pressure on Earth.
              </p>
              <p>
                **Atmosphere (atm):** A standard atmosphere is defined as
                101,325 Pa. It represents the average pressure at sea level.
              </p>
              <p>
                **PSI (Pounds per square inch):** This is the standard unit in
                the imperial system, widely used in the United States for
                measuring tire pressure.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
