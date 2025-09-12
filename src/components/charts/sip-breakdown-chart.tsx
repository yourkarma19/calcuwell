
"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";

interface ChartDataItem {
  name: string;
  value: number;
}

interface SipBreakdownChartProps {
  chartData: ChartDataItem[];
}

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"];

export default function SipBreakdownChart({
  chartData,
}: SipBreakdownChartProps) {
  if (chartData.some((item) => item.value <= 0)) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Enter positive values to see the chart.
      </div>
    );
  }

  const chartConfig = {
    "Total Investment": {
      label: "Total Investment",
      color: "hsl(var(--chart-1))",
    },
    "Estimated Returns": {
      label: "Estimated Returns",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            cursor={false}
            content={
              <ChartTooltipContent
                formatter={(value) => formatCurrency(Number(value))}
              />
            }
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius="50%"
            outerRadius="80%"
            strokeWidth={2}
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <ChartLegend content={<ChartLegendContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
