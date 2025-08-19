
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
    <div className="space-y-6">
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
  );
}
