
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BreakEvenPointCalculator() {
  const [fixedCosts, setFixedCosts] = usePersistentState("bep-fixed", 10000);
  const [variableCost, setVariableCost] = usePersistentState("bep-variable", 20);
  const [pricePerUnit, setPricePerUnit] = usePersistentState("bep-price", 50);

  const { breakEvenUnits, breakEvenRevenue } = useMemo(() => {
    const fc = Number(fixedCosts);
    const vc = Number(variableCost);
    const ppu = Number(pricePerUnit);

    const contributionMargin = ppu - vc;
    if (contributionMargin <= 0) {
      return { breakEvenUnits: Infinity, breakEvenRevenue: Infinity };
    }

    const units = fc / contributionMargin;
    const revenue = units * ppu;

    return { breakEvenUnits: units, breakEvenRevenue: revenue };
  }, [fixedCosts, variableCost, pricePerUnit]);

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
  };
  
  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Cost Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fixed-costs">Total Fixed Costs</Label>
              <Input id="fixed-costs" type="number" value={fixedCosts} onChange={e => setFixedCosts(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="variable-cost">Variable Cost Per Unit</Label>
                <Input id="variable-cost" type="number" value={variableCost} onChange={e => setVariableCost(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price-per-unit">Price Per Unit</Label>
                <Input id="price-per-unit" type="number" value={pricePerUnit} onChange={e => setPricePerUnit(Number(e.target.value))} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Break-Even Point</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Break-Even in Units</p>
              <p className="text-4xl font-bold font-headline text-primary">
                {isFinite(breakEvenUnits) ? Math.ceil(breakEvenUnits).toLocaleString() : "N/A"}
              </p>
            </div>
             <div>
              <p className="text-sm text-muted-foreground">Break-Even in Revenue</p>
              <p className="text-2xl font-semibold">
                {isFinite(breakEvenRevenue) ? formatCurrency(breakEvenRevenue) : "N/A"}
              </p>
            </div>
             <p className="text-xs text-muted-foreground pt-2">This is the point at which your total revenue equals your total costs.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
