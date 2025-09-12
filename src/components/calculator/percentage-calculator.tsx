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
    </div>
  );
}
