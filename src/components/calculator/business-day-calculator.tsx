"use client";

import { addBusinessDays, subBusinessDays, format } from "date-fns";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePersistentState from "@/hooks/use-persistent-state";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between a day and a business day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A business day, also known as a working day, specifically refers to a typical day of work, which is usually Monday through Friday. This calculator automatically skips weekends (Saturdays and Sundays) in its calculation.",
      },
    },
    {
      "@type": "Question",
      name: "Why is calculating business days important?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculation is critical for business operations like logistics and finance. It helps set accurate expectations for delivery dates, payment schedules, and project deadlines that must fall on official working days.",
      },
    },
    {
      "@type": "Question",
      name: "Does this tool account for holidays?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, the calculator does not account for public holidays because they vary by country and region. To get the most accurate date, you would need to manually add extra days for any public holidays that fall within your calculated period.",
      },
    },
  ],
};

export default function BusinessDayCalculator() {
  const [startDate, setStartDate] = usePersistentState<Date | undefined>(
    "bizday-start-date",
    new Date(),
    (v) => (v ? new Date(v as string) : new Date()),
  );
  const [days, setDays] = usePersistentState("bizday-days", 10);
  const [resultDate, setResultDate] = useState<Date | null>(null);

  const handleAdd = () => {
    if (startDate) {
      setResultDate(addBusinessDays(startDate, days));
    }
  };

  const handleSubtract = () => {
    if (startDate) {
      setResultDate(subBusinessDays(startDate, days));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Day Calculator</CardTitle>
          <CardDescription>
            Calculate a future or past date by adding or subtracting business
            days, automatically skipping weekends.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <DatePicker
                date={startDate}
                setDate={setStartDate}
                disabled={() => false}
              />
            </div>
            <div className="space-y-2">
              <Label>Business Days to Add/Subtract</Label>
              <Input
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                aria-label="Business days to add or subtract"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleAdd} className="w-full">
              Add Business Days
            </Button>
            <Button
              onClick={handleSubtract}
              variant="outline"
              className="w-full"
            >
              Subtract Business Days
            </Button>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            Excludes weekends (Saturday, Sunday). Does not account for public
            holidays.
          </p>
        </CardContent>
      </Card>

      {resultDate && (
        <div className="sticky top-24">
          <Card>
            <CardHeader>
              <CardTitle>Resulting Date</CardTitle>
            </CardHeader>
            <CardContent className="text-center" aria-live="polite">
              <p className="text-3xl font-bold font-headline text-primary my-2">
                {format(resultDate, "PPP")}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Business Day Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The <strong>Business Day Calculator</strong> helps you plan around a
            standard workweek. It lets you find a future or past date by adding or
            subtracting a number of working days. The calculator automatically
            ignores weekends (Saturdays and Sundays).
          </p>
          <h3>How to Use the Business Day Calculator</h3>
          <ol>
            <li>
              Select the <strong>Start Date</strong>.
            </li>
            <li>
              Enter the number of <strong>Business Days</strong> you want to add
              or subtract.
            </li>
            <li>Click the correct button to see the new date.</li>
          </ol>
          <p>
            This is useful for calculating project deadlines, shipping estimates,
            and contract timelines.
          </p>
          <h3>Business Day Calculator FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What&rsquo;s the difference between a day and a business day?
              </AccordionTrigger>
              <AccordionContent>
                A business day is a typical workday, usually Monday through
                Friday. This calculator skips weekends automatically.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Why is this calculation useful?</AccordionTrigger>
              <AccordionContent>
                This is key for business operations, especially in logistics and
                finance. It helps set correct expectations for delivery dates,
                payment schedules, and project deadlines that must fall on
                workdays.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Does this tool count holidays?</AccordionTrigger>
              <AccordionContent>
                No. The calculator does not account for public holidays because
                they vary by country and region. For the most accurate result, you
                will need to add extra days for any holidays in your date range.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
