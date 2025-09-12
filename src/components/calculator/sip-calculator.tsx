
"use client";

import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import usePersistentState from "@/hooks/use-persistent-state";
import { formatCurrency } from "@/lib/utils";

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = usePersistentState(
    "sip-monthly",
    10000,
  );
  const [returnRate, setReturnRate] = usePersistentState("sip-rate", 12);
  const [timePeriod, setTimePeriod] = usePersistentState("sip-time", 10);

  const { totalInvestment, totalReturns, futureValue } = useMemo(() => {
    const i = returnRate / 100 / 12; // monthly interest rate
    const n = timePeriod * 12; // number of months
    const M = monthlyInvestment;

    if (M <= 0 || returnRate < 0 || timePeriod <= 0) {
      return { totalInvestment: M * n, totalReturns: 0, futureValue: M * n };
    }

    const fv = M * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const ti = M * n;
    const tr = fv - ti;

    return {
      totalInvestment: ti,
      totalReturns: tr,
      futureValue: fv,
    };
  }, [monthlyInvestment, returnRate, timePeriod]);

  const chartData = [
    { name: "Total Investment", value: totalInvestment },
    { name: "Estimated Returns", value: totalReturns },
  ];

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SIP Investment Details</CardTitle>
          <CardDescription>
            Enter your investment details to project the future value of your
            Systematic Investment Plan (SIP).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="monthly-investment">
              Monthly Investment ({formatCurrency(monthlyInvestment)})
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                id="monthly-investment"
                value={[monthlyInvestment]}
                onValueChange={(v) => setMonthlyInvestment(v[0])}
                min={500}
                max={100000}
                step={500}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="return-rate">
              Expected Return Rate ({returnRate}% p.a.)
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                id="return-rate"
                value={[returnRate]}
                onValueChange={(v) => setReturnRate(v[0])}
                min={1}
                max={30}
                step={0.5}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time-period">
              Time Period ({timePeriod} Years)
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                id="time-period"
                value={[timePeriod]}
                onValueChange={(v) => setTimePeriod(v[0])}
                min={1}
                max={40}
                step={1}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Investment Projection</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4" aria-live="polite">
          <div>
            <p className="text-sm text-muted-foreground">Future Value</p>
            <p className="text-4xl font-bold font-headline text-primary">
              {formatCurrency(futureValue)}
            </p>
          </div>
          <div className="space-y-2 text-sm text-left border-t pt-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Investment:</span>
              <span className="font-semibold">
                {formatCurrency(totalInvestment)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Returns:</span>
              <span className="font-semibold">
                {formatCurrency(totalReturns)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investment Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="h-[25rem]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
