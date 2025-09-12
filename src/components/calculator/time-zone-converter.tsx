
"use client";

import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { ArrowRightLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
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
    </div>
  );
}
