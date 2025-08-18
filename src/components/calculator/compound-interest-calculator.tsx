"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function CompoundInterestCalculator({ setFormula }: { setFormula: (formula: string) => void }) {
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
              <Label htmlFor="principal">Principal Amount</Label>
               <div className="flex items-center gap-4">
                <Slider id="principal" value={[principal]} onValueChange={(v) => setPrincipal(v[0])} min={1000} max={10000000} step={1000} />
                <Input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-32" step="1000" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (% p.a.)</Label>
               <div className="flex items-center gap-4">
                <Slider id="rate" value={[rate]} onValueChange={(v) => setRate(v[0])} min={1} max={30} step={0.05} />
                <Input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-24" step="0.05" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tenure">Investment Tenure (Years)</Label>
                <div className="flex items-center gap-4">
                  <Slider id="tenure" value={[tenure]} onValueChange={(v) => setTenure(v[0])} min={1} max={50} step={1} />
                   <Input type="number" value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-24" />
                </div>
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
        <Card>
            <CardHeader>
                <CardTitle>Understanding Compound Interest</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The <strong>Compound Interest Calculator</strong> demonstrates one of the most powerful concepts in finance: how your money can grow exponentially over time. By reinvesting the interest you earn, your investment base gets larger, leading to even more interest in the next period. This "interest on interest" effect can significantly boost your savings over the long term.</p>
                
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter the <strong>Principal Amount</strong> you are starting with.</li>
                    <li>Set the estimated annual <strong>Interest Rate</strong>.</li>
                    <li>Choose the <strong>Investment Tenure</strong> in years.</li>
                    <li>Select the <strong>Compounding Frequency</strong> (how often interest is calculated and added).</li>
                </ol>
                <p>The results will show the total future value of your investment and the total interest earned.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold">What is the formula for compound interest?</AccordionTrigger>
                        <AccordionContent>
                           <p>The formula to calculate the future value (A) of an investment is:</p>
                           <p className="font-mono bg-muted p-2 rounded-md text-center my-2">A = P(1 + r/n)^(nt)</p>
                           <p>Where:</p>
                           <ul className="list-disc pl-5">
                               <li><strong>A</strong> = the future value of the investment/loan, including interest</li>
                               <li><strong>P</strong> = the principal investment amount (the initial deposit or loan amount)</li>
                               <li><strong>r</strong> = the annual interest rate (in decimal)</li>
                               <li><strong>n</strong> = the number of times that interest is compounded per year</li>
                               <li><strong>t</strong> = the number of years the money is invested or borrowed for</li>
                           </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-semibold">How does compounding frequency affect my savings?</AccordionTrigger>
                        <AccordionContent>
                            <p>The more frequently interest is compounded, the more you will earn. For example, interest compounded monthly will result in a slightly higher total amount than interest compounded annually at the same interest rate. This is because you start earning interest on your previously earned interest sooner and more often.</p>
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger className="font-semibold">Simple vs. Compound Interest: What's the real difference?</AccordionTrigger>
                        <AccordionContent>
                            <p><strong>Simple interest</strong> is calculated only on the original principal amount. Your interest earnings remain the same every year. <strong>Compound interest</strong> is calculated on the principal amount and also on the accumulated interest from previous periods. This means your investment grows at an accelerating rate, which makes a huge difference over many years.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
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
