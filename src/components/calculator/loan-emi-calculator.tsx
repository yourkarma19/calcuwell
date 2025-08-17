
"use client";

import { useState, useMemo, useEffect } from "react";
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
import { calculateEMI, calculateEMIWithExtraPayments } from "@/lib/math/loan-emi";
import { useSearchParams } from "next/navigation";
import { Info } from "lucide-react";
import { format } from "path";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function LoanEMICalculator({ setFormula }: { setFormula: (formula: string) => void }) {
  const searchParams = useSearchParams();
  const [principal, setPrincipal] = usePersistentState("loan-principal", 0);
  const [rate, setRate] = usePersistentState("loan-rate", 0);
  const [tenure, setTenure] = usePersistentState("loan-tenure", 0);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = usePersistentState("loan-extra-monthly", 0);
  const [extraYearlyPayment, setExtraYearlyPayment] = usePersistentState("loan-extra-yearly", 0);

  useEffect(() => {
    const p = searchParams.get('principal');
    const r = searchParams.get('rate');
    const t = searchParams.get('tenure');
    if (p) setPrincipal(parseFloat(p));
    if (r) setRate(parseFloat(r));
    if (t) setTenure(parseFloat(t));
  }, [searchParams, setPrincipal, setRate, setTenure]);
  
  useEffect(() => {
    if (principal === 0) setPrincipal(500000);
    if (rate === 0) setRate(8.5);
    if (tenure === 0) setTenure(5);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const { emi, totalPayable, totalInterest } = useMemo(() => {
    return calculateEMI(principal, rate, tenure);
  }, [principal, rate, tenure]);

  const { newTotalInterest, newTotalMonths, interestSaved, timeSaved } = useMemo(() => {
    if (extraMonthlyPayment > 0 || extraYearlyPayment > 0) {
      return calculateEMIWithExtraPayments(principal, rate, tenure, extraMonthlyPayment, extraYearlyPayment);
    }
    return { newTotalInterest: 0, newTotalMonths: 0, interestSaved: 0, timeSaved: { years: 0, months: 0 }};
  }, [principal, rate, tenure, extraMonthlyPayment, extraYearlyPayment]);
  
  const originalTotalMonths = tenure * 12;

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

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
  };
  
  const formatTime = (totalMonths: number) => {
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      return `${years} yr, ${months} mo`;
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
              <Label htmlFor="principal">Loan Amount</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="principal"
                  value={[principal]}
                  onValueChange={(value) => setPrincipal(value[0])}
                  min={10000}
                  max={10000000}
                  step={10000}
                />
                <Input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-32" step="10000" />
              </div>
            </div>

            <div className="space-y-2">
               <Label htmlFor="rate">Interest Rate (% p.a.)</Label>
               <div className="flex items-center gap-4">
                <Slider
                  id="rate"
                  value={[rate]}
                  onValueChange={(value) => setRate(value[0])}
                  min={0}
                  max={20}
                  step={0.05}
                />
                <Input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-24" step="0.05" />
               </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tenure">Loan Tenure (Years)</Label>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="extra-monthly">Extra Monthly Payment (Optional)</Label>
                <Input type="number" value={extraMonthlyPayment} onChange={e => setExtraMonthlyPayment(Number(e.target.value))} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="extra-yearly">Extra Yearly Payment (Optional)</Label>
                <Input type="number" value={extraYearlyPayment} onChange={e => setExtraYearlyPayment(Number(e.target.value))} className="w-full" />
              </div>
            </div>

          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>About Loan EMIs</CardTitle></CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is an EMI?</AccordionTrigger>
                <AccordionContent>
                  An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do extra payments help?</AccordionTrigger>
                <AccordionContent>
                  By paying more than your required EMI, the extra amount goes directly towards reducing your outstanding principal balance. This helps you pay off the loan faster and significantly reduces the total amount of interest you'll pay over the life of the loan.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What is the formula for EMI?</AccordionTrigger>
                <AccordionContent>
                  The formula used to calculate EMI is: `EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ - 1)` where P is the principal loan amount, r is the monthly interest rate (annual rate / 12), and n is the number of monthly installments (tenure in years × 12).
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
                  {formatCurrency(emi)}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm text-left border-t pt-2">
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Principal Amount:</span>
                    <span className="font-semibold">{formatCurrency(principal)}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Interest:</span>
                    <span className="font-semibold">{formatCurrency(totalInterest)}</span>
                </div>
                 <div className="flex justify-between font-bold">
                    <span className="text-muted-foreground">Total Payable:</span>
                    <span className="font-semibold">{formatCurrency(totalPayable)}</span>
                </div>
            </div>
            {(extraMonthlyPayment > 0 || extraYearlyPayment > 0) && interestSaved > 0 && (
              <div className="space-y-2 text-sm text-left border-t pt-4 mt-4">
                <p className="font-bold text-center text-primary">With Extra Payments</p>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">New Loan Term:</span>
                    <span className="font-semibold">{formatTime(newTotalMonths)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Saved:</span>
                    <span className="font-semibold">{timeSaved.years} yr, {timeSaved.months} mo</span>
                </div>
                <div className="flex justify-between font-bold text-green-600">
                    <span className="text-muted-foreground">Interest Saved:</span>
                    <span className="font-semibold">{formatCurrency(interestSaved)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
