
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

interface AboutLoanEMICalculatorProps {
    principal: number;
    totalInterest: number;
}

const LoanBreakdownChart = dynamic(
    () => import('@/components/charts/loan-breakdown-chart').then(mod => mod.LoanBreakdownChart),
    { 
        ssr: false,
        loading: () => <Skeleton className="w-full h-[25rem]" />
    }
);


export default function AboutLoanEMICalculator({ principal, totalInterest }: AboutLoanEMICalculatorProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle as="h2">About the EMI Calculator</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>Our EMI Calculator helps you find your Equated Monthly Installments (EMI) in just a few clicks. Knowing your EMI in advance allows you to plan your finances better. This tool is useful for home loans, car loans, or personal loans. By entering the loan amount, interest rate, and tenure, you can instantly get your monthly payment and total loan cost.</p>
                    
                    <h2>How to Use the EMI Calculator</h2>
                    <ol>
                        <li>Enter the **Loan Amount** you wish to borrow.</li>
                        <li>Input the **Annual Interest Rate**.</li>
                        <li>Select the **Loan Tenure** (in years).</li>
                        <li>(Optional) Add any extra monthly or yearly payments to see how it reduces your loan duration and saves you money.</li>
                    </ol>
                    
                    <h2>Understanding Your EMI Results</h2>
                    <ul>
                        <li><strong>Monthly EMI:</strong> This is the fixed amount you will pay to the bank every month.</li>
                        <li><strong>Total Interest Payable:</strong> This shows the *cost* of borrowing the money. A lower figure here is always better.</li>
                        <li><strong>Total Payment:</strong> This is the sum of the principal loan amount and the total interest.</li>
                    </ul>

                    <h2>EMI FAQs</h2>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="font-semibold">What is the formula for calculating EMI?</AccordionTrigger>
                            <AccordionContent>
                                <p>The formula used to calculate EMI is:</p>
                                <p className="font-mono bg-muted p-2 rounded-md text-center my-2">EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ - 1)</p>
                                <p>Where: <strong>P</strong> is the Principal Loan Amount, <strong>r</strong> is the monthly interest rate, and <strong>n</strong> is the number of monthly installments.</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="font-semibold">How can I reduce my EMI?</AccordionTrigger>
                            <AccordionContent>
                                <p>You can reduce your EMI by choosing a longer tenure, but this means you pay more in total interest. The best ways to lower your loan burden are to make a larger down payment, find a lower interest rate by comparing offers, or make prepayments whenever possible.</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="font-semibold">Why should I use an EMI Calculator?</AccordionTrigger>
                            <AccordionContent>
                                <p>It helps you plan your budget, avoid financial stress by choosing an EMI you can afford, compare loans from different banks, and understand the real cost of borrowing money over time.</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
            
            {principal > 0 && totalInterest > 0 && (
                 <Card>
                    <CardHeader><CardTitle as="h2">Loan Breakdown</CardTitle></CardHeader>
                    <CardContent>
                       <LoanBreakdownChart principal={principal} totalInterest={totalInterest} />
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
