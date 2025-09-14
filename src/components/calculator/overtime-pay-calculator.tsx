"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import usePersistentState from "@/hooks/use-persistent-state";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a standard overtime rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common overtime rate is 'time and a half,' which means your overtime pay is 1.5 times your regular hourly rate. Some jobs or holidays may offer 'double time,' which is 2 times your regular rate.",
      },
    },
    {
      "@type": "Question",
      name: "Does this calculator include taxes or deductions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, this calculator calculates your gross pay, which is your total earnings before any taxes or other deductions are subtracted. Your actual take-home pay will be lower.",
      },
    },
    {
      "@type": "Question",
      name: "When does overtime typically start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This varies by country and company policy, but a common standard is that overtime applies to any hours worked beyond 40 hours in a single week.",
      },
    },
  ],
};

export default function OvertimePayCalculator() {
  const [hourlyRate, setHourlyRate] = usePersistentState("overtime-rate", 20);
  const [regularHours, setRegularHours] = usePersistentState(
    "overtime-regular-hours",
    40,
  );
  const [overtimeHours, setOvertimeHours] = usePersistentState(
    "overtime-overtime-hours",
    10,
  );
  const [overtimeMultiplier, setOvertimeMultiplier] = usePersistentState(
    "overtime-multiplier",
    1.5,
  );

  const { regularPay, overtimePay, totalPay } = useMemo(() => {
    const rate = Number(hourlyRate);
    const regHours = Number(regularHours);
    const otHours = Number(overtimeHours);
    const multiplier = Number(overtimeMultiplier);

    if (rate <= 0) return { regularPay: 0, overtimePay: 0, totalPay: 0 };

    const regPay = rate * regHours;
    const otPay = otHours * rate * multiplier;
    const totPay = regPay + otPay;

    return { regularPay: regPay, overtimePay: otPay, totalPay: totPay };
  }, [hourlyRate, regularHours, overtimeHours, overtimeMultiplier]);

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter Work Details</CardTitle>
          <CardDescription>
            Calculate your total pay, including regular and overtime hours.
            Adjust the overtime multiplier as needed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hourly-rate">Hourly Rate</Label>
              <Input
                id="hourly-rate"
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="regular-hours">Regular Hours per Week</Label>
              <Input
                id="regular-hours"
                type="number"
                value={regularHours}
                onChange={(e) => setRegularHours(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="overtime-hours">Overtime Hours</Label>
              <Input
                id="overtime-hours"
                type="number"
                value={overtimeHours}
                onChange={(e) => setOvertimeHours(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="overtime-multiplier">Overtime Multiplier</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="overtime-multiplier"
                  value={[overtimeMultiplier]}
                  onValueChange={(v) => setOvertimeMultiplier(v[0])}
                  min={1}
                  max={3}
                  step={0.1}
                />
                <Input
                  type="number"
                  value={overtimeMultiplier}
                  onChange={(e) =>
                    setOvertimeMultiplier(Number(e.target.value))
                  }
                  className="w-24"
                  step="0.1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pay Summary</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Pay</p>
            <p className="text-4xl font-bold font-headline text-primary">
              {formatCurrency(totalPay)}
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Regular Pay:</span>
              <span className="font-semibold">
                {formatCurrency(regularPay)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Overtime Pay:</span>
              <span className="font-semibold">
                {formatCurrency(overtimePay)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Overtime Pay Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The Overtime Pay Calculator helps you determine your total earnings
            for a pay period, including regular and overtime hours. It gives you
            an accurate estimate of your gross pay.
          </p>
          <h3>How to Use the Overtime Pay Calculator</h3>
          <ol>
            <li>Enter your **Hourly Rate** of pay.</li>
            <li>Input the number of **Regular Hours** you worked.</li>
            <li>Enter the number of **Overtime Hours** worked.</li>
            <li>
              Adjust the **Overtime Multiplier** (e.g., 1.5 for &quot;time and a
              half&quot;).
            </li>
          </ol>
          <p>
            The calculator will instantly break down your pay into regular and
            overtime earnings and show you the total pay.
          </p>
          <h3>Overtime Pay FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What is a standard overtime rate?
              </AccordionTrigger>
              <AccordionContent>
                The most common overtime rate is &quot;time and a half,&quot;
                which means your overtime pay is 1.5 times your regular hourly
                rate. Some jobs or holidays may offer &quot;double time,&quot;
                which is 2 times your regular rate.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Does this calculator include taxes or deductions?
              </AccordionTrigger>
              <AccordionContent>
                No, this calculator calculates your gross pay, which is your total
                earnings before any taxes or other deductions are subtracted. Your
                actual take-home pay will be lower.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                When does overtime typically start?
              </AccordionTrigger>
              <AccordionContent>
                This varies by country and company policy, but a common standard
                is that overtime applies to any hours worked beyond 40 hours in a
                single week.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
