"use client";

import { addBusinessDays, subBusinessDays, format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePersistentState from "@/hooks/use-persistent-state";

export default function BusinessDayCalculator() {
  const [startDate, setStartDate] = usePersistentState<Date | undefined>(
    "bizday-start-date",
    new Date(),
    (v) => (v ? new Date(v as string) : new Date()),
  );
  const [days, setDays] = usePersistentState("bizday-days", 10);
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Day Calculator</CardTitle>
          <CardDescription>
            Calculate a future or past date by adding or subtracting business
            days, automatically skipping weekends.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <DatePicker
                date={startDate}
                setDate={setStartDate}
                disabled={() => false}
              />
            </div>
            <div className="space-y-2">
              <Label>Business Days to Add/Subtract</Label>
              <Input
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                aria-label="Business days to add or subtract"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleAdd} className="w-full">
              Add Business Days
            </Button>
            <Button
              onClick={handleSubtract}
              variant="outline"
              className="w-full"
            >
              Subtract Business Days
            </Button>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            Excludes weekends (Saturday, Sunday). Does not account for public
            holidays.
          </p>
        </CardContent>
      </Card>

      {resultDate && (
        <div className="sticky top-24">
          <Card>
            <CardHeader>
              <CardTitle>Resulting Date</CardTitle>
            </CardHeader>
            <CardContent className="text-center" aria-live="polite">
              <p className="text-3xl font-bold font-headline text-primary my-2">
                {format(resultDate, "PPP")}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
