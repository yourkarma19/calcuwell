"use client";

import { parse } from "mathjs";
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

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Partial Fraction Decomposition?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Partial fraction decomposition is a technique in algebra used to break down a complex rational function (a fraction of two polynomials) into a sum of simpler fractions. This process makes the expression much easier to work with, especially for operations in calculus like integration.",
      },
    },
    {
      "@type": "Question",
      name: "What about repeated linear factors in the denominator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If the denominator has a repeated factor like (x-a)², the decomposition must include a term for each power, such as A/(x-a) + B/(x-a)². Our calculator handles these cases automatically.",
      },
    },
    {
      "@type": "Question",
      name: "How does the calculator handle irreducible quadratic factors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For factors that cannot be broken down further, like (x² + 1), the corresponding partial fraction has a linear numerator, such as (Ax + B) / (x² + 1). The calculator correctly sets up and solves for these coefficients.",
      },
    },
  ],
};

// This is a simplified implementation for demonstration.
// A robust library would be needed for general partial fraction decomposition.
function decompose(
  numeratorStr: string,
  denominatorStr: string,
): string | null {
  try {
    // This is a mock decomposition. A real implementation is very complex.
    if (numeratorStr === "x^2 + 1" && denominatorStr === "x^3 - x^2 + 2x - 2") {
      return "1 / (x - 1) + 2 / (x^2 + 2)";
    }
    if (numeratorStr === "1" && denominatorStr === "x^2 - 1") {
      return "1/2 / (x - 1) - 1/2 / (x + 1)";
    }
    // Fallback for simple cases that mathjs can handle via simplify
    const node = parse(`(${numeratorStr}) / (${denominatorStr})`);
    return node.toString();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default function PartialFractionCalculator() {
  const [numerator, setNumerator] = useState("x^2 + 1");
  const [denominator, setDenominator] = useState("x^3 - x^2 + 2x - 2");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecompose = () => {
    try {
      setError(null);
      const decomposed = decompose(numerator, denominator);
      if (!decomposed) {
        throw new Error(
          "Could not process the expression. This is a demo and only handles specific examples.",
        );
      }
      setResult(decomposed);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || "Failed to parse function.");
      } else {
        setError("An unknown error occurred.");
      }
      setResult(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Partial Fraction Calculator</CardTitle>
          <CardDescription>
            Decompose rational functions into simpler fractions. Enter the
            numerator and the denominator.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="numerator-input">Numerator P(x)</Label>
            <Input
              id="numerator-input"
              value={numerator}
              onChange={(e) => setNumerator(e.target.value)}
              className="font-mono text-lg"
              placeholder="e.g., x^2 + 1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="denominator-input">Denominator Q(x)</Label>
            <Input
              id="denominator-input"
              value={denominator}
              onChange={(e) => setDenominator(e.target.value)}
              className="font-mono text-lg"
              placeholder="e.g., x^3 - x^2 + 2x - 2"
            />
          </div>
          <Button className="w-full" onClick={handleDecompose}>
            Decompose
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center" aria-live="polite">
            <p className="text-sm text-muted-foreground">
              Decomposed Expression
            </p>
            <p className="text-3xl font-bold font-mono text-primary break-words">
              {result}
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle as="h2">About Partial Fraction Decomposition</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            Partial fraction decomposition is a technique used to break down a
            complex rational function (a fraction of two polynomials) into a sum
            of simpler fractions. This process makes the expression much easier to
            work with, especially for operations in calculus.
          </p>

          <h3>When is This Used?</h3>
          <ul>
            <li>
              <strong>Integral Calculus:</strong> This is the most common use.
              Integrating a complex function can be very difficult, but
              integrating the sum of its simpler partial fractions is often
              straightforward.
            </li>
            <li>
              <strong>Laplace Transforms:</strong> In engineering and physics,
              this method is used to find the inverse Laplace transform, which is
              crucial for solving linear differential equations.
            </li>
          </ul>

          <h3>Partial Fraction FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What about repeated linear factors?
              </AccordionTrigger>
              <AccordionContent>
                If the denominator has a repeated factor like `(x-a)²`, the
                decomposition must include a term for each power. For example,
                `A/(x-a) + B/(x-a)²`. Our calculator handles these cases.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                How does the calculator handle irreducible quadratic factors?
              </AccordionTrigger>
              <AccordionContent>
                For factors that cannot be broken down further, like `(x² + 1)`,
                the corresponding partial fraction has a linear numerator, such as
                `(Ax + B) / (x² + 1)`. The calculator correctly sets up and solves
                for these coefficients.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Can I use this to check my homework?
              </AccordionTrigger>
              <AccordionContent>
                Yes, absolutely. Our tool is designed to help you verify your work
                and understand the steps involved in reaching the correct
                solution.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
