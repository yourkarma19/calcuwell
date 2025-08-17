
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const calculateStats = (numbers: number[]) => {
  if (numbers.length === 0) {
    return { mean: 0, median: 0, mode: [], sum: 0, count: 0 };
  }

  // Mean
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  const mean = sum / numbers.length;

  // Median
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  // Mode
  const frequency: { [key: number]: number } = {};
  let maxFreq = 0;
  for (const num of numbers) {
    frequency[num] = (frequency[num] || 0) + 1;
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num];
    }
  }
  
  const mode: number[] = [];
  if (maxFreq > 1) {
    for (const num in frequency) {
      if (frequency[num] === maxFreq) {
        mode.push(Number(num));
      }
    }
  }

  return { mean, median, mode, sum, count: numbers.length };
};

export default function MeanMedianModeCalculator() {
  const [input, setInput] = useState("1, 2, 3, 4, 5, 5, 6, 7, 8, 9");

  const stats = useMemo(() => {
    const numbers = input
      .split(/[\s,]+/)
      .filter(n => n !== "")
      .map(Number)
      .filter(n => !isNaN(n));
    return calculateStats(numbers);
  }, [input]);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mean, Median & Mode Calculator</CardTitle>
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
        <CardHeader><CardTitle>Statistical Results</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Mean</p>
            <p className="text-2xl font-bold font-headline text-primary">{stats.mean.toFixed(4)}</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Median</p>
            <p className="text-2xl font-bold font-headline text-primary">{stats.median.toFixed(4)}</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Mode</p>
            <p className="text-2xl font-bold font-headline text-primary truncate">
              {stats.mode.length > 0 ? stats.mode.join(', ') : 'N/A'}
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Sum</p>
            <p className="text-2xl font-bold font-headline text-primary">{stats.sum.toLocaleString()}</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Count</p>
            <p className="text-2xl font-bold font-headline text-primary">{stats.count}</p>
          </div>
        </CardContent>
      </Card>
       <Card>
        <CardHeader><CardTitle>Understanding Mean, Median, and Mode</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our **Mean, Median, and Mode Calculator** is a fundamental statistical tool that helps you understand the center of a numerical dataset. These three measures—mean, median, and mode—are all different ways of describing what's "typical" or "average" in a set of numbers. This calculator not only gives you the answers instantly but also calculates the sum and count of your data.</p>
            
            <h3>How to Use the Calculator</h3>
            <p>Simply enter your set of numbers into the text box. You can separate the numbers with commas, spaces, or line breaks. The calculator will process the data and display the results for mean, median, mode, sum, and count in real-time.</p>

            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold">Mean vs. Median vs. Mode: What's the Difference?</AccordionTrigger>
                    <AccordionContent>
                        <p>The **mean** is the arithmetic average of all numbers in a data set (the sum of the numbers divided by the count). The **median** is the middle value when the data is sorted in ascending order. The **mode** is the number that appears most frequently in the set.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="font-semibold">When should I use mean vs. median?</AccordionTrigger>
                    <AccordionContent>
                        <p>Use the **mean** for data that is symmetrically distributed (like test scores or heights), where there are no extreme outliers. Use the **median** for skewed data, such as income levels or house prices, because it isn't affected by a few extremely high or low values. The median gives a better sense of the "typical" value in such cases.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="font-semibold">How do you calculate each measure manually?</AccordionTrigger>
                    <AccordionContent>
                       <ul className="list-disc pl-5">
                            <li>**Mean:** Add up all the numbers and divide by how many numbers there are.</li>
                            <li>**Median:** Sort the numbers from smallest to largest. If there's an odd number of values, the median is the one in the middle. If there's an even number, the median is the average of the two middle numbers.</li>
                            <li>**Mode:** Count how many times each number appears. The number that appears most often is the mode.</li>
                       </ul>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                    <AccordionTrigger className="font-semibold">What if there is no mode?</AccordionTrigger>
                    <AccordionContent>
                       <p>If no number in the dataset repeats, then there is no mode. A dataset can also have more than one mode (bimodal or multimodal) if multiple numbers appear with the same highest frequency. This calculator will display all modes if they exist, or "N/A" if no mode is found.</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
