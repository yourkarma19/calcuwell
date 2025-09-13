"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Gross Pay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gross pay is the total amount of money you earn before any deductions are subtracted. This calculator computes your gross pay. Your actual take-home pay (net pay) will be lower after taxes, insurance, and other deductions are taken out.",
      },
    },
    {
      "@type": "Question",
      name: "How are decimal hours calculated from minutes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool converts minutes into a decimal format for easy calculation. For example, 30 minutes is 0.5 hours (30/60), and 15 minutes is 0.25 hours (15/60). This allows for simple multiplication with your hourly rate.",
      },
    },
    {
      "@type": "Question",
      name: "Does this calculator handle overtime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, this is a basic time card calculator and does not automatically calculate overtime pay. To calculate overtime, you would need to manually separate your regular hours from your overtime hours and use our Overtime Pay Calculator.",
      },
    },
  ],
};

export default function AboutTimeCardCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Time Card Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Time Card Calculator helps employees and employers track work
          hours and calculate gross pay. It simplifies adding up daily hours and
          subtracting break times, reducing errors and ensuring fair pay.
        </p>
        <h3>How to Use the Time Card Calculator</h3>
        <ol>
          <li>For each day, enter your **Start Time** and **End Time**.</li>
          <li>Enter the total duration of your unpaid **Break** in minutes.</li>
          <li>Enter your **Hourly Rate** of pay.</li>
        </ol>
        <p>
          The calculator will instantly update the total weekly hours and your
          total gross pay.
        </p>
        <h3>Time Card Calculator FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Gross Pay?</AccordionTrigger>
            <AccordionContent>
              Gross pay is the total amount you earn before any deductions are
              subtracted. This calculator computes your gross pay. Your actual
              take-home pay (net pay) will be lower after taxes and other
              deductions are taken out.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How are decimal hours calculated?
            </AccordionTrigger>
            <AccordionContent>
              This tool converts minutes into a decimal format for easy
              calculation. For example, 30 minutes is 0.5 hours, and 15 minutes
              is 0.25 hours. This allows for simple multiplication with your
              hourly rate.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Does this calculator handle overtime?
            </AccordionTrigger>
            <AccordionContent>
              No, this is a basic time card calculator and does not
              automatically calculate overtime pay. To calculate overtime, you
              would need to separate your regular and overtime hours and use our{" "}
              <a
                href="/calculators/overtime-pay-calculator"
                className="text-primary hover:underline"
              >
                Overtime Pay Calculator
              </a>
              .
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
