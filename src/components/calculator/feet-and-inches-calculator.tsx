
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Operation = "add" | "subtract" | "multiply" | "divide";

export default function FeetAndInchesCalculator() {
  const [feet1, setFeet1] = usePersistentState("feet1", 5);
  const [inches1, setInches1] = usePersistentState("inches1", 7);
  const [feet2, setFeet2] = usePersistentState("feet2", 2);
  const [inches2, setInches2] = usePersistentState("inches2", 10);
  const [operation, setOperation] = usePersistentState<Operation>("feet-op", "add");
  const [result, setResult] = useState<{feet: number, inches: number} | null>(null);

  const toTotalInches = (feet: number, inches: number) => (feet * 12) + inches;

  const fromTotalInches = (totalInches: number) => {
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    return { feet, inches };
  };

  const handleCalculate = () => {
    const totalInches1 = toTotalInches(Number(feet1), Number(inches1));
    const totalInches2 = toTotalInches(Number(feet2), Number(inches2));
    let resultInches = 0;

    switch (operation) {
      case 'add':
        resultInches = totalInches1 + totalInches2;
        break;
      case 'subtract':
        resultInches = totalInches1 - totalInches2;
        break;
      case 'multiply':
        // A more logical multiplication: length * scalar number
        // We'll use the second input as the scalar multiplier
        const multiplier = Number(feet2) + (Number(inches2)/12);
        resultInches = totalInches1 * multiplier; 
        break;
      case 'divide':
        if (totalInches2 === 0) {
            alert("Cannot divide by zero.");
            return;
        }
        resultInches = totalInches1 / totalInches2;
        break;
    }
    setResult(fromTotalInches(resultInches));
  };
  
  const resultInTotalInches = result ? toTotalInches(result.feet, result.inches) : 0;
  const resultInDecimalFeet = result ? resultInTotalInches / 12 : 0;
  const resultInMeters = result ? resultInTotalInches * 0.0254 : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Feet and Inches Calculator</CardTitle>
          <CardDescription>Easily add, subtract, multiply, or divide imperial measurements for your projects.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label>Measurement 1</Label>
              <div className="flex gap-2">
                <Input type="number" value={feet1} onChange={e => setFeet1(Number(e.target.value))} placeholder="Feet" aria-label="Feet 1" />
                <Input type="number" value={inches1} onChange={e => setInches1(Number(e.target.value))} placeholder="Inches" aria-label="Inches 1" />
              </div>
            </div>
             <div className="space-y-2">
              <Label>Operation</Label>
              <Select value={operation} onValueChange={(v) => setOperation(v as Operation)}>
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
                <Input type="number" value={feet2} onChange={e => setFeet2(Number(e.target.value))} placeholder="Feet / Num" aria-label="Feet 2 or Scalar" />
                <Input type="number" value={inches2} onChange={e => setInches2(Number(e.target.value))} placeholder="Inches / Num" aria-label="Inches 2 or Scalar" />
              </div>
            </div>
          </div>
          <Button onClick={handleCalculate} className="w-full mt-4">Calculate</Button>
        </CardContent>
      </Card>
      
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-4xl font-bold font-headline text-primary">
              {result.feet.toFixed(0)} feet {result.inches.toFixed(2)} inches
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm pt-4 border-t">
              <div>
                <p className="font-semibold text-muted-foreground">In Total Inches</p>
                <p>{resultInTotalInches.toFixed(2)} inches</p>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground">In Decimal Feet</p>
                <p>{resultInDecimalFeet.toFixed(2)} feet</p>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground">In Metric</p>
                <p>{resultInMeters.toFixed(2)} meters</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
