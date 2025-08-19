
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const parseTime = (timeStr: string): number => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

export default function TimeCardCalculator() {
  const [week, setWeek] = usePersistentState<Day[]>("timecard-week", initialWeek);
  const [hourlyRate, setHourlyRate] = usePersistentState("timecard-rate", 20);

  const handleDayChange = (index: number, field: keyof Day, value: string | number) => {
    const newWeek = [...week];
    (newWeek[index] as any)[field] = value;
    setWeek(newWeek);
  };

  const totals = useMemo(() => {
    let totalMinutes = 0;
    const dailyTotals: number[] = [];

    week.forEach(day => {
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
          <CardDescription>Enter start times, end times, and break durations for each day to calculate total work hours and gross pay.</CardDescription>
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
                    <TableCell><Input type="time" value={day.startTime} onChange={e => handleDayChange(index, "startTime", e.target.value)} /></TableCell>
                    <TableCell><Input type="time" value={day.endTime} onChange={e => handleDayChange(index, "endTime", e.target.value)} /></TableCell>
                    <TableCell><Input type="number" value={day.breakMinutes} onChange={e => handleDayChange(index, "breakMinutes", Number(e.target.value))} className="w-20" /></TableCell>
                    <TableCell>{(totals.dailyTotals[index] / 60).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 space-y-2">
            <Label htmlFor="hourly-rate">Hourly Rate</Label>
            <Input id="hourly-rate" type="number" value={hourlyRate} onChange={e => setHourlyRate(Number(e.target.value))} className="w-32" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Weekly Hours</p>
            <p className="text-4xl font-bold font-headline text-primary">{totals.totalHours.toFixed(2)}</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Gross Pay</p>
            <p className="text-4xl font-bold font-headline text-primary">₹{totals.grossPay.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

  