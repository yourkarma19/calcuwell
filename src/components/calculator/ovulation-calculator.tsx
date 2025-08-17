
"use client";

import { useState, useMemo, useEffect } from "react";
import { addDays, subDays, format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import usePersistentState from "@/hooks/use-persistent-state";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function OvulationCalculator() {
  const [lastPeriodDate, setLastPeriodDate] = usePersistentState<Date | undefined>('ovulation-last-period', new Date(), (value) => value ? new Date(value) : undefined);
  const [cycleLength, setCycleLength] = usePersistentState("ovulation-cycle-length", 28);
  
  const { ovulationDate, fertileWindowStart, fertileWindowEnd } = useMemo(() => {
    if (!lastPeriodDate || cycleLength <= 0) {
      return { ovulationDate: null, fertileWindowStart: null, fertileWindowEnd: null };
    }

    const estimatedOvulation = addDays(lastPeriodDate, cycleLength - 14);

    return {
      ovulationDate: estimatedOvulation,
      fertileWindowStart: subDays(estimatedOvulation, 5),
      fertileWindowEnd: addDays(estimatedOvulation, 1),
    };
  }, [lastPeriodDate, cycleLength]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ovulation Calculator</CardTitle>
            <CardDescription>Estimate your most fertile days to help you conceive.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>First Day of Your Last Menstrual Period</Label>
              <DatePicker 
                date={lastPeriodDate} 
                setDate={setLastPeriodDate} 
                disabled={(date) => date > new Date()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cycle-length">Average Cycle Length (days)</Label>
              <Input
                id="cycle-length"
                type="number"
                value={cycleLength}
                onChange={(e) => setCycleLength(Number(e.target.value))}
              />
            </div>
            <p className="text-xs text-muted-foreground pt-2">Disclaimer: This is an estimate. For accurate predictions, track your cycle and consult a healthcare provider.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>About Ovulation & Fertility</CardTitle></CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our **Ovulation Calculator** is a simple tool designed to help you predict your most fertile days based on your menstrual cycle. By estimating your ovulation date, you can identify your "fertile window," which is the period when you have the highest chance of conceiving. This calculator is a helpful first step for anyone planning a pregnancy.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Select the **First Day of Your Last Menstrual Period** from the calendar.</li>
                <li>Enter your **Average Cycle Length** in days (the time from the first day of one period to the first day of the next).</li>
            </ol>
            <p>The calculator will instantly estimate your next ovulation date and highlight your most fertile window.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is ovulation?</AccordionTrigger>
                <AccordionContent>
                  Ovulation is the part of the female menstrual cycle when a mature egg is released from an ovary. This typically happens about 12 to 14 days before the start of the next menstrual period.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What is a fertile window?</AccordionTrigger>
                <AccordionContent>
                  The fertile window is the time in your menstrual cycle when pregnancy is possible. It typically includes the five days leading up to ovulation and the day of ovulation itself. Sperm can survive in the female reproductive tract for up to five days, so intercourse during this window can lead to conception.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How accurate is this calculator?</AccordionTrigger>
                <AccordionContent>
                  This calculator provides an estimate based on the information you provide and average cycle data. However, individual cycles can vary from month to month due to factors like stress, diet, or health conditions. For more accuracy, consider tracking your basal body temperature, monitoring cervical mucus, or using ovulation predictor kits (OPKs).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>My cycle is irregular. Can I still use this calculator?</AccordionTrigger>
                <AccordionContent>
                  If your cycle is irregular, prediction can be more challenging. It's best to calculate your average cycle length over the last several months to use in the calculator. However, for irregular cycles, other methods like ovulation predictor kits may provide more reliable results. Always consult a healthcare provider for personalized advice.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Estimated Fertile Window</CardTitle>
          </CardHeader>
          <CardContent className="text-center" aria-live="polite">
            {ovulationDate ? (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Ovulation Date</p>
                  <p className="text-2xl font-bold font-headline text-primary">
                    {format(ovulationDate, "PPP")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Most Fertile Period</p>
                  <p className="text-lg font-semibold">
                    {fertileWindowStart && fertileWindowEnd ? `${format(fertileWindowStart, "MMM d")} - ${format(fertileWindowEnd, "MMM d")}` : 'Calculating...'}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">Please select a date.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
