"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartConfig = {
    principal: {
      label: "Principal",
      color: "hsl(var(--chart-1))",
    },
    interest: {
      label: "Interest",
      color: "hsl(var(--chart-2))",
    },
};

interface LoanBreakdownChartProps {
    principal: number;
    totalInterest: number;
}

export function LoanBreakdownChart({ principal, totalInterest }: LoanBreakdownChartProps) {
    const chartData = [
        { name: "Principal", value: principal, fill: "hsl(var(--chart-1))" },
        { name: "Interest", value: totalInterest, fill: "hsl(var(--chart-2))" },
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
                        <Pie data={chartData} dataKey="value" nameKey="name" innerRadius="50%" outerRadius="80%" strokeWidth={2} labelLine={false} label>
                            {chartData.map((entry) => (
                                <Cell key={entry.name} fill={entry.fill} />
                            ))}
                        </Pie>
                        <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    );
}
