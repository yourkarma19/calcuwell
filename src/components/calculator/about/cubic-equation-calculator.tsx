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
      name: "What are the 'roots' of a cubic equation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The roots of an equation are the values of 'x' that make the equation true. A cubic equation always has three roots. These can be all real numbers, or one real number and two complex conjugate numbers.",
      },
    },
    {
      "@type": "Question",
      name: "What is the discriminant of a cubic equation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The discriminant's sign determines the nature of the roots. If positive, there is one real root and two complex roots. If zero, there are three real roots with at least two being equal. If negative, there are three distinct real roots.",
      },
    },
    {
      "@type": "Question",
      name: "Why are cubic equations important?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cubic equations are used in science and engineering to model various physical phenomena, such as the volume of materials, thermodynamic properties, and fluid dynamics.",
      },
    },
  ],
};

export default function AboutCubicEquationCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Cubic Equation Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          This tool solves any cubic equation of the form `ax³ + bx² + cx + d =
          0`. It finds all three roots, which can be real or complex numbers. It
          is a useful resource for students in algebra and calculus, as well as
          for engineers and scientists.
        </p>
        <h3>How to Use the Cubic Equation Calculator</h3>
        <ol>
          <li>Enter the coefficients `a`, `b`, `c`, and `d`.</li>
          <li>Click the &quot;Solve&quot; button.</li>
          <li>
            The calculator will display the three roots of the equation (`x₁`,
            `x₂`, `x₃`).
          </li>
        </ol>
        <h3>Cubic Equation FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What are the &quot;roots&quot; of an equation?
            </AccordionTrigger>
            <AccordionContent>
              The roots are the values of `x` that make the equation true. A
              cubic equation always has three roots. These can be all real
              numbers, or one real number and two complex numbers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is the discriminant?</AccordionTrigger>
            <AccordionContent>
              The discriminant is a value calculated from the coefficients. Its
              sign determines the nature of the roots. If positive, there is one
              real and two complex roots. If zero, there are three real roots
              with at least two being equal. If negative, there are three
              distinct real roots.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Why are cubic equations important?
            </AccordionTrigger>
            <AccordionContent>
              Cubic equations are used in many areas of science and engineering.
              They model physical phenomena, such as the volume of materials,
              thermodynamic properties, and fluid dynamics.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
