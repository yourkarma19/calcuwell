
"use client";

import { useState, useMemo } from "react";
import { addDays, format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

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
            <CardDescription>Get an estimated due date based on your last menstrual period or date of conception.</CardDescription>
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
                <DatePicker 
                  date={lastPeriodDate} 
                  setDate={setLastPeriodDate} 
                  disabled={(date) => date > new Date()}
                />
              </div>
            )}

            {calculationMethod === 'conception' && (
              <div className="space-y-2">
                <Label>Date of Conception</Label>
                <DatePicker 
                  date={conceptionDate} 
                  setDate={setConceptionDate} 
                  disabled={(date) => date > new Date()}
                />
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader><CardTitle>About Due Date Calculation</CardTitle></CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How does the calculator work?</AccordionTrigger>
                        <AccordionContent>
                            This calculator uses two common methods. The "Last Menstrual Period" (LMP) method uses Naegele's rule, which adds 280 days (40 weeks) to the first day of your last period. The "Conception Date" method adds 266 days (38 weeks) to your known date of conception.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is the due date accurate?</AccordionTrigger>
                        <AccordionContent>
                            The due date is an estimate. Only about 5% of babies are born on their exact due date. It provides a guideline for when you can expect your baby to arrive, but it's normal to give birth a week or two before or after.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Why is the LMP method more common?</AccordionTrigger>
                        <AccordionContent>
                           Many women are more certain about the date of their last period than the exact date of conception, which can be difficult to pinpoint. For this reason, the LMP method is the standard used by most doctors and healthcare providers to estimate the due date.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
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
