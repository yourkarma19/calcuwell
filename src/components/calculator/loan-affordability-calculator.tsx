
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function LoanAffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = usePersistentState("la-income", 60000);
  const [monthlyDebt, setMonthlyDebt] = usePersistentState("la-debt", 500);
  const [interestRate, setInterestRate] = usePersistentState("la-rate", 7);
  const [loanTerm, setLoanTerm] = usePersistentState("la-term", 30);
  const [dtiRatio, setDtiRatio] = usePersistentState("la-dti", 43); // Debt-to-income ratio

  const { affordableLoan, monthlyPayment } = useMemo(() => {
    const monthlyIncome = annualIncome / 12;
    const maxMonthlyPaymentForHousing = (monthlyIncome * (dtiRatio / 100)) - monthlyDebt;
    
    if (maxMonthlyPaymentForHousing <= 0) {
      return { affordableLoan: 0, monthlyPayment: 0 };
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    if (monthlyInterestRate <= 0) {
      return { affordableLoan: maxMonthlyPaymentForHousing * numberOfPayments, monthlyPayment: maxMonthlyPaymentForHousing }
    }

    const affordableLoanAmount = maxMonthlyPaymentForHousing * 
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1) / 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments));

    return { 
      affordableLoan: isFinite(affordableLoanAmount) ? affordableLoanAmount : 0, 
      monthlyPayment: maxMonthlyPaymentForHousing 
    };
  }, [annualIncome, monthlyDebt, interestRate, loanTerm, dtiRatio]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Details</CardTitle>
            <CardDescription>Enter your financial details to estimate the loan amount you might be able to afford.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="annual-income">Annual Income</Label>
              <Input id="annual-income" type="number" value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly-debt">Monthly Debt Payments</Label>
              <Input id="monthly-debt" type="number" value={monthlyDebt} onChange={e => setMonthlyDebt(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                <Input id="interest-rate" type="number" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loan-term">Loan Term (Years)</Label>
                <Input id="loan-term" type="number" value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Debt-to-Income (DTI) Ratio (%)</Label>
                <span>{dtiRatio}%</span>
              </div>
              <Slider value={[dtiRatio]} onValueChange={v => setDtiRatio(v[0])} min={20} max={50} step={1} />
            </div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>About Loan Affordability</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The **Loan Affordability Calculator** is a crucial first step in your borrowing journey, whether for a home, car, or personal expense. It helps you understand how much you can realistically borrow based on your income and existing financial commitments. By providing a clear estimate, this tool empowers you to set realistic expectations, avoid taking on too much debt, and approach lenders with confidence.</p>

                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter your total gross **Annual Income**.</li>
                    <li>Provide your total **Monthly Debt Payments** (e.g., credit card bills, other loans).</li>
                    <li>Input the estimated **Interest Rate** and **Loan Term** for the new loan.</li>
                    <li>Adjust the **Debt-to-Income (DTI) Ratio** slider. This is the percentage of your income lenders are willing to let you use for debt payments (43% is a common maximum).</li>
                </ol>
                <p>The calculator will instantly show you the maximum loan you can likely afford and the corresponding monthly payment.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is Debt-to-Income (DTI) Ratio?</AccordionTrigger>
                        <AccordionContent>
                            Your debt-to-income (DTI) ratio is the percentage of your gross monthly income that goes to paying your monthly debt payments. Lenders use it to determine your borrowing risk. A lower DTI ratio shows a good balance between debt and income.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Why is DTI important for getting a loan?</AccordionTrigger>
                        <AccordionContent>
                            Lenders use DTI to assess your ability to manage monthly payments and repay debts. A high DTI ratio may signal to lenders that you are overextended financially, making it harder to qualify for a new loan. Generally, lenders prefer a DTI of 43% or less for mortgages.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How can I improve my DTI?</AccordionTrigger>
                        <AccordionContent>
                           You can improve your DTI by either increasing your income or reducing your monthly debt. Strategies include paying down existing loans or credit card balances, avoiding new debt before applying for a major loan, and seeking opportunities to boost your income.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-4">
                        <AccordionTrigger>Is this an official loan offer?</AccordionTrigger>
                        <AccordionContent>
                           No, this is an estimation tool for informational purposes only. The actual loan amount you qualify for may vary based on your credit score, employment history, and the specific lender's criteria. It's designed to give you a strong starting point for your financial planning.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Loan Affordability</CardTitle></CardHeader>
          <CardContent className="text-center space-y-4" aria-live="polite">
            <div>
              <p className="text-sm text-muted-foreground">You Can Afford a Loan Of</p>
              <p className="text-4xl font-bold font-headline text-primary">₹{affordableLoan.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Monthly Payment</p>
              <p className="text-2xl font-semibold">₹{monthlyPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
