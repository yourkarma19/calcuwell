"use client";

import { ArrowDown } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import ExportShareControls from "./export-share-controls";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import usePersistentState from "@/hooks/use-persistent-state";
import { calculateAge, Age } from "@/lib/math/date";


export default function AgeCalculator({ calculatorName }: { calculatorName: string }) {
  const [dateOfBirth, setDateOfBirth] = usePersistentState<Date | undefined>('age-dob', new Date("1990-01-01"), (value) => value ? new Date(value) : undefined);
  const [age, setAge] = useState<Age | null>(null);
  
  const handleCalculateAge = useCallback(() => {
    if (dateOfBirth) {
      const now = new Date();
      setAge(calculateAge(now, dateOfBirth));
    }
  }, [dateOfBirth]);

  useEffect(() => {
    handleCalculateAge();
  }, [handleCalculateAge]);
  
  const shareParams = {
      dob: dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : ""
  }


  return (
    <div className="space-y-6">
      <Card id="age-inputs">
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
        <Card id="age-results">
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
    
     <ExportShareControls
        elementIds={['age-inputs', 'age-results']}
        shareParams={shareParams}
        calculatorName={calculatorName}
      />
    </div>
  );
}
