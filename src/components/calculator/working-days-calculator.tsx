"use client";

import { differenceInBusinessDays } from "date-fns";
import CalculatorUIWrapper from "./calculator-ui-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import usePersistentState from "@/hooks/use-persistent-state";
import AboutWorkingDaysCalculator from "./about/working-days-calculator";
import { cn } from "@/lib/utils";

export default function WorkingDaysCalculator({
  calculatorName,
}: {
  calculatorName: string;
}) {
  const [startDate, setStartDate] = usePersistentState<Date | undefined>(
    "wd-start-date",
    new Date(),
    (v) => (v ? new Date(v as string) : new Date()),
  );
  const [endDate, setEndDate] = usePersistentState<Date | undefined>(
    "wd-end-date",
    new Date(new Date().setDate(new Date().getDate() + 30)),
    (v) => (v ? new Date(v as string) : new Date()),
  );
  const [workingDays, setWorkingDays] = usePersistentState<number | null>(
    "wd-days",
    null,
  );

  const handleCalculate = () => {
    if (startDate && endDate) {
      if (endDate < startDate) {
        setWorkingDays(0);
        return;
      }
      setWorkingDays(differenceInBusinessDays(endDate, startDate));
    }
  };

  const shareParams = {
    start: startDate?.toISOString().split("T")[0] || "",
    end: endDate?.toISOString().split("T")[0] || "",
  };

  const inputCard = (
    <Card id="working-days-inputs">
      <CardHeader>
        <CardTitle>Calculate Working Days</CardTitle>
        <CardDescription>
          Calculate the number of business days between two dates. This
          calculation excludes weekends but not public holidays.
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
            <Label>End Date</Label>
            <DatePicker
              date={endDate}
              setDate={setEndDate}
              disabled={() => false}
            />
          </div>
        </div>
        <Button onClick={handleCalculate} className={cn("w-full", "btn-glossy")}>
          Calculate Working Days
        </Button>
      </CardContent>
    </Card>
  );

  const resultsCard =
    workingDays !== null ? (
      <div role="status" aria-live="polite">
        <Card id="working-days-results">
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
      </div>
    ) : null;

  return (
    <>
      <CalculatorUIWrapper
        inputCard={inputCard}
        resultsCard={resultsCard}
        shareParams={shareParams}
        elementIds={["working-days-inputs", "working-days-results"]}
        calculatorName={calculatorName}
      />
      <div className="mt-8">
        <AboutWorkingDaysCalculator />
      </div>
    </>
  );
}
