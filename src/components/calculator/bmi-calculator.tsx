"use client";

import { useState, useMemo, useEffect } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  
  const [height, setHeight] = usePersistentState("bmi-height", 175);
  const [weight, setWeight] = usePersistentState("bmi-weight", 70);
  const [heightInches, setHeightInches] = usePersistentState("bmi-height-inches", 0);
  
  const [bmi, setBmi] = useState<number | null>(null);

  useEffect(() => {
    const w = searchParams.get('weight');
    const h = searchParams.get('height');
    const u = searchParams.get('units');

    if (u === 'metric' || u === 'imperial') setUnitSystem(u);
    if (w) setWeight(parseFloat(w));
    if (h) setHeight(parseFloat(h));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
             <CardDescription>Calculate your Body Mass Index (BMI) using metric or imperial units.</CardDescription>
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
                <CardTitle>About the BMI Calculator</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The <strong>Body Mass Index (BMI)</strong> is a simple way to check if your weight is healthy for your height. It's a screening tool that can help find potential weight problems for adults. Our calculator makes it easy to find your BMI using either metric or imperial units.</p>

                <h3>How to Use the BMI Calculator</h3>
                <ol>
                    <li>Select your unit system (<strong>Metric</strong> or <strong>Imperial</strong>).</li>
                    <li>Enter your <strong>Weight</strong>.</li>
                    <li>Enter your <strong>Height</strong>. If using imperial units, give both feet and inches.</li>
                    <li>Your BMI result and weight category will be shown automatically.</li>
                </ol>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold">What is a healthy BMI?</AccordionTrigger>
                        <AccordionContent>
                            <p>According to the World Health Organization (WHO), a healthy BMI for most adults is between <strong>18.5 and 24.9</strong>. A BMI below 18.5 is underweight, 25.0 to 29.9 is overweight, and 30.0 or higher is obesity. You can see the full range in the BMI Categories table.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-semibold">How is BMI calculated?</AccordionTrigger>
                        <AccordionContent>
                            <p>The formula for BMI is your weight in kilograms divided by your height in meters squared (`kg/m²`). For imperial units, the formula is `(weight in lbs / (height in inches)²) * 703`. Our calculator does these conversions for you.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-semibold">What are the limits of BMI?</AccordionTrigger>
                        <AccordionContent>
                            <p>While useful, BMI is not a perfect measure. It does not separate fat from muscle. For example, very muscular people (like athletes) may have a high BMI but low body fat. It also may not be accurate for some ethnic groups, pregnant women, or the elderly. It should be used as a general guide. You should see a doctor for a complete health check.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
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
