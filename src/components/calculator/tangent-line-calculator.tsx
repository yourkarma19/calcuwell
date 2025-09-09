"use client";

import { derivative, parse } from "mathjs";
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
import usePersistentState from "@/hooks/use-persistent-state";

export default function TangentLineCalculator() {
  const [funcStr, setFuncStr] = usePersistentState("tangent-func", "x^2");
  const [point, setPoint] = usePersistentState("tangent-point", 2);
  const [solution, setSolution] = useState<{
    equation: string;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSolve = () => {
    try {
      setError(null);
      const node = parse(funcStr);
      const f = node.compile();

      const fPrime = derivative(node, "x");
      const fPrimeCompiled = fPrime.compile();

      const yValue = f.evaluate({ x: point });
      const slope = fPrimeCompiled.evaluate({ x: point });

      if (!isFinite(yValue) || !isFinite(slope)) {
        throw new Error(
          "Result is not a finite number. Check function and point.",
        );
      }

      const b = yValue - slope * point;
      const sign = b < 0 ? "-" : "+";

      const equation = `y = ${slope.toFixed(4).replace(/\.?0+$/, "")}x ${sign} ${Math.abs(b).toFixed(4).replace(/\.?0+$/, "")}`;

      setSolution({
        equation: equation.replace(/\.0000/g, ""),
        steps: [
          `1. Original function: f(x) = ${node.toString()}`,
          `2. Derivative: f'(x) = ${fPrime.toString()}`,
          `3. Evaluate y at x=${point}: f(${point}) = ${yValue.toFixed(4).replace(/\.?0+$/, "")}`,
          `4. Evaluate slope at x=${point}: f'(${point}) = ${slope.toFixed(4).replace(/\.?0+$/, "")}`,
          `5. Use point-slope form y - y₁ = m(x - x₁): y - ${yValue.toFixed(4).replace(/\.?0+$/, "")} = ${slope.toFixed(4).replace(/\.?0+$/, "")}(x - ${point})`,
          `6. Simplify to y = mx + b: ${equation}`,
        ],
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || "Failed to parse function.");
      } else {
        setError("An unknown error occurred.");
      }
      setSolution(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tangent Line Calculator</CardTitle>
          <CardDescription>
            Find the equation of a line tangent to a function at a specific
            point.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="function">Function f(x)</Label>
              <Input
                id="function"
                value={funcStr}
                onChange={(e) => setFuncStr(e.target.value)}
                placeholder="e.g., x^2"
                className="font-mono text-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="point">Point x =</Label>
              <Input
                id="point"
                type="number"
                value={point}
                onChange={(e) => setPoint(Number(e.target.value))}
              />
            </div>
          </div>
          <Button className="w-full" onClick={handleSolve}>
            Find Tangent Line
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {solution && (
        <Card>
          <CardHeader>
            <CardTitle>Solution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" aria-live="polite">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Tangent Line Equation
              </p>
              <p className="text-3xl font-bold font-mono text-primary break-words">
                {solution.equation}
              </p>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="steps">
                <AccordionTrigger>Show Steps</AccordionTrigger>
                <AccordionContent>
                  <div className="prose prose-sm dark:prose-invert max-w-none font-mono">
                    <ol className="list-decimal pl-5 space-y-2">
                      {solution.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
