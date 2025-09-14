"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Skeleton } from "../ui/skeleton";
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
import type { FAQPage, WithContext } from "schema-dts";

const SipBreakdownChart = dynamic(
  () => import("@/components/charts/sip-breakdown-chart"),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[25rem]" />,
  },
);

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a good monthly SIP amount to become a crorepati?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To reach a goal of 1 crore, the monthly SIP amount depends on the investment duration and expected rate of return. For example, to achieve 1 crore in 15 years with a 12% annual return, you would need to invest approximately ₹20,000 per month.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between SIP and lumpsum investment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SIP involves investing a fixed amount regularly, which helps in rupee cost averaging and instills discipline. Lumpsum is a one-time large investment. SIP is generally considered less risky for beginners as it averages out market volatility over time.",
      },
    },
    {
      "@type": "Question",
      name: "What is the formula for SIP calculation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The future value of a SIP is calculated using the formula: FV = P × ({[1 + i]^n - 1} / i) × (1 + i), where P is the monthly investment, i is the monthly interest rate, and n is the number of months.",
      },
    },
  ],
};

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
      return {
        totalInvestment: M * n,
        totalReturns: 0,
        futureValue: M * n,
      };
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
          <SipBreakdownChart chartData={chartData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About the SIP Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The SIP (Systematic Investment Plan) calculator is a tool that helps you understand the potential future value of your mutual fund investments. By investing a fixed amount regularly, you can benefit from the power of compounding and rupee cost averaging. This calculator shows you how your small, regular investments can grow into a significant corpus over time.
          </p>

          <h3>How Our Calculator Works</h3>
          <p>
            This tool uses the future value formula for a regular series of payments to project your investment growth. You provide three key inputs:
          </p>
          <ol>
            <li><strong>Monthly Investment</strong>: The fixed amount you plan to invest every month.</li>
            <li><strong>Expected Return Rate</strong>: The annual rate of return you expect from your investment. For equity mutual funds, a long-term average of 12% is a common assumption, though returns are not guaranteed.</li>
            <li><strong>Time Period</strong>: The number of years you plan to stay invested.</li>
          </ol>
          <p>
            The calculator then uses these inputs to estimate the total value of your investment at the end of the period, breaking it down into your total investment and the estimated returns.
          </p>
          
          <h3>Formula Explained</h3>
          <p>The future value (FV) of a SIP is calculated using the following formula:</p>
          <p className="font-mono bg-muted p-2 rounded-md text-center my-2">FV = P × ( ( (1 + i)^n - 1) / i ) × (1 + i)</p>
          <p>Where:</p>
          <ul>
            <li><strong>P</strong> is the monthly investment amount.</li>
            <li><strong>i</strong> is the monthly interest rate (annual rate / 12).</li>
            <li><strong>n</strong> is the total number of investment months (years × 12).</li>
          </ul>

          <h3>A Worked Example</h3>
          <p>Let's say you invest ₹5,000 per month for 10 years at an expected return rate of 12% p.a.</p>
          <ul>
            <li>P = 5,000</li>
            <li>i = 12% / 12 = 1% = 0.01</li>
            <li>n = 10 years * 12 = 120 months</li>
          </ul>
          <p>Using the formula, the future value would be approximately ₹11,61,695. Your total investment over the period would be ₹6,00,000, meaning you earned over ₹5.6 lakhs in returns.</p>

          <h3>Frequently Asked Questions (FAQs)</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is a good monthly SIP amount to become a crorepati?</AccordionTrigger>
              <AccordionContent>To reach a goal of 1 crore, the monthly SIP amount depends on the investment duration and expected rate of return. For example, to achieve 1 crore in 15 years with a 12% annual return, you would need to invest approximately ₹20,000 per month. The longer your time horizon, the smaller the monthly investment required.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is the difference between SIP and lumpsum investment?</AccordionTrigger>
              <AccordionContent>SIP involves investing a fixed amount regularly (e.g., monthly), which helps in rupee cost averaging and instills financial discipline. Lumpsum is a one-time, large investment. SIP is generally considered less risky for beginners as it averages out market volatility over time, meaning you buy more units when prices are low and fewer when prices are high.</AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-3">
              <AccordionTrigger>Is it possible to become a crorepati with SIP?</AccordionTrigger>
              <AccordionContent>Yes, absolutely. The key is to start early, invest consistently, and stay invested for the long term. For instance, a monthly SIP of just ₹10,000 can grow to over ₹1 crore in about 20 years, assuming a 12% annual return. The power of compounding makes this long-term wealth creation possible.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
