
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { calculateEMI } from "@/lib/math/loan-emi";

export default function LoanEMICalculator() {
  const [principal, setPrincipal] = usePersistentState("loan-principal", 500000);
  const [rate, setRate] = usePersistentState("loan-rate", 8.5);
  const [tenure, setTenure] = usePersistentState("loan-tenure", 5);

  const { emi, totalPayable, totalInterest } = useMemo(() => {
    return calculateEMI(principal, rate, tenure);
  }, [principal, rate, tenure]);
  
  const chartData = useMemo(() => ([
      { name: "Principal", value: principal, fill: "hsl(var(--chart-1))" },
      { name: "Interest", value: totalInterest, fill: "hsl(var(--chart-2))" },
  ]), [principal, totalInterest]);

  const chartConfig = {
      principal: {
        label: "Principal",
        color: "hsl(var(--chart-1))",
      },
      interest: {
        label: "Interest",
        color: "hsl(var(--chart-2))",
      },
  }

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="principal">Loan Amount</Label>
                <span className="text-lg font-semibold">₹ {principal.toLocaleString("en-IN")}</span>
              </div>
              <Slider
                id="principal"
                value={[principal]}
                onValueChange={(value) => setPrincipal(value[0])}
                min={10000}
                max={10000000}
                step={10000}
              />
            </div>

            <div className="space-y-2">
               <div className="flex justify-between items-center">
                <Label htmlFor="rate">Interest Rate (% p.a.)</Label>
                <span className="text-lg font-semibold">{rate.toFixed(2)} %</span>
              </div>
              <Slider
                id="rate"
                value={[rate]}
                onValueChange={(value) => setRate(value[0])}
                min={0}
                max={20}
                step={0.05}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                <span className="text-lg font-semibold">{tenure} Years</span>
              </div>
              <Slider
                id="tenure"
                value={[tenure]}
                onValueChange={(value) => setTenure(value[0])}
                min={1}
                max={30}
                step={1}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader><CardTitle>Loan Breakdown</CardTitle></CardHeader>
            <CardContent className="h-[25rem]">
                <ChartContainer config={chartConfig} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip
                            cursor={false}
                            content={<ChartTooltipContent 
                                formatter={(value, name) => `${name}: ₹${Number(value).toLocaleString('en-IN', {maximumFractionDigits: 0})}`}
                                />}
                            />
                            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius="30%" outerRadius="80%" strokeWidth={5} labelLine={false} label>
                                {chartData.map((entry) => (
                                    <Cell key={entry.name} fill={entry.fill} />
                                ))}
                            </Pie>
                            <ChartLegend content={<ChartLegendContent />} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
        
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Your Loan EMI</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4" aria-live="polite">
             <div>
                <p className="text-sm text-muted-foreground">Monthly EMI</p>
                <p className="text-4xl font-bold font-headline text-primary">
                  ₹ {emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm text-left border-t pt-2">
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Principal Amount:</span>
                    <span className="font-semibold">₹ {principal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Interest:</span>
                    <span className="font-semibold">₹ {totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                </div>
                 <div className="flex justify-between font-bold">
                    <span className="text-muted-foreground">Total Payable:</span>
                    <span className="font-semibold">₹ {totalPayable.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
