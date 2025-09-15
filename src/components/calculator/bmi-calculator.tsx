"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import ExportShareControls from "./export-share-controls";
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
import { cn } from "@/lib/utils";
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

const bmiCategories = [
  { range: "Below 18.5", classification: "Underweight" },
  { range: "18.5 – 24.9", classification: "Normal weight" },
  { range: "25.0 – 29.9", classification: "Overweight" },
  { range: "30.0 and above", classification: "Obesity" },
];

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a healthy BMI for an Indian adult?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For Indian adults, the standard BMI ranges are slightly different due to genetic factors. A BMI between 18.5 and 22.9 is considered healthy. A BMI between 23.0 and 24.9 is considered overweight, and a BMI of 25.0 or greater is considered obese.",
      },
    },
    {
      "@type": "Question",
      name: "Why is BMI not always the best measure of health?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BMI is a simple screening tool and does not account for body composition. It can't distinguish between fat and muscle. A muscular athlete might have a high BMI but be very healthy. For a more complete picture, consider metrics like body fat percentage or waist-to-hip ratio.",
      },
    },
    {
      "@type": "Question",
      name: "How is BMI calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formula is weight in kilograms divided by the square of height in meters (kg/m²). This calculator does the math for you in either metric or imperial units.",
      },
    },
  ],
};

type UnitSystem = "metric" | "imperial";

export default function BMICalculator({
  calculatorName,
}: {
  calculatorName: string;
}) {
  const searchParams = useSearchParams();
  const [unitSystem, setUnitSystem] = usePersistentState<UnitSystem>(
    "bmi-unit-system",
    "metric",
  );

  const [height, setHeight] = usePersistentState("bmi-height", 175);
  const [weight, setWeight] = usePersistentState("bmi-weight", 70);
  const [heightInches, setHeightInches] = usePersistentState(
    "bmi-height-inches",
    0,
  );

  const [bmi, setBmi] = useState<number | null>(null);

  useEffect(() => {
    const w = searchParams?.get("weight");
    const h = searchParams?.get("height");
    const u = searchParams?.get("units");

    if (u === "metric" || u === "imperial") setUnitSystem(u);
    if (w) setWeight(parseFloat(w));
    if (h) setHeight(parseFloat(h));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const heightInMeters = useMemo(() => {
    if (unitSystem === "metric") {
      return height / 100;
    }
    const totalInches = Number(height) * 12 + Number(heightInches);
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
    if (bmiValue === null)
      return { category: "-", color: "text-muted-foreground" };
    if (bmiValue < 18.5)
      return { category: "Underweight", color: "text-blue-500" };
    if (bmiValue < 25)
      return { category: "Normal weight", color: "text-green-500" };
    if (bmiValue < 30)
      return { category: "Overweight", color: "text-yellow-500" };
    return { category: "Obesity", color: "text-red-500" };
  };

  const { category, color } = getBmiCategory(bmi);

  const shareParams = {
    weight: weight.toString(),
    height: height.toString(),
    units: unitSystem,
  };

  return (
    <div className="space-y-6">
      <Card id="bmi-calculator-inputs">
        <CardHeader>
          <CardTitle>Enter Your Details</CardTitle>
          <CardDescription>
            Calculate your Body Mass Index (BMI) using metric or imperial units.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Unit System</Label>
            <Select
              value={unitSystem}
              onValueChange={(value) => setUnitSystem(value as UnitSystem)}
            >
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

      <Card id="bmi-calculator-results">
        <CardHeader>
          <CardTitle>Your Result</CardTitle>
        </CardHeader>
        <CardContent className="text-center" aria-live="polite">
          <p className="text-sm text-muted-foreground">Your BMI is</p>
          <p className="text-6xl font-bold font-headline text-primary my-2">
            {bmi !== null ? bmi.toFixed(1) : "-"}
          </p>
          <p className={cn("text-xl font-semibold", color)}>{category}</p>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle as="h2">About the BMI Calculator</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <p>
              The <strong>Body Mass Index (BMI)</strong> is a simple screening tool
              to assess whether your weight is healthy for your height. It provides
              a general indicator of body fatness and is widely used for population
              studies.
            </p>
            <h3>How is BMI Calculated?</h3>
            <p>
              The formula is your weight in kilograms divided by the square of your
              height in meters (kg/m²). This calculator handles both metric and
              imperial units for your convenience.
            </p>

            <h3>WHO BMI Categories</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>BMI</TableHead>
                  <TableHead>Weight Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bmiCategories.map((item) => (
                  <TableRow key={item.range}>
                    <TableCell>{item.range}</TableCell>
                    <TableCell>{item.classification}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-sm text-muted-foreground mt-2">
              Note: For people of South Asian descent, some studies suggest a lower
              threshold for overweight (23.0) and obesity (25.0).
            </p>

            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold">
                  What is a healthy BMI for an Indian adult?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    For Indian adults, the standard BMI ranges are slightly different.
                    A BMI between 18.5 and 22.9 is considered healthy. 23.0-24.9 is
                    overweight, and 25.0 or greater is obese.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-semibold">
                  Why is BMI not always the best measure of health?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    BMI is a simple tool and does not account for body composition.
                    It can&apos;t tell the difference between fat and muscle. A muscular
                    athlete might have a high BMI but be very healthy. For a better
                    picture, consider metrics like body fat percentage or
                    waist-to-hip ratio.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <ExportShareControls
        elementIds={["bmi-calculator-inputs", "bmi-calculator-results"]}
        shareParams={shareParams}
        calculatorName={calculatorName}
      />
    </div>
  );
}
