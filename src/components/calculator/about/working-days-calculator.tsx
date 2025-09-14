"use client";

import { differenceInBusinessDays } from "date-fns";
import CalculatorUIWrapper from "../calculator-ui-wrapper";
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
      name: "What days are considered working days?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator considers working days (or business days) to be Monday through Friday. It automatically excludes weekends (Saturdays and Sundays) from the total count.",
      },
    },
    {
      "@type": "Question",
      name: "Does this working days calculator account for public holidays?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, this calculator does not account for public holidays, as they vary significantly by country and region. To get a precise count, you would need to manually subtract the number of public holidays that fall within your selected date range.",
      },
    },
    {
      "@type": "Question",
      name: "Is the start date included in the calculation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The `differenceInBusinessDays` function does not include the start date in the count. It measures the number of full business days between the start and end dates. For example, the number of working days between a Monday and the following Friday is 4.",
      },
    },
  ],
};


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
        <Button onClick={handleCalculate} className="w-full">
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
        <Card>
          <CardHeader>
            <CardTitle as="h2">About the Working Days Calculator</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
             <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
              />
            <p>
              The <strong>Working Days Calculator</strong> helps you determine the
              number of business days between two specific dates. This tool is
              essential for project management, human resources, and logistics,
              as it automatically excludes weekends (Saturdays and Sundays) from
              the calculation, providing a more accurate timeline for business-related
              tasks.
            </p>

            <h3>How to Use the Calculator</h3>
            <ol>
              <li>Select a **Start Date** from the first calendar.</li>
              <li>Select an **End Date** from the second calendar.</li>
              <li>Click the **&quot;Calculate Working Days&quot;** button.</li>
            </ol>
            <p>
              The tool will instantly display the total number of business days
              within that period.
            </p>

            <h3>Working Days FAQs</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  What days are considered working days?
                </AccordionTrigger>
                <AccordionContent>
                  This calculator considers working days (or business days) to be
                  Monday through Friday. It automatically excludes weekends
                  (Saturdays and Sundays) from the total count.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Does this calculator account for public holidays?
                </AccordionTrigger>
                <AccordionContent>
                  No, this calculator does not account for public holidays, as
                  they vary significantly by country and region. To get a precise
                  count, you would need to manually subtract the number of
                  public holidays that fall within your selected date range.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Is the start date included in the calculation?
                </AccordionTrigger>
                <AccordionContent>
                  The calculation does not include the start date in the count.
                  It measures the number of full business days between the start
                  and end dates. For example, the number of working days between
                  a Monday and the following Friday is 4.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
