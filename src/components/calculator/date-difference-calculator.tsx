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
import { Label } from "@/components/ui/label";
import usePersistentState from "@/hooks/use-persistent-state";
import type { FAQPage, WithContext } from "schema-dts";
import { cn } from "@/lib/utils";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you calculate the number of days between two dates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The calculator subtracts the start date from the end date to find the total number of milliseconds between them. This value is then converted into days. This method automatically accounts for the varying number of days in each month and for leap years.",
      },
    },
    {
      "@type": "Question",
      name: "Does this calculator include the end date in the count?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator determines the total number of full 24-hour periods between the start and end dates. For example, the difference between January 1 and January 3 is two full days.",
      },
    },
    {
      "@type": "Question",
      name: "What is this tool used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator is perfect for planning events (e.g., 'How many days until my birthday?'), tracking project timelines, calculating age, and determining the duration between important historical or personal dates.",
      },
    },
  ],
};

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
        setDifference(null);
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
    } else {
      setDifference(null);
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
          Find the total duration between two dates in various units like years,
          months, weeks, days, and more.
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
              disabled={(date) => !!startDate && date < startDate}
            />
          </div>
        </div>
        <Button
          onClick={handleCalculate}
          className={cn("w-full", "btn-glossy")}
        >
          Calculate Difference
        </Button>
      </CardContent>
    </Card>
  );

  const resultsCard =
    difference !== null ? (
      <div role="status" aria-live="polite">
        <Card id="date-diff-results">
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>
              The total difference between the selected dates is:
            </CardDescription>
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
      </div>
    ) : (
      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The end date must be after the start date.
          </p>
        </CardContent>
      </Card>
    );

  return (
    <>
      <CalculatorUIWrapper
        inputCard={inputCard}
        resultsCard={resultsCard}
        shareParams={shareParams}
        elementIds={["date-diff-inputs", "date-diff-results"]}
        calculatorName={calculatorName}
      />
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle as="h2">About the Date Difference Calculator</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <p>
              The <strong>Date Difference Calculator</strong> determines the
              precise duration between two dates. It provides the difference in a
              comprehensive format, breaking it down into years, months, weeks,
              days, hours, and minutes.
            </p>
            <h3>How to Use the Calculator</h3>
            <ol>
              <li>Select a **Start Date** from the first calendar.</li>
              <li>Select an **End Date** from the second calendar.</li>
            </ol>
            <p>
              The tool will automatically calculate and display the total duration
              between these two points in time.
            </p>
            <h3>Date Difference FAQs</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How do you calculate the number of days between two dates?
                </AccordionTrigger>
                <AccordionContent>
                  The calculator subtracts the start date from the end date to
                  find the total number of milliseconds between them. This value
                  is then converted into days. This method automatically
                  accounts for the varying number of days in each month and for
                  leap years.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Does this calculator include the end date in the count?
                </AccordionTrigger>
                <AccordionContent>
                  This calculator determines the total number of full 24-hour
                  periods between the start and end dates. For example, the
                  difference between January 1 and January 3 is two full days.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What is this tool used for?</AccordionTrigger>
                <AccordionContent>
                  This calculator is perfect for planning events (e.g., &quot;How
                  many days until my birthday?&quot;), tracking project timelines,
                  calculating age, and determining the duration between
                  important historical or personal dates.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
