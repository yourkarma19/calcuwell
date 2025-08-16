
"use client";

import { useState } from "react";
import { format, differenceInBusinessDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function WorkingDaysCalculator() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 30))
  );
  const [workingDays, setWorkingDays] = useState<number | null>(null);

  const handleCalculate = () => {
    if (startDate && endDate) {
      setWorkingDays(differenceInBusinessDays(endDate, startDate));
    }
  };

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Calculate Working Days</CardTitle>
            <CardDescription>Calculate the number of business days between two dates. This calculation excludes weekends but not public holidays.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <DatePicker date={startDate} setDate={setStartDate} disabled={() => false} />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <DatePicker date={endDate} setDate={setEndDate} disabled={() => false}/>
              </div>
            </div>
            <Button onClick={handleCalculate} className="w-full">
              Calculate Working Days
            </Button>
            <p className="text-xs text-muted-foreground">This calculation excludes weekends (Saturdays and Sundays). It does not account for public holidays.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>About Working Days</CardTitle></CardHeader>
          <CardContent>
              <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                      <AccordionTrigger>What is a working/business day?</AccordionTrigger>
                      <AccordionContent>
                          A working or business day is any official working day. This typically means Monday through Friday and excludes weekends and public holidays. This calculator only excludes weekends (Saturday and Sunday).
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                      <AccordionTrigger>Why is calculating working days important?</AccordionTrigger>
                      <AccordionContent>
                          It is essential for project management, logistics, and financial services to set realistic deadlines. For example, it helps in estimating project completion dates, delivery times, and contract fulfillment periods.
                      </AccordionContent>
                  </AccordionItem>
              </Accordion>
          </CardContent>
        </Card>
      </div>

       {workingDays !== null && (
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Result</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Total Working Days</p>
                <p className="text-6xl font-bold font-headline text-primary my-2">
                  {workingDays}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
    </>
  );
}
