
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

type CalculationMode = "percentOf" | "isWhatPercent" | "percentageChange";

export default function PercentageCalculator() {
  const [mode, setMode] = usePersistentState<CalculationMode>(
    "percentage-mode",
    "percentOf"
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
    <div className="lg:col-span-2 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Percentage Calculator</CardTitle>
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
        </CardContent>
      </Card>
      
      <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center" data-testid="result-container" aria-live="polite">
            {result !== null ? (
              <>
                <p data-testid="result-label" className="text-sm text-muted-foreground">{getResultLabel()}</p>
                <p data-testid="result-value" className="text-6xl font-bold font-headline text-primary my-2">
                  {Math.abs(result).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  {(mode === "isWhatPercent" || mode === "percentageChange") && <span className="text-4xl">%</span>}
                </p>
              </>
            ) : (
              <p className="text-2xl text-muted-foreground">Enter valid values to calculate</p>
            )}
          </CardContent>
        </Card>
    </div>
  );
}
