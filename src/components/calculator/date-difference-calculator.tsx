"use client";

import { useState } from "react";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  differenceInWeeks,
} from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";

type Difference = {
  years: number;
  months: number;
  weeks: number;
  days: number;
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
        // Swap dates if end date is before start date
        const temp = startDate;
        setStartDate(endDate);
        setEndDate(temp);
      }
      setDifference({
        years: differenceInYears(endDate, startDate),
        months: differenceInMonths(endDate, startDate),
        weeks: differenceInWeeks(endDate, startDate),
        days: differenceInDays(endDate, startDate),
      });
    }
  };

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Calculate Date Difference</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <DatePicker date={startDate} setDate={setStartDate} />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <DatePicker date={endDate} setDate={setEndDate} />
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
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold">Difference in units:</p>
                <ul className="list-disc list-inside space-y-1">
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
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
