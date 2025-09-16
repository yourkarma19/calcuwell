
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
      name: "What is a Tangent Line?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A tangent line is a straight line that 'just touches' a curve at a single point and has the same direction (slope) as the curve at that point. The slope of the tangent line is equal to the derivative of the function evaluated at that same point.",
      },
    },
    {
      "@type": "Question",
      name: "How is the tangent line found?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The process involves finding the derivative of the function f'(x), evaluating it at the given point to find the slope, finding the y-coordinate of the point, and then using the point-slope formula y - y₁ = m(x - x₁) to find the equation of the line.",
      },
    },
    {
      "@type": "Question",
      name: "Why is the tangent line important in calculus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Finding the tangent line is a fundamental application of derivatives. The tangent line provides a linear approximation of a function's behavior near a specific point, which is crucial in physics, engineering, and economics.",
      },
    },
  ],
};

export default function AboutTangentLineCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Tangent Line Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          This calculator finds the equation of a line tangent to a function at
          a specific point. The tangent line represents the instantaneous rate
          of change of the function at that exact point. Understanding how to
          find it is a core concept in differential calculus.
        </p>
        <h3>How to Use the Tangent Line Calculator</h3>
        <ol>
          <li>Enter the function `f(x)` you want to analyze.</li>
          <li>Enter the specific point `x` for the tangent line.</li>
          <li>Click &quot;Find Tangent Line&quot;.</li>
        </ol>
        <p>
          The tool will provide the equation of the tangent line and show the
          detailed steps to arrive at the solution.
        </p>

        <h3>Tangent Line FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a Tangent Line?</AccordionTrigger>
            <AccordionContent>
              A tangent line is a straight line that &quot;just touches&quot; a
              curve at a single point. It has the same direction (slope) as the
              curve at that point. The slope of the tangent line is equal to the
              derivative of the function at that same point.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How is the tangent line found?</AccordionTrigger>
            <AccordionContent>
              The process involves a few key steps:
              <ol>
                <li>Find the derivative of the function, `f&apos;(x)`.</li>
                <li>
                  Evaluate the derivative at the given point `x=a` to find the
                  slope `m`.
                </li>
                <li>Find the y-coordinate by calculating `f(a)`.</li>
                <li>
                  Use the point-slope formula `y - y₁ = m(x - x₁)` to find the
                  equation of the line.
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Why is this important in calculus?
            </AccordionTrigger>
            <AccordionContent>
              Finding the tangent line is a fundamental application of
              derivatives. The tangent line provides a linear approximation of a
              function&apos;s behavior near a specific point, which is crucial
              in physics, engineering, and economics.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
