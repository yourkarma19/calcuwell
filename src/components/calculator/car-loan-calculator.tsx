"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function CarLoanCalculator({ setFormula }: { setFormula: (formula: string) => void }) {
  const [carPrice, setCarPrice] = usePersistentState("car-loan-price", 25000);
  const [downPayment, setDownPayment] = usePersistentState("car-loan-downpayment", 5000);
  const [tradeInValue, setTradeInValue] = usePersistentState("car-loan-tradein", 2000);
  const [rate, setRate] = usePersistentState("car-loan-rate", 7.5);
  const [tenure, setTenure] = usePersistentState("car-loan-tenure", 5);

  const { emi, totalPayable, totalInterest, loanAmount } = useMemo(() => {
    const principal = carPrice - downPayment - tradeInValue;
    if (principal > 0 && rate > 0 && tenure > 0) {
      const monthlyRate = rate / 12 / 100;
      const numberOfMonths = tenure * 12;
      const emiValue =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
        (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
      
      if (isFinite(emiValue)) {
        const totalPayableValue = emiValue * numberOfMonths;
        const totalInterestValue = totalPayableValue - principal;
        return {
          emi: emiValue,
          totalPayable: totalPayableValue,
          totalInterest: totalInterestValue,
          loanAmount: principal,
        };
      }
    }
    return { emi: 0, totalPayable: 0, totalInterest: 0, loanAmount: Math.max(0, principal) };
  }, [carPrice, downPayment, tradeInValue, rate, tenure]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Car Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="car-price">Car Price</Label>
              <Input id="car-price" type="number" value={carPrice} onChange={(e) => setCarPrice(Number(e.target.value))} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="down-payment">Down Payment</Label>
                <Input id="down-payment" type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trade-in">Trade-in Value</Label>
                <Input id="trade-in" type="number" value={tradeInValue} onChange={(e) => setTradeInValue(Number(e.target.value))} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate">Interest Rate (% p.a.)</Label>
              <div className="flex items-center gap-4">
                <Slider id="rate" value={[rate]} onValueChange={(value) => setRate(value[0])} min={1} max={25} step={0.05} />
                <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-24" step="0.05" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tenure">Loan Tenure (Years)</Label>
               <div className="flex items-center gap-4">
                <Slider id="tenure" value={[tenure]} onValueChange={(value) => setTenure(value[0])} min={1} max={10} step={1} />
                <Input type="number" value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Car Loan Fundamentals</CardTitle></CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is an EMI?</AccordionTrigger>
                <AccordionContent>
                  An Equated Monthly Installment (EMI) is the fixed payment amount a borrower makes to a lender each month. It includes both the principal amount and the interest on the loan, ensuring the loan is fully paid off over the specified tenure.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How is the total cost calculated?</AccordionTrigger>
                <AccordionContent>
                  The total cost of the car includes the principal loan amount, all the interest paid over the loan's life, and any initial down payment or trade-in value you provided. It's the complete out-of-pocket expense for the vehicle.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Your Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
             <div>
                <p className="text-sm text-muted-foreground">Monthly Payment (EMI)</p>
                <p className="text-4xl font-bold font-headline text-primary">
                  ₹ {emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Loan Amount:</span>
                    <span className="font-semibold">₹ {loanAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                </div>
                 <div className="flex justify-between">
                    <span>Total Interest:</span>
                    <span className="font-semibold">₹ {totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                </div>
                 <div className="flex justify-between font-medium border-t pt-2 mt-2">
                    <span>Total Cost of Car:</span>
                    <span>₹ {(totalPayable + downPayment + tradeInValue).toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
