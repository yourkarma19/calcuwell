
"use client";

import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import usePersistentState from "@/hooks/use-persistent-state";
import { calculateAge, Age } from "@/lib/math/date";
import { useSearchParams } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";


export default function AgeCalculator({ setFormula }: { setFormula: (formula: string) => void }) {
  const searchParams = useSearchParams();
  const [dateOfBirth, setDateOfBirth] = usePersistentState<Date | undefined>('age-dob', new Date(), (value) => value ? new Date(value) : undefined);
  const [age, setAge] = useState<Age | null>(null);

  useEffect(() => {
    const dobParam = searchParams.get('dob');
    if (dobParam) {
      const parsedDate = new Date(dobParam);
      if (!isNaN(parsedDate.getTime())) {
        setDateOfBirth(parsedDate);
      }
    }
  }, [searchParams, setDateOfBirth]);

  const handleCalculateAge = () => {
    if (dateOfBirth) {
      const now = new Date();
      setAge(calculateAge(now, dateOfBirth));
    }
  };
  
  useEffect(() => {
    handleCalculateAge();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateOfBirth]);


  return (
    <>
    <div className="lg:col-span-2 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Date of Birth</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <DatePicker 
              date={dateOfBirth} 
              setDate={setDateOfBirth}
              disabled={(date) => date > new Date()}
            />
          </div>
          <Button onClick={handleCalculateAge} disabled={!dateOfBirth} className="w-full">
            <ArrowDown className="mr-2"/>
            Calculate Age
          </Button>
        </CardContent>
      </Card>

      {age && (
        <Card>
          <CardHeader>
            <CardTitle>Your Age</CardTitle>
          </CardHeader>
          <CardContent className="text-center" aria-live="polite">
            <div>
              <div className="flex justify-center items-baseline gap-2">
                  <p className="text-6xl font-bold font-headline text-primary">{age.years}</p>
                  <p className="text-xl text-muted-foreground">Years</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-lg">
                  <div className="text-center">
                      <p className="font-bold font-headline">{age.months}</p>
                      <p className="text-sm text-muted-foreground">Months</p>
                  </div>
                  <div className="text-center">
                      <p className="font-bold font-headline">{age.days}</p>
                      <p className="text-sm text-muted-foreground">Days</p>
                  </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>About the Age Calculator</CardTitle></CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How is age calculated?</AccordionTrigger>
                    <AccordionContent>
                        This calculator determines age by finding the total number of full years that have passed since your birth date. It then calculates the remaining months and, finally, the remaining days for a precise age breakdown.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is a chronological age calculator?</AccordionTrigger>
                    <AccordionContent>
                        A chronological age calculator is another term for this tool. It measures the time that has elapsed from a person's date of birth to the present date, providing the age in the standard format of years, months, and days.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Can this calculator determine my age on a future date?</AccordionTrigger>
                    <AccordionContent>
                       Currently, this calculator is designed to find your age as of today. The "end date" is always the current date and cannot be changed.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                    <AccordionTrigger>Does this age calculator account for leap years?</AccordionTrigger>
                    <AccordionContent>
                       Yes, the calculation is based on the actual number of days in each month and year, which inherently accounts for leap years, ensuring an accurate result.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>

    {age && (
        <div className="lg:col-span-1">
            <Card className="sticky top-24">
            <CardHeader>
                <CardTitle>Your Age</CardTitle>
            </CardHeader>
            <CardContent className="text-center" aria-live="polite">
                <div>
                <div className="flex justify-center items-baseline gap-2">
                    <p className="text-6xl font-bold font-headline text-primary">{age.years}</p>
                    <p className="text-xl text-muted-foreground">Years</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-lg">
                    <div className="text-center">
                        <p className="font-bold font-headline">{age.months}</p>
                        <p className="text-sm text-muted-foreground">Months</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold font-headline">{age.days}</p>
                        <p className="text-sm text-muted-foreground">Days</p>
                    </div>
                </div>
                </div>
            </CardContent>
            </Card>
        </div>
    )}
    </>
  );
}
