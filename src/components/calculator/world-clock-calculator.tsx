
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const majorTimezones = [
  { city: "New York", tz: "America/New_York" },
  { city: "London", tz: "Europe/London" },
  { city: "Paris", tz: "Europe/Paris" },
  { city: "Tokyo", tz: "Asia/Tokyo" },
  { city: "Sydney", tz: "Australia/Sydney" },
  { city: "Dubai", tz: "Asia/Dubai" },
  { city: "Kolkata", tz: "Asia/Kolkata" },
  { city: "Los Angeles", tz: "America/Los_Angeles" },
  { city: "Shanghai", tz: "Asia/Shanghai" },
];

export default function WorldClock() {
  const [time, setTime] = useState(new Date());
  const [selectedTz, setSelectedTz] = useState("America/New_York");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (tz: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(time);
  };
  
  const formatDate = (tz: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(time);
  };

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>World Clock</CardTitle>
          <CardDescription>View the current time and date in major cities around the world. The times update automatically every second.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {majorTimezones.map(({ city, tz }) => (
                    <Card key={tz}>
                        <CardHeader>
                            <CardTitle>{city}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-mono font-bold text-primary">{formatTime(tz)}</p>
                            <p className="text-sm text-muted-foreground">{formatDate(tz)}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>About the World Clock</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>The **World Clock** provides a quick and convenient dashboard to view the current local time in major cities across different continents. It is an essential tool for anyone dealing with international business, travel, or communication. The clock automatically accounts for different time zones and Daylight Saving Time rules, providing an accurate and real-time display that updates every second.</p>
          <h3>How to Use the World Clock</h3>
          <p>This tool is fully automatic. Upon loading the page, it displays the current time and date for a curated list of major international cities. The clocks tick in real-time, so you always have the most current information at a glance. No manual input is needed.</p>
          <h3>Frequently Asked Questions (FAQs)</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does this work?</AccordionTrigger>
              <AccordionContent>
                This world clock uses your device's local time and the standard `Intl.DateTimeFormat` API in JavaScript to calculate and display the current time in various time zones. This API has built-in knowledge of global time zones and their specific rules, including Daylight Saving Time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is a time zone?</AccordionTrigger>
              <AccordionContent>
                A time zone is a region of the globe that observes a uniform standard time for legal, commercial, and social purposes. Time zones tend to follow the boundaries of countries and their subdivisions because it is convenient for areas in close commercial or other communication to keep the same time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I add or change the cities displayed?</AccordionTrigger>
              <AccordionContent>
                Currently, this tool displays a fixed list of major cities representing key time zones around the world. Functionality to customize the list of cities may be added in a future update. For specific conversions, please use our **Time Zone Converter**.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
