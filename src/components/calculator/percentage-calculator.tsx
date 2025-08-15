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

    switch (mode) {
      case "percentOf":
        if (b === 0) return 0;
        return (a / 100) * b;
      case "isWhatPercent":
        if (b === 0) return null;
        return (a / b) * 100;
      case "percentageChange":
        if (a === 0) return null;
        return ((b - a) / a) * 100;
      default:
        return null;
    }
  }, [mode, valA, valB]);

  const renderInputs = () => {
    switch (mode) {
      case "percentOf":
        return (
          <div className="flex items-center gap-4">
            <Input type="number" value={valA} onChange={(e) => setValA(Number(e.target.value))} placeholder="%" />
            <span className="text-muted-foreground">% of</span>
            <Input type="number" value={valB} onChange={(e) => setValB(Number(e.target.value))} placeholder="number" />
          </div>
        );
      case "isWhatPercent":
        return (
          <div className="flex items-center gap-4">
            <Input type="number" value={valA} onChange={(e) => setValA(Number(e.target.value))} placeholder="number" />
            <span className="text-muted-foreground">is what % of</span>
            <Input type="number" value={valB} onChange={(e) => setValB(Number(e.target.value))} placeholder="number" />
          </div>
        );
      case "percentageChange":
        return (
          <div className="flex items-center gap-4">
            <Input type="number" value={valA} onChange={(e) => setValA(Number(e.target.value))} placeholder="from" />
            <ArrowRight className="text-muted-foreground" />
            <Input type="number" value={valB} onChange={(e) => setValB(Number(e.target.value))} placeholder="to" />
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
    <>
      <Card>
        <CardHeader>
          <CardTitle>Percentage Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Calculation Mode</Label>
            <Select value={mode} onValueChange={(v) => setMode(v as CalculationMode)}>
              <SelectTrigger>
                <SelectValue placeholder="Select calculation mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentOf">What is X% of Y?</SelectItem>
                <SelectItem value="isWhatPercent">X is what percent of Y?</SelectItem>
                <SelectItem value="percentageChange">Percentage change from X to Y</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Values</Label>
            {renderInputs()}
          </div>
        </CardContent>
      </Card>
      
      <div className="sticky top-24">
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {result !== null ? (
              <>
                <p className="text-sm text-muted-foreground">{getResultLabel()}</p>
                <p className="text-6xl font-bold font-headline text-primary my-2">
                  {Math.abs(result).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  {(mode === "isWhatPercent" || mode === "percentageChange") && <span className="text-4xl">%</span>}
                </p>
              </>
            ) : (
              <p className="text-2xl text-muted-foreground">Enter values to calculate</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
