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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
      name: "What is Gross Pay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gross pay is the total amount of money you earn before any deductions are subtracted. This calculator computes your gross pay. Your actual take-home pay (net pay) will be lower after taxes, insurance, and other deductions are taken out.",
      },
    },
    {
      "@type": "Question",
      name: "How are decimal hours calculated from minutes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool converts minutes into a decimal format for easy calculation. For example, 30 minutes is 0.5 hours (30/60), and 15 minutes is 0.25 hours (15/60). This allows for simple multiplication with your hourly rate.",
      },
    },
    {
      "@type": "Question",
      name: "Does this calculator handle overtime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, this is a basic time card calculator and does not automatically calculate overtime pay. To calculate overtime, you would need to manually separate your regular hours from your overtime hours and use our Overtime Pay Calculator.",
      },
    },
  ],
};

interface Day {
  startTime: string;
  endTime: string;
  breakMinutes: number;
}

const initialWeek: Day[] = [
  { startTime: "09:00", endTime: "17:00", breakMinutes: 30 }, // Monday
  { startTime: "09:00", endTime: "17:00", breakMinutes: 30 }, // Tuesday
  { startTime: "09:00", endTime: "17:00", breakMinutes: 30 }, // Wednesday
  { startTime: "09:00", endTime: "17:00", breakMinutes: 30 }, // Thursday
  { startTime: "09:00", endTime: "17:00", breakMinutes: 30 }, // Friday
  { startTime: "", endTime: "", breakMinutes: 0 }, // Saturday
  { startTime: "", endTime: "", breakMinutes: 0 }, // Sunday
];

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const parseTime = (timeStr: string): number => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

export default function TimeCardCalculator() {
  const [week, setWeek] = usePersistentState<Day[]>(
    "timecard-week",
    initialWeek,
  );
  const [hourlyRate, setHourlyRate] = usePersistentState("timecard-rate", 20);

  const handleDayChange = (
    index: number,
    field: keyof Day,
    value: string | number,
  ) => {
    const newWeek = [...week];
    const day = { ...newWeek[index] };
    (day as Record<keyof Day, string | number>)[field] = value;
    newWeek[index] = day;
    setWeek(newWeek);
  };

  const totals = useMemo(() => {
    let totalMinutes = 0;
    const dailyTotals: number[] = [];

    week.forEach((day) => {
      const start = parseTime(day.startTime);
      const end = parseTime(day.endTime);
      if (end > start) {
        const dailyMinutes = end - start - day.breakMinutes;
        dailyTotals.push(dailyMinutes > 0 ? dailyMinutes : 0);
        totalMinutes += dailyMinutes > 0 ? dailyMinutes : 0;
      } else {
        dailyTotals.push(0);
      }
    });

    const totalHours = totalMinutes / 60;
    const grossPay = totalHours * hourlyRate;

    return { totalHours, grossPay, dailyTotals };
  }, [week, hourlyRate]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Time Card Calculator</CardTitle>
          <CardDescription>
            Enter start times, end times, and break durations for each day to
            calculate total work hours and gross pay.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>Break (mins)</TableHead>
                  <TableHead>Total Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {week.map((day, index) => (
                  <TableRow key={index}>
                    <TableCell>{dayNames[index]}</TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        aria-label={`Start time for ${dayNames[index]}`}
                        value={day.startTime}
                        onChange={(e) =>
                          handleDayChange(index, "startTime", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        aria-label={`End time for ${dayNames[index]}`}
                        value={day.endTime}
                        onChange={(e) =>
                          handleDayChange(index, "endTime", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        aria-label={`Break in minutes for ${dayNames[index]}`}
                        value={day.breakMinutes}
                        onChange={(e) =>
                          handleDayChange(
                            index,
                            "breakMinutes",
                            Number(e.target.value),
                          )
                        }
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>
                      {(totals.dailyTotals[index] / 60).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 space-y-2">
            <Label htmlFor="hourly-rate">Hourly Rate</Label>
            <Input
              id="hourly-rate"
              type="number"
              min="0"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-32"
            />
          </div>
        </CardContent>
      </Card>
      <div role="status" aria-live="polite">
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Total Weekly Hours
              </p>
              <p className="text-4xl font-bold font-headline text-primary">
                {totals.totalHours.toFixed(2)}
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Gross Pay</p>
              <p className="text-4xl font-bold font-headline text-primary">
                ₹{totals.grossPay.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Time Card Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The Time Card Calculator helps employees and employers track work
            hours and calculate gross pay. It simplifies adding up daily hours and
            subtracting break times, reducing errors and ensuring fair pay.
          </p>
          <h3>How to Use the Time Card Calculator</h3>
          <ol>
            <li>For each day, enter your **Start Time** and **End Time**.</li>
            <li>Enter the total duration of your unpaid **Break** in minutes.</li>
            <li>Enter your **Hourly Rate** of pay.</li>
          </ol>
          <p>
            The calculator will instantly update the total weekly hours and your
            total gross pay.
          </p>
          <h3>Time Card Calculator FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Gross Pay?</AccordionTrigger>
              <AccordionContent>
                Gross pay is the total amount you earn before any deductions are
                subtracted. This calculator computes your gross pay. Your actual
                take-home pay (net pay) will be lower after taxes and other
                deductions are taken out.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                How are decimal hours calculated?
              </AccordionTrigger>
              <AccordionContent>
                This tool converts minutes into a decimal format for easy
                calculation. For example, 30 minutes is 0.5 hours, and 15 minutes
                is 0.25 hours. This allows for simple multiplication with your
                hourly rate.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Does this calculator handle overtime?
              </AccordionTrigger>
              <AccordionContent>
                No, this is a basic time card calculator and does not
                automatically calculate overtime pay. To calculate overtime, you
                would need to separate your regular and overtime hours and use our{" "}
                <a
                  href="/calculators/overtime-pay-calculator"
                  className="text-primary hover:underline"
                >
                  Overtime Pay Calculator
                </a>
                .
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
