"use client";

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
import usePersistentState from "@/hooks/use-persistent-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const commonFractions = [
  { fraction: "1/2", percentage: "50%" },
  { fraction: "1/3", percentage: "33.33%" },
  { fraction: "1/4", percentage: "25%" },
  { fraction: "1/5", percentage: "20%" },
  { fraction: "1/8", percentage: "12.5%" },
  { fraction: "3/4", percentage: "75%" },
];

export default function FractionToPercentageCalculator() {
  const [numerator, setNumerator] = usePersistentState("ftp-num", 3);
  const [denominator, setDenominator] = usePersistentState("ftp-den", 4);

  const percentage = useMemo(() => {
    if (denominator === 0) return NaN;
    return (numerator / denominator) * 100;
  }, [numerator, denominator]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fraction to Percentage Calculator</CardTitle>
          <CardDescription>
            Convert any fraction into its equivalent percentage value.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="numerator">Numerator</Label>
              <Input
                id="numerator"
                type="number"
                value={numerator}
                onChange={(e) => setNumerator(Number(e.target.value))}
              />
            </div>
            <span className="text-3xl mt-7">/</span>
            <div className="flex-1 space-y-2">
              <Label htmlFor="denominator">Denominator</Label>
              <Input
                id="denominator"
                type="number"
                value={denominator}
                onChange={(e) => setDenominator(Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-5xl font-bold font-headline text-primary">
            {isNaN(percentage) ? "Invalid" : percentage.toFixed(2)}%
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Calculation: ({numerator} / {denominator}) × 100
          </p>
        </CardContent>
      </Card>

      <div className="space-y-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle as="h2">Converting Fractions to Percentages</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              This calculator converts any fraction into its equivalent
              percentage. This is a basic math skill useful in many situations,
              from reading stats to understanding discounts. A percentage is
              simply a fraction with a denominator of 100.
            </p>
            <h3>How to Use the Calculator</h3>
            <ol>
              <li>Enter the **Numerator** (the top number of the fraction).</li>
              <li>
                Enter the **Denominator** (the bottom number of the fraction).
              </li>
              <li>The calculator will instantly show the result.</li>
            </ol>
            <h3>The Conversion Formula</h3>
            <p>The conversion uses a simple formula:</p>
            <p className="font-mono bg-muted p-2 rounded-md text-center">
              Percentage = (Numerator / Denominator) × 100
            </p>
            <p>
              First, the fraction is turned into a decimal by dividing the top by
              the bottom. Then, this decimal is multiplied by 100 to get a
              percentage.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle as="h3">Common Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fraction</TableHead>
                  <TableHead>Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commonFractions.map((item) => (
                  <TableRow key={item.fraction}>
                    <TableCell>{item.fraction}</TableCell>
                    <TableCell>{item.percentage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
