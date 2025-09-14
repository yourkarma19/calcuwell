"use client";

import { useMemo } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePersistentState from "@/hooks/use-persistent-state";
import { AlertCircle } from "lucide-react";
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
      name: "How do you add and subtract fractions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To add or subtract fractions, you must first find a common denominator. This calculator does this automatically. Once they share a denominator, you simply add or subtract the numerators. For example, 1/2 + 1/3 becomes 3/6 + 2/6, which equals 5/6.",
      },
    },
    {
      "@type": "Question",
      name: "How do you multiply and divide fractions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Multiplying fractions is straightforward: multiply the numerators together and the denominators together. To divide, you invert the second fraction (find its reciprocal) and then multiply.",
      },
    },
    {
      "@type": "Question",
      name: "How do you simplify a fraction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To simplify a fraction, you find the greatest common divisor (GCD) of the numerator and the denominator, and then divide both by the GCD. For example, the GCD of 12 and 18 is 6, so 12/18 simplifies to 2/3.",
      },
    },
  ],
};


// Helper function to find the greatest common divisor
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

export default function FractionCalculator() {
  const [num1, setNum1] = usePersistentState("frac-num1", 1);
  const [den1, setDen1] = usePersistentState("frac-den1", 2);
  const [num2, setNum2] = usePersistentState("frac-num2", 3);
  const [den2, setDen2] = usePersistentState("frac-den2", 4);
  const [operator, setOperator] = usePersistentState<"+" | "-" | "*" | "/">(
    "frac-op",
    "+",
  );

  const { result, error } = useMemo(() => {
    const n1 = Number(num1);
    const d1 = Number(den1);
    const n2 = Number(num2);
    const d2 = Number(den2);

    if (d1 === 0 || d2 === 0) {
      return { result: null, error: "Denominator cannot be zero." };
    }

    let resN: number, resD: number;

    switch (operator) {
      case "+":
        [resN, resD] = [n1 * d2 + n2 * d1, d1 * d2];
        break;
      case "-":
        [resN, resD] = [n1 * d2 - n2 * d1, d1 * d2];
        break;
      case "*":
        [resN, resD] = [n1 * n2, d1 * d2];
        break;
      case "/":
        if (n2 === 0) {
          return { result: null, error: "Cannot divide by zero." };
        }
        [resN, resD] = [n1 * d2, d1 * n2];
        break;
      default:
        return { result: null, error: "Invalid operator." };
    }

    if (resD === 0) {
      return { result: null, error: "Result has a zero denominator." };
    }

    const commonDivisor = gcd(Math.abs(resN), Math.abs(resD));
    const simplifiedNum = resN / commonDivisor;
    const simplifiedDen = resD / commonDivisor;

    return {
      result: { num: simplifiedNum, den: simplifiedDen },
      error: null,
    };
  }, [num1, den1, num2, den2, operator]);

  const FractionInput = ({
    num,
    den,
    onNumChange,
    onDenChange,
    label,
  }: {
    num: number;
    den: number;
    onNumChange: (v: number) => void;
    onDenChange: (v: number) => void;
    label: string;
  }) => (
    <div className="flex flex-col items-center gap-1">
      <Label>{label}</Label>
      <Input
        type="number"
        value={num}
        onChange={(e) => onNumChange(Number(e.target.value))}
        className="w-24 text-center"
        aria-label={`${label} Numerator`}
      />
      <div className="h-[2px] w-full bg-foreground" />
      <Input
        type="number"
        value={den}
        onChange={(e) => onDenChange(Number(e.target.value))}
        className="w-24 text-center"
        aria-label={`${label} Denominator`}
      />
    </div>
  );

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fraction Calculator</CardTitle>
          <CardDescription>
            Perform arithmetic operations (add, subtract, multiply, divide) on
            two fractions. The result is automatically simplified.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <FractionInput
              num={num1}
              den={den1}
              onNumChange={setNum1}
              onDenChange={setDen1}
              label="Fraction 1"
            />

            <div className="flex flex-col items-center">
              <Label>Operator</Label>
              <Select
                value={operator}
                onValueChange={(v: "+" | "-" | "*" | "/") => setOperator(v)}
              >
                <SelectTrigger
                  className="w-20 text-2xl font-bold mt-1"
                  aria-label="Select Operator"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+">+</SelectItem>
                  <SelectItem value="-">-</SelectItem>
                  <SelectItem value="*">×</SelectItem>
                  <SelectItem value="/">÷</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <FractionInput
              num={num2}
              den={den2}
              onNumChange={setNum2}
              onDenChange={setDen2}
              label="Fraction 2"
            />
          </div>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="pt-4 text-center" aria-live="polite">
            <h3 className="text-muted-foreground font-semibold">Result</h3>
            <div className="flex items-center justify-center gap-4 text-4xl font-bold">
              {result && (
                <>
                  {result.den === 1 || result.den === 0 ? (
                    <p className="text-primary font-headline">{result.num}</p>
                  ) : (
                    <div className="inline-flex flex-col items-center">
                      <span className="text-primary font-headline">
                        {result.num}
                      </span>
                      <div className="h-[3px] w-full bg-primary" />
                      <span className="text-primary font-headline">
                        {result.den}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8">
        <Card>
      <CardHeader>
        <CardTitle as="h2">About the Fraction Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
         <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our **Fraction Calculator** simplifies arithmetic with fractions. It
          handles addition, subtraction, multiplication, and division for both
          proper and improper fractions, and provides the result in its simplest
          form. This tool is perfect for students learning fractions or for anyone
          who needs to perform quick calculations.
        </p>

        <h3>How to Use the Calculator</h3>
        <ol>
          <li>Enter the numerator and denominator for the first fraction.</li>
          <li>Select the desired arithmetic operator (+, -, ×, ÷).</li>
          <li>Enter the numerator and denominator for the second fraction.</li>
        </ol>
        <p>
          The calculator will instantly compute the result and display it in its
          simplest form.
        </p>

        <h3>Fraction Arithmetic FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How do you add and subtract fractions?
            </AccordionTrigger>
            <AccordionContent>
              To add or subtract fractions, you must first find a common
              denominator. This calculator does this automatically. Once they
              share a denominator, you simply add or subtract the numerators. For
              example, 1/2 + 1/3 becomes 3/6 + 2/6, which equals 5/6.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How do you multiply and divide fractions?
            </AccordionTrigger>
            <AccordionContent>
              Multiplying fractions is straightforward: multiply the numerators
              together and the denominators together. To divide, you invert the
              second fraction (find its reciprocal) and then multiply.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How do you simplify a fraction?</AccordionTrigger>
            <AccordionContent>
              To simplify a fraction, you find the greatest common divisor (GCD)
              of the numerator and the denominator, and then divide both by the
              GCD. For example, the GCD of 12 and 18 is 6, so 12/18 simplifies to
              2/3.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
      </div>
    </div>
  );
}
