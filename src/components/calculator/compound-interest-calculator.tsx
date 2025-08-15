"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = usePersistentState("ci-principal", 10000);
  const [rate, setRate] = usePersistentState("ci-rate", 7);
  const [tenure, setTenure] = usePersistentState("ci-tenure", 10);
  const [compoundingFrequency, setCompoundingFrequency] = usePersistentState("ci-frequency", 12);

  const { totalAmount, totalInterest } = useMemo(() => {
    const P = Number(principal);
    const r = Number(rate) / 100;
    const t = Number(tenure);
    const n = Number(compoundingFrequency);

    if (P > 0 && r > 0 && t > 0 && n > 0) {
      const amount = P * Math.pow(1 + r / n, n * t);
      const interest = amount - P;
      return { totalAmount: amount, totalInterest: interest };
    }
    return { totalAmount: 0, totalInterest: 0 };
  }, [principal, rate, tenure, compoundingFrequency]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Investment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="principal">Principal Amount</Label>
                <span className="text-lg font-semibold">₹ {principal.toLocaleString("en-IN")}</span>
              </div>
              <Slider id="principal" value={[principal]} onValueChange={(v) => setPrincipal(v[0])} min={1000} max={10000000} step={1000} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="rate">Annual Interest Rate (% p.a.)</Label>
                <span className="text-lg font-semibold">{rate.toFixed(2)} %</span>
              </div>
              <Slider id="rate" value={[rate]} onValueChange={(v) => setRate(v[0])} min={1} max={30} step={0.05} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="tenure">Investment Tenure (Years)</Label>
                  <span className="text-lg font-semibold">{tenure}</span>
                </div>
                <Slider id="tenure" value={[tenure]} onValueChange={(v) => setTenure(v[0])} min={1} max={50} step={1} />
              </div>
              <div className="space-y-2">
                <Label>Compounding Frequency</Label>
                <Select value={String(compoundingFrequency)} onValueChange={(v) => setCompoundingFrequency(Number(v))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Annually</SelectItem>
                    <SelectItem value="2">Semi-Annually</SelectItem>
                    <SelectItem value="4">Quarterly</SelectItem>
                    <SelectItem value="12">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Investment Projection</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-4xl font-bold font-headline text-primary">₹ {totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Interest Earned</p>
              <p className="text-2xl font-semibold">₹ {totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
