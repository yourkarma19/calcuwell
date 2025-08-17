
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useSearchParams } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

type UnitSystem = "metric" | "imperial";

const bmiCategories = [
    { range: "< 18.5", category: "Underweight" },
    { range: "18.5 - 24.9", category: "Normal weight" },
    { range: "25.0 - 29.9", category: "Overweight" },
    { range: "30.0+", category: "Obesity" },
];

export default function BMICalculator({ setFormula }: { setFormula: (formula: string) => void }) {
  const searchParams = useSearchParams();
  const [unitSystem, setUnitSystem] = usePersistentState<UnitSystem>("bmi-unit-system", "metric");
  
  const [height, setHeight] = usePersistentState("bmi-height", 0);
  const [weight, setWeight] = usePersistentState("bmi-weight", 0);
  const [heightInches, setHeightInches] = usePersistentState("bmi-height-inches", 0);
  
  const [bmi, setBmi] = useState<number | null>(null);

  useEffect(() => {
    const w = searchParams.get('weight');
    const h = searchParams.get('height');
    const u = searchParams.get('units');

    if (u === 'metric' || u === 'imperial') setUnitSystem(u);
    if (w) setWeight(parseFloat(w));
    if (h) setHeight(parseFloat(h));
  }, [searchParams, setWeight, setHeight, setUnitSystem]);
  
  useEffect(() => {
    if (height === 0) setHeight(175);
    if (weight === 0) setWeight(70);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[height, weight]);

  const heightInMeters = useMemo(() => {
    if (unitSystem === "metric") {
      return height / 100;
    }
    const totalInches = (Number(height) * 12) + Number(heightInches);
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
      <div className="lg:col-span-2 space-y-6">
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
        <Card>
          <CardHeader>
            <CardTitle>BMI Categories (WHO)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>BMI Range</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bmiCategories.map((item) => (
                  <TableRow key={item.category}>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.range}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground mt-2">Note: BMI is a screening tool and does not diagnose body fatness or health. Consult a healthcare provider for a complete assessment.</p>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
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
