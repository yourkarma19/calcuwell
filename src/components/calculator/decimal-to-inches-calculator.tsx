
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Helper to find the greatest common divisor
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

export default function DecimalToInchesCalculator() {
  const [decimalValue, setDecimalValue] = usePersistentState("decimal-to-inch-value", 5.25);
  const [precision, setPrecision] = usePersistentState("decimal-to-inch-precision", 16);
  const [result, setResult] = useState<{
    feet: number;
    inches: number;
    numerator: number;
    denominator: number;
    simpleNumerator: number;
    simpleDenominator: number;
  } | null>(null);
  
  const handleConvert = () => {
    const totalInches = parseFloat(decimalValue.toString());
    if (isNaN(totalInches)) return;

    const feet = Math.floor(totalInches / 12);
    const remainingInches = totalInches % 12;
    const inchesPart = Math.floor(remainingInches);
    const decimalPart = remainingInches - inchesPart;

    const denominator = Number(precision);
    const numerator = Math.round(decimalPart * denominator);
    
    if (numerator === 0) {
      setResult({ feet, inches: inchesPart, numerator: 0, denominator, simpleNumerator: 0, simpleDenominator: 0 });
      return;
    }
    
    if (numerator === denominator) {
       setResult({ feet, inches: inchesPart + 1, numerator: 0, denominator, simpleNumerator: 0, simpleDenominator: 0 });
       return;
    }

    const commonDivisor = gcd(numerator, denominator);
    const simpleNumerator = numerator / commonDivisor;
    const simpleDenominator = denominator / commonDivisor;
    
    setResult({ feet, inches: inchesPart, numerator, denominator, simpleNumerator, simpleDenominator });
  };
  
  const totalInchesSimpleFraction = result ? (result.feet * 12) + result.inches + (result.simpleNumerator / result.simpleDenominator) : 0;
  const simpleFractionNumerator = totalInchesSimpleFraction * (result?.simpleDenominator || 1);


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Decimal to Inches Fraction Calculator</CardTitle>
          <CardDescription>Convert any decimal number into inches and a usable fraction (e.g., 1/2, 1/4, 1/8).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="decimal-input">Enter Decimal Value</Label>
              <Input
                id="decimal-input"
                type="number"
                value={decimalValue}
                onChange={(e) => setDecimalValue(parseFloat(e.target.value))}
                placeholder="e.g., 5.25"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="precision-select">Select Precision</Label>
              <Select
                value={precision.toString()}
                onValueChange={(v) => setPrecision(parseInt(v, 10))}
              >
                <SelectTrigger id="precision-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">1/2"</SelectItem>
                  <SelectItem value="4">1/4"</SelectItem>
                  <SelectItem value="8">1/8"</SelectItem>
                  <SelectItem value="16">1/16"</SelectItem>
                  <SelectItem value="32">1/32"</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleConvert} className="w-full">Convert</Button>
        </CardContent>
      </Card>
      
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Conversion Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">As Inches and Fraction</p>
              <p className="text-4xl font-bold font-headline text-primary">
                {result.inches > 0 && <span>{result.inches}</span>}
                {result.simpleNumerator > 0 && (
                  <sup className="text-2xl ml-1">
                    {result.simpleNumerator}/{result.simpleDenominator}
                  </sup>
                )}
                 ″
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t">
              <div>
                <p className="font-semibold text-muted-foreground">As Feet, Inches, and Fraction</p>
                <p>{result.feet}' {result.inches}{result.simpleNumerator > 0 ? ` ${result.simpleNumerator}/${result.simpleDenominator}` : ''}"</p>
              </div>
               <div>
                <p className="font-semibold text-muted-foreground">As a Simple Fraction</p>
                <p>{simpleFractionNumerator.toFixed(0)}/{result.simpleDenominator} inches</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
