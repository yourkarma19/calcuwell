"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePersistentState from "@/hooks/use-persistent-state";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does an exponent mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An exponent indicates how many times to multiply a number (the base) by itself. For example, in 2⁴, the base is 2 and the exponent is 4. This means 2 × 2 × 2 × 2 = 16.",
      },
    },
    {
      "@type": "Question",
      name: "What about negative exponents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A negative exponent means to take the reciprocal of the base raised to the positive exponent. The formula is x⁻ⁿ = 1 / xⁿ. For example, 2⁻³ is the same as 1 / 2³, which equals 1/8 or 0.125.",
      },
    },
    {
      "@type": "Question",
      name: "What about fractional exponents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A fractional exponent like x¹/ⁿ is another way of writing a root. For example, 9¹/² is the same as the square root of 9 (√9), which is 3. Similarly, 8¹/³ is the cube root of 8 (∛8), which is 2.",
      },
    },
    {
      "@type": "Question",
      name: "What is an exponent of zero?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Any non-zero number raised to the power of zero is equal to 1. For example, 5⁰ = 1. This rule is a fundamental property of exponents.",
      },
    },
  ],
};

export default function ExponentPowerCalculator() {
  const [base, setBase] = usePersistentState("exp-base", 2);
  const [exponent, setExponent] = usePersistentState("exp-exponent", 10);

  const result = useMemo(() => {
    const b = Number(base);
    const exp = Number(exponent);

    if (isNaN(b) || isNaN(exp)) {
      return "Invalid input";
    }

    const res = Math.pow(b, exp);
    if (!isFinite(res)) return "Result too large";

    return res.toLocaleString();
  }, [base, exponent]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Exponent & Power Calculator</CardTitle>
          <CardDescription>
            Calculate the result of a base raised to the power of an exponent.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="base-input">Base (x)</Label>
              <Input
                id="base-input"
                type="number"
                value={base}
                onChange={(e) => setBase(Number(e.target.value))}
                aria-label="Base value"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exponent-input">Exponent (y)</Label>
              <Input
                id="exponent-input"
                type="number"
                value={exponent}
                onChange={(e) => setExponent(Number(e.target.value))}
                aria-label="Exponent value"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent className="text-center" aria-live="polite">
          <p className="text-sm text-muted-foreground">
            {base} ^ {exponent} is:
          </p>
          <p className="text-4xl font-bold font-headline text-primary my-2 break-words">
            {result}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h2">About Exponents & Powers</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The <strong>Exponent & Power Calculator</strong> helps you compute the
            result of a number raised to a certain power. This operation, called
            exponentiation, is essential in many fields, including finance,
            science, and computer science.
          </p>

          <h3>How to Use the Exponent & Power Calculator</h3>
          <ol>
            <li>
              Enter the <strong>Base (x)</strong>, which is the number being
              multiplied.
            </li>
            <li>
              Enter the <strong>Exponent (y)</strong>, which is the number of
              times the base is multiplied by itself.
            </li>
          </ol>
          <p>
            The calculator will instantly display the result of `x` raised to the
            power of `y`.
          </p>

          <h3>Exponent & Power FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What does an exponent mean?</AccordionTrigger>
              <AccordionContent>
                An exponent shows how many times to multiply a number (the base)
                by itself. For example, in 2⁴, the base is 2 and the exponent is
                4. This means you multiply 2 by itself four times: 2 × 2 × 2 × 2 =
                16.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What about negative exponents?</AccordionTrigger>
              <AccordionContent>
                A negative exponent means to take the reciprocal of the base
                raised to the positive exponent. The formula is `x⁻ⁿ = 1 / xⁿ`.
                For example, 2⁻³ is the same as 1 / 2³, which equals 1/8 or 0.125.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What about fractional exponents?
              </AccordionTrigger>
              <AccordionContent>
                A fractional exponent like `x¹/ⁿ` is another way of writing a
                root. For example, `9¹/²` is the same as the square root of 9
                (√9), which is 3. Similarly, `8¹/³` is the cube root of 8 (∛8),
                which is 2.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What is an exponent of zero?</AccordionTrigger>
              <AccordionContent>
                Any non-zero number raised to the power of zero is equal to 1. For
                example, 5⁰ = 1. This rule is a basic property of exponents.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
