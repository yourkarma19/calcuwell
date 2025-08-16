
"use client";

import { useState, useMemo, useEffect } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { percentageOf, isWhatPercentageOf, percentageChange } from "@/lib/math/percentage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

type CalculationMode = "percentOf" | "isWhatPercent" | "percentageChange";

const formulas = {
    percentOf: "(Percentage / 100) * BaseValue",
    isWhatPercent: "(Part / Whole) * 100",
    percentageChange: "((Final - Initial) / Initial) * 100"
}

interface PercentageCalculatorProps {
  setFormula: (formula: string) => void;
}

export default function PercentageCalculator({ setFormula }: PercentageCalculatorProps) {
  const [mode, setMode] = usePersistentState<CalculationMode>(
    "percentage-mode",
    "percentOf"
  );
  const [valA, setValA] = usePersistentState("percentage-valA", 10);
  const [valB, setValB] = usePersistentState("percentage-valB", 50);
  
  useEffect(() => {
    setFormula(formulas[mode]);
  }, [mode, setFormula]);

  const result = useMemo(() => {
    const a = Number(valA);
    const b = Number(valB);

    if (isNaN(a) || isNaN(b)) return null;

    try {
      switch (mode) {
        case "percentOf":
          return percentageOf(a, b);
        case "isWhatPercent":
          return isWhatPercentageOf(a, b);
        case "percentageChange":
          return percentageChange(a, b);
        default:
          return null;
      }
    } catch (error) {
      return null;
    }
  }, [mode, valA, valB]);

  const renderInputs = () => {
    switch (mode) {
      case "percentOf":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
              <Label htmlFor="input-a">What is</Label>
              <div className="flex items-center">
                <Input data-testid="input-a" id="input-a" type="number" value={valA} onChange={(e) => setValA(Number(e.target.value))} placeholder="e.g. 10" className="rounded-r-none" />
                <span className="bg-muted text-muted-foreground h-10 flex items-center px-3 border border-input border-l-0 rounded-r-md">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-b">of</Label>
              <Input data-testid="input-b" id="input-b" type="number" value={valB} onChange={(e) => setValB(Number(e.target.value))} placeholder="e.g. 50" />
            </div>
          </div>
        );
      case "isWhatPercent":
        return (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="input-a">This value</Label>
              <Input data-testid="input-a" id="input-a" type="number" value={valA} onChange={(e) => setValA(Number(e.target.value))} placeholder="e.g. 5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-b">is what percent of</Label>
              <Input data-testid="input-b" id="input-b" type="number" value={valB} onChange={(e) => setValB(Number(e.target.value))} placeholder="e.g. 50" />
            </div>
          </div>
        );
      case "percentageChange":
        return (
          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-2">
                <Label htmlFor="input-a">From</Label>
                <Input data-testid="input-a" id="input-a" type="number" value={valA} onChange={(e) => setValA(Number(e.target.value))} placeholder="e.g. 100" />
            </div>
            <ArrowRight className="text-muted-foreground mt-7" />
            <div className="flex-1 space-y-2">
                <Label htmlFor="input-b">To</Label>
                <Input data-testid="input-b" id="input-b" type="number" value={valB} onChange={(e) => setValB(Number(e.target.value))} placeholder="e.g. 120" />
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
      case "percentageChange":
        const changeType = result > 0 ? "Increase" : "Decrease";
        return `Percentage ${changeType}`;
    }
  };
  
  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Percentage Calculator</CardTitle>
          <CardDescription>A versatile tool for calculating percentages in various scenarios.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Calculation Mode</Label>
            <Select value={mode} onValueChange={(v) => setMode(v as CalculationMode)}>
              <SelectTrigger data-testid="mode-select-trigger">
                <SelectValue placeholder="Select calculation mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentOf">What is X% of Y?</SelectItem>
                <SelectItem value="isWhatPercent">X is what percent of Y?</SelectItem>
                <SelectItem value="percentageChange">Percentage change from X to Y</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 pt-4">
            {renderInputs()}
          </div>
          <div className="pt-4 text-center">
            <h3 className="text-lg font-semibold">Result</h3>
            {result !== null ? (
                <>
                <p data-testid="result-label" className="text-sm text-muted-foreground">{getResultLabel()}</p>
                <p data-testid="result-value" className="text-5xl font-bold font-headline text-primary my-1">
                    {Math.abs(result).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    {(mode === "isWhatPercent" || mode === "percentageChange") && <span className="text-3xl">%</span>}
                </p>
                </>
            ) : (
                <p className="text-xl text-muted-foreground">Enter valid values to calculate</p>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>About the Percentage Calculator</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Three Types of Percentage Problems</AccordionTrigger>
                    <AccordionContent>
                        This calculator can solve three main types of percentage problems: finding the percentage of a number (e.g., What is 20% of 50?), finding what percentage one number is of another (e.g., 10 is what percent of 50?), and calculating the percentage increase or decrease from one number to another.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How to Calculate Percentage Manually</AccordionTrigger>
                    <AccordionContent>
                        To find the percentage of a number, convert the percentage to a decimal (by dividing by 100) and multiply it by the number. For example, to find 25% of 200, you would calculate `0.25 * 200 = 50`.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Real-World Examples</AccordionTrigger>
                    <AccordionContent>
                        Percentages are used everywhere! Use this tool to quickly calculate a 15% tip on a restaurant bill, figure out a 30% discount on a sale item, or determine the sales tax on a purchase.
                    </AccordionContent>
                </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do you calculate a reverse percentage?</AccordionTrigger>
                    <AccordionContent>
                        To find the original amount before a percentage was added, you can use the formula: `Original Amount = Final Amount / (1 + (Percentage / 100))`. For example, if an item costs ₹110 after a 10% tax, the original price was `110 / (1 + 0.10) = 100`.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
