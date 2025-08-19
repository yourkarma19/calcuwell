
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
    <div className="space-y-6">
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
    </div>
  );
}
