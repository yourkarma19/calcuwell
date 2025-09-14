"use client";

import { addDays, subDays, format } from "date-fns";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
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
      name: "How does the date calculator work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool simply adds or subtracts the number of days you enter from a given start date. It automatically handles all month and year changes, including leap years, so you get an accurate result every time.",
      },
    },
    {
      "@type": "Question",
      name: "What is this tool used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is perfect for many planning tasks, such as scheduling appointments (e.g., a 60-day follow-up), setting project deadlines (e.g., finding the date 90 days from today), planning events or tracking personal goals, and calculating return periods or warranty expiration dates.",
      },
    },
  ],
};

export default function AddSubtractDaysCalculator() {
  const [startDate, setStartDate] = usePersistentState<Date | undefined>(
    "addsub-start-date",
    new Date(),
    (v) => (v ? new Date(v as string) : new Date()),
  );
  const [days, setDays] = usePersistentState("addsub-days", 30);
  const [resultDate, setResultDate] = useState<Date | null>(null);

  const handleAdd = () => {
    if (startDate) {
      setResultDate(addDays(startDate, days));
    }
  };

  const handleSubtract = () => {
    if (startDate) {
      setResultDate(subDays(startDate, days));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add or Subtract Days from a Date</CardTitle>
          <CardDescription>
            Easily find a future or past date by adding or subtracting a
            specific number of days from a start date.
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
              <Label>Days to Add/Subtract</Label>
              <Input
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleAdd} className="w-full">
              Add Days
            </Button>
            <Button
              onClick={handleSubtract}
              variant="outline"
              className="w-full"
            >
              Subtract Days
            </Button>
          </div>
        </CardContent>
      </Card>

      {resultDate && (
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
      )}

      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Date Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            Our Date Calculator is a simple tool to find a future or past date.
            It helps you set deadlines, schedule follow-ups, or check warranty
            periods without counting days on a calendar.
          </p>
          <h3>How to Use the Date Calculator</h3>
          <ol>
            <li>
              Choose a <strong>Start Date</strong> from the calendar.
            </li>
            <li>
              Enter the number of <strong>Days to Add or Subtract</strong>.
            </li>
            <li>Click the correct button to find the new date.</li>
          </ol>
          <p>The new date will show up instantly in the results section.</p>
          <h3>Date Calculator FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does this calculator work?</AccordionTrigger>
              <AccordionContent>
                This tool adds or subtracts the days you enter from a start
                date. It automatically handles month, year, and leap year
                changes to give you an accurate result.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is this tool used for?</AccordionTrigger>
              <AccordionContent>
                It is great for many planning tasks, such as:
                <ul className="list-disc pl-5 mt-2">
                  <li>Scheduling appointments (e.g., a 60-day follow-up).</li>
                  <li>
                    Setting project deadlines (e.g., finding the date 90 days
                    from today).
                  </li>
                  <li>Planning events or tracking personal goals.</li>
                  <li>
                    Calculating return periods or warranty expiration dates.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
