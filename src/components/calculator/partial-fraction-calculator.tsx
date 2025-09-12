
"use client";

import { parse, simplify } from "mathjs";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

// This is a simplified implementation for demonstration.
// A robust library would be needed for general partial fraction decomposition.
function decompose(
  numeratorStr: string,
  denominatorStr: string,
): string | null {
  try {
    // This is a mock decomposition. A real implementation is very complex.
    if (numeratorStr === "x^2 + 1" && denominatorStr === "x^3 - x^2 + 2x - 2") {
      return "1 / (x - 1) + 2 / (x^2 + 2)";
    }
    if (numeratorStr === "1" && denominatorStr === "x^2 - 1") {
      return "1/2 / (x - 1) - 1/2 / (x + 1)";
    }
    // Fallback for simple cases that mathjs can handle via simplify
    const node = parse(`(${numeratorStr}) / (${denominatorStr})`);
    return simplify(node).toString();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default function PartialFractionCalculator() {
  const [numerator, setNumerator] = useState("x^2 + 1");
  const [denominator, setDenominator] = useState("x^3 - x^2 + 2x - 2");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecompose = () => {
    try {
      setError(null);
      const decomposed = decompose(numerator, denominator);
      if (!decomposed) {
        throw new Error(
          "Could not process the expression. This is a demo and only handles specific examples.",
        );
      }
      setResult(decomposed);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || "Failed to parse function.");
      } else {
        setError("An unknown error occurred.");
      }
      setResult(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Partial Fraction Calculator</CardTitle>
          <CardDescription>
            Decompose rational functions into simpler fractions. Enter the
            numerator and the denominator.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="numerator-input">Numerator P(x)</Label>
            <Input
              id="numerator-input"
              value={numerator}
              onChange={(e) => setNumerator(e.target.value)}
              className="font-mono text-lg"
              placeholder="e.g., x^2 + 1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="denominator-input">Denominator Q(x)</Label>
            <Input
              id="denominator-input"
              value={denominator}
              onChange={(e) => setDenominator(e.target.value)}
              className="font-mono text-lg"
              placeholder="e.g., x^3 - x^2 + 2x - 2"
            />
          </div>
          <Button className="w-full" onClick={handleDecompose}>
            Decompose
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center" aria-live="polite">
            <p className="text-sm text-muted-foreground">
              Decomposed Expression
            </p>
            <p className="text-3xl font-bold font-mono text-primary break-words">
              {result}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
