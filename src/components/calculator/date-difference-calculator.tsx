"use client";

import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  differenceInWeeks,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import { useEffect } from "react";
import CalculatorUIWrapper from "./calculator-ui-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import usePersistentState from "@/hooks/use-persistent-state";

type Difference = {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
};

export default function DateDifferenceCalculator({
  calculatorName,
}: {
  calculatorName: string;
}) {
  const [startDate, setStartDate] = usePersistentState<Date | undefined>(
    "datediff-start-date",
    new Date(),
    (v) => (v ? new Date(v as string) : new Date()),
  );
  const [endDate, setEndDate] = usePersistentState<Date | undefined>(
    "datediff-end-date",
    new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    (v) => (v ? new Date(v as string) : new Date()),
  );
  const [difference, setDifference] = usePersistentState<Difference | null>(
    "datediff-difference",
    null,
  );

  const handleCalculate = () => {
    if (startDate && endDate) {
      if (endDate < startDate) {
        setDifference({
          years: 0,
          months: 0,
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: 0,
        });
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

  useEffect(() => {
    handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const shareParams = {
    start: startDate?.toISOString().split("T")[0] || "",
    end: endDate?.toISOString().split("T")[0] || "",
  };

  const inputCard = (
    <Card id="date-diff-inputs">
      <CardHeader>
        <CardTitle>Calculate Date Difference</CardTitle>
        <CardDescription>
          Find the total duration between two dates in various units like
          years, months, weeks, days, and more.
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
            <Label>End Date</Label>
            <DatePicker
              date={endDate}
              setDate={setEndDate}
              disabled={() => false}
            />
          </div>
        </div>
        <Button onClick={handleCalculate} className="w-full">
          Calculate Difference
        </Button>
      </CardContent>
    </Card>
  );

  const resultsCard = difference ? (
    <Card id="date-diff-results">
      <CardHeader>
        <CardTitle>Result</CardTitle>
        <CardDescription>
          The total difference between the selected dates is:
        </CardDescription>
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
              <span className="font-bold">
                {difference.hours.toLocaleString()}
              </span>{" "}
              hours
            </li>
            <li>
              <span className="font-bold">
                {difference.minutes.toLocaleString()}
              </span>{" "}
              minutes
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  ) : null;

  return (
    <CalculatorUIWrapper
      inputCard={inputCard}
      resultsCard={resultsCard}
      shareParams={shareParams}
      elementIds={["date-diff-inputs", "date-diff-results"]}
      calculatorName={calculatorName}
    />
  );
}
