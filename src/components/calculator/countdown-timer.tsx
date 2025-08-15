"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [targetDate, setTargetDate] = useState<Date | undefined>(
    new Date(new Date().getFullYear() + 1, 0, 1) // Default to next New Year
  );
  const [targetTime, setTargetTime] = useState("00:00");
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const [hours, minutes] = targetTime.split(':').map(Number);
      const targetDateTime = new Date(targetDate);
      targetDateTime.setHours(hours, minutes, 0, 0);

      const totalSeconds = (targetDateTime.getTime() - now.getTime()) / 1000;

      if (totalSeconds <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(totalSeconds / 3600 / 24),
        hours: Math.floor((totalSeconds / 3600) % 24),
        minutes: Math.floor((totalSeconds / 60) % 60),
        seconds: Math.floor(totalSeconds % 60),
      });
    };

    // Initial calculation
    calculateTimeLeft();

    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate, targetTime]);
  
  const TimeBox = ({ value, label }: { value: number, label: string }) => (
    <div className="bg-muted p-4 rounded-lg text-center">
      <p className="text-4xl font-bold font-headline text-primary">{String(value).padStart(2, '0')}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Set Countdown Target</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Target Date</Label>
            <DatePicker date={targetDate} setDate={setTargetDate} />
          </div>
          <div className="space-y-2">
            <Label>Target Time</Label>
            <Input type="time" value={targetTime} onChange={e => setTargetTime(e.target.value)} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Time Remaining</CardTitle>
        </CardHeader>
        <CardContent>
          {timeLeft !== null ? (
            <div className="grid grid-cols-4 gap-4">
              <TimeBox value={timeLeft.days} label="Days" />
              <TimeBox value={timeLeft.hours} label="Hours" />
              <TimeBox value={timeLeft.minutes} label="Minutes" />
              <TimeBox value={timeLeft.seconds} label="Seconds" />
            </div>
          ) : (
            <div className="text-center text-muted-foreground">Calculating...</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}