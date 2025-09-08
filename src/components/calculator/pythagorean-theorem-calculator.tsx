"use client";

import { useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import usePersistentState from "@/hooks/use-persistent-state";

export default function PythagoreanTheoremCalculator() {
  const [solveFor, setSolveFor] = usePersistentState<"a" | "b" | "c">(
    "pythagorean-solveFor",
    "c",
  );
  const [sideA, setSideA] = usePersistentState<number | "">(
    "pythagorean-sideA",
    3,
  );
  const [sideB, setSideB] = usePersistentState<number | "">(
    "pythagorean-sideB",
    4,
  );
  const [sideC, setSideC] = usePersistentState<number | "">(
    "pythagorean-sideC",
    5,
  );

  const { result, error } = useMemo(() => {
    const a = Number(sideA);
    const b = Number(sideB);
    const c = Number(sideC);

    if (a < 0 || b < 0 || c < 0) {
      return { result: null, error: "Side lengths cannot be negative." };
    }

    if (solveFor === "c") {
      if (a > 0 && b > 0)
        return { result: Math.sqrt(a * a + b * b), error: null };
    } else if (solveFor === "a") {
      if (c > 0 && b > 0) {
        if (c <= b)
          return {
            result: null,
            error: "Hypotenuse 'c' must be longer than side 'b'.",
          };
        return { result: Math.sqrt(c * c - b * b), error: null };
      }
    } else if (solveFor === "b") {
      if (c > 0 && a > 0) {
        if (c <= a)
          return {
            result: null,
            error: "Hypotenuse 'c' must be longer than side 'a'.",
          };
        return { result: Math.sqrt(c * c - a * a), error: null };
      }
    }
    return { result: null, error: null };
  }, [solveFor, sideA, sideB, sideC]);

  // Clear the solved-for field when the mode changes
  useEffect(() => {
    if (solveFor === "a") setSideA("");
    if (solveFor === "b") setSideB("");
    if (solveFor === "c") setSideC("");
  }, [solveFor, setSideA, setSideB, setSideC]);

  const handleInputChange = (
    setter: (value: number | "") => void,
    value: string,
  ) => {
    if (value === "") {
      setter("");
    } else {
      setter(Number(value));
    }
  };

  const getInputProps = (side: "a" | "b" | "c") => {
    let value: number | "", setter: (value: number | "") => void;
    if (side === "a") {
      [value, setter] = [sideA, setSideA];
    } else if (side === "b") {
      [value, setter] = [sideB, setSideB];
    } else {
      [value, setter] = [sideC, setSideC];
    }

    if (side === solveFor) {
      return {
        value: result !== null && isFinite(result) ? result.toFixed(4) : "",
        readOnly: true,
        className: "font-bold text-primary bg-primary/10 border-primary/20",
        placeholder: "Result",
        "aria-label": `Side ${side} (calculated)`,
      };
    }

    return {
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange(setter, e.target.value),
      "aria-label": `Side ${side}`,
    };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pythagorean Theorem Calculator</CardTitle>
          <CardDescription>
            For a right-angled triangle, find the length of a missing side (a,
            b, or c) using the formula a² + b² = c².
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Solve for which side?</Label>
            <RadioGroup
              value={solveFor}
              onValueChange={(v: string) => setSolveFor(v as "a" | "b" | "c")}
              className="flex space-x-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="a" id="a" />
                <Label htmlFor="a">Side a</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="b" id="b" />
                <Label htmlFor="b">Side b</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="c" id="c" />
                <Label htmlFor="c">Hypotenuse c</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sideA">Side a</Label>
              <Input id="sideA" type="number" {...getInputProps("a")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sideB">Side b</Label>
              <Input id="sideB" type="number" {...getInputProps("b")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sideC">Hypotenuse c</Label>
              <Input id="sideC" type="number" {...getInputProps("c")} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            The length of the missing side is:
          </p>
          <p className="text-5xl font-bold font-headline text-primary my-2">
            {error ? (
              <span className="text-destructive text-xl">{error}</span>
            ) : result !== null && isFinite(result) ? (
              result.toFixed(4)
            ) : (
              "Enter values"
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
