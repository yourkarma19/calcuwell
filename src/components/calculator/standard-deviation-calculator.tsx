
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const calculateStandardDeviation = (numbers: number[]) => {
  if (numbers.length < 2) {
    return { populationStdDev: 0, sampleStdDev: 0, mean: 0, variance: 0 };
  }

  const mean = numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
  const variance = numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  
  const populationStdDev = Math.sqrt(variance / numbers.length);
  const sampleStdDev = Math.sqrt(variance / (numbers.length - 1));

  return { populationStdDev, sampleStdDev, mean, variance: variance / numbers.length };
};

export default function StandardDeviationCalculator() {
  const [input, setInput] = useState("1, 2, 3, 4, 5, 6, 7, 8, 9, 10");

  const stats = useMemo(() => {
    const numbers = input
      .split(/[\s,]+/)
      .filter(n => n !== "")
      .map(Number)
      .filter(n => !isNaN(n));
    return calculateStandardDeviation(numbers);
  }, [input]);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Standard Deviation Calculator</CardTitle>
          <CardDescription>Enter numbers separated by commas or spaces.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="numbers-input">Data Set</Label>
            <Textarea
              id="numbers-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              placeholder="e.g., 1, 2, 3, 4, 5"
              className="font-mono"
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Results</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Population Std Dev (σ)</p>
            <p className="text-2xl font-bold font-headline text-primary">{stats.populationStdDev.toFixed(4)}</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Sample Std Dev (s)</p>
            <p className="text-2xl font-bold font-headline text-primary">{stats.sampleStdDev.toFixed(4)}</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Mean (μ)</p>
            <p className="text-2xl font-bold font-headline text-primary">{stats.mean.toFixed(4)}</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Variance (σ²)</p>
            <p className="text-2xl font-bold font-headline text-primary">{stats.variance.toFixed(4)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>About Standard Deviation</CardTitle></CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is Standard Deviation, in Simple Terms?</AccordionTrigger>
                    <AccordionContent>
                        Standard deviation is a measure of how spread out numbers in a data set are from their average (mean). A low standard deviation means the numbers are very close to the average, while a high standard deviation means the numbers are spread out over a wider range. For example, the test scores {85, 88, 90} have a low standard deviation, while {60, 85, 100} have a high one.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>The Difference Between Sample and Population Standard Deviation</AccordionTrigger>
                    <AccordionContent>
                        **Population** refers to the entire group you want to draw conclusions about. **Sample** is a specific group you collect data from. Use the **population standard deviation (σ)** if your data represents the entire population. Use the **sample standard deviation (s)** if your data is a sample of a larger population. The sample formula is slightly different to give a better estimate of the population's spread.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What Does a High or Low Standard Deviation Tell You?</AccordionTrigger>
                    <AccordionContent>
                        A **low standard deviation** indicates that the data points tend to be very close to the mean (the average), meaning the data is consistent and reliable. A **high standard deviation** indicates that the data points are spread out over a large range of values, suggesting more variability and less consistency.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                    <AccordionTrigger>Why is standard deviation important?</AccordionTrigger>
                    <AccordionContent>
                       It's crucial in many fields. In finance, it measures the volatility of an investment. In manufacturing, it's used for quality control to ensure products are consistent. In science, it helps determine if the results of an experiment are statistically significant.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
