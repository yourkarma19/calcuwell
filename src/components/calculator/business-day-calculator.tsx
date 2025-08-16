
"use client";

import { useState } from "react";
import { addBusinessDays, subBusinessDays, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function BusinessDayCalculator() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [days, setDays] = useState(10);
  const [resultDate, setResultDate] = useState<Date | null>(null);

  const handleAdd = () => {
    if (startDate) {
      setResultDate(addBusinessDays(startDate, days));
    }
  };
  
  const handleSubtract = () => {
    if (startDate) {
      setResultDate(subBusinessDays(startDate, days));
    }
  };

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Day Calculator</CardTitle>
            <CardDescription>Calculate a future or past date by adding or subtracting business days, automatically skipping weekends.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <DatePicker date={startDate} setDate={setStartDate} disabled={() => false}/>
              </div>
              <div className="space-y-2">
                <Label>Business Days to Add/Subtract</Label>
                <Input type="number" value={days} onChange={e => setDays(Number(e.target.value))} />
              </div>
            </div>
            <div className="flex gap-4">
                <Button onClick={handleAdd} className="w-full">Add Business Days</Button>
                <Button onClick={handleSubtract} variant="outline" className="w-full">Subtract Business Days</Button>
            </div>
             <p className="text-xs text-muted-foreground pt-2">Excludes weekends (Saturday, Sunday). Does not account for public holidays.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>About Business Days</CardTitle></CardHeader>
          <CardContent>
              <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                      <AccordionTrigger>What is the difference between a day and a business day?</AccordionTrigger>
                      <AccordionContent>
                          A regular day is any day of the week. A business day specifically refers to a typical working day, which is usually Monday through Friday. This calculator automatically skips Saturdays and Sundays in its calculation.
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                      <AccordionTrigger>Why is this important?</AccordionTrigger>
                      <AccordionContent>
                          This calculation is critical for business operations, especially in logistics, finance, and legal contracts. It helps set accurate expectations for delivery dates, payment schedules, and project deadlines that fall on working days.
                      </AccordionContent>
                  </AccordionItem>
              </Accordion>
          </CardContent>
        </Card>
      </div>
      
      {resultDate && (
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resulting Date</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold font-headline text-primary my-2">
                  {format(resultDate, "PPP")}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
    </>
  );
}
