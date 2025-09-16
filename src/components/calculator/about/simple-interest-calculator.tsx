
"use client";

import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import usePersistentState from "@/hooks/use-persistent-state";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the formula for simple interest?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formula is I = P × R × T, where I is the interest, P is the principal, R is the annual interest rate in decimal form, and T is the time period in years.",
      },
    },
    {
      "@type": "Question",
      name: "What is the main difference between simple and compound interest?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simple interest is calculated only on the original principal amount. Compound interest is calculated on the principal and also on the accumulated interest from previous periods, leading to exponential growth over time.",
      },
    },
    {
      "@type": "Question",
      name: "When is simple interest typically used?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simple interest is most commonly used for short-term loans or financial products. For example, car loans and some personal loans often use simple interest.",
      },
    },
  ],
};


export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = usePersistentState("si-principal", 100000);
  const [rate, setRate] = usePersistentState("si-rate", 5);
  const [tenure, setTenure] = usePersistentState("si-tenure", 5);

  const { totalInterest, totalAmount } = useMemo(() => {
    if (principal > 0 && rate > 0 && tenure > 0) {
      const interest = (principal * rate * tenure) / 100;
      return {
        totalInterest: interest,
        totalAmount: principal + interest,
      };
    }
    return { totalInterest: 0, totalAmount: 0 };
  }, [principal, rate, tenure]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="principal">Principal Amount</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="principal"
                value={[principal]}
                onValueChange={(value) => setPrincipal(value[0])}
                min={1000}
                max={10000000}
                step={1000}
              />
              <Input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-32"
                step="1000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate">Interest Rate (% p.a.)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="rate"
                value={[rate]}
                onValueChange={(value) => setRate(value[0])}
                min={1}
                max={20}
                step={0.05}
              />
              <Input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-24"
                step="0.05"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenure">Tenure (Years)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="tenure"
                value={[tenure]}
                onValueChange={(value) => setTenure(value[0])}
                min={1}
                max={30}
                step={1}
              />
              <Input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-24"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calculation Result</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Interest</p>
            <p className="text-4xl font-bold font-headline text-primary">
              ₹{" "}
              {totalInterest.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-semibold">
              ₹{" "}
              {totalAmount.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Simple Interest Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The <strong>Simple Interest Calculator</strong> provides a
            straightforward way to determine the interest earned on a principal
            amount. Unlike compound interest, simple interest is calculated only
            on the initial amount (the principal).
          </p>

          <h3>How to Use the Simple Interest Calculator</h3>
          <ol>
            <li>
              Enter the <strong>Principal Amount</strong>.
            </li>
            <li>
              Set the annual <strong>Interest Rate</strong>.
            </li>
            <li>
              Define the <strong>Tenure</strong> in years.
            </li>
          </ol>
          <p>
            The results will instantly show the total interest earned and the
            final amount (principal + interest).
          </p>

          <h3>Simple Interest FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold">
                What is the formula for simple interest?
              </AccordionTrigger>
              <AccordionContent>
                <p>The formula is `I = P × R × T`, where:</p>
                <ul className="list-disc pl-5">
                  <li>
                    <strong>I</strong> is the total interest earned.
                  </li>
                  <li>
                    <strong>P</strong> is the principal amount.
                  </li>
                  <li>
                    <strong>R</strong> is the annual interest rate as a decimal
                    (e.g., 5% = 0.05).
                  </li>
                  <li>
                    <strong>T</strong> is the time period in years.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold">
                Simple vs. Compound Interest: What&apos;s the main difference?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Simple interest is calculated only on the original principal. In
                  contrast, compound interest is calculated on both the principal
                  and the accumulated interest. This means compound interest leads
                  to much faster growth over time.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-semibold">
                When is simple interest typically used?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Simple interest is most common for short-term loans. For
                  example, car loans and some personal loans often use simple
                  interest.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

    </div>
  );
}
