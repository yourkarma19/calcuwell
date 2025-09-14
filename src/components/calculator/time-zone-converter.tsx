"use client";

import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { ArrowRightLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
      name: "What is UTC (Coordinated Universal Time)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Coordinated Universal Time (UTC) is the primary time standard that the world uses to regulate clocks and time. It is not a time zone itself but is the basis for civil time and time zones worldwide. Time zones are often shown as an offset from UTC (e.g., UTC-5).",
      },
    },
    {
      "@type": "Question",
      name: "Does this time zone converter handle Daylight Saving Time (DST)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, this converter automatically handles Daylight Saving Time. It uses the international IANA Time Zone Database, which contains all historical and future DST rules for each timezone, ensuring the conversion is accurate.",
      },
    },
  ],
};

const timezones = [
  // Americas
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "America/Vancouver",
  "America/Mexico_City",
  "America/Sao_Paulo",
  "America/Buenos_Aires",

  // Europe
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Moscow",
  "Europe/Madrid",
  "Europe/Rome",

  // Asia
  "Asia/Tokyo",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Shanghai",
  "Asia/Hong_Kong",
  "Asia/Singapore",
  "Asia/Seoul",
  "Asia/Bangkok",

  // Australia
  "Australia/Sydney",
  "Australia/Melbourne",
  "Australia/Perth",
  "Pacific/Auckland",

  // Africa
  "Africa/Cairo",
  "Africa/Johannesburg",
  "Africa/Lagos",
  "Africa/Nairobi",
];

export default function TimeZoneConverter() {
  const [fromZone, setFromZone] = usePersistentState<string>(
    "tz-from",
    "Asia/Kolkata",
  );
  const [toZone, setToZone] = usePersistentState<string>(
    "tz-to",
    "America/New_York",
  );
  const [date, setDate] = usePersistentState<Date | undefined>(
    "tz-date",
    new Date(),
    (v) => (v ? new Date(v as string) : new Date()),
  );
  const [time, setTime] = usePersistentState<string>(
    "tz-time",
    new Date().toTimeString().slice(0, 5),
  );

  const [convertedTime, setConvertedTime] = useState<string>("");

  const handleSwap = () => {
    setFromZone(toZone);
    setToZone(fromZone);
  };

  useEffect(() => {
    if (!date || !time) return;

    try {
      const [hours, minutes] = time.split(":").map(Number);
      if (isNaN(hours) || isNaN(minutes) || hours > 23 || minutes > 59) {
        throw new Error("Invalid time format");
      }

      const localDate = new Date(date);
      localDate.setHours(hours, minutes, 0, 0);

      const zonedTime = fromZonedTime(localDate, fromZone);

      const result = formatInTimeZone(
        zonedTime,
        toZone,
        "PPP 'at' hh:mm:ss a (zzz)",
      );

      setConvertedTime(result);
    } catch (e) {
      setConvertedTime("Invalid Date/Time");
    }
  }, [date, time, fromZone, toZone]);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Time Zone Converter</CardTitle>
          <CardDescription>
            Instantly convert the time from one timezone to another. Select the
            source and target timezones, and set a date and time to see the
            conversion.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row items-end gap-4">
            {/* From */}
            <div className="w-full space-y-2">
              <Label>From</Label>
              <Select value={fromZone} onValueChange={setFromZone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-col sm:flex-row gap-2">
                <DatePicker
                  date={date}
                  setDate={setDate}
                  disabled={() => false}
                />
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 mb-2"
              onClick={handleSwap}
            >
              <ArrowRightLeft className="w-5 h-5 text-primary" />
            </Button>

            {/* To */}
            <div className="w-full space-y-2">
              <Label>To</Label>
              <Select value={toZone} onValueChange={setToZone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div aria-live="polite">
                <Input
                  value={convertedTime}
                  readOnly
                  className="font-bold text-primary bg-primary/10 border-primary/20 h-10 sm:h-20 text-base sm:text-lg"
                  aria-label="Converted Time"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Time Zone Converter</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The Time Zone Converter is a tool for anyone who works, travels, or
            communicates across different parts of the world. It lets you
            instantly find the local time in another city or country based on your
            own. This is perfect for scheduling international meetings or just
            staying in touch with friends and family abroad.
          </p>

          <h3>How to Use the Time Zone Converter</h3>
          <ol>
            <li>
              In the &quot;From&quot; section, select your starting time zone,
              date, and time.
            </li>
            <li>
              In the &quot;To&quot; section, select the time zone you want to
              convert to.
            </li>
            <li>The converted date and time will be displayed instantly.</li>
          </ol>

          <h3>Time Zone FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is UTC?</AccordionTrigger>
              <AccordionContent>
                Coordinated Universal Time (UTC) is the main time standard for the
                world. It is not a time zone itself, but the basis for all time
                zones. Time zones are often shown as an offset from UTC (e.g.,
                UTC-5 for New York).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Does this handle Daylight Saving Time (DST)?
              </AccordionTrigger>
              <AccordionContent>
                Yes, this converter automatically handles Daylight Saving Time. It
                uses the international IANA Time Zone Database, which contains all
                DST rules for each timezone. This ensures the conversion is
                accurate.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
