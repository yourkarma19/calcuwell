
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
      name: "What are the different number systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Decimal (Base-10): The system we use every day, with digits 0-9. Binary (Base-2): The fundamental language of computers, using only digits 0 and 1. Hexadecimal (Base-16): Uses digits 0-9 and letters A-F. It's a more compact way to represent binary data. Octal (Base-8): Uses digits 0-7.",
      },
    },
    {
      "@type": "Question",
      name: "Why is hexadecimal used in programming?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hexadecimal is widely used because it's a human-friendly way to represent long binary values. For example, the binary value `11111111` is much easier to read as `FF` in hexadecimal. It's commonly used for memory addresses and color codes.",
      },
    },
  ],
};

export default function AboutBinaryConverter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Number System Converter</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our <strong>Number System Converter</strong> is a key tool for
          programmers, computer science students, and IT professionals. It lets
          you quickly convert between the four most common number systems in
          computing: binary, decimal, hexadecimal, and octal.
        </p>
        <h3>How to Use the Number System Converter</h3>
        <ol>
          <li>Enter a value in the "From" field.</li>
          <li>Select the number system you are converting from.</li>
          <li>Select the target number system you want to convert to.</li>
        </ol>
        <p>
          The result will appear instantly. The calculator checks your input to
          make sure it is valid for the selected base.
        </p>
        <h3>Number System FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What are the different number systems?
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                <strong>Decimal (Base-10):</strong> The system we use every
                day, with digits 0-9.
              </p>
              <p className="mb-2">
                <strong>Binary (Base-2):</strong> The main language of
                computers, using only digits 0 and 1.
              </p>
              <p className="mb-2">
                <strong>Hexadecimal (Base-16):</strong> Uses digits 0-9 and
                letters A-F. It's a shorter way to write binary data.
              </p>
              <p>
                <strong>Octal (Base-8):</strong> Uses digits 0-7. It was more
                common in older computers.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Why is hexadecimal used in programming?
            </AccordionTrigger>
            <AccordionContent>
              Hexadecimal is popular because it's a human-friendly way to show
              long binary values. For example, `11111111` is easier to read as
              `FF`. It's often used for memory addresses and color codes (e.g.,
              `#FF0000` for red).
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
