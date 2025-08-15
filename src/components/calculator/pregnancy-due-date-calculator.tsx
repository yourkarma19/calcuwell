"use client";

import { useState, useMemo } from "react";
import { addDays, format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function PregnancyDueDateCalculator() {
  const [calculationMethod, setCalculationMethod] = useState<"lmp" | "conception">("lmp");
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | undefined>(new Date());
  const [conceptionDate, setConceptionDate] = useState<Date | undefined>(new Date());

  const estimatedDueDate = useMemo(() => {
    if (calculationMethod === "lmp" && lastPeriodDate) {
      // Naegele's rule: LMP + 280 days (40 weeks)
      return addDays(lastPeriodDate, 280);
    }
    if (calculationMethod === "conception" && conceptionDate) {
      // Conception date + 266 days (38 weeks)
      return addDays(conceptionDate, 266);
    }
    return null;
  }, [calculationMethod, lastPeriodDate, conceptionDate]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Estimate Your Due Date</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Calculation Method</Label>
              <RadioGroup value={calculationMethod} onValueChange={(v) => setCalculationMethod(v as any)} className="flex items-center space-x-4 pt-2">
                <div className="flex items-center space-x-2"><RadioGroupItem value="lmp" id="lmp" /><Label htmlFor="lmp">Last Menstrual Period</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="conception" id="conception" /><Label htmlFor="conception">Conception Date</Label></div>
              </RadioGroup>
            </div>
            
            {calculationMethod === 'lmp' && (
              <div className="space-y-2">
                <Label>First Day of Last Menstrual Period</Label>
                <DatePicker date={lastPeriodDate} setDate={setLastPeriodDate} />
              </div>
            )}

            {calculationMethod === 'conception' && (
              <div className="space-y-2">
                <Label>Date of Conception</Label>
                <DatePicker date={conceptionDate} setDate={setConceptionDate} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Estimated Due Date</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {estimatedDueDate ? (
              <p className="text-3xl font-bold font-headline text-primary my-2">
                {format(estimatedDueDate, "PPP")}
              </p>
            ) : (
              <p className="text-muted-foreground">Please select a date.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
