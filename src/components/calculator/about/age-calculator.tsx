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

export default function AboutAgeCalculator() {
  return (
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
  );
}
