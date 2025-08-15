
"use client";

import { useState, useMemo } from "react";
import { addDays, subDays, format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import usePersistentState from "@/hooks/use-persistent-state";

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
                    {format(fertileWindowStart!, "MMM d")} - {format(fertileWindowEnd!, "MMM d")}
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
