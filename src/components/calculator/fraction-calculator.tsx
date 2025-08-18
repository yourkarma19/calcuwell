"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

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
    <div className="lg:col-span-3 space-y-6">
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
       <Card>
        <CardHeader>
            <CardTitle>About Fraction Calculations</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our Fraction Calculator is designed to simplify math with fractions. It provides instant and accurate results for adding, subtracting, multiplying, and dividing fractions. It also automatically simplifies the result to its lowest terms.</p>
            
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter the numerator and denominator for the **first fraction**.</li>
                <li>Select the desired math **operator** (+, -, ×, ÷).</li>
                <li>Enter the numerator and denominator for the **second fraction**.</li>
            </ol>
            <p>The result of the calculation will be displayed instantly, already simplified for you.</p>

            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold">How do you add fractions with different denominators?</AccordionTrigger>
                    <AccordionContent>
                        <p>To add fractions with different denominators, you must first find a common denominator. This is a number that both denominators can divide into. Once both fractions have the same denominator, you can add their numerators. For example, to add 1/2 + 1/4, you convert 1/2 to 2/4. Then, you add the numerators: 2/4 + 1/4 = 3/4.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="font-semibold">How do you simplify a fraction?</AccordionTrigger>
                    <AccordionContent>
                        <p>To simplify a fraction, you find the largest number that divides both the numerator and the denominator evenly. This number is called the Greatest Common Divisor (GCD). You then divide both the top and bottom numbers by the GCD. For example, for the fraction 12/16, the GCD is 4. Dividing both parts by 4 gives you the simplified fraction 3/4.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="font-semibold">What is the difference between a proper and improper fraction?</AccordionTrigger>
                    <AccordionContent>
                       <p>A **proper fraction** is one where the top number is smaller than the bottom number (e.g., 3/4). An **improper fraction** is one where the top number is larger than or equal to the bottom number (e.g., 5/4). Improper fractions can also be written as mixed numbers (e.g., 5/4 is the same as 1 ¼).</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
