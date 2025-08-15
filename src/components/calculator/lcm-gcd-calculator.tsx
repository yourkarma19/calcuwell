
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

// Helper function to find the greatest common divisor of two numbers
const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

// Helper function to find the least common multiple of two numbers
const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

export default function LcmGcdCalculator() {
  const [numbers, setNumbers] = useState([12, 18]);

  const handleNumberChange = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = Number(value);
    setNumbers(newNumbers);
  };

  const addNumber = () => setNumbers([...numbers, 0]);
  const removeNumber = (index: number) => {
    if (numbers.length > 2) {
      setNumbers(numbers.filter((_, i) => i !== index));
    }
  };

  const { finalGcd, finalLcm } = useMemo(() => {
    if (numbers.some(n => !Number.isInteger(n) || n <= 0)) {
        return { finalGcd: "Invalid", finalLcm: "Invalid" };
    }
    const gcdResult = numbers.reduce((acc, val) => gcd(acc, val));
    const lcmResult = numbers.reduce((acc, val) => lcm(acc, val));
    return { finalGcd: gcdResult, finalLcm: lcmResult };
  }, [numbers]);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>LCM & GCD Calculator</CardTitle>
          <CardDescription>Enter a list of positive integers to find their LCM and GCD.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Numbers</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {numbers.map((num, index) => (
                <div key={index} className="relative">
                  <Input
                    type="number"
                    value={num === 0 ? "" : num}
                    onChange={(e) => handleNumberChange(index, e.target.value)}
                    min="1"
                    step="1"
                  />
                  {numbers.length > 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeNumber(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <Button type="button" variant="outline" onClick={addNumber}>
            <Plus className="mr-2 h-4 w-4" /> Add Number
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Results</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Greatest Common Divisor (GCD)</p>
            <p className="text-4xl font-bold font-headline text-primary">{finalGcd}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Least Common Multiple (LCM)</p>
            <p className="text-4xl font-bold font-headline text-primary">{finalLcm}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
