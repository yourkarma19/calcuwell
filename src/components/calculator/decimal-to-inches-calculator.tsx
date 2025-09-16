"use client";

import { useState, useEffect } from "react";
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
import usePersistentState from "@/hooks/use-persistent-state";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FAQPage, WithContext } from "schema-dts";
import { cn } from "@/lib/utils";

const conversionChart = [
  { decimal: 0.0625, fraction: "1/16" },
  { decimal: 0.125, fraction: "1/8" },
  { decimal: 0.1875, fraction: "3/16" },
  { decimal: 0.25, fraction: "1/4" },
  { decimal: 0.3125, fraction: "5/16" },
  { decimal: 0.375, fraction: "3/8" },
  { decimal: 0.4375, fraction: "7/16" },
  { decimal: 0.5, fraction: "1/2" },
  { decimal: 0.5625, fraction: "9/16" },
  { decimal: 0.625, fraction: "5/8" },
  { decimal: 0.6875, fraction: "11/16" },
  { decimal: 0.75, fraction: "3/4" },
  { decimal: 0.8125, fraction: "13/16" },
  { decimal: 0.875, fraction: "7/8" },
  { decimal: 0.9375, fraction: "15/16" },
];

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why is precision important in these conversions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Precision determines the smallest fraction you are measuring to. For woodworking or machining, higher precision like 1/32" is often necessary for accurate fits. For general measurements, a lower precision like 1/8" or 1/4" may be sufficient.',
      },
    },
    {
      "@type": "Question",
      name: "What fields use decimal to inch conversions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This conversion is crucial in many fields that use the Imperial system, including woodworking, construction, machining, and engineering. It allows for easy translation between digital plans (often in decimals) and physical measurements made with a tape measure.",
      },
    },
    {
      "@type": "Question",
      name: "How do you convert a number with feet and inches into a decimal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'To convert from feet and inches to a decimal, first convert the feet to inches (1 foot = 12 inches). Add this to the inch measurement. Then, if there is a fraction, convert it to a decimal by dividing the numerator by the denominator. Add this decimal to your total inches. For example, 2\' 6 1/2" becomes (2 * 12) + 6 + (1/2) = 24 + 6 + 0.5 = 30.5".',
      },
    },
  ],
};

// Helper to find the greatest common divisor
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

export default function DecimalToInchesCalculator() {
  const [decimalValue, setDecimalValue] = usePersistentState<number | string>(
    "decimal-to-inch-value",
    5.25,
  );
  const [precision, setPrecision] = usePersistentState(
    "decimal-to-inch-precision",
    16,
  );
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
    if (isNaN(totalInches) || totalInches < 0) {
      setResult(null);
      return;
    }

    const feet = Math.floor(totalInches / 12);
    let inchesPart = Math.floor(totalInches) % 12;
    const decimalPart = totalInches - Math.floor(totalInches);

    const denominator = Number(precision);
    const numerator = Math.round(decimalPart * denominator);

    if (numerator === 0) {
      setResult({
        feet,
        inches: inchesPart,
        numerator: 0,
        denominator,
        simpleNumerator: 0,
        simpleDenominator: 0,
      });
      return;
    }

    if (numerator === denominator) {
      inchesPart += 1;
      let newFeet = feet;
      if (inchesPart === 12) {
        newFeet += 1;
        inchesPart = 0;
      }
      setResult({
        feet: newFeet,
        inches: inchesPart,
        numerator: 0,
        denominator,
        simpleNumerator: 0,
        simpleDenominator: 0,
      });
      return;
    }

    const commonDivisor = gcd(numerator, denominator);
    const simpleNumerator = numerator / commonDivisor;
    const simpleDenominator = denominator / commonDivisor;

    setResult({
      feet,
      inches: inchesPart,
      numerator,
      denominator,
      simpleNumerator,
      simpleDenominator,
    });
  };

  useEffect(() => {
    handleConvert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decimalValue, precision]);

  const totalInchesSimpleFraction = result
    ? result.feet * 12 +
      result.inches +
      result.simpleNumerator / result.simpleDenominator
    : 0;
  const simpleFractionNumerator =
    totalInchesSimpleFraction * (result?.simpleDenominator || 1);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Decimal to Inches Fraction Calculator</CardTitle>
          <CardDescription>
            Convert any decimal number into inches and a usable fraction (e.g.,
            1/2, 1/4, 1/8).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="decimal-input">Enter Decimal Value</Label>
              <Input
                id="decimal-input"
                type="number"
                value={decimalValue}
                onChange={(e) =>
                  setDecimalValue(
                    e.target.value === "" ? "" : parseFloat(e.target.value),
                  )
                }
                placeholder="e.g., 5.25"
                min="0"
                step="any"
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
                  <SelectItem value="2">1/2&quot;</SelectItem>
                  <SelectItem value="4">1/4&quot;</SelectItem>
                  <SelectItem value="8">1/8&quot;</SelectItem>
                  <SelectItem value="16">1/16&quot;</SelectItem>
                  <SelectItem value="32">1/32&quot;</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={handleConvert}
            className={cn("w-full", "btn-glossy")}
          >
            Convert
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Conversion Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                As Inches and Fraction
              </p>
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
                <p className="font-semibold text-muted-foreground">
                  As Feet, Inches, and Fraction
                </p>
                <p>
                  {result.feet > 0 && `${result.feet}' `}
                  {result.inches}
                  {result.simpleNumerator > 0
                    ? ` ${result.simpleNumerator}/${result.simpleDenominator}`
                    : ""}
                  &quot;
                </p>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground">
                  As a Simple Fraction
                </p>
                <p>
                  {simpleFractionNumerator.toFixed(0)}/
                  {result.simpleDenominator} inches
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle as="h2">
              How to Manually Convert Decimal to Inches
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <p>You can convert a decimal to an inch fraction in a few steps:</p>
            <ol>
              <li>
                Separate the whole number from the decimal. The whole number is
                your whole inches.
              </li>
              <li>
                Multiply the decimal part by your desired denominator (e.g., 16
                for 1/16&quot; precision). This gives you the numerator.
              </li>
              <li>Place the numerator over the denominator.</li>
              <li>
                Simplify the fraction by finding the greatest common divisor
                (GCD) and dividing both parts by it.
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle as="h3">
              Common Decimal to Inch Fraction Conversions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Decimal</TableHead>
                  <TableHead>Inch Fraction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conversionChart.map((item) => (
                  <TableRow key={item.decimal}>
                    <TableCell>{item.decimal}&quot;</TableCell>
                    <TableCell>{item.fraction}&quot;</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle as="h3">Decimal to Inches FAQs</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Why is precision important in these conversions?
                </AccordionTrigger>
                <AccordionContent>
                  Precision determines the smallest fraction you measure to. For
                  woodworking, higher precision like 1/32&quot; is often needed
                  for accurate fits. For general measurements, 1/8&quot; or
                  1/4&quot; may be enough.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  What fields use decimal to inch conversions?
                </AccordionTrigger>
                <AccordionContent>
                  This conversion is key in woodworking, construction, and
                  engineering. It helps translate between digital plans (often in
                  decimals) and physical measurements.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How do you convert feet and inches to a decimal?
                </AccordionTrigger>
                <AccordionContent>
                  First, convert feet to inches (1 foot = 12 inches). Add this to
                  the inch measurement. Then, convert any fraction to a decimal by
                  dividing the top number by the bottom number. Add this to your
                  total inches. For example, 2&apos; 6 1/2&quot; becomes (2 * 12)
                  + 6 + (1/2) = 30.5&quot;.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
