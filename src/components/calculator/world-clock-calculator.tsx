
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
    <div className="space-y-6">
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
    </div>
  );
}
