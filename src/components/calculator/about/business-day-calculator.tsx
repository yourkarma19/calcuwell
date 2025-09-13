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
      name: "What is the difference between a day and a business day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A business day, also known as a working day, specifically refers to a typical day of work, which is usually Monday through Friday. This calculator automatically skips weekends (Saturdays and Sundays) in its calculation.",
      },
    },
    {
      "@type": "Question",
      name: "Why is calculating business days important?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculation is critical for business operations like logistics and finance. It helps set accurate expectations for delivery dates, payment schedules, and project deadlines that must fall on official working days.",
      },
    },
    {
      "@type": "Question",
      name: "Does this tool account for holidays?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, the calculator does not account for public holidays because they vary by country and region. To get the most accurate date, you would need to manually add extra days for any public holidays that fall within your calculated period.",
      },
    },
  ],
};

export default function AboutBusinessDayCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Business Day Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The <strong>Business Day Calculator</strong> helps you plan around a
          standard workweek. It lets you find a future or past date by adding or
          subtracting a number of working days. The calculator automatically
          ignores weekends (Saturdays and Sundays).
        </p>
        <h3>How to Use the Business Day Calculator</h3>
        <ol>
          <li>
            Select the <strong>Start Date</strong>.
          </li>
          <li>
            Enter the number of <strong>Business Days</strong> you want to add
            or subtract.
          </li>
          <li>Click the correct button to see the new date.</li>
        </ol>
        <p>
          This is useful for calculating project deadlines, shipping estimates,
          and contract timelines.
        </p>
        <h3>Business Day Calculator FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What&apos;s the difference between a day and a business day?
            </AccordionTrigger>
            <AccordionContent>
              A business day is a typical workday, usually Monday through
              Friday. This calculator skips weekends automatically.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Why is this calculation useful?</AccordionTrigger>
            <AccordionContent>
              This is key for business operations, especially in logistics and
              finance. It helps set correct expectations for delivery dates,
              payment schedules, and project deadlines that must fall on
              workdays.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Does this tool count holidays?</AccordionTrigger>
            <AccordionContent>
              No. The calculator does not account for public holidays because
              they vary by country and region. For the most accurate result, you
              will need to add extra days for any holidays in your date range.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
