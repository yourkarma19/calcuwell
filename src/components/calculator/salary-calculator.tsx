"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = usePersistentState("salary-gross", 50000);
  const [payPeriod, setPayPeriod] = usePersistentState<"annually" | "monthly">("salary-period", "annually");
  const [taxRate, setTaxRate] = usePersistentState("salary-tax", 20);
  const [otherDeductions, setOtherDeductions] = usePersistentState("salary-deductions", 0);

  const { netSalary, totalTax, annualSalary } = useMemo(() => {
    const gross = Number(grossSalary);
    const tax = Number(taxRate);
    const deductions = Number(otherDeductions);

    if (gross <= 0) return { netSalary: 0, totalTax: 0, annualSalary: 0 };
    
    const annualGross = payPeriod === 'annually' ? gross : gross * 12;
    const taxAmount = annualGross * (tax / 100);
    const annualDeductions = payPeriod === 'annually' ? deductions : deductions * 12;
    const totalAnnualDeductions = taxAmount + annualDeductions;
    
    const netAnnualSalary = annualGross - totalAnnualDeductions;
    const netPayPeriodSalary = payPeriod === 'annually' ? netAnnualSalary : netAnnualSalary / 12;

    return {
      netSalary: netPayPeriodSalary,
      totalTax: taxAmount,
      annualSalary: annualGross
    };

  }, [grossSalary, payPeriod, taxRate, otherDeductions]);

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
  };

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Salary & Deductions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gross-salary">Gross Salary</Label>
                <Input id="gross-salary" type="number" value={grossSalary} onChange={e => setGrossSalary(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pay-period">Pay Period</Label>
                <Select value={payPeriod} onValueChange={v => setPayPeriod(v as any)}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="annually">Annually</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="tax-rate">Income Tax Rate (%)</Label>
                <span className="text-lg font-semibold">{taxRate}%</span>
              </div>
              <Slider id="tax-rate" value={[taxRate]} onValueChange={v => setTaxRate(v[0])} min={0} max={50} step={0.5} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="other-deductions">Other Deductions (per period)</Label>
                <Input id="other-deductions" type="number" value={otherDeductions} onChange={e => setOtherDeductions(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Take-Home Pay</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground capitalize">Net {payPeriod} Salary</p>
              <p className="text-4xl font-bold font-headline text-primary">
                {formatCurrency(netSalary)}
              </p>
            </div>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Annual Gross:</span>
                    <span className="font-semibold">{formatCurrency(annualSalary)}</span>
                </div>
                 <div className="flex justify-between">
                    <span>Annual Tax:</span>
                    <span className="font-semibold">{formatCurrency(totalTax)}</span>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
