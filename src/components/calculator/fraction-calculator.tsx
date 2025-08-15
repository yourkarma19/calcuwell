"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";

// Helper function to find the greatest common divisor
const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

export default function FractionCalculator() {
  const [num1, setNum1] = useState(1);
  const [den1, setDen1] = useState(2);
  const [num2, setNum2] = useState(3);
  const [den2, setDen2] = useState(4);
  const [operator, setOperator] = useState<"+" | "-" | "*" | "/">("+");

  const result = useMemo(() => {
    const n1 = Number(num1);
    const d1 = Number(den1);
    const n2 = Number(num2);
    const d2 = Number(den2);

    if (d1 === 0 || d2 === 0) return { num: "Invalid", den: "Denominator" };

    let resN: number, resD: number;

    switch (operator) {
      case "+": [resN, resD] = [n1 * d2 + n2 * d1, d1 * d2]; break;
      case "-": [resN, resD] = [n1 * d2 - n2 * d1, d1 * d2]; break;
      case "*": [resN, resD] = [n1 * n2, d1 * d2]; break;
      case "/": [resN, resD] = [n1 * d2, d1 * n2]; break;
      default: return { num: "Error", den: "" };
    }
    
    if (resD === 0) return { num: "Cannot divide", den: "by zero" };

    const commonDivisor = gcd(Math.abs(resN), Math.abs(resD));
    return { num: resN / commonDivisor, den: resD / commonDivisor };

  }, [num1, den1, num2, den2, operator]);

  const FractionInput = ({ num, den, onNumChange, onDenChange, label }: { num: number, den: number, onNumChange: (v: number) => void, onDenChange: (v: number) => void, label: string }) => (
    <div className="flex flex-col items-center gap-1">
        <Label>{label}</Label>
        <Input type="number" value={num} onChange={e => onNumChange(Number(e.target.value))} className="w-24 text-center" />
        <div className="h-[2px] w-full bg-foreground" />
        <Input type="number" value={den} onChange={e => onDenChange(Number(e.target.value))} className="w-24 text-center" />
    </div>
  )

  return (
    <div className="lg:col-span-3">
      <Card>
        <CardHeader>
            <CardTitle>Fraction Calculator</CardTitle>
            <CardDescription>Perform arithmetic operations (add, subtract, multiply, divide) on two fractions. The result is automatically simplified.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <FractionInput num={num1} den={den1} onNumChange={setNum1} onDenChange={setDen1} label="Fraction 1" />

            <div className="flex flex-col items-center">
                <Label>Operator</Label>
                <Select value={operator} onValueChange={(v) => setOperator(v as any)}>
                  <SelectTrigger className="w-20 text-2xl font-bold mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+">+</SelectItem>
                    <SelectItem value="-">-</SelectItem>
                    <SelectItem value="*">×</SelectItem>
                    <SelectItem value="/">÷</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            
            <FractionInput num={num2} den={den2} onNumChange={setNum2} onDenChange={setDen2} label="Fraction 2" />
          </div>
          <div className="pt-4 text-center">
            <h3 className="text-muted-foreground font-semibold">Result</h3>
            <div className="flex items-center justify-center gap-4 text-4xl font-bold">
              {result.den === 1 || result.den === "" ? (
                 <p className="text-primary font-headline">{result.num}</p>
              ) : (
                <div className="inline-flex flex-col items-center">
                  <span className="text-primary font-headline">{result.num}</span>
                  <div className="h-[3px] w-full bg-primary" />
                  <span className="text-primary font-headline">{result.den}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
