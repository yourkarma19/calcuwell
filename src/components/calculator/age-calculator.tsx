"use client";

import { ArrowDown } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
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
import { calculateAge, Age } from "@/lib/math/date";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is my age calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool calculates the total number of full years that have passed since you were born. It then calculates the remaining months and days to give you a precise age. The calculation correctly handles the different number of days in each month.",
      },
    },
    {
      "@type": "Question",
      name: "Does this tool account for leap years?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The age calculation is based on the actual number of days in each month and year, which automatically includes leap years. This provides an accurate age, even for those born in a leap year.",
      },
    },
    {
      "@type": "Question",
      name: "What is chronological age?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chronological age is the exact amount of time that has passed from your birth to the present day. This is different from biological age, which refers to how healthy your body is relative to its actual age.",
      },
    },
  ],
};

export default function AgeCalculator({
  calculatorName,
}: {
  calculatorName: string;
}) {
  const [dateOfBirth, setDateOfBirth] = usePersistentState<Date | undefined>(
    "age-dob",
    new Date("1990-01-01"),
    (value) =>
      typeof value === "string" ||
      typeof value === "number" ||
      value instanceof Date
        ? new Date(value)
        : undefined,
  );
  const [age, setAge] = useState<Age | null>(null);

  const handleCalculateAge = useCallback(() => {
    if (dateOfBirth) {
      const now = new Date();
      setAge(calculateAge(now, dateOfBirth));
    }
  }, [dateOfBirth]);

  useEffect(() => {
    handleCalculateAge();
  }, [dateOfBirth, handleCalculateAge]);

  const shareParams = {
    dob: dateOfBirth ? dateOfBirth.toISOString().split("T")[0] : "",
  };

  const inputCard = (
    <Card id="age-calculator-inputs">
      <CardHeader>
        <CardTitle>Enter Your Date of Birth</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="dob-picker">Date of Birth</Label>
          <DatePicker
            date={dateOfBirth}
            setDate={setDateOfBirth}
            disabled={(date) => date > new Date()}
          />
        </div>
        <Button
          onClick={handleCalculateAge}
          disabled={!dateOfBirth}
          className="w-full"
        >
          <ArrowDown className="mr-2" />
          Calculate Age
        </Button>
      </CardContent>
    </Card>
  );

  const resultsCard = age ? (
    <Card id="age-calculator-results">
      <CardHeader>
        <CardTitle>Your Age</CardTitle>
      </CardHeader>
      <CardContent className="text-center" aria-live="polite">
        <div>
          <div className="flex justify-center items-baseline gap-2">
            <p className="text-6xl font-bold font-headline text-primary">
              {age.years}
            </p>
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
  ) : null;

  return (
    <>
      <CalculatorUIWrapper
        inputCard={inputCard}
        resultsCard={resultsCard}
        shareParams={shareParams}
        elementIds={["age-calculator-inputs", "age-calculator-results"]}
        calculatorName={calculatorName}
      />
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle as="h2">About the Age Calculator</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <p>
              The Age Calculator finds your exact age from your date of birth. It
              shows your age in years, months, and days. This tool is useful for
              filling out forms or if you are just curious about your precise age.
            </p>

            <h3>How to Use the Age Calculator</h3>
            <ol>
              <li>Select your date of birth using the calendar.</li>
              <li>Click the &quot;Calculate Age&quot; button to see the result.</li>
              <li>Your age will appear in years, months, and days.</li>
            </ol>

            <h3>Age Calculator FAQs</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold">
                  How is my age calculated?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    This tool finds the number of full years passed since your
                    birthday. It then finds the leftover months and days. This gives
                    you a precise age.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-semibold">
                  Does this tool include leap years?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    Yes. The age calculation uses the real number of days in each
                    month and year. Leap years are included automatically. This
                    gives you an accurate age, even for people born in a leap year.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="font-semibold">
                  What is chronological age?
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    Chronological age is simply how old you are in years, months,
                    and days. It is different from biological age, which measures
                    your body&apos;s health compared to its actual age.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
