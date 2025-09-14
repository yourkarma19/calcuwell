"use client";

import { derivative, parse } from "mathjs";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FAQPage, WithContext } from "schema-dts";
import { cn } from "@/lib/utils";

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

export default function TangentLineCalculator() {
  const [funcStr, setFuncStr] = useState("x^2");
  const [point, setPoint] = useState(2);
  const [solution, setSolution] = useState<{
    equation: string;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSolve = () => {
    try {
      setError(null);
      const node = parse(funcStr);
      const f = node.compile();

      const fPrime = derivative(node, "x");
      const fPrimeCompiled = fPrime.compile();

      const yValue = f.evaluate({ x: point });
      const slope = fPrimeCompiled.evaluate({ x: point });

      if (!isFinite(yValue) || !isFinite(slope)) {
        throw new Error(
          "Result is not a finite number. Check function and point.",
        );
      }

      const b = yValue - slope * point;
      const sign = b < 0 ? "-" : "+";

      const equation = `y = ${slope.toFixed(4).replace(/\.?0+$/, "")}x ${sign} ${Math.abs(
        b,
      )
        .toFixed(4)
        .replace(/\.?0+$/, "")}`;

      setSolution({
        equation: equation.replace(/\.0000/g, ""),
        steps: [
          `1. Original function: f(x) = ${node.toString()}`,
          `2. Derivative: f'(x) = ${fPrime.toString()}`,
          `3. Evaluate y at x=${point}: f(${point}) = ${yValue.toFixed(4).replace(/\.?0+$/, "")}`,
          `4. Evaluate slope at x=${point}: f'(${point}) = ${slope.toFixed(4).replace(/\.?0+$/, "")}`,
          `5. Use point-slope form y - y₁ = m(x - x₁): y - ${yValue.toFixed(4).replace(/\.?0+$/, "")} = ${slope.toFixed(4).replace(/\.?0+$/, "")}(x - ${point})`,
          `6. Simplify to y = mx + b: ${equation}`,
        ],
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || "Failed to parse function.");
      } else {
        setError("An unknown error occurred.");
      }
      setSolution(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tangent Line Calculator</CardTitle>
          <CardDescription>
            Find the equation of a line tangent to a function at a specific
            point.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="function">Function f(x)</Label>
              <Input
                id="function"
                value={funcStr}
                onChange={(e) => setFuncStr(e.target.value)}
                placeholder="e.g., x^2"
                className="font-mono text-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="point">Point x =</Label>
              <Input
                id="point"
                type="number"
                value={point}
                onChange={(e) => setPoint(Number(e.target.value))}
              />
            </div>
          </div>
          <Button className={cn("w-full", "btn-glossy")} onClick={handleSolve}>
            Find Tangent Line
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {solution && (
        <Card>
          <CardHeader>
            <CardTitle>Solution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" aria-live="polite">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Tangent Line Equation
              </p>
              <p className="text-3xl font-bold font-mono text-primary break-words">
                {solution.equation}
              </p>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="steps">
                <AccordionTrigger>Show Steps</AccordionTrigger>
                <AccordionContent>
                  <div className="prose prose-sm dark:prose-invert max-w-none font-mono">
                    <ol className="list-decimal pl-5 space-y-2">
                      {solution.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}
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
    </div>
  );
}
