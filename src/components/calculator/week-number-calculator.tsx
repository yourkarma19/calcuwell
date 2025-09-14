"use client";

import { useMemo } from "react";
import { getWeek, format, getISOWeek, getISOWeekYear } from "date-fns";
import CalculatorUIWrapper from "./calculator-ui-wrapper";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
      name: "What is the ISO 8601 standard for week numbers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The ISO 8601 standard is the international standard for week dates. In this system, weeks always start on a Monday. Week 1 of any year is the first week that contains a Thursday. This is the most common standard used in business across Europe and Asia.",
      },
    },
    {
      "@type": "Question",
      name: "How do other week definitions work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some regions, particularly in North America, consider Sunday to be the start of the week. In these systems, Week 1 is simply the week that contains January 1st.",
      },
    },
    {
      "@type": "Question",
      name: "Why does the ISO week year sometimes differ from the calendar year?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because the ISO week year is based on which year the majority of the week's days fall in, the first few days of January can sometimes belong to the last week of the previous year, and the last few days of December can belong to the first week of the next year.",
      },
    },
  ],
};


export default function WeekNumberCalculator({
  calculatorName,
}: {
  calculatorName: string;
}) {
  const [selectedDate, setSelectedDate] = usePersistentState<Date | undefined>(
    "weeknum-date",
    new Date(),
    (v) => (v ? new Date(v as string) : new Date()),
  );
  const [weekDefinition, setWeekDefinition] = usePersistentState<
    "sunday" | "monday" | "iso"
  >("weeknum-def", "iso");

  const { weekNumber, yearForWeek } = useMemo(() => {
    if (!selectedDate) return { weekNumber: null, yearForWeek: null };

    let week, year;

    switch (weekDefinition) {
      case "sunday":
        week = getWeek(selectedDate, { weekStartsOn: 0 });
        year = selectedDate.getFullYear();
        break;
      case "monday":
        week = getWeek(selectedDate, { weekStartsOn: 1 });
        year = selectedDate.getFullYear();
        break;
      case "iso":
      default:
        week = getISOWeek(selectedDate);
        year = getISOWeekYear(selectedDate);
        break;
    }
    return { weekNumber: week, yearForWeek: year };
  }, [selectedDate, weekDefinition]);

  const shareParams = {
    date: selectedDate?.toISOString().split("T")[0] || "",
    def: weekDefinition,
  };

  const inputCard = (
    <Card id="weeknum-inputs">
      <CardHeader>
        <CardTitle>Week Number Calculator</CardTitle>
        <CardDescription>
          Find the week number for any given date according to different
          international standards.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Select Date</Label>
          <DatePicker
            date={selectedDate}
            setDate={setSelectedDate}
            disabled={() => false}
          />
        </div>
        <div className="space-y-2">
          <Label>Week Definition</Label>
          <RadioGroup
            value={weekDefinition}
            onValueChange={(v) =>
              setWeekDefinition(v as "sunday" | "monday" | "iso")
            }
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:space-x-4 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="iso" id="iso" />
              <Label htmlFor="iso">ISO 8601</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sunday" id="sunday" />
              <Label htmlFor="sunday">Starts on Sunday</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monday" id="monday" />
              <Label htmlFor="monday">Starts on Monday</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );

  const resultsCard = (
    <div role="status" aria-live="polite">
      <Card id="weeknum-results">
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {selectedDate ? (
            <>
              <p className="text-sm text-muted-foreground">
                {format(selectedDate, "PPP")} is in
              </p>
              <p className="text-6xl font-bold font-headline text-primary my-2">
                Week {weekNumber}
              </p>
              <p className="text-lg text-muted-foreground">of {yearForWeek}</p>
            </>
          ) : (
            <p className="text-muted-foreground">Select a date.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      <CalculatorUIWrapper
        inputCard={inputCard}
        resultsCard={resultsCard}
        shareParams={shareParams}
        elementIds={["weeknum-inputs", "weeknum-results"]}
        calculatorName={calculatorName}
      />
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle as="h2">About the Week Number Calculator</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <p>
              The Week Number Calculator helps you find the week of the year for any
              given date. This can be useful for project planning, scheduling, and
              reporting in business.
            </p>

            <h3>How to Use the Week Number Calculator</h3>
            <ol>
              <li>Select the **Date** you want to find the week number for.</li>
              <li>Choose the **Week Definition** standard you want to use.</li>
            </ol>
            <p>
              The calculator will instantly display the week number for the selected
              date and year.
            </p>

            <h3>Week Number FAQs</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is the ISO 8601 standard?</AccordionTrigger>
                <AccordionContent>
                  The **ISO 8601** standard is the international standard for week
                  dates. In this system, weeks always start on a Monday. Week 1 of
                  any year is the first week that contains a Thursday. This is the
                  most common standard used in business.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  How do other week definitions work?
                </AccordionTrigger>
                <AccordionContent>
                  Some regions, particularly in North America, consider Sunday to be
                  the start of the week. In these systems, Week 1 is simply the week
                  that contains January 1st.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Why does the ISO week year sometimes differ from the calendar
                  year?
                </AccordionTrigger>
                <AccordionContent>
                  The ISO week year is based on which year the majority of the
                  week&apos;s days fall in. Because of this, the first few days of
                  January can sometimes belong to the last week of the previous
                  year.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
