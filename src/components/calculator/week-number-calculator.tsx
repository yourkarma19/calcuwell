
"use client";

import { useState, useMemo } from "react";
import { getWeek, format, getISOWeek, getYear } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function WeekNumberCalculator() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [weekDefinition, setWeekDefinition] = useState<"sunday" | "monday" | "iso">("iso");

  const weekNumber = useMemo(() => {
    if (!selectedDate) return null;

    switch(weekDefinition) {
      case 'sunday':
        return getWeek(selectedDate, { weekStartsOn: 0 }); // Sunday
      case 'monday':
        return getWeek(selectedDate, { weekStartsOn: 1 }); // Monday
      case 'iso':
        return getISOWeek(selectedDate);
    }
  }, [selectedDate, weekDefinition]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Week Number Calculator</CardTitle>
            <CardDescription>Find the week number for any given date according to different international standards.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <DatePicker date={selectedDate} setDate={setSelectedDate} disabled={() => false}/>
            </div>
            <div className="space-y-2">
                <Label>Week Definition</Label>
                <RadioGroup value={weekDefinition} onValueChange={(v) => setWeekDefinition(v as any)} className="flex items-center space-x-4 pt-2">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="iso" id="iso" /><Label htmlFor="iso">ISO 8601</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="sunday" id="sunday" /><Label htmlFor="sunday">Starts on Sunday</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="monday" id="monday" /><Label htmlFor="monday">Starts on Monday</Label></div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>About Week Numbers</CardTitle></CardHeader>
          <CardContent>
              <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                      <AccordionTrigger>What is the ISO 8601 week definition?</AccordionTrigger>
                      <AccordionContent>
                          The ISO 8601 standard is an international system for date and time notation. In this system, weeks start on a Monday, and the first week of the year is the one that contains the first Thursday of the year. This means Week 1 can sometimes start in the previous calendar year.
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                      <AccordionTrigger>Why are there different week numbering systems?</AccordionTrigger>
                      <AccordionContent>
                          Different regions and industries have historically used different conventions. For example, in the United States and Canada, it is common for weeks to start on Sunday, while in Europe and much of the world, Monday is considered the first day of the week. ISO 8601 provides a globally recognized standard.
                      </AccordionContent>
                  </AccordionItem>
              </Accordion>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Result</CardTitle></CardHeader>
          <CardContent className="text-center">
            {selectedDate ? (
              <>
                <p className="text-sm text-muted-foreground">
                  {format(selectedDate, "PPP")} is in
                </p>
                <p className="text-6xl font-bold font-headline text-primary my-2">
                  Week {weekNumber}
                </p>
                <p className="text-lg text-muted-foreground">of {getYear(selectedDate)}</p>
              </>
            ) : (
                <p className="text-muted-foreground">Select a date.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
