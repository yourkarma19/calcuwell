"use client";

import { AlertCircle } from "lucide-react";
import { useState } from "react";
import CalculatorUIWrapper from "./calculator-ui-wrapper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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

type Operation = "add" | "subtract" | "multiply" | "divide";

export default function FeetAndInchesCalculator({
  calculatorName,
}: {
  calculatorName: string;
}) {
  const [feet1, setFeet1] = useState(5);
  const [inches1, setInches1] = useState(7);
  const [feet2, setFeet2] = useState(2);
  const [inches2, setInches2] = useState(10);
  const [operation, setOperation] = useState<Operation>("add");
  const [result, setResult] = useState<{
    feet: number;
    inches: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toTotalInches = (feet: number, inches: number) => feet * 12 + inches;

  const fromTotalInches = (totalInches: number) => {
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    return { feet, inches };
  };

  const handleCalculate = () => {
    setError(null);
    setResult(null); // Clear previous result on new calculation
    const f1 = Number(feet1);
    const i1 = Number(inches1);
    const f2 = Number(feet2);
    const i2 = Number(inches2);

    if (f1 < 0 || i1 < 0 || f2 < 0 || i2 < 0) {
      setError("Measurements cannot be negative.");
      return;
    }

    const totalInches1 = toTotalInches(f1, i1);
    let resultInches = 0;

    switch (operation) {
      case "add": {
        const totalInches2 = toTotalInches(f2, i2);
        resultInches = totalInches1 + totalInches2;
        break;
      }
      case "subtract": {
        const totalInches2 = toTotalInches(f2, i2);
        resultInches = totalInches1 - totalInches2;
        break;
      }
      case "multiply": {
        const scalar = f2 + i2 / 12;
        resultInches = totalInches1 * scalar;
        break;
      }
      case "divide": {
        const divisor = f2 + i2 / 12;
        if (divisor === 0) {
          setError("Cannot divide by zero.");
          return;
        }
        resultInches = totalInches1 / divisor;
        break;
      }
    }
    setResult(fromTotalInches(resultInches));
  };

  const resultInTotalInches = result
    ? toTotalInches(result.feet, result.inches)
    : 0;
  const resultInDecimalFeet = result ? resultInTotalInches / 12 : 0;
  const resultInMeters = result ? resultInTotalInches * 0.0254 : 0;

  const shareParams = {
    feet1: feet1.toString(),
    inches1: inches1.toString(),
    feet2: feet2.toString(),
    inches2: inches2.toString(),
    op: operation,
  };

  const inputCard = (
    <Card id="feet-inches-inputs">
      <CardHeader>
        <CardTitle>Feet and Inches Calculator</CardTitle>
        <CardDescription>
          Easily add, subtract, multiply, or divide imperial measurements for
          your projects.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div className="space-y-2">
            <Label>Measurement 1</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={feet1}
                onChange={(e) => setFeet1(Number(e.target.value))}
                placeholder="Feet"
                aria-label="Measurement 1 Feet"
                min="0"
              />
              <Input
                type="number"
                value={inches1}
                onChange={(e) => setInches1(Number(e.target.value))}
                placeholder="Inches"
                aria-label="Measurement 1 Inches"
                min="0"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Operation</Label>
            <Select
              value={operation}
              onValueChange={(v) => setOperation(v as Operation)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">+ Add</SelectItem>
                <SelectItem value="subtract">- Subtract</SelectItem>
                <SelectItem value="multiply">× Multiply By</SelectItem>
                <SelectItem value="divide">÷ Divide By</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Measurement 2 / Scalar</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={feet2}
                onChange={(e) => setFeet2(Number(e.target.value))}
                placeholder="Feet / Num"
                aria-label="Measurement 2 Feet or Scalar"
                min="0"
              />
              <Input
                type="number"
                value={inches2}
                onChange={(e) => setInches2(Number(e.target.value))}
                placeholder="Inches / Num"
                aria-label="Measurement 2 Inches or Scalar"
                min="0"
              />
            </div>
          </div>
        </div>
        <Button onClick={handleCalculate} className="w-full mt-4">
          Calculate
        </Button>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );

  const resultsCard = result ? (
    <Card id="feet-inches-results">
      <CardHeader>
        <CardTitle>Result</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4" aria-live="polite">
        <p className="text-4xl font-bold font-headline text-primary">
          {result.feet.toFixed(0)} feet {result.inches.toFixed(2)} inches
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm pt-4 border-t">
          <div>
            <p className="font-semibold text-muted-foreground">
              In Total Inches
            </p>
            <p>{resultInTotalInches.toFixed(2)} inches</p>
          </div>
          <div>
            <p className="font-semibold text-muted-foreground">
              In Decimal Feet
            </p>
            <p>{resultInDecimalFeet.toFixed(2)} feet</p>
          </div>
          <div>
            <p className="font-semibold text-muted-foreground">In Metric</p>
            <p>{resultInMeters.toFixed(2)} meters</p>
          </div>
        </div>
      </CardContent>
    </Card>
  ) : null;

  return (
    <CalculatorUIWrapper
      inputCard={inputCard}
      resultsCard={resultsCard}
      shareParams={shareParams}
      elementIds={["feet-inches-inputs", "feet-inches-results"]}
      calculatorName={calculatorName}
    />
  );
}
