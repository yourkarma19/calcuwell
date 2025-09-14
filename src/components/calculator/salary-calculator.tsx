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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      name: "What is the difference between Gross and Net Salary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gross Salary is the total amount of money an employee earns before any taxes and other deductions are subtracted. Net Salary (or take-home pay) is the amount of money an employee receives after all deductions have been taken out.",
      },
    },
    {
      "@type": "Question",
      name: "Why is the tax rate an estimate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Income tax systems are often complex, with different tax brackets and rules. This calculator uses a single average tax rate for simplicity. Your actual tax rate may be different. This tool is intended for estimation purposes.",
      },
    },
    {
      "@type": "Question",
      name: "What are some common salary deductions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common deductions from a salary include income tax, retirement plan contributions (like a 401(k) or pension), health insurance premiums, and other social security contributions depending on your country's regulations.",
      },
    },
  ],
};

export default function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = usePersistentState(
    "salary-gross",
    50000,
  );
  const [payPeriod, setPayPeriod] = usePersistentState<"annually" | "monthly">(
    "salary-period",
    "annually",
  );
  const [taxRate, setTaxRate] = usePersistentState("salary-tax", 20);
  const [otherDeductions, setOtherDeductions] = usePersistentState(
    "salary-deductions",
    0,
  );

  const { netSalary, totalTax, annualSalary, annualDeductions } =
    useMemo(() => {
      const gross = Number(grossSalary);
      const tax = Number(taxRate);
      const deductions = Number(otherDeductions);

      if (gross <= 0)
        return {
          netSalary: 0,
          totalTax: 0,
          annualSalary: 0,
          annualDeductions: 0,
        };

      const annualGross = payPeriod === "annually" ? gross : gross * 12;
      const taxAmount = annualGross * (tax / 100);
      const annualDed = payPeriod === "annually" ? deductions : deductions * 12;
      const totalAnnualDeductions = taxAmount + annualDed;

      const netAnnualSalary = annualGross - totalAnnualDeductions;
      const netPayPeriodSalary =
        payPeriod === "annually" ? netAnnualSalary : netAnnualSalary / 12;

      return {
        netSalary: netPayPeriodSalary,
        totalTax: taxAmount,
        annualSalary: annualGross,
        annualDeductions: annualDed,
      };
    }, [grossSalary, payPeriod, taxRate, otherDeductions]);

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Salary & Deductions</CardTitle>
          <CardDescription>
            Calculate your take-home pay by providing your gross salary and any
            applicable deductions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gross-salary">Gross Salary</Label>
              <Input
                id="gross-salary"
                type="number"
                value={grossSalary}
                onChange={(e) => setGrossSalary(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pay-period">Pay Period</Label>
              <Select
                value={payPeriod}
                onValueChange={(v: string) =>
                  setPayPeriod(v as "annually" | "monthly")
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax-rate">Estimated Income Tax Rate (%)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="tax-rate"
                value={[taxRate]}
                onValueChange={(v) => setTaxRate(v[0])}
                min={0}
                max={50}
                step={0.5}
              />
              <Input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-24"
                step="0.5"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="other-deductions">
              Other Deductions (per period)
            </Label>
            <Input
              id="other-deductions"
              type="number"
              value={otherDeductions}
              onChange={(e) => setOtherDeductions(Number(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Take-Home Pay</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div>
            <p className="text-sm text-muted-foreground capitalize">
              Net {payPeriod} Salary
            </p>
            <p className="text-4xl font-bold font-headline text-primary">
              {formatCurrency(netSalary)}
            </p>
          </div>
          <div className="space-y-2 text-sm text-left border-t pt-4">
            <div className="flex justify-between">
              <span>Annual Gross Salary:</span>
              <span className="font-semibold">
                {formatCurrency(annualSalary)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Annual Tax:</span>
              <span className="font-semibold">{formatCurrency(totalTax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Annual Other Deductions:</span>
              <span className="font-semibold">
                {formatCurrency(annualDeductions)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Salary Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            Our Salary Calculator is a simple tool to help you understand your
            take-home pay. By entering your gross salary and any applicable
            deductions, you can quickly estimate your net income. This is
            essential for budgeting, financial planning, and evaluating job
            offers.
          </p>
          <h3>How to Use the Salary Calculator</h3>
          <ol>
            <li>
              Enter your **Gross Salary** and select the pay period (annual or
              monthly).
            </li>
            <li>
              Use the slider to set your estimated average **Income Tax Rate**.
            </li>
            <li>Enter any other regular **Deductions** per pay period.</li>
          </ol>
          <p>
            The calculator will instantly show you your net take-home pay for the
            selected period.
          </p>
          <h3>Salary Calculator FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What is the difference between Gross and Net Salary?
              </AccordionTrigger>
              <AccordionContent>
                **Gross Salary** is the total amount an employee earns before any
                taxes and deductions are subtracted. **Net Salary** (or take-home
                pay) is the amount an employee receives after all deductions have
                been taken out.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Why is the tax rate an estimate?
              </AccordionTrigger>
              <AccordionContent>
                Income tax systems are often complex, with different tax brackets
                and rules. This calculator uses a single average tax rate for
                simplicity. Your actual tax rate may be different. This tool is
                for estimation purposes only.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What are some common deductions?
              </AccordionTrigger>
              <AccordionContent>
                Common deductions include income tax, retirement plan
                contributions (like a 401(k) or pension), and health insurance
                premiums.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
