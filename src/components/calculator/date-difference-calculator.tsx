
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
      // Don't swap dates, calculate based on user input
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
                <DatePicker date={endDate} setDate={setEndDate} disabled={() => false} />
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
              <div className="space-y-2">
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
      </div>
    </>
  );
}
