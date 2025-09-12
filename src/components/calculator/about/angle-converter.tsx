
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
      name: "What are degrees and radians?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Degrees (°) are the most common unit for measuring angles, with a full circle containing 360°. Radians (rad) are the standard unit in mathematics, with a full circle containing 2π radians. One radian is the angle where the arc length equals the radius.",
      },
    },
    {
      "@type": "Question",
      name: "Why do mathematicians prefer radians?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Radians are preferred in higher-level mathematics because they simplify many important formulas in calculus and trigonometry, creating more natural and elegant equations.",
      },
    },
    {
      "@type": "Question",
      name: "What is the conversion formula?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The conversion is based on 180° = π radians. To convert degrees to radians: Radians = Degrees × (π / 180). To convert radians to degrees: Degrees = Radians × (180 / π).",
      },
    },
  ],
};

export default function AboutAngleConverter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Angle Converter</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Angle Converter is a simple tool for students, engineers, and
          scientists. It helps you switch between the two most common units for
          angles: <strong>degrees</strong> and <strong>radians</strong>. This tool
          gives you instant, accurate conversions and helps prevent errors in
          your work.
        </p>

        <h3>How to Use the Angle Converter</h3>
        <p>
          Enter a value in either the "Degrees" or "Radians" field. The other
          field will update automatically. Use the swap button to easily
          reverse the conversion.
        </p>

        <h3>Angle Converter FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What are degrees and radians?</AccordionTrigger>
            <AccordionContent>
              <p>
                <strong>Degrees (°)</strong> are the common unit for measuring
                angles, with a full circle having 360°. Each degree is just
                1/360th of a full turn.
              </p>
              <p>
                <strong>Radians (rad)</strong> are the standard unit in math and
                physics. A full circle has 2π radians. One radian is the angle
                at the center of a circle where the arc's length equals the
                circle's radius.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Why do mathematicians and physicists use radians?
            </AccordionTrigger>
            <AccordionContent>
              Radians are preferred in higher-level math because they make many
              formulas in calculus and trigonometry simpler and cleaner.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is the conversion formula?</AccordionTrigger>
            <AccordionContent>
              <p>The conversion is based on the rule that 180° = π radians.</p>
              <ul className="list-disc pl-5">
                <li>
                  To convert from degrees to radians: `Radians = Degrees × (π /
                  180)`
                </li>
                <li>
                  To convert from radians to degrees: `Degrees = Radians × (180
                  / π)`
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
