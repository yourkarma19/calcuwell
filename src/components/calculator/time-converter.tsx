"use client";

import { ArrowRightLeft } from "lucide-react";
import { useMemo } from "react";
import { Button } from "../ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      name: "Why are month and year values in a time converter approximate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The number of days in a month varies (from 28 to 31), and a year can be 365 or 366 days. To provide a consistent conversion, this calculator uses an average month length of 30.417 days and an average (non-leap) year length of 365 days. For precise date calculations, a Date Difference Calculator should be used.",
      },
    },
    {
      "@type": "Question",
      name: "How many seconds are in a day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are 60 seconds in a minute, 60 minutes in an hour, and 24 hours in a day. Therefore, there are 60 x 60 x 24 = 86,400 seconds in one day.",
      },
    },
    {
      "@type": "Question",
      name: "What is a leap second?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A leap second is a one-second adjustment occasionally applied to Coordinated Universal Time (UTC) to keep it close to the mean solar time. It's an irregularity that this calculator does not account for, as it's not predictable in the same way as a leap year.",
      },
    },
  ],
};

const timeUnits = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400,
  weeks: 604800,
  months: 2628000, // Approximation
  years: 31536000, // Approximation
};

type TimeUnit = keyof typeof timeUnits;

export default function TimeConverter() {
  const [fromUnit, setFromUnit] = usePersistentState<TimeUnit>(
    "time-from",
    "hours",
  );
  const [toUnit, setToUnit] = usePersistentState<TimeUnit>(
    "time-to",
    "minutes",
  );
  const [value, setValue] = usePersistentState("time-value", "1");

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const convertedValue = useMemo(() => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "";

    const fromFactor = timeUnits[fromUnit];
    const toFactor = timeUnits[toUnit];

    const result = (numValue * fromFactor) / toFactor;
    return result.toLocaleString(undefined, {
      maximumFractionDigits: result > 1 ? 4 : 8,
    });
  }, [value, fromUnit, toUnit]);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Time Converter</CardTitle>
          <CardDescription>
            Convert between various units of time, from seconds to years. Note
            that &apos;month&apos; and &apos;year&apos; are average
            approximations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full space-y-2">
              <Label htmlFor="from-value">From</Label>
              <Input
                id="from-value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Select
                value={fromUnit}
                onValueChange={(v) => setFromUnit(v as TimeUnit)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(timeUnits).map((unit) => (
                    <SelectItem key={unit} value={unit} className="capitalize">
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 mt-4 md:mt-7"
              onClick={handleSwap}
            >
              <ArrowRightLeft className="w-5 h-5 text-primary" />
            </Button>

            <div className="w-full space-y-2">
              <Label htmlFor="to-value">To</Label>
              <Input
                id="to-value"
                value={convertedValue}
                readOnly
                className="font-bold text-primary bg-primary/10 border-primary/20"
              />
              <Select
                value={toUnit}
                onValueChange={(v) => setToUnit(v as TimeUnit)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(timeUnits).map((unit) => (
                    <SelectItem key={unit} value={unit} className="capitalize">
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Time Converter</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            Our **Time Converter** allows you to quickly convert between various
            units of time. Whether you&rsquo;re a student, a project manager, or
            just curious, this calculator simplifies time-related conversions from
            seconds to years.
          </p>
          <h3>How to Use the Time Converter</h3>
          <ol>
            <li>Enter the value you want to convert.</li>
            <li>Select the starting unit of time (e.g., Hours).</li>
            <li>
              Select the target unit you want to convert to (e.g., Seconds).
            </li>
          </ol>
          <p>
            The converted time will be displayed automatically. Use the swap
            button to quickly reverse the conversion.
          </p>
          <h3>Time Converter FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Why are month and year values approximate?
              </AccordionTrigger>
              <AccordionContent>
                The number of days in a month varies, and a year can be 365 or 366
                days. To provide a consistent conversion, this calculator uses an
                average month length of 30.417 days and an average year length of
                365 days. For precise date calculations, use our **Date Difference
                Calculator**.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How many seconds are in a day?</AccordionTrigger>
              <AccordionContent>
                There are 60 seconds in a minute, 60 minutes in an hour, and 24
                hours in a day. Therefore, there are `60 x 60 x 24 = 86,400`
                seconds in one day.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What is a leap second?</AccordionTrigger>
              <AccordionContent>
                A leap second is a one-second adjustment occasionally applied to
                Coordinated Universal Time (UTC) to keep it close to solar time.
                It&rsquo;s an irregularity that this calculator does not account
                for.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
