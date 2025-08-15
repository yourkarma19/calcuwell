"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Note: In a real-world application, this data would come from an API.
const MOCK_INFLATION_RATES: { [year: number]: number } = {
  2023: 3.4, 2022: 8.0, 2021: 4.7, 2020: 1.2, 2019: 1.8, 2018: 2.4,
  2017: 2.1, 2016: 1.3, 2015: 0.1, 2014: 1.6, 2013: 1.5, 2012: 2.1,
  2011: 3.2, 2010: 1.6
};

export default function InflationCalculator() {
  const currentYear = new Date().getFullYear();
  const [startYear, setStartYear] = usePersistentState("inflation-start-year", 2010);
  const [endYear, setEndYear] = usePersistentState("inflation-end-year", currentYear);
  const [amount, setAmount] = usePersistentState("inflation-amount", 100);

  const { adjustedAmount, totalInflation } = useMemo(() => {
    const sYear = Math.min(startYear, endYear);
    const eYear = Math.max(startYear, endYear);
    let currentAmount = Number(amount);
    let cumulativeInflation = 1;

    if (sYear >= eYear) {
      return { adjustedAmount: currentAmount, totalInflation: 0 };
    }

    for (let year = sYear; year < eYear; year++) {
      const rate = MOCK_INFLATION_RATES[year];
      if (rate !== undefined) {
        cumulativeInflation *= (1 + rate / 100);
      }
    }
    
    let finalAmount = currentAmount * cumulativeInflation;
    
    // If calculating from a future year to a past year, we need to deflate
    if(startYear > endYear) {
      finalAmount = currentAmount / cumulativeInflation;
    }

    return { 
      adjustedAmount: finalAmount, 
      totalInflation: (cumulativeInflation - 1) * 100 
    };

  }, [startYear, endYear, amount]);

  const yearOptions = Object.keys(MOCK_INFLATION_RATES).map(Number).sort((a,b) => b-a);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Inflation Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-year">Start Year</Label>
                 <select id="start-year" value={startYear} onChange={e => setStartYear(Number(e.target.value))} className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md">
                   {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                 </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-year">End Year</Label>
                 <select id="end-year" value={endYear} onChange={e => setEndYear(Number(e.target.value))} className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md">
                   {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                 </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Value of ₹{amount.toLocaleString()} from {startYear} in {endYear}
              </p>
              <p className="text-4xl font-bold font-headline text-primary">
                ₹{adjustedAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Inflation</p>
              <p className="text-2xl font-semibold">
                {totalInflation.toFixed(2)}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
