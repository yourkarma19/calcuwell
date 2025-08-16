
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = usePersistentState(
    "si-principal",
    100000
  );
  const [rate, setRate] = usePersistentState("si-rate", 5);
  const [tenure, setTenure] = usePersistentState("si-tenure", 5);

  const { totalInterest, totalAmount } = useMemo(() => {
    if (principal > 0 && rate > 0 && tenure > 0) {
      const interest = (principal * rate * tenure) / 100;
      return {
        totalInterest: interest,
        totalAmount: principal + interest,
      };
    }
    return { totalInterest: 0, totalAmount: 0 };
  }, [principal, rate, tenure]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="principal">Principal Amount</Label>
               <div className="flex items-center gap-4">
                <Slider
                  id="principal"
                  value={[principal]}
                  onValueChange={(value) => setPrincipal(value[0])}
                  min={1000}
                  max={10000000}
                  step={1000}
                />
                 <Input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-32" step="1000" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">Interest Rate (% p.a.)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="rate"
                  value={[rate]}
                  onValueChange={(value) => setRate(value[0])}
                  min={1}
                  max={20}
                  step={0.05}
                />
                <Input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-24" step="0.05" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tenure">Tenure (Years)</Label>
               <div className="flex items-center gap-4">
                <Slider
                  id="tenure"
                  value={[tenure]}
                  onValueChange={(value) => setTenure(value[0])}
                  min={1}
                  max={30}
                  step={1}
                />
                <Input type="number" value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Calculation Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Interest</p>
              <p className="text-4xl font-bold font-headline text-primary">
                ₹{" "}
                {totalInterest.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-semibold">
                ₹{" "}
                {totalAmount.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
