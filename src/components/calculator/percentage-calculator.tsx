"use client";

import { ArrowRight } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePersistentState from "@/hooks/use-persistent-state";
import {
  percentageOf,
  isWhatPercentageOf,
  percentageChange,
} from "@/lib/math/percentage";
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
      name: "How do you calculate a percentage of a number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To find a percentage of a number, you convert the percentage to a decimal by dividing it by 100, and then multiply the result by the number. For example, 20% of 50 is calculated as (20 / 100) * 50 = 10.",
      },
    },
    {
      "@type": "Question",
      name: "How do you calculate percentage change?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formula is ((Final Value - Initial Value) / |Initial Value|) * 100. This shows the percent increase or decrease from the first number to the second.",
      },
    },
    {
      "@type": "Question",
      name: "How do you calculate what percentage one number is of another?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To find what percentage number A is of number B, you divide A by B and multiply the result by 100. For example, to find what percentage 5 is of 20, you would calculate (5 / 20) * 100 = 25%.",
      },
    },
  ],
};

function AboutPercentageCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Percentage Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our Percentage Calculator is a versatile tool designed to handle a
          variety of common percentage problems. Whether you need to find a
          percentage of a number, calculate a percentage increase or decrease,
          or determine what percentage one number is of another, this calculator
          provides instant and accurate results. It&apos;s an essential tool for
          students, shoppers, and professionals alike.
        </p>
        <h3>How to Use the Percentage Calculator</h3>
        <ol>
          <li>
            Select the **Calculation Mode** that matches the problem you are
            trying to solve.
          </li>
          <li>Enter your numbers into the appropriate fields.</li>
        </ol>
        <p>The result is calculated and displayed automatically.</p>
        <h3>Frequently Asked Questions (FAQs)</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How do you calculate a percentage of a number?
            </AccordionTrigger>
            <AccordionContent>
              To find a percentage of a number, you convert the percentage to a
              decimal (by dividing by 100) and then multiply it by the number.
              For example, 20% of 50 is `(20 / 100) * 50 = 10`.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How do you calculate percentage change?
            </AccordionTrigger>
            <AccordionContent>
              The formula for percentage change is `((Final Value - Initial
              Value) / |Initial Value|) * 100`. This shows the percent increase
              or decrease from the first number to the second.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How do you calculate what percentage one number is of another?
            </AccordionTrigger>
            <AccordionContent>
              To find what percentage number A is of number B, you divide A by B
              and multiply by 100. For example, to find what percentage 5 is of
              20, you would calculate `(5 / 20) * 100 = 25%`.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

type CalculationMode = "percentOf" | "isWhatPercent" | "percentageChange";

