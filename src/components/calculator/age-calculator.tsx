"use client";

import { useState } from "react";
import { format, differenceInYears, differenceInMonths, differenceInDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function AgeCalculator() {
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const handleCalculateAge = () => {
    if (dateOfBirth) {
      const now = new Date();
      const years = differenceInYears(now, dateOfBirth);
      const months = differenceInMonths(now, dateOfBirth) % 12;
      
      const tempDate = new Date(now);
      tempDate.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
      const birthDateThisMonth = new Date(dateOfBirth);
      birthDateThisMonth.setFullYear(now.getFullYear(), now.getMonth(), dateOfBirth.getDate());

      let days;
      if(now.getDate() >= dateOfBirth.getDate()){
        days = now.getDate() - dateOfBirth.getDate();
      } else {
        const prevMonth = new Date(now);
        prevMonth.setMonth(now.getMonth()-1);
        const daysInPrevMonth = differenceInDays(now, prevMonth);
        days = daysInPrevMonth - dateOfBirth.getDate() + now.getDate();
      }

      setAge({ years, months, days });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Date of Birth</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dob"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateOfBirth && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateOfBirth}
                  onSelect={setDateOfBirth}
                  initialFocus
                  captionLayout="dropdown-buttons"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button onClick={handleCalculateAge} disabled={!dateOfBirth} className="w-full">
            Calculate Age
          </Button>
        </CardContent>
      </Card>

      <div className="sticky top-24">
        <Card>
          <CardHeader>
            <CardTitle>Your Age</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {age ? (
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
            ) : (
                <p className="text-2xl text-muted-foreground">Please select your date of birth</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
