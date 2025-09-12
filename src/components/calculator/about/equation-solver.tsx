
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
      name: "What is a linear equation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A linear equation is a first-degree equation, meaning the highest power of the variable is 1. This calculator solves linear equations in the standard form `ax + b = c`. The goal is to isolate `x` to find its value. These equations always have exactly one solution and represent a straight line when graphed.",
      },
    },
    {
      "@type": "Question",
      name: "What is a quadratic equation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A quadratic equation is a second-degree equation, of the form `ax² + bx + c = 0`. These equations represent a parabola when graphed and can have two real solutions, one real solution, or no real solutions (but two complex solutions).",
      },
    },
    {
      "@type": "Question",
      name: "What is the quadratic formula?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The quadratic formula is used to solve for `x` in a quadratic equation. The formula is: `x = [-b ± √(b²-4ac)] / 2a`. The part inside the square root, `b²-4ac`, is called the discriminant.",
      },
    },
    {
      "@type": "Question",
      name: "What does the discriminant tell us?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The discriminant (`b²-4ac`) tells you the nature of the roots (solutions) without having to fully solve the equation. If it's positive, there are two distinct real roots. If it's zero, there is exactly one real root. If it's negative, there are no real roots (the solutions are complex numbers).",
      },
    },
  ],
};

export default function AboutEquationSolver() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Equation Solver</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The **Equation Solver** helps you find the solutions to common types
          of equations. It simplifies solving for unknown variables, making it a
          great resource for students and professionals. This calculator can
          handle both linear and quadratic equations.
        </p>

        <h3>How to Use the Equation Solver</h3>
        <ol>
          <li>
            Select the type of equation you want to solve (Linear or Quadratic).
          </li>
          <li>Enter the coefficients (the numbers `a`, `b`, and `c`).</li>
        </ol>
        <p>
          The calculator will instantly show the solution(s) for the variable `x`.
        </p>

        <h3>Equation Solver FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a linear equation?</AccordionTrigger>
            <AccordionContent>
              A linear equation is a first-degree equation. This means the
              highest power of the variable is 1. This calculator solves
              equations in the form `ax + b = c`. The goal is to isolate `x`.
              These equations always have one solution.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is a quadratic equation?</AccordionTrigger>
            <AccordionContent>
              A quadratic equation is a second-degree equation, of the form `ax²
              + bx + c = 0`. These equations represent a parabola when graphed.
              They can have two real solutions, one real solution, or two
              complex solutions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is the quadratic formula?</AccordionTrigger>
            <AccordionContent>
              The quadratic formula solves for `x` in a quadratic equation. The
              formula is: `x = [-b ± √(b²-4ac)] / 2a`. The part inside the
              square root, `b²-4ac`, is called the discriminant.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              What does the discriminant tell us?
            </AccordionTrigger>
            <AccordionContent>
              The discriminant (`b²-4ac`) tells you about the roots (solutions)
              without fully solving the equation.
              <ul className="list-disc pl-5 mt-2">
                <li>If it's positive, there are two distinct real roots.</li>
                <li>If it's zero, there is exactly one real root.</li>
                <li>
                  If it's negative, there are no real roots (the solutions are
                  complex numbers).
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
