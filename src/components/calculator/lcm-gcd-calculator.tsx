
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

// Helper function to find the greatest common divisor of two numbers
const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

// Helper function to find the least common multiple of two numbers
const lcm = (a: number, b: number): number => {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
};

export default function LcmGcdCalculator() {
  const [numbers, setNumbers] = useState([12, 18]);

  const handleNumberChange = (index: number, value: string) => {
    const newNumbers = [...numbers];
    const num = parseInt(value, 10);
    newNumbers[index] = isNaN(num) ? 0 : num;
    setNumbers(newNumbers);
  };

  const addNumber = () => setNumbers([...numbers, 0]);
  const removeNumber = (index: number) => {
    if (numbers.length > 2) {
      setNumbers(numbers.filter((_, i) => i !== index));
    }
  };

  const { finalGcd, finalLcm } = useMemo(() => {
    const validNumbers = numbers.filter(n => Number.isInteger(n) && n > 0);
    
    if (validNumbers.length < 2) {
      return { finalGcd: "N/A", finalLcm: "N/A" };
    }

    const gcdResult = validNumbers.reduce((acc, val) => gcd(acc, val));
    const lcmResult = validNumbers.reduce((acc, val) => lcm(acc, val));
    
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
                    placeholder="e.g. 12"
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
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center" aria-live="polite">
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
      <Card>
        <CardHeader><CardTitle>About LCM & GCD</CardTitle></CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is the Greatest Common Divisor (GCD)?</AccordionTrigger>
                    <AccordionContent>
                        The Greatest Common Divisor (also known as the Greatest Common Factor) is the largest positive integer that divides each of the integers in a set without leaving a remainder. For example, the GCD of 12 and 18 is 6.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is the Least Common Multiple (LCM)?</AccordionTrigger>
                    <AccordionContent>
                        The Least Common Multiple is the smallest positive integer that is a multiple of every integer in a set. For example, the LCM of 12 and 18 is 36.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How are LCM and GCD related?</AccordionTrigger>
                    <AccordionContent>
                       For any two positive integers 'a' and 'b', there is a beautiful relationship: `a * b = GCD(a, b) * LCM(a, b)`. This means the product of two numbers is equal to the product of their GCD and LCM.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                    <AccordionTrigger>Practical Uses</AccordionTrigger>
                    <AccordionContent>
                       GCD is used to simplify fractions to their lowest terms. LCM is often used when adding or subtracting fractions with different denominators to find a common denominator. They are both fundamental concepts in number theory.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