export default function PercentageCalculator() {
  const [mode, setMode] = usePersistentState<CalculationMode>(
    "percentage-mode",
    "percentOf",
  );
  const [valA, setValA] = usePersistentState("percentage-valA", 10);
  const [valB, setValB] = usePersistentState("percentage-valB", 50);

  const result = useMemo(() => {
    const a = Number(valA);
    const b = Number(valB);

    if (isNaN(a) || isNaN(b)) return null;

    try {
      switch (mode) {
        case "percentOf":
          return percentageOf(a, b);
        case "isWhatPercent":
          if (b === 0) return null; // Prevent division by zero
          return isWhatPercentageOf(a, b);
        case "percentageChange":
          if (a === 0) return null; // Prevent division by zero
          return percentageChange(a, b);
        default:
          return null;
      }
    } catch (error) {
      return null;
    }
  }, [mode, valA, valB]);

  const handleModeChange = (newMode: CalculationMode) => {
    setMode(newMode);
    // Reset values to defaults for the new mode to avoid confusion
    if (newMode === "percentOf") {
      setValA(10);
      setValB(50);
    } else if (newMode === "isWhatPercent") {
      setValA(5);
      setValB(50);
    } else if (newMode === "percentageChange") {
      setValA(100);
      setValB(120);
    }
  };

  const renderInputs = () => {
    switch (mode) {
      case "percentOf":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="input-a">What is</Label>
              <div className="flex items-center">
                <Input
                  data-testid="input-a"
                  id="input-a"
                  type="number"
                  value={valA}
                  onChange={(e) => setValA(Number(e.target.value))}
                  placeholder="e.g. 10"
                  className="rounded-r-none"
                  aria-label="Percentage value"
                />
                <span className="bg-muted text-muted-foreground h-10 flex items-center px-3 border border-input border-l-0 rounded-r-md">
                  %
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-b">of</Label>
              <Input
                data-testid="input-b"
                id="input-b"
                type="number"
                value={valB}
                onChange={(e) => setValB(Number(e.target.value))}
                placeholder="e.g. 50"
                aria-label="Base value"
              />
            </div>
          </div>
        );
      case "isWhatPercent":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="input-a">This value</Label>
              <Input
                data-testid="input-a"
                id="input-a"
                type="number"
                value={valA}
                onChange={(e) => setValA(Number(e.target.value))}
                placeholder="e.g. 5"
                aria-label="Part value"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-b">is what percent of</Label>
              <Input
                data-testid="input-b"
                id="input-b"
                type="number"
                value={valB}
                onChange={(e) => setValB(Number(e.target.value))}
                placeholder="e.g. 50"
                aria-label="Total value"
              />
            </div>
          </div>
        );
      case "percentageChange":
        return (
          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="input-a">From</Label>
              <Input
                data-testid="input-a"
                id="input-a"
                type="number"
                value={valA}
                onChange={(e) => setValA(Number(e.target.value))}
                placeholder="e.g. 100"
                aria-label="Initial value"
              />
            </div>
            <ArrowRight className="text-muted-foreground mt-7" />
            <div className="flex-1 space-y-2">
              <Label htmlFor="input-b">To</Label>
              <Input
                data-testid="input-b"
                id="input-b"
                type="number"
                value={valB}
                onChange={(e) => setValB(Number(e.target.value))}
                placeholder="e.g. 120"
                aria-label="Final value"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getResultLabel = () => {
    if (result === null) return "";
    switch (mode) {
      case "percentOf":
        return "Result";
      case "isWhatPercent":
        return "Result (%)";
      case "percentageChange": {
        const changeType = result > 0 ? "Increase" : "Decrease";
        return `Percentage ${changeType}`;
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Percentage Calculator</CardTitle>
          <CardDescription>
            A versatile tool for calculating percentages in various scenarios.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Calculation Mode</Label>
            <Select
              value={mode}
              onValueChange={(v) => handleModeChange(v as CalculationMode)}
            >
              <SelectTrigger data-testid="mode-select-trigger">
                <SelectValue placeholder="Select calculation mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentOf">What is X% of Y?</SelectItem>
                <SelectItem value="isWhatPercent">
                  X is what percent of Y?
                </SelectItem>
                <SelectItem value="percentageChange">
                  Percentage change from X to Y
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 pt-4">{renderInputs()}</div>
          <div
            id="result-container"
            className="pt-4 text-center"
            aria-live="polite"
          >
            <h3 className="text-lg font-semibold">Result</h3>
            {result !== null ? (
              <>
                <p
                  data-testid="result-label"
                  className="text-sm text-muted-foreground"
                >
                  {getResultLabel()}
                </p>
                <p
                  data-testid="result-value"
                  className="text-5xl font-bold font-headline text-primary my-1"
                >
                  {Math.abs(result).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                  {(mode === "isWhatPercent" ||
                    mode === "percentageChange") && (
                    <span className="text-3xl">%</span>
                  )}
                </p>
              </>
            ) : (
              <p className="text-xl text-muted-foreground">
                Enter valid values to calculate
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="mt-8">
        <AboutPercentageCalculator />
      </div>
    </div>
  );
}
