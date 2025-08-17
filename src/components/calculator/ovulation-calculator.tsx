
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
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is ovulation?</AccordionTrigger>
                <AccordionContent>
                  Ovulation is the release of an egg from one of your ovaries. This typically happens about 14 days before the start of your next period.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What is a fertile window?</AccordionTrigger>
                <AccordionContent>
                  The fertile window is the time in your menstrual cycle when you are most likely to get pregnant. It includes the five days leading up to ovulation and the day of ovulation itself.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How accurate is this calculator?</AccordionTrigger>
                <AccordionContent>
                  This calculator provides an estimate based on average cycle lengths. However, individual cycles can vary. For more accuracy, consider tracking your basal body temperature and using ovulation predictor kits.
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
