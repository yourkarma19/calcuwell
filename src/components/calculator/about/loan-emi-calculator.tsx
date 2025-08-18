
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
                    <CardTitle>About the EMI Calculator</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>Our EMI Calculator helps you find your Equated Monthly Installments (EMI) in just a few clicks. Knowing your EMI in advance allows you to plan your finances better. This tool is useful for home loans, car loans, or personal loans. By entering the loan amount, interest rate, and tenure, you can instantly get your monthly payment and total loan cost.</p>
                    <p>This calculator is great for anyone who wants to make smarter borrowing decisions. It is instant, accurate, and user-friendly.</p>

                    <h3>How to Use the EMI Calculator</h3>
                    <ol>
                        <li>Enter the **Loan Amount** you wish to borrow.</li>
                        <li>Input the **Annual Interest Rate**.</li>
                        <li>Select the **Loan Tenure** (in years).</li>
                    </ol>
                    <p>The calculator will instantly display your monthly EMI. You can also add extra payments to see how it reduces your loan duration and saves you money.</p>
                    
                    <h3>Frequently Asked Questions (FAQs)</h3>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="font-semibold">What is EMI?</AccordionTrigger>
                            <AccordionContent>
                                <p>EMI (Equated Monthly Installment) is the fixed amount you pay each month to repay your loan. It includes both a principal amount and an interest amount. The payment is set up so that the loan is fully paid off by the end of its term.</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="font-semibold">How is EMI calculated?</AccordionTrigger>
                            <AccordionContent>
                                <p>Banks use the formula `EMI = [P x R x (1+R)^N] / [(1+R)^N-1]`. In this formula, P is the loan amount, R is the monthly interest rate, and N is the number of months.</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="font-semibold">How can I reduce my EMI?</AccordionTrigger>
                            <AccordionContent>
                                <p>You can reduce your EMI by choosing a longer tenure, finding a lower interest rate, or making a larger down payment. A longer tenure will lower the monthly payment, but you will pay more in total interest.</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger className="font-semibold">Why should I use an EMI Calculator?</AccordionTrigger>
                            <AccordionContent>
                                <p>It helps you plan your budget, avoid financial stress by choosing an EMI you can afford, and compare loans from different banks.</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
            
            {principal > 0 && totalInterest > 0 && (
                 <Card>
                    <CardHeader><CardTitle>Loan Breakdown</CardTitle></CardHeader>
                    <CardContent>
                       <LoanBreakdownChart principal={principal} totalInterest={totalInterest} />
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
