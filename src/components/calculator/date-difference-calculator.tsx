
"use client";

import { useState } from "react";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  differenceInWeeks,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

type Difference = {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
};

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  );
  const [difference, setDifference] = useState<Difference | null>(null);

  const handleCalculate = () => {
    if (startDate && endDate) {
      if (endDate < startDate) {
        setDifference({ years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0 });
        return;
      }
      setDifference({
        years: differenceInYears(endDate, startDate),
        months: differenceInMonths(endDate, startDate),
        weeks: differenceInWeeks(endDate, startDate),
        days: differenceInDays(endDate, startDate),
        hours: differenceInHours(endDate, startDate),
        minutes: differenceInMinutes(endDate, startDate),
      });
    }
  };

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Calculate Date Difference</CardTitle>
            <CardDescription>Find the total duration between two dates in various units like years, months, weeks, days, and more.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <DatePicker date={startDate} setDate={setStartDate} disabled={() => false} />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <DatePicker date={endDate} setDate={setEndDate} disabled={(date) => false} />
              </div>
            </div>
            <Button onClick={handleCalculate} className="w-full">
              Calculate Difference
            </Button>
          </CardContent>
        </Card>
        {difference && (
          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
              <CardDescription>The total difference between the selected dates is:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2" aria-live="polite">
                <ul className="list-disc list-inside space-y-2 text-lg">
                  <li>
                    <span className="font-bold">{difference.years}</span> years
                  </li>
                  <li>
                    <span className="font-bold">{difference.months}</span> months
                  </li>
                  <li>
                    <span className="font-bold">{difference.weeks}</span> weeks
                  </li>
                  <li>
                    <span className="font-bold">{difference.days}</span> days
                  </li>
                   <li>
                    <span className="font-bold">{difference.hours.toLocaleString()}</span> hours
                  </li>
                   <li>
                    <span className="font-bold">{difference.minutes.toLocaleString()}</span> minutes
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader><CardTitle>About the Date Difference Calculator</CardTitle></CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>The **Date Difference Calculator** is a simple yet powerful tool for measuring the exact duration between two points in time. Whether you're tracking a project timeline, planning an event, or are just curious about the time between two important dates, this calculator provides a detailed breakdown in years, months, weeks, days, and even hours and minutes.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Select the **Start Date** using the calendar picker.</li>
                <li>Select the **End Date**.</li>
                <li>Click the **"Calculate Difference"** button.</li>
            </ol>
            <p>The tool will instantly display the total duration in various units, giving you a complete picture of the time elapsed.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
              <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                      <AccordionTrigger>How is the duration calculated?</AccordionTrigger>
                      <AccordionContent>
                          This calculator determines the total number of full units (like years, months, or days) that have passed between the start and end dates. For example, the "years" value shows only the total completed years, not a fractional amount.
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                      <AccordionTrigger>What are some common uses for this calculator?</AccordionTrigger>
                      <AccordionContent>
                          This tool is useful for project management (to find a project's duration), event planning (to see how far away an event is), legal purposes (calculating timeframes), and for personal use, like calculating the time between significant life events.
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                      <AccordionTrigger>Does this calculator account for leap years?</AccordionTrigger>
                      <AccordionContent>
                         Yes, the calculation is based on the actual number of days in each calendar month and year, which inherently accounts for leap years, ensuring an accurate result for the total number of days, weeks, and other units.
                      </AccordionContent>
                  </AccordionItem>
              </Accordion>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
