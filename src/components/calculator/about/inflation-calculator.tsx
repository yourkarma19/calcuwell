"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutInflationCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Inflation Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <p>
          Our Inflation Calculator helps you understand the impact of inflation
          on your money over time. It shows you how the purchasing power of
          money changes between two different years. This is essential for
          financial planning and understanding the real value of money.
        </p>
        <h3>How to Use the Inflation Calculator</h3>
        <ol>
          <li>Enter the **Amount** of money you want to analyze.</li>
          <li>Select a **Start Year** and an **End Year**.</li>
        </ol>
        <p>
          The calculator will show what the initial amount would be worth in the
          end year, accounting for inflation.
        </p>
        <h3>Inflation Calculator FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is inflation?</AccordionTrigger>
            <AccordionContent>
              Inflation is the rate at which prices for goods and services rise,
              and purchasing power falls. For example, if the inflation rate is
              2%, a ₹100 item will cost ₹102 next year. Your money buys less
              than it did before.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How is the calculation done?</AccordionTrigger>
            <AccordionContent>
              The calculator uses historical inflation rate data. It compounds
              the inflation rate for each year between your selected start and
              end years to find the total change in purchasing power.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What is the Consumer Price Index (CPI)?
            </AccordionTrigger>
            <AccordionContent>
              The inflation data used here is based on the Consumer Price Index
              (CPI). This index measures the average change in prices paid by
              consumers for a basket of goods and services. It is a common way
              to measure inflation.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Are the rates in this calculator live?
            </AccordionTrigger>
            <AccordionContent>
              The inflation rates are based on historical data and are for
              informational purposes. Final rates for the current year are
              typically published after the year ends.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
