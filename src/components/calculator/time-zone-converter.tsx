"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const timezones = [
  "UTC", "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
  "Europe/London", "Europe/Paris", "Europe/Berlin", "Asia/Tokyo", "Asia/Dubai",
  "Asia/Kolkata", "Australia/Sydney"
];

export default function TimeZoneConverter() {
  const [fromZone, setFromZone] = useState("Asia/Kolkata");
  const [toZone, setToZone] = useState("America/New_York");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("12:00");
  
  const [convertedTime, setConvertedTime] = useState("");

  const handleSwap = () => {
    setFromZone(toZone);
    setToZone(fromZone);
  };
  
  useEffect(() => {
    if (!date || !time) return;

    try {
      const [hours, minutes] = time.split(':').map(Number);
      const sourceDate = new Date(date);
      sourceDate.setHours(hours, minutes);

      const options: Intl.DateTimeFormatOptions = {
        timeZone: toZone,
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
      };
      
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setConvertedTime(formatter.format(sourceDate));
    } catch(e) {
      setConvertedTime("Invalid Date/Time");
    }
  }, [date, time, fromZone, toZone]);


  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Time Zone Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row items-end gap-4">
            {/* From */}
            <div className="w-full space-y-2">
              <Label>From</Label>
              <Select value={fromZone} onValueChange={setFromZone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {timezones.map(tz => <SelectItem key={tz} value={tz}>{tz.replace('_', ' ')}</SelectItem>)}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <DatePicker date={date} setDate={setDate} className="w-full" />
                <Input type="time" value={time} onChange={e => setTime(e.target.value)} />
              </div>
            </div>

            <Button variant="ghost" size="icon" className="shrink-0 mb-2" onClick={handleSwap}>
                <ArrowRightLeft className="w-5 h-5 text-primary" />
            </Button>
            
            {/* To */}
            <div className="w-full space-y-2">
              <Label>To</Label>
               <Select value={toZone} onValueChange={setToZone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {timezones.map(tz => <SelectItem key={tz} value={tz}>{tz.replace('_', ' ')}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input value={convertedTime} readOnly className="font-bold text-primary bg-primary/10 border-primary/20 h-16 text-lg"/>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
