"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useEffect } from "react";
import ExportShareControls from "./export-share-controls";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import usePersistentState from "@/hooks/use-persistent-state";
import {
  calculateEMI,
  calculateEMIWithExtraPayments,
} from "@/lib/math/loan-emi";

import type { FAQPage, WithContext } from "schema-dts";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const LoanBreakdownChart = dynamic(
  () =>
    import("@/components/charts/loan-breakdown-chart").then(
      (mod) => mod.LoanBreakdownChart,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[250px]" />,
  },
);

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the formula for calculating EMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formula used to calculate EMI is: EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ - 1), where P is the Principal, r is the monthly interest rate, and n is the number of monthly installments.",
      },
    },
    {
      "@type": "Question",
      name: "How can I reduce my EMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can reduce your EMI by choosing a longer tenure, but this means you pay more in total interest. The best ways to lower your loan burden are to make a larger down payment, find a lower interest rate, or make prepayments.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I use an EMI Calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It helps you plan your budget, avoid financial stress by choosing an EMI you can afford, compare loans from different banks, and understand the real cost of borrowing money over time.",
      },
    },
  ],
};

function formatCurrency(
  value: number,
  currency: string = "INR",
  locale: string = "en-IN",
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function LoanEMICalculator({
  calculatorName,
}: {
  calculatorName: string;
}) {
  const searchParams = useSearchParams();
  const [principal, setPrincipal] = usePersistentState(
    "loan-principal",
    500000,
  );
  const [rate, setRate] = usePersistentState("loan-rate", 8.5);
  const [tenure, setTenure] = usePersistentState("loan-tenure", 5);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = usePersistentState(
    "loan-extra-monthly",
    0,
  );
  const [extraYearlyPayment, setExtraYearlyPayment] = usePersistentState(
    "loan-extra-yearly",
    0,
  );

  useEffect(() => {
    const p = searchParams.get("principal");
    const r = searchParams.get("rate");
    const t = searchParams.get("tenure");
    if (p) setPrincipal(parseFloat(p));
    if (r) setRate(parseFloat(r));
    if (t) setTenure(parseFloat(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const { emi, totalPayable, totalInterest } = useMemo(() => {
    return calculateEMI(principal, rate, tenure);
  }, [principal, rate, tenure]);

  const { newTotalMonths, interestSaved, timeSaved } = useMemo(() => {
    if (extraMonthlyPayment > 0 || extraYearlyPayment > 0) {
      return calculateEMIWithExtraPayments(
        principal,
        rate,
        tenure,
        extraMonthlyPayment,
        extraYearlyPayment,
      );
    }
    return {
      newTotalInterest: 0,
      newTotalMonths: 0,
      interestSaved: 0,
      timeSaved: { years: 0, months: 0 },
    };
  }, [principal, rate, tenure, extraMonthlyPayment, extraYearlyPayment]);

  const formatTime = (totalMonths: number) => {
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    return `${years} yr, ${months} mo`;
  };

  const shareParams = {
    principal: principal.toString(),
    rate: rate.toString(),
    tenure: tenure.toString(),
  };

  return (
    <div className="space-y-6">
      <Card id="loan-emi-inputs">
        <CardHeader>
          <CardTitle>Enter Loan Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="principal">Loan Amount</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="principal"
                aria-label="Loan Amount"
                value={[principal]}
                onValueChange={(value) => setPrincipal(value[0])}
                min={10000}
                max={10000000}
                step={10000}
              />
              <Input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-32"
                step="10000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate">Interest Rate (% p.a.)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="rate"
                aria-label="Interest Rate"
                value={[rate]}
                onValueChange={(value) => setRate(value[0])}
                min={0}
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
            <Label htmlFor="tenure">Loan Tenure (Years)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="tenure"
                aria-label="Loan Tenure"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="extra-monthly">
                Extra Monthly Payment (Optional)
              </Label>
              <Input
                type="number"
                id="extra-monthly"
                value={extraMonthlyPayment}
                onChange={(e) => setExtraMonthlyPayment(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="extra-yearly">
                Extra Yearly Payment (Optional)
              </Label>
              <Input
                type="number"
                id="extra-yearly"
                value={extraYearlyPayment}
                onChange={(e) => setExtraYearlyPayment(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div role="status" aria-live="polite">
        <Card id="loan-emi-results">
          <CardHeader>
            <CardTitle>Your Loan EMI</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Monthly EMI</p>
              <p className="text-4xl font-bold font-headline text-primary">
                {formatCurrency(emi)}
              </p>
            </div>
            <div className="space-y-2 text-sm text-left border-t pt-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Principal Amount:</span>
                <span className="font-semibold">
                  {formatCurrency(principal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Interest:</span>
                <span className="font-semibold">
                  {formatCurrency(totalInterest)}
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-muted-foreground">Total Payable:</span>
                <span className="font-semibold">
                  {formatCurrency(totalPayable)}
                </span>
              </div>
            </div>
            {(extraMonthlyPayment > 0 || extraYearlyPayment > 0) &&
              interestSaved > 0 && (
                <div
                  className="space-y-2 text-sm text-left border-t pt-4 mt-4"
                  aria-live="polite"
                >
                  <p className="font-bold text-center text-primary">
                    With Extra Payments
                  </p>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      New Loan Term:
                    </span>
                    <span className="font-semibold">
                      {formatTime(newTotalMonths)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Saved:</span>
                    <span className="font-semibold">
                      {timeSaved.years} yr, {timeSaved.months} mo
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-green-600 dark:text-green-400">
                    <span className="text-muted-foreground">
                      Interest Saved:
                    </span>
                    <span className="font-semibold">
                      {formatCurrency(interestSaved)}
                    </span>
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      </div>
      
       <div className="space-y-6 mt-8">
        {principal > 0 && totalInterest > 0 && (
            <Card>
            <CardHeader>
                <CardTitle as="h3">Loan Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="w-full h-[250px]">
                <LoanBreakdownChart
                    principal={principal}
                    totalInterest={totalInterest}
                />
                </div>
            </CardContent>
            </Card>
        )}
        <Card>
            <CardHeader>
            <CardTitle as="h2">About the EMI Calculator</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <p>
                Our EMI Calculator helps you find your Equated Monthly Installments
                (EMI). Knowing your EMI in advance allows you to plan your finances
                better. By entering the loan amount, interest rate, and tenure, you
                can instantly get your monthly payment and total loan cost.
            </p>

            <h3>How to Use the EMI Calculator</h3>
            <ol>
                <li>Enter the **Loan Amount** you wish to borrow.</li>
                <li>Input the **Annual Interest Rate**.</li>
                <li>Select the **Loan Tenure** (in years).</li>
                <li>
                (Optional) Add extra payments to see how it reduces your loan
                duration and saves you money.
                </li>
            </ol>

            <h3>EMI FAQs</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold">
                    What is the formula for calculating EMI?
                </AccordionTrigger>
                <AccordionContent>
                    <p>The formula to calculate EMI is:</p>
                    <p className="font-mono bg-muted p-2 rounded-md text-center my-2">
                    EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ - 1)
                    </p>
                    <p>
                    Where: <strong>P</strong> is the Principal Loan Amount,{" "}
                    <strong>r</strong> is the monthly interest rate, and{" "}
                    <strong>n</strong> is the number of monthly installments.
                    </p>
                </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                <AccordionTrigger className="font-semibold">
                    How can I reduce my EMI?
                </AccordionTrigger>
                <AccordionContent>
                    <p>
                    You can reduce your EMI by choosing a longer tenure, but this
                    means you pay more in total interest. The best ways to lower
                    your loan burden are to make a larger down payment, find a
                    lower interest rate, or make prepayments.
                    </p>
                </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                <AccordionTrigger className="font-semibold">
                    Why use an EMI Calculator?
                </AccordionTrigger>
                <AccordionContent>
                    <p>
                    It helps you plan your budget, avoid financial stress, compare
                    loans from different banks, and understand the real cost of
                    borrowing money.
                    </p>
                </AccordionContent>
                </AccordionItem>
            </Accordion>
            </CardContent>
        </Card>

      </div>
      <ExportShareControls
        elementIds={["loan-emi-inputs", "loan-emi-results"]}
        shareParams={shareParams}
        calculatorName={calculatorName}
      />
    </div>
  );
}
