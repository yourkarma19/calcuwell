
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
      name: "Why are month and year values in a time converter approximate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The number of days in a month varies (from 28 to 31), and a year can be 365 or 366 days. To provide a consistent conversion, this calculator uses an average month length of 30.417 days and an average (non-leap) year length of 365 days. For precise date calculations, a Date Difference Calculator should be used.",
      },
    },
    {
      "@type": "Question",
      name: "How many seconds are in a day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are 60 seconds in a minute, 60 minutes in an hour, and 24 hours in a day. Therefore, there are 60 x 60 x 24 = 86,400 seconds in one day.",
      },
    },
    {
      "@type": "Question",
      name: "What is a leap second?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A leap second is a one-second adjustment occasionally applied to Coordinated Universal Time (UTC) to keep it close to the mean solar time. It's an irregularity that this calculator does not account for, as it's not predictable in the same way as a leap year.",
      },
    },
  ],
};

export default function AboutTimeConverter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Time Converter</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our **Time Converter** is a versatile tool that allows you to quickly
          and accurately convert between various units of time. Whether
          you're a student working on a physics problem, a project manager
          planning a timeline, or just curious, this calculator simplifies
          time-related conversions from seconds to years.
        </p>
        <h3>How to Use the Time Converter</h3>
        <ol>
          <li>
            Enter the numeric value you want to convert in the &quot;From&quot;
            field.
          </li>
          <li>Select the starting unit of time (e.g., Hours).</li>
          <li>
            Select the target unit you want to convert to (e.g., Seconds).
          </li>
        </ol>
        <p>
          The converted time will be displayed automatically. You can use the
          swap button to quickly reverse the conversion direction.
        </p>
        <h3>Time Converter FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Why are month and year values approximate?
            </AccordionTrigger>
            <AccordionContent>
              The number of days in a month varies (from 28 to 31), and a year
              can be 365 or 366 days (in a leap year). To provide a consistent
              conversion, this calculator uses an average month length of 30.417
              days and an average (non-leap) year length of 365 days. For
              precise date calculations, please use our **Date Difference
              Calculator**.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How many seconds are in a day?</AccordionTrigger>
            <AccordionContent>
              There are 60 seconds in a minute, 60 minutes in an hour, and 24
              hours in a day. Therefore, there are `60 x 60 x 24 = 86,400`
              seconds in one day. This is the base value used for the
              'days' unit in this converter.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is a leap second?</AccordionTrigger>
            <AccordionContent>
              A leap second is a one-second adjustment that is occasionally
              applied to Coordinated Universal Time (UTC) in order to keep its
              time of day close to the mean solar time. It's an
              irregularity that this calculator does not account for, as
              it's not predictable in the same way as a leap year.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
