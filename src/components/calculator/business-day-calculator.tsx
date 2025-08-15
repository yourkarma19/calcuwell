
"use client";

import { useState } from "react";
import { addBusinessDays, subBusinessDays, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";

export default function BusinessDayCalculator() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [days, setDays] = useState(10);
  const [resultDate, setResultDate] = useState<Date | null>(null);

  const handleAdd = () => {
    if (startDate) {
      setResultDate(addBusinessDays(startDate, days));
    }
  };
  
  const handleSubtract = () => {
    if (startDate) {
      setResultDate(subBusinessDays(startDate, days));
    }
  };

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Day Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <DatePicker date={startDate} setDate={setStartDate} disabled={() => false}/>
              </div>
              <div className="space-y-2">
                <Label>Business Days to Add/Subtract</Label>
                <Input type="number" value={days} onChange={e => setDays(Number(e.target.value))} />
              </div>
            </div>
            <div className="flex gap-4">
                <Button onClick={handleAdd} className="w-full">Add Business Days</Button>
                <Button onClick={handleSubtract} variant="outline" className="w-full">Subtract Business Days</Button>
            </div>
             <p className="text-xs text-muted-foreground pt-2">Excludes weekends (Saturday, Sunday). Does not account for public holidays.</p>
          </CardContent>
        </Card>
      </div>
      
      {resultDate && (
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resulting Date</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold font-headline text-primary my-2">
                  {format(resultDate, "PPP")}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
    </>
  );
}
