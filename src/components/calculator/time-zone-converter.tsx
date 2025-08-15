"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const timezones = [
  // Americas
  "UTC", "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", 
  "America/Toronto", "America/Vancouver", "America/Mexico_City", "America/Sao_Paulo", "America/Buenos_Aires",

  // Europe
  "Europe/London", "Europe/Paris", "Europe/Berlin", "Europe/Moscow", "Europe/Madrid", "Europe/Rome",

  // Asia
  "Asia/Tokyo", "Asia/Dubai", "Asia/Kolkata", "Asia/Shanghai", "Asia/Hong_Kong", "Asia/Singapore", 
  "Asia/Seoul", "Asia/Bangkok",

  // Australia
  "Australia/Sydney", "Australia/Melbourne", "Australia/Perth", "Pacific/Auckland",

  // Africa
  "Africa/Cairo", "Africa/Johannesburg", "Africa/Lagos", "Africa/Nairobi"
];

export default function TimeZoneConverter() {
  const [fromZone, setFromZone] = useState("Asia/Kolkata");
  const [toZone, setToZone] = useState("America/New_York");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState(new Date().toTimeString().slice(0,5));
  
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
      // Ensure we use the local date but set the time according to user input
      sourceDate.setHours(hours, minutes, 0, 0);

      // We need to construct a string that represents the local time in the "from" timezone
      // for accurate conversion. This is a bit tricky with Intl.
      // A more robust solution might use a library like date-fns-tz.
      // For now, let's format the input date and time to ISO-like string.
      const year = sourceDate.getFullYear();
      const month = String(sourceDate.getMonth() + 1).padStart(2, '0');
      const day = String(sourceDate.getDate()).padStart(2, '0');
      
      // Creating a string that represents the time in the source timezone
      const dateStringInFromZone = `${year}-${month}-${day}T${time}:00`;
      
      const dateInFromZone = new Date(dateStringInFromZone);
      
      // Now, format this date object into the target timezone.
      const options: Intl.DateTimeFormatOptions = {
        timeZone: toZone,
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: true
      };
      
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setConvertedTime(formatter.format(dateInFromZone));

    } catch(e) {
      setConvertedTime("Invalid Date/Time");
    }
  }, [date, time, fromZone, toZone]);


  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Time Zone Converter</CardTitle>
          <CardDescription>Instantly convert the time from one timezone to another. Select the source and target timezones, and set a date and time to see the conversion.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row items-end gap-4">
            {/* From */}
            <div className="w-full space-y-2">
              <Label>From</Label>
              <Select value={fromZone} onValueChange={setFromZone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {timezones.map(tz => <SelectItem key={tz} value={tz}>{tz.replace(/_/g, ' ')}</SelectItem>)}
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
                   {timezones.map(tz => <SelectItem key={tz} value={tz}>{tz.replace(/_/g, ' ')}</SelectItem>)}
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
