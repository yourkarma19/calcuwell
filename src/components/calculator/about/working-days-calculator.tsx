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
  );
}
