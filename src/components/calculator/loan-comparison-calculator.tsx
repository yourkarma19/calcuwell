
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

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

    const savings = resultsB.totalAmount - resultsA.totalAmount;
    const verdict = savings > 0 ? { better: 'A', amount: savings } : { better: 'B', amount: Math.abs(savings) };
    const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

    const chartData = [
        { name: "Monthly EMI", "Loan A": resultsA.emi, "Loan B": resultsB.emi },
        { name: "Total Interest", "Loan A": resultsA.totalInterest, "Loan B": resultsB.totalInterest },
        { name: "Total Amount", "Loan A": resultsA.totalAmount, "Loan B": resultsB.totalAmount },
    ];
    
    const chartConfig = {
      "Loan A": { label: "Loan A", color: "hsl(var(--chart-1))" },
      "Loan B": { label: "Loan B", color: "hsl(var(--chart-2))" },
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
                        <CardTitle className="flex items-center gap-2"><span className="flex items-center justify-center w-7 h-7 bg-red-500 text-white rounded-full">B</span> Loan Option B</CardTitle>
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

            {showResults && (
                <div id="results-container" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>The Verdict</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 p-4 rounded-lg text-center font-semibold text-lg">
                                ✅ Loan Option {verdict.better} is better. You could save {formatter.format(verdict.amount)}.
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Side-by-Side Comparison</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-center">
                                    <thead>
                                        <tr className="bg-muted">
                                            <th className="p-2 text-left">Metric</th>
                                            <th className="p-2">Loan Option A</th>
                                            <th className="p-2">Loan Option B</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b"><td className="p-2 text-left">Monthly EMI</td><td className="p-2">{formatter.format(resultsA.emi)}</td><td className="p-2">{formatter.format(resultsB.emi)}</td></tr>
                                        <tr className="border-b"><td className="p-2 text-left">Total Interest Paid</td><td className="p-2">{formatter.format(resultsA.totalInterest)}</td><td className="p-2">{formatter.format(resultsB.totalInterest)}</td></tr>
                                        <tr><td className="p-2 text-left font-bold">Total Amount Paid</td><td className="p-2 font-bold">{formatter.format(resultsA.totalAmount)}</td><td className="p-2 font-bold">{formatter.format(resultsB.totalAmount)}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Visual Comparison</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[25rem]">
                            <ChartContainer config={chartConfig} className="w-full h-full">
                                <ResponsiveContainer>
                                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis tickFormatter={(value) => `₹${(Number(value) / 1000).toFixed(0)}k`} />
                                        <Tooltip content={<ChartTooltipContent formatter={(value) => formatter.format(Number(value))} />} />
                                        <ChartLegend content={<ChartLegendContent />} />
                                        <Bar dataKey="Loan A" fill="var(--color-Loan A)" radius={4} />
                                        <Bar dataKey="Loan B" fill="var(--color-Loan B)" radius={4} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            )}
             <Card>
                <CardHeader><CardTitle>How to Choose the Right Loan?</CardTitle></CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Fixed vs. Floating Interest Rates</AccordionTrigger>
                            <AccordionContent>
                                A fixed interest rate remains the same throughout your loan tenure, offering predictable EMIs. A floating rate can change based on market conditions, meaning your EMIs could increase or decrease. Fixed rates are safer, while floating rates can be cheaper initially but carry more risk.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Does a shorter tenure always save money?</AccordionTrigger>
                            <AccordionContent>
                                Generally, yes. A shorter loan tenure means you pay less total interest over the life of the loan. However, it also means your monthly EMI will be higher. This calculator helps you see that trade-off clearly.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}
