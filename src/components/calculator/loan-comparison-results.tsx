
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface LoanResults {
    emi: number;
    totalInterest: number;
    totalAmount: number;
}

interface LoanComparisonResultsProps {
    resultsA: LoanResults;
    resultsB: LoanResults;
}

export default function LoanComparisonResults({ resultsA, resultsB }: LoanComparisonResultsProps) {
    const savings = resultsB.totalAmount - resultsA.totalAmount;
    const verdict = savings > 0 ? { better: 'A', amount: savings } : { better: 'B', amount: Math.abs(savings) };
    const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

    const chartData = [
        { name: "Monthly EMI", "Loan A": resultsA.emi, "Loan B": resultsB.emi },
        { name: "Total Interest", "Loan A": resultsA.totalInterest, "Loan B": resultsB.totalInterest },
        { name: "Total Amount", "Loan A": resultsA.totalAmount, "Loan B": resultsB.totalAmount },
    ];
    
    const currencyFormatter = (value: number) => formatter.format(value);

    return (
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
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `₹${(Number(value) / 1000).toFixed(0)}k`} />
                            <Tooltip formatter={currencyFormatter} />
                            <Legend />
                            <Bar dataKey="Loan A" fill="#3b82f6" radius={4} />
                            <Bar dataKey="Loan B" fill="#f97316" radius={4} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
