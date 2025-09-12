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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

      <Card>
        <CardHeader>
          <CardTitle>The Ultimate Guide to SIPs</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            A Systematic Investment Plan (SIP) is a powerful method for wealth
            creation, allowing you to invest a fixed amount in mutual funds at
            regular intervals. Our SIP Calculator helps you visualize this
            growth and plan for your financial goals, whether it's for
            retirement, education, or any other long-term objective.
          </p>

          <h2>What is a Systematic Investment Plan (SIP)?</h2>
          <p>
            A SIP is a disciplined approach to investing. Instead of investing a
            large single amount (lumpsum), you invest smaller, fixed amounts
            periodically (usually monthly). This strategy is ideal for retail
            investors as it makes market timing irrelevant and cultivates a
            habit of regular saving. The core principle lies in compounding and
            Rupee Cost Averaging, which helps mitigate risk and enhance returns
            over the long run.
          </p>

          <h2>How to Use Our SIP Calculator</h2>
          <ol>
            <li>
              **Monthly Investment:** Use the slider to set the amount you wish
              to invest every month.
            </li>
            <li>
              **Expected Return Rate:** Adjust this to reflect the annual return
              you anticipate from your mutual fund investment.
            </li>
            <li>
              **Time Period:** Set the number of years you plan to stay
              invested.
            </li>
          </ol>
          <p>
            The calculator will instantly project the future value of your
            investments, breaking down your total contribution versus the wealth
            gained through returns.
          </p>

          <h2>The Formula Behind SIP Return Calculation</h2>
          <p>The future value of a SIP is calculated using the formula:</p>
          <p className="font-mono bg-muted p-2 rounded-md text-center my-2">
            FV = P × (&#123;[1 + i]^n - 1&#125; / i) × (1 + i)
          </p>
          <ul>
            <li>
              <strong>FV</strong> is the Future Value of the investment.
            </li>
            <li>
              <strong>P</strong> is the monthly SIP amount.
            </li>
            <li>
              <strong>i</strong> is the monthly rate of interest (annual rate /
              12).
            </li>
            <li>
              <strong>n</strong> is the total number of investment months (years
              × 12).
            </li>
          </ul>

          <h2>SIP vs. Lumpsum: Which is Better for You?</h2>
          <p>
            Both SIPs and lumpsum investments have their place. The best choice
            depends on your financial situation and risk appetite.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>SIP (Systematic Investment Plan)</TableHead>
                <TableHead>Lumpsum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Best For</TableCell>
                <TableCell>Salaried individuals, regular savers</TableCell>
                <TableCell>Investors with a large, one-time capital</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Market Timing</TableCell>
                <TableCell>Not required; risk is averaged out</TableCell>
                <TableCell>
                  Requires knowledge to invest when the market is low
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Risk</TableCell>
                <TableCell>Lower, due to Rupee Cost Averaging</TableCell>
                <TableCell>Higher, as it's a single entry point</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Discipline</TableCell>
                <TableCell>High; promotes a habit of saving</TableCell>
                <TableCell>
                  Low; it's a one-time decision
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h2>Understanding Rupee Cost Averaging</h2>
          <p>
            This is the core benefit of a SIP. When you invest a fixed amount
            regularly, you automatically buy more mutual fund units when the
            market price is low and fewer units when the price is high. Over
            time, this averages out your purchase cost and can lead to better
            returns compared to a single lumpsum investment, especially in a
            volatile market.
          </p>

          <h2>Frequently Asked Questions about SIPs</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What is a good expected return for a SIP in India?
              </AccordionTrigger>
              <AccordionContent>
                Historically, equity mutual funds in India have delivered
                long-term returns in the range of 12-15% per annum. However,
                this is not guaranteed and depends on market performance. Debt
                funds typically offer lower, more stable returns.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I withdraw from a SIP anytime?</AccordionTrigger>
              <AccordionContent>
                Yes, most open-ended mutual funds allow you to redeem your units
                at any time. However, be aware of exit loads (a fee for early
                withdrawal, usually within the first year) and capital gains
                taxes that may apply.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How much should I invest in a SIP per month?
              </AccordionTrigger>
              <AccordionContent>
                This depends entirely on your financial goals, income, and risk
                tolerance. A common rule of thumb is to save at least 20% of
                your income. You can start small and increase your SIP amount
                annually as your income grows (this is often called a "SIP
                Top-up").
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <h3 className="mt-6">Conclusion & Disclaimer</h3>
          <p>
            SIPs are an excellent tool for long-term wealth creation. This
            calculator is for illustrative purposes only. Mutual fund
            investments are subject to market risks. Please read all scheme
            related documents carefully before investing.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
