"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
      name: "How does compound interest work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Compound interest is 'interest on interest.' It means that the interest you earn is added back to your principal, and then you earn interest on the new, larger amount. This causes your savings to grow at an accelerating rate over time.",
      },
    },
    {
      "@type": "Question",
      name: "Why are regular contributions so important for saving?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Consistent, regular contributions are the engine of your savings plan. Even small monthly deposits add up to a significant amount over many years. This strategy, known as dollar-cost averaging, helps you build wealth steadily.",
      },
    },
    {
      "@type": "Question",
      name: "What is a realistic interest rate to assume for savings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A realistic rate depends on where you are saving or investing. A high-yield savings account might offer 1-3%, while a diversified stock market portfolio has historically returned an average of 7-10% annually over the long term, though with higher risk. It's often wise to use a conservative estimate for planning.",
      },
    },
  ],
};


export default function SavingsCalculator() {
  const [initialAmount, setInitialAmount] = usePersistentState(
    "savings-initial",
    1000,
  );
  const [monthlyContribution, setMonthlyContribution] = usePersistentState(
    "savings-monthly",
    100,
  );
  const [interestRate, setInterestRate] = usePersistentState("savings-rate", 5);
  const [years, setYears] = usePersistentState("savings-years", 10);

  const { futureValue, totalInterest, totalContributions } = useMemo(() => {
    const P = Number(initialAmount);
    const PMT = Number(monthlyContribution);
    const r = Number(interestRate) / 100;
    const t = Number(years);
    const n = 12; // Compounded monthly

    if (t <= 0)
      return { futureValue: P, totalInterest: 0, totalContributions: 0 };

    const monthlyRate = r / n;
    const totalMonths = t * n;

    const fvPrincipal = P * Math.pow(1 + monthlyRate, totalMonths);
    const fvContributions =
      PMT * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

    const fv = fvPrincipal + fvContributions;
    const totalContributed = P + PMT * totalMonths;
    const interest = fv - totalContributed;

    return {
      futureValue: fv,
      totalInterest: interest,
      totalContributions: totalContributed,
    };
  }, [initialAmount, monthlyContribution, interestRate, years]);

  const formatCurrency = (value: number) =>
    `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Savings Growth Calculator</CardTitle>
          <CardDescription>
            Project the future value of your savings based on your initial
            deposit, contributions, interest rate, and time.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Initial Amount</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[initialAmount]}
                onValueChange={(v) => setInitialAmount(v[0])}
                min={0}
                max={100000}
                step={500}
              />
              <Input
                type="number"
                value={initialAmount}
                onChange={(e) => setInitialAmount(Number(e.target.value))}
                className="w-32"
                step="500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Monthly Contribution</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[monthlyContribution]}
                onValueChange={(v) => setMonthlyContribution(v[0])}
                min={0}
                max={10000}
                step={100}
              />
              <Input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-32"
                step="100"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Annual Interest Rate (%)</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[interestRate]}
                onValueChange={(v) => setInterestRate(v[0])}
                min={0}
                max={20}
                step={0.1}
              />
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-24"
                step="0.1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Investment Duration (Years)</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[years]}
                onValueChange={(v) => setYears(v[0])}
                min={1}
                max={50}
                step={1}
              />
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-24"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Savings Projection</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Future Value</p>
            <p className="text-4xl font-bold font-headline text-primary">
              {formatCurrency(futureValue)}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 text-sm text-left border-t pt-4">
            <div className="flex justify-between">
              <p className="text-muted-foreground">Total Contributions</p>
              <p className="font-semibold">
                {formatCurrency(totalContributions)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-muted-foreground">Total Interest</p>
              <p className="font-semibold">{formatCurrency(totalInterest)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle as="h2">About the Savings Growth Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The Savings Growth Calculator helps you visualize how your savings can
            grow over time. By factoring in your initial deposit, regular
            contributions, and compound interest, this calculator provides a clear
            projection of your financial future.
          </p>
          <h3>How to Use the Savings Calculator</h3>
          <ol>
            <li>Enter your **Initial Amount**.</li>
            <li>Set your planned **Monthly Contribution**.</li>
            <li>Input the estimated **Annual Interest Rate**.</li>
            <li>Choose your **Investment Duration** in years.</li>
          </ol>
          <p>
            The calculator will instantly show the future value of your savings
            and a breakdown of your contributions versus interest earned.
          </p>
          <h3>Savings Calculator FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How does compound interest work?
              </AccordionTrigger>
              <AccordionContent>
                Compound interest is &quot;interest on interest.&quot; The
                interest you earn is added to your principal, and then you earn
                interest on the new, larger amount. This causes your savings to
                grow faster over time. Our{" "}
                <Link
                  href="/calculators/compound-interest-calculator"
                  className="text-primary hover:underline"
                >
                  Compound Interest Calculator
                </Link>{" "}
                can help illustrate this.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Why are regular contributions so important?
              </AccordionTrigger>
              <AccordionContent>
                Consistent, regular contributions are the engine of your savings
                plan. Even small monthly deposits add up to a large amount over
                many years. This strategy helps you build wealth steadily.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What is a realistic interest rate to assume?
              </AccordionTrigger>
              <AccordionContent>
                A realistic rate depends on where you are investing. A high-yield
                savings account might offer 1-3%, while a stock market portfolio
                has historically returned an average of 7-10% annually over the
                long term, though with higher risk. It&apos;s often wise to use a
                conservative estimate.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

    </div>
  );
}
