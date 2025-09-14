"use client";

import { addDays, format } from "date-fns";
import { useState, useMemo } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
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
      name: "How is the due date calculated from the Last Menstrual Period (LMP)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common method is Naegele's rule, which calculates the due date by adding 280 days (or 40 weeks) to the first day of your last menstrual period. This assumes a standard 28-day menstrual cycle.",
      },
    },
    {
      "@type": "Question",
      name: "How is the due date calculated from the conception date?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you know the exact date of conception, the calculation is more direct. The estimated due date is calculated by adding 266 days (or 38 weeks) to the conception date, which is the average length of human gestation.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is this due date calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator provides an estimate. Only about 5% of babies are born on their exact due date. Your doctor will provide the most accurate due date based on an ultrasound measurement, which is the best method for dating a pregnancy.",
      },
    },
  ],
};

export default function PregnancyDueDateCalculator() {
  const [calculationMethod, setCalculationMethod] = useState<
    "lmp" | "conception"
  >("lmp");
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | undefined>(
    new Date(),
  );
  const [conceptionDate, setConceptionDate] = useState<Date | undefined>(
    new Date(),
  );

  const estimatedDueDate = useMemo(() => {
    if (calculationMethod === "lmp" && lastPeriodDate) {
      // Naegele's rule: LMP + 280 days (40 weeks)
      return addDays(lastPeriodDate, 280);
    }
    if (calculationMethod === "conception" && conceptionDate) {
      // Conception date + 266 days (38 weeks)
      return addDays(conceptionDate, 266);
    }
    return null;
  }, [calculationMethod, lastPeriodDate, conceptionDate]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Estimate Your Due Date</CardTitle>
          <CardDescription>
            Get an estimated due date based on your last menstrual period or
            date of conception.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Calculation Method</Label>
            <RadioGroup
              value={calculationMethod}
              onValueChange={(v: string) =>
                setCalculationMethod(v as "lmp" | "conception")
              }
              className="flex items-center space-x-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lmp" id="lmp" />
                <Label htmlFor="lmp">Last Menstrual Period</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="conception" id="conception" />
                <Label htmlFor="conception">Conception Date</Label>
              </div>
            </RadioGroup>
          </div>

          {calculationMethod === "lmp" && (
            <div className="space-y-2">
              <Label>First Day of Last Menstrual Period</Label>
              <DatePicker
                date={lastPeriodDate}
                setDate={setLastPeriodDate}
                disabled={(date) => date > new Date()}
              />
            </div>
          )}

          {calculationMethod === "conception" && (
            <div className="space-y-2">
              <Label>Date of Conception</Label>
              <DatePicker
                date={conceptionDate}
                setDate={setConceptionDate}
                disabled={(date) => date > new Date()}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estimated Due Date</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {estimatedDueDate ? (
            <p className="text-3xl font-bold font-headline text-primary my-2">
              {format(estimatedDueDate, "PPP")}
            </p>
          ) : (
            <p className="text-muted-foreground">Please select a date.</p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Due Date Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            Our **Pregnancy Due Date Calculator** gives you an estimated due date
            for your baby. By providing either the date of your last menstrual
            period (LMP) or your date of conception, this calculator helps you get
            a better idea of your pregnancy timeline.
          </p>
          <h3>How to Use the Due Date Calculator</h3>
          <ol>
            <li>
              First, select your **Calculation Method** (LMP or conception date).
            </li>
            <li>Enter the appropriate date using the calendar.</li>
          </ol>
          <p>The calculator will instantly display your estimated due date.</p>
          <h3>Due Date FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How is the due date calculated from the LMP?
              </AccordionTrigger>
              <AccordionContent>
                The most common method is **Naegele&apos;s rule**. This rule
                calculates the due date by adding 280 days (40 weeks) to the first
                day of your last menstrual period. This assumes a standard 28-day
                cycle.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                How is the due date calculated from the conception date?
              </AccordionTrigger>
              <AccordionContent>
                If you know the exact date of conception, the calculation is more
                direct. The estimated due date is calculated by adding 266 days
                (38 weeks) to the conception date.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How accurate is this due date calculator?
              </AccordionTrigger>
              <AccordionContent>
                This calculator provides an estimate. Only about 5% of babies are
                born on their exact due date. Your doctor will provide the most
                accurate due date based on an ultrasound measurement.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
