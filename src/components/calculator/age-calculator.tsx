"use client";

import { useState } from "react";
import { differenceInYears, differenceInMonths, differenceInDays } from "date-fns";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";


export default function AgeCalculator() {
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const handleCalculateAge = () => {
    if (dateOfBirth) {
      const now = new Date();
      if (dateOfBirth > now) {
        setAge(null);
        return;
      }
      
      const years = differenceInYears(now, dateOfBirth);
      
      let months = differenceInMonths(now, dateOfBirth);
      months = months % 12;

      // To get the accurate month, we need to adjust if the current month's day is less than dob's day
      if (now.getDate() < dateOfBirth.getDate()) {
        months = months === 0 ? 11 : months -1;
      }

      // To get the accurate day
      const lastMonth = new Date(now);
      lastMonth.setMonth(now.getMonth() -1);
      const days = differenceInDays(now, lastMonth);


      setAge({ years, months, days: now.getDate() < dateOfBirth.getDate() ? days - dateOfBirth.getDate() + now.getDate() : now.getDate() - dateOfBirth.getDate()});
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
