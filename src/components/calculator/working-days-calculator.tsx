
"use client";

import { useState } from "react";
import { format, differenceInBusinessDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";

export default function WorkingDaysCalculator() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 30))
  );
  const [workingDays, setWorkingDays] = useState<number | null>(null);

  const handleCalculate = () => {
    if (startDate && endDate) {
      setWorkingDays(differenceInBusinessDays(endDate, startDate));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calculate Working Days</CardTitle>
          <CardDescription>Calculate the number of business days between two dates. This calculation excludes weekends but not public holidays.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <DatePicker date={startDate} setDate={setStartDate} disabled={() => false} />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <DatePicker date={endDate} setDate={setEndDate} disabled={() => false}/>
            </div>
          </div>
          <Button onClick={handleCalculate} className="w-full">
            Calculate Working Days
          </Button>
          <p className="text-xs text-muted-foreground">This calculation excludes weekends (Saturdays and Sundays). It does not account for public holidays.</p>
        </CardContent>
      </Card>
      
      {workingDays !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">Total Working Days</p>
            <p className="text-6xl font-bold font-headline text-primary my-2">
              {workingDays}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
