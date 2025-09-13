"use client";
import Link from "next/link";
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
      name: "Why is calculating working days important for business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Calculating working days is crucial for accurate project planning, estimating delivery times, managing employee leave, and ensuring that contract deadlines are realistic. It removes the guesswork of manually counting days on a calendar.",
      },
    },
    {
      "@type": "Question",
      name: "Does this calculator account for public holidays?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, this calculator only excludes weekends (Saturday and Sunday). Public holidays vary significantly by country and region, so you should manually subtract any public holidays that fall within your calculated date range.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from a Business Day Calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Business Day Calculator adds or subtracts a specific number of business days from a start date to find a future date. This Working Days Calculator, on the other hand, counts the total number of business days that fall between two given dates.",
      },
    },
  ],
};

export default function AboutWorkingDaysCalculator() {
  return (
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
          The <strong>Working Days Calculator</strong> is a tool for
          professionals who need to plan projects and set deadlines. It
          calculates the number of business days between two dates,
          automatically excluding weekends to give you a realistic timeline.
        </p>

        <h3>How to Use the Working Days Calculator</h3>
        <ol>
          <li>
            Select a <strong>Start Date</strong> and an{" "}
            <strong>End Date</strong>.
          </li>
          <li>
            Click the <strong>&quot;Calculate Working Days&quot;</strong>{" "}
            button.
          </li>
        </ol>
        <p>
          The calculator will instantly tell you the total number of business
          days in that period.
        </p>

        <h3>Working Days FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Why are working days important?</AccordionTrigger>
            <AccordionContent>
              Calculating working days is crucial for project planning,
              estimating delivery times, managing employee leave, and ensuring
              deadlines are realistic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Does this calculator account for public holidays?
            </AccordionTrigger>
            <AccordionContent>
              No, this calculator only excludes weekends. Public holidays vary
              by country and region, so they are not included. For precise
              planning, you should manually subtract any public holidays.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How is this different from the Business Day Calculator?
            </AccordionTrigger>
            <AccordionContent>
              The{" "}
              <Link
                href="/calculators/business-day-calculator"
                className="text-primary hover:underline"
              >
                Business Day Calculator
              </Link>{" "}
              adds or subtracts a number of business days from a start date to
              find a future date. This calculator counts the number of business
              days between two dates.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
