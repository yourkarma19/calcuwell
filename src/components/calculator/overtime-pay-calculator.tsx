
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function OvertimePayCalculator() {
  const [hourlyRate, setHourlyRate] = usePersistentState("overtime-rate", 20);
  const [regularHours, setRegularHours] = usePersistentState("overtime-regular-hours", 40);
  const [overtimeHours, setOvertimeHours] = usePersistentState("overtime-overtime-hours", 10);
  const [overtimeMultiplier, setOvertimeMultiplier] = usePersistentState("overtime-multiplier", 1.5);

  const { regularPay, overtimePay, totalPay } = useMemo(() => {
    const rate = Number(hourlyRate);
    const regHours = Number(regularHours);
    const otHours = Number(overtimeHours);
    const multiplier = Number(overtimeMultiplier);

    if (rate <= 0) return { regularPay: 0, overtimePay: 0, totalPay: 0 };

    const regPay = rate * regHours;
    const otPay = otHours * rate * multiplier;
    const totPay = regPay + otPay;

    return { regularPay: regPay, overtimePay: otPay, totalPay: totPay };
  }, [hourlyRate, regularHours, overtimeHours, overtimeMultiplier]);

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  };

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Work Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="hourly-rate">Hourly Rate</Label>
                    <Input id="hourly-rate" type="number" value={hourlyRate} onChange={e => setHourlyRate(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="regular-hours">Regular Hours per Week</Label>
                    <Input id="regular-hours" type="number" value={regularHours} onChange={e => setRegularHours(Number(e.target.value))} />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="overtime-hours">Overtime Hours</Label>
                    <Input id="overtime-hours" type="number" value={overtimeHours} onChange={e => setOvertimeHours(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overtime-multiplier">Overtime Multiplier</Label>
                  <div className="flex items-center gap-4">
                    <Slider id="overtime-multiplier" value={[overtimeMultiplier]} onValueChange={v => setOvertimeMultiplier(v[0])} min={1} max={3} step={0.1} />
                    <Input type="number" value={overtimeMultiplier} onChange={e => setOvertimeMultiplier(Number(e.target.value))} className="w-24" step="0.1" />
                  </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Pay Summary</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Pay</p>
              <p className="text-4xl font-bold font-headline text-primary">
                {formatCurrency(totalPay)}
              </p>
            </div>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Regular Pay:</span>
                    <span className="font-semibold">{formatCurrency(regularPay)}</span>
                </div>
                 <div className="flex justify-between">
                    <span>Overtime Pay:</span>
                    <span className="font-semibold">{formatCurrency(overtimePay)}</span>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
