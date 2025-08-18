"use client";

import { useState } from "react";
import { addDays, subDays, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function AddSubtractDaysCalculator() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [days, setDays] = useState(30);
  const [resultDate, setResultDate] = useState<Date | null>(null);

  const handleAdd = () => {
    if (startDate) {
      setResultDate(addDays(startDate, days));
    }
  };
  
  const handleSubtract = () => {
    if (startDate) {
      setResultDate(subDays(startDate, days));
    }
  };

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Add or Subtract Days from a Date</CardTitle>
            <CardDescription>Easily find a future or past date by adding or subtracting a specific number of days from a start date.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <DatePicker date={startDate} setDate={setStartDate} disabled={() => false} />
              </div>
              <div className="space-y-2">
                <Label>Days to Add/Subtract</Label>
                <Input type="number" value={days} onChange={e => setDays(Number(e.target.value))} />
              </div>
            </div>
            <div className="flex gap-4">
                <Button onClick={handleAdd} className="w-full">Add Days</Button>
                <Button onClick={handleSubtract} variant="outline" className="w-full">Subtract Days</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>About the Date Adder/Subtractor</CardTitle></CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our **Add/Subtract Days Calculator** is a simple and effective tool for anyone who needs to quickly project dates forward or backward. Whether you're setting a deadline, scheduling a follow-up, or calculating a warranty period, this calculator removes the hassle of manually counting days on a calendar.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Pick a **Start Date** from the calendar.</li>
                <li>Enter the number of **Days to Add/Subtract**.</li>
                <li>Click either the **"Add Days"** or **"Subtract Days"** button.</li>
            </ol>
            <p>The resulting date will be instantly displayed in the results card on the right.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
              <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                      <AccordionTrigger>How does this calculator work?</AccordionTrigger>
                      <AccordionContent>
                          This tool takes a starting date and adds or subtracts the exact number of calendar days you specify to find the new date. It correctly handles all month and year transitions, including leap years, so you get an accurate result every time.
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                      <AccordionTrigger>What is this useful for?</AccordionTrigger>
                      <AccordionContent>
                          It's perfect for a variety of planning tasks, such as:
                          <ul className="list-disc pl-5 mt-2">
                            <li>Scheduling appointments (e.g., a 60-day follow-up).</li>
                            <li>Setting project deadlines (e.g., finding the date 90 days from today).</li>
                            <li>Planning events or tracking personal milestones.</li>
                            <li>Calculating return periods or warranty expiration dates.</li>
                          </ul>
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
