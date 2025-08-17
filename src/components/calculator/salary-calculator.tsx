
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = usePersistentState("salary-gross", 50000);
  const [payPeriod, setPayPeriod] = usePersistentState<"annually" | "monthly">("salary-period", "annually");
  const [taxRate, setTaxRate] = usePersistentState("salary-tax", 20);
  const [otherDeductions, setOtherDeductions] = usePersistentState("salary-deductions", 0);

  const { netSalary, totalTax, annualSalary, annualDeductions } = useMemo(() => {
    const gross = Number(grossSalary);
    const tax = Number(taxRate);
    const deductions = Number(otherDeductions);

    if (gross <= 0) return { netSalary: 0, totalTax: 0, annualSalary: 0, annualDeductions: 0 };
    
    const annualGross = payPeriod === 'annually' ? gross : gross * 12;
    const taxAmount = annualGross * (tax / 100);
    const annualDed = payPeriod === 'annually' ? deductions : deductions * 12;
    const totalAnnualDeductions = taxAmount + annualDed;
    
    const netAnnualSalary = annualGross - totalAnnualDeductions;
    const netPayPeriodSalary = payPeriod === 'annually' ? netAnnualSalary : netAnnualSalary / 12;

    return {
      netSalary: netPayPeriodSalary,
      totalTax: taxAmount,
      annualSalary: annualGross,
      annualDeductions: annualDed
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
            <CardDescription>Calculate your take-home pay by providing your gross salary and any applicable deductions.</CardDescription>
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
              <Label htmlFor="tax-rate">Estimated Income Tax Rate (%)</Label>
              <div className="flex items-center gap-4">
                <Slider id="tax-rate" value={[taxRate]} onValueChange={v => setTaxRate(v[0])} min={0} max={50} step={0.5} />
                <Input type="number" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} className="w-24" step="0.5" />
              </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="other-deductions">Other Deductions (per period)</Label>
                <Input id="other-deductions" type="number" value={otherDeductions} onChange={e => setOtherDeductions(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>About Salary Calculations</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The **Salary Calculator** is a practical tool for anyone wanting to understand their true earnings after taxes and other deductions. It helps bridge the gap between the "gross salary" offered by an employer and the actual "net salary" or "take-home pay" that you receive. This is crucial for accurate budgeting, financial planning, and managing your expenses effectively.</p>

                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter your **Gross Salary** amount.</li>
                    <li>Select the **Pay Period** (Annually or Monthly).</li>
                    <li>Set your estimated **Income Tax Rate** as a percentage.</li>
                    <li>Add any **Other Deductions** you have per pay period (e.g., retirement contributions, insurance).</li>
                </ol>
                <p>The calculator will instantly break down your take-home pay and show you how much goes towards taxes and other deductions annually.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Gross Salary vs. Net Salary</AccordionTrigger>
                        <AccordionContent>
                            **Gross salary** is the total amount of money an employer agrees to pay an employee before any taxes or deductions are taken out. **Net salary**, or take-home pay, is the amount of money you receive in your bank account after all mandatory and voluntary deductions have been subtracted.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What are common deductions?</AccordionTrigger>
                        <AccordionContent>
                            Common deductions include income tax (at central and sometimes state levels), social security contributions (like provident fund), retirement plan contributions (like a 401(k) or pension), health insurance premiums, and other voluntary deductions like union dues or charitable giving.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Why is my tax rate an estimate?</AccordionTrigger>
                        <AccordionContent>
                           Income tax is often progressive, meaning the rate increases as your income increases. Different portions of your income are taxed at different rates (tax brackets). This calculator uses a single, blended tax rate for simplicity. For a precise calculation, you would need to consult official tax tables for your jurisdiction.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
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
            <div className="space-y-2 text-sm text-left border-t pt-4">
                <div className="flex justify-between">
                    <span>Annual Gross Salary:</span>
                    <span className="font-semibold">{formatCurrency(annualSalary)}</span>
                </div>
                 <div className="flex justify-between">
                    <span>Annual Tax:</span>
                    <span className="font-semibold">{formatCurrency(totalTax)}</span>
                </div>
                 <div className="flex justify-between">
                    <span>Annual Other Deductions:</span>
                    <span className="font-semibold">{formatCurrency(annualDeductions)}</span>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
