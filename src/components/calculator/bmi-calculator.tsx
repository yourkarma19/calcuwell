"use client";

import { useState, useMemo, useEffect } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type UnitSystem = "metric" | "imperial";

export default function BMICalculator() {
  const [unitSystem, setUnitSystem] = usePersistentState<UnitSystem>(
    "bmi-unit-system",
    "metric"
  );
  
  const [height, setHeight] = usePersistentState("bmi-height", 175);
  const [weight, setWeight] = usePersistentState("bmi-weight", 70);
  const [heightInches, setHeightInches] = usePersistentState("bmi-height-inches", 0);
  
  const [bmi, setBmi] = useState<number | null>(null);

  const heightInMeters = useMemo(() => {
    if (unitSystem === "metric") {
      return height / 100;
    }
    const totalInches = (height * 12) + Number(heightInches);
    return totalInches * 0.0254;
  }, [unitSystem, height, heightInches]);

  const weightInKg = useMemo(() => {
    if (unitSystem === "metric") {
      return weight;
    }
    return weight * 0.453592;
  }, [unitSystem, weight]);
  
  useEffect(() => {
    if (heightInMeters > 0 && weightInKg > 0) {
      const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
      setBmi(calculatedBmi);
    } else {
      setBmi(null);
    }
  }, [heightInMeters, weightInKg]);

  const getBmiCategory = (bmiValue: number | null) => {
    if (bmiValue === null) return { category: "-", color: "text-muted-foreground" };
    if (bmiValue < 18.5) return { category: "Underweight", color: "text-blue-500" };
    if (bmiValue < 25) return { category: "Normal weight", color: "text-green-500" };
    if (bmiValue < 30) return { category: "Overweight", color: "text-yellow-500" };
    return { category: "Obesity", color: "text-red-500" };
  };

  const { category, color } = getBmiCategory(bmi);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Unit System</Label>
            <Select value={unitSystem} onValueChange={(value) => setUnitSystem(value as UnitSystem)}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit system" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                <SelectItem value="imperial">Imperial (lbs, ft, in)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Weight ({unitSystem === "metric" ? "kg" : "lbs"})</Label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              placeholder={unitSystem === "metric" ? "e.g., 70" : "e.g., 154"}
            />
          </div>

          {unitSystem === "metric" ? (
            <div className="space-y-2">
              <Label>Height (cm)</Label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                placeholder="e.g., 175"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Height (ft)</Label>
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  placeholder="e.g., 5"
                />
              </div>
              <div className="space-y-2">
                <Label>(in)</Label>
                <Input
                  type="number"
                  value={heightInches}
                  onChange={(e) => setHeightInches(Number(e.target.value))}
                  placeholder="e.g., 9"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="sticky top-24">
        <Card>
          <CardHeader>
            <CardTitle>Your Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">Your BMI is</p>
            <p className="text-6xl font-bold font-headline text-primary my-2">
              {bmi !== null ? bmi.toFixed(1) : "-"}
            </p>
            <p className={cn("text-xl font-semibold", color)}>{category}</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
