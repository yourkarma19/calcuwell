"use client";

import { useState, useEffect } from "react";
import { differenceInYears, differenceInMonths, differenceInDays, subYears, subMonths } from "date-fns";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import usePersistentState from "@/hooks/use-persistent-state";


export default function AgeCalculator() {
  const [dateOfBirth, setDateOfBirth] = usePersistentState<Date | undefined>('age-dob', undefined, (value) => value ? new Date(value) : undefined);
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const handleCalculateAge = () => {
    if (dateOfBirth) {
      const now = new Date();
      if (dateOfBirth > now) {
        setAge(null); // Or show an error
        return;
      }
      
      const years = differenceInYears(now, dateOfBirth);
      const pastDateWithoutYears = subYears(now, years);
      const months = differenceInMonths(pastDateWithoutYears, dateOfBirth);
      const pastDateWithoutMonths = subMonths(pastDateWithoutYears, months);
      const days = differenceInDays(pastDateWithoutMonths, dateOfBirth);

      setAge({ years, months, days });
    }
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Date of Birth</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <DatePicker date={dateOfBirth} setDate={setDateOfBirth} />
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
          <CardContent className="text-center">
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
    </div>
  );
}
