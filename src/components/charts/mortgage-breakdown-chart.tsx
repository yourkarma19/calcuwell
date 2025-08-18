"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

interface MortgageBreakdownChartProps {
    principal: number;
    totalInterest: number;
    propertyTax: number;
    homeInsurance: number;
    tenure: number;
}

const chartConfig = {
      principal: { label: "Principal", color: "hsl(var(--chart-1))" },
      "Total Interest": { label: "Total Interest", color: "hsl(var(--chart-2))" },
      "Property Tax": { label: "Property Tax", color: "hsl(var(--chart-3))" },
      "Home Insurance": { label: "Home Insurance", color: "hsl(var(--chart-4))" },
};

export function MortgageBreakdownChart({ principal, totalInterest, propertyTax, homeInsurance, tenure }: MortgageBreakdownChartProps) {
    const chartData = [
      { name: "Principal", value: principal, fill: "hsl(var(--chart-1))" },
      { name: "Total Interest", value: totalInterest, fill: "hsl(var(--chart-2))" },
      { name: "Property Tax", value: propertyTax * tenure, fill: "hsl(var(--chart-3))" },
      { name: "Home Insurance", value: homeInsurance * tenure, fill: "hsl(var(--chart-4))" },
    ].filter(item => item.value > 0);
    
    if (chartData.length === 0 || principal <= 0) return null;

    return (
        <div className="h-[25rem]">
            <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Tooltip
                        cursor={false}
                        content={<ChartTooltipContent 
                            formatter={(value, name) => `${name}: ₹${Number(value).toLocaleString('en-IN', {maximumFractionDigits: 0})}`}
                            />}
                        />
                        <Pie data={chartData} dataKey="value" nameKey="name" innerRadius="50%" outerRadius="80%" strokeWidth={2}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} name={entry.name} />
                            ))}
                        </Pie>
                        <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    );
}
