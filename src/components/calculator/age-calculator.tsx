"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [dateOfBirth, setDateOfBirth] = usePersistentState<Date | undefined>('age-dob', new Date("1990-01-01"), (value) => value ? new Date(value) : undefined);
  const [age, setAge] = useState<Age | null>(null);

  useEffect(() => {
    const dobParam = searchParams.get('dob');
    if (dobParam) {
      const parsedDate = new Date(dobParam);
      if (!isNaN(parsedDate.getTime())) {
        setDateOfBirth(parsedDate);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleCalculateAge = useCallback(() => {
    if (dateOfBirth) {
      const now = new Date();
      setAge(calculateAge(now, dateOfBirth));
    }
  }, [dateOfBirth]);
  
  useEffect(() => {
    handleCalculateAge();
  }, [handleCalculateAge]);


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
      
      <Card>
        <CardHeader>
          <CardTitle>Understanding Chronological Age</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>The Age Calculator helps you determine your precise chronological age based on your date of birth. It breaks down your age into years, months, and days, giving you a detailed view of how old you are. This tool is perfect for anyone curious about their exact age, for filling out applications, or for planning age-related milestones.</p>

            <h3>How to Use the Age Calculator</h3>
            <ol>
                <li>Select your <strong>Date of Birth</strong> using the date picker.</li>
                <li>Click the <strong>"Calculate Age"</strong> button.</li>
                <li>Your age will be instantly displayed in the results card, showing the total years, months, and remaining days.</li>
            </ol>
            
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold">How is the age calculated?</AccordionTrigger>
                    <AccordionContent>
                        <p>This calculator determines age by finding the total number of full years that have passed since your birth date. It then calculates the remaining months and, finally, the remaining days for a precise age breakdown. It accurately accounts for the varying number of days in each month.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="font-semibold">Does this age calculator account for leap years?</AccordionTrigger>
                    <AccordionContent>
                       <p>Yes, the calculation is based on the actual number of days in each calendar month and year, which inherently accounts for leap years. This ensures that the age is calculated with precision, whether you were born in a leap year or not.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="font-semibold">Can this calculator determine my age on a future date?</AccordionTrigger>
                    <AccordionContent>
                       <p>Currently, this calculator is designed to find your age as of today. The "end date" is always set to the current date and cannot be changed. Its primary purpose is to answer the question, "How old am I right now?"</p>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                    <AccordionTrigger className="font-semibold">What is a chronological age calculator?</AccordionTrigger>
                    <AccordionContent>
                       <p>A chronological age calculator is another term for this tool. It measures the exact time that has elapsed from a person's date of birth to the present date, providing the age in the standard format of years, months, and days, as opposed to biological age which relates to health and fitness.</p>
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
