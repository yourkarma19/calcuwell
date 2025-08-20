
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import usePersistentState from "@/hooks/use-persistent-state";

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
  const [fromZone, setFromZone] = usePersistentState("tz-from", "Asia/Kolkata");
  const [toZone, setToZone] = usePersistentState("tz-to", "America/New_York");
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
      if(isNaN(hours) || isNaN(minutes) || hours > 23 || minutes > 59){
        throw new Error("Invalid time format");
      }
      
      const localDate = new Date(date);
      localDate.setHours(hours, minutes, 0, 0);

      // 1. Create a date object that represents the correct moment in time, as if it were in the "from" timezone
      const zonedTime = fromZonedTime(localDate, fromZone);
      
      // 2. Format that moment into the "to" timezone's string representation
      const result = formatInTimeZone(zonedTime, toZone, "PPP 'at' hh:mm:ss a (zzz)");
      
      setConvertedTime(result);

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
              <div className="flex flex-col sm:flex-row gap-2">
                <DatePicker date={date} setDate={setDate} disabled={(date) => false}/>
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
              <Input value={convertedTime} readOnly className="font-bold text-primary bg-primary/10 border-primary/20 h-16 text-lg sm:h-20" aria-live="polite"/>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>About Time Zones</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>The Time Zone Converter is a key tool for anyone who works, travels, or communicates across different parts of the world. It ends the confusion of calculating time differences. The tool lets you instantly find the local time in another city or country based on your own. This is perfect for scheduling international meetings, planning trips, or just staying in touch with friends and family abroad.</p>
          
          <h3>How to Use the Calculator</h3>
          <ol>
              <li>In the "From" section, select your starting time zone, date, and time.</li>
              <li>In the "To" section, select the time zone you want to convert to.</li>
              <li>The converted date and time will be displayed instantly.</li>
          </ol>

          <h3>Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is UTC?</AccordionTrigger>
              <AccordionContent>
                Coordinated Universal Time (UTC) is the main time standard that the world uses to regulate clocks and time. It is not a time zone itself. Instead, it is the basis for civil time and time zones worldwide. Time zones are often shown as an offset from UTC (e.g., UTC-5 for New York).
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-2">
              <AccordionTrigger>Does this handle Daylight Saving Time (DST)?</AccordionTrigger>
              <AccordionContent>
                Yes, this converter automatically handles Daylight Saving Time. It uses the international IANA Time Zone Database. This database contains all historical and future DST rules for each timezone. This ensures that the conversion is accurate, even for dates when DST rules are active.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
