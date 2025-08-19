
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Skeleton } from "../ui/skeleton";
import dynamic from "next/dynamic";

const calculateLoanDetails = (principal: number, annualRate: number, tenureYears: number) => {
    if (principal <= 0 || annualRate <= 0 || tenureYears <= 0) {
        return { emi: 0, totalInterest: 0, totalAmount: 0 };
    }
    const monthlyRate = (annualRate / 100) / 12;
    const numberOfMonths = tenureYears * 12;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
    const totalAmount = emi * numberOfMonths;
    const totalInterest = totalAmount - principal;
    
    return { emi, totalInterest, totalAmount };
};

const LoanComparisonResults = dynamic(
    () => import('./loan-comparison-results'),
    { 
        ssr: false,
        loading: () => (
            <div className="space-y-6">
                <Card><CardHeader><Skeleton className="h-8 w-1/2"/></CardHeader><CardContent><Skeleton className="h-12 w-full"/></CardContent></Card>
                <Card><CardHeader><Skeleton className="h-8 w-1/2"/></CardHeader><CardContent><Skeleton className="h-48 w-full"/></CardContent></Card>
                <Card><CardHeader><Skeleton className="h-8 w-1/2"/></CardHeader><CardContent><Skeleton className="h-64 w-full"/></CardContent></Card>
            </div>
        )
    }
);

export default function LoanComparisonCalculator() {
    const [principalA, setPrincipalA] = usePersistentState("lcomp-principalA", 500000);
    const [rateA, setRateA] = usePersistentState("lcomp-rateA", 8.5);
    const [tenureA, setTenureA] = usePersistentState("lcomp-tenureA", 5);

    const [principalB, setPrincipalB] = usePersistentState("lcomp-principalB", 500000);
    const [rateB, setRateB] = usePersistentState("lcomp-rateB", 9.0);
    const [tenureB, setTenureB] = usePersistentState("lcomp-tenureB", 4);
    
    const [showResults, setShowResults] = useState(false);

    const resultsA = useMemo(() => calculateLoanDetails(principalA, rateA, tenureA), [principalA, rateA, tenureA]);
    const resultsB = useMemo(() => calculateLoanDetails(principalB, rateB, tenureB), [principalB, rateB, tenureB]);

    const handleCompare = () => {
        if (resultsA.totalAmount > 0 && resultsB.totalAmount > 0) {
            setShowResults(true);
        } else {
            alert("Please fill in all fields with valid positive numbers.");
        }
    };
    
    return (
        <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card id="loanA">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><span className="flex items-center justify-center w-7 h-7 bg-blue-500 text-white rounded-full">A</span> Loan Option A</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div><Label htmlFor="principalA">Loan Amount (₹)</Label><Input type="number" id="principalA" value={principalA} onChange={e => setPrincipalA(Number(e.target.value))} placeholder="e.g., 500000" /></div>
                        <div><Label htmlFor="rateA">Annual Interest Rate (%)</Label><Input type="number" id="rateA" value={rateA} onChange={e => setRateA(Number(e.target.value))} placeholder="e.g., 8.5" /></div>
                        <div><Label htmlFor="tenureA">Loan Tenure (Years)</Label><Input type="number" id="tenureA" value={tenureA} onChange={e => setTenureA(Number(e.target.value))} placeholder="e.g., 5" /></div>
                    </CardContent>
                </Card>
                 <Card id="loanB">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><span className="flex items-center justify-center w-7 h-7 bg-orange-500 text-white rounded-full">B</span> Loan Option B</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div><Label htmlFor="principalB">Loan Amount (₹)</Label><Input type="number" id="principalB" value={principalB} onChange={e => setPrincipalB(Number(e.target.value))} placeholder="e.g., 500000" /></div>
                        <div><Label htmlFor="rateB">Annual Interest Rate (%)</Label><Input type="number" id="rateB" value={rateB} onChange={e => setRateB(Number(e.target.value))} placeholder="e.g., 9.0" /></div>
                        <div><Label htmlFor="tenureB">Loan Tenure (Years)</Label><Input type="number" id="tenureB" value={tenureB} onChange={e => setTenureB(Number(e.target.value))} placeholder="e.g., 4" /></div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="text-center">
                <Button onClick={handleCompare}>Compare Loans</Button>
            </div>

            {showResults && <LoanComparisonResults resultsA={resultsA} resultsB={resultsB} />}
             <Card>
                <CardHeader><CardTitle>How to Choose the Right Loan?</CardTitle></CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>Choosing the right loan can save you thousands of rupees. Our Loan Comparison Calculator is a tool designed to help you make a good decision by putting two loan offers side-by-side. By showing the differences in monthly payments, total interest, and overall cost, you can easily see the best financial option.</p>
                    
                    <h3>How to Use the Calculator</h3>
                    <ol>
                        <li>Enter the **Loan Amount**, **Interest Rate**, and **Tenure** for "Loan Option A".</li>
                        <li>Do the same for "Loan Option B".</li>
                        <li>Click the **"Compare Loans"** button.</li>
                    </ol>
                    <p>The tool will generate a clear verdict, a detailed table, and a chart to help you understand which loan is better for you.</p>

                    <h3>Frequently Asked Questions (FAQs)</h3>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="font-semibold">Should I always choose the loan with the lower EMI?</AccordionTrigger>
                            <AccordionContent>
                                <p>Not always. A lower EMI is easier on your monthly budget, but it often comes with a longer loan term. This means you could pay much more in total interest. This tool helps you see that trade-off. The best choice balances what you can afford each month with the lowest total cost.</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="font-semibold">How much does the interest rate really matter?</AccordionTrigger>
                            <AccordionContent>
                                <p>A lot. Even a small difference of 0.5% in the interest rate can lead to large savings over a long term, especially for big loans like a home loan. Use this tool to see the exact difference in total interest paid between two rates.</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="font-semibold">What other factors should I consider?</AccordionTrigger>
                            <AccordionContent>
                               <p>Besides the interest rate, consider other loan costs like processing fees and prepayment penalties. Also, check the lender's reputation for customer service. Sometimes a slightly higher EMI is worth it for better terms or service.</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );

}
