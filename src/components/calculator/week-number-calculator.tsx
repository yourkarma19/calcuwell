
"use client";

import { useMemo } from "react";
import { getWeek, format, getISOWeek, getISOWeekYear } from "date-fns";
import CalculatorUIWrapper from "./calculator-ui-wrapper";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import usePersistentState from "@/hooks/use-persistent-state";

export default function WeekNumberCalculator({
  calculatorName,
}: {
  calculatorName: string;
}) {
  const [selectedDate, setSelectedDate] = usePersistentState<Date | undefined>(
    "weeknum-date",
    new Date(),
    (v) => (v ? new Date(v as string) : new Date()),
  );
  const [weekDefinition, setWeekDefinition] = usePersistentState<
    "sunday" | "monday" | "iso"
  >("weeknum-def", "iso");

  const { weekNumber, yearForWeek } = useMemo(() => {
    if (!selectedDate) return { weekNumber: null, yearForWeek: null };

    let week, year;

    switch (weekDefinition) {
      case "sunday":
        week = getWeek(selectedDate, { weekStartsOn: 0 });
        year = selectedDate.getFullYear();
        break;
      case "monday":
        week = getWeek(selectedDate, { weekStartsOn: 1 });
        year = selectedDate.getFullYear();
        break;
      case "iso":
      default:
        week = getISOWeek(selectedDate);
        year = getISOWeekYear(selectedDate);
        break;
    }
    return { weekNumber: week, yearForWeek: year };
  }, [selectedDate, weekDefinition]);

  const shareParams = {
    date: selectedDate?.toISOString().split("T")[0] || "",
    def: weekDefinition,
  };

  const inputCard = (
    <Card id="weeknum-inputs">
      <CardHeader>
        <CardTitle>Week Number Calculator</CardTitle>
        <CardDescription>
          Find the week number for any given date according to different
          international standards.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Select Date</Label>
          <DatePicker
            date={selectedDate}
            setDate={setSelectedDate}
            disabled={() => false}
          />
        </div>
        <div className="space-y-2">
          <Label>Week Definition</Label>
          <RadioGroup
            value={weekDefinition}
            onValueChange={(v) =>
              setWeekDefinition(v as "sunday" | "monday" | "iso")
            }
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:space-x-4 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="iso" id="iso" />
              <Label htmlFor="iso">ISO 8601</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sunday" id="sunday" />
              <Label htmlFor="sunday">Starts on Sunday</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monday" id="monday" />
              <Label htmlFor="monday">Starts on Monday</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );

  const resultsCard = (
    <Card id="weeknum-results">
      <CardHeader>
        <CardTitle>Result</CardTitle>
      </CardHeader>
      <CardContent className="text-center" aria-live="polite">
        {selectedDate ? (
          <>
            <p className="text-sm text-muted-foreground">
              {format(selectedDate, "PPP")} is in
            </p>
            <p className="text-6xl font-bold font-headline text-primary my-2">
              Week {weekNumber}
            </p>
            <p className="text-lg text-muted-foreground">of {yearForWeek}</p>
          </>
        ) : (
          <p className="text-muted-foreground">Select a date.</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <CalculatorUIWrapper
      inputCard={inputCard}
      resultsCard={resultsCard}
      shareParams={shareParams}
      elementIds={["weeknum-inputs", "weeknum-results"]}
      calculatorName={calculatorName}
    />
  );
}
