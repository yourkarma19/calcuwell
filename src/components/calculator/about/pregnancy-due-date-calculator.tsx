
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
      name: "How is the due date calculated from the Last Menstrual Period (LMP)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common method is Naegele's rule, which calculates the due date by adding 280 days (or 40 weeks) to the first day of your last menstrual period. This assumes a standard 28-day menstrual cycle.",
      },
    },
    {
      "@type": "Question",
      name: "How is the due date calculated from the conception date?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you know the exact date of conception, the calculation is more direct. The estimated due date is calculated by adding 266 days (or 38 weeks) to the conception date, which is the average length of human gestation.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is this due date calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator provides an estimate. Only about 5% of babies are born on their exact due date. Your doctor will provide the most accurate due date based on an ultrasound measurement, which is the best method for dating a pregnancy.",
      },
    },
  ],
};

export default function AboutPregnancyDueDateCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About Your Due Date</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our **Pregnancy Due Date Calculator** is an easy-to-use tool that
          provides an estimated due date for your baby. By providing either the
          date of your last menstrual period (LMP) or your date of conception,
          this calculator helps you get a better idea of your pregnancy
          timeline. It's a great starting point for expectant parents
          planning for their new arrival.
        </p>
        <h3>How to Use the Calculator</h3>
        <ol>
          <li>
            First, select your **Calculation Method**. You can choose between
            using the first day of your last menstrual period (LMP) or the date
            of conception.
          </li>
          <li>Enter the appropriate date using the calendar.</li>
        </ol>
        <p>The calculator will instantly display your estimated due date.</p>
        <h3>Frequently Asked Questions (FAQs)</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How is the due date calculated from the LMP?
            </AccordionTrigger>
            <AccordionContent>
              The most common method is **Naegele's rule**. This rule
              calculates the due date by adding 280 days (or 40 weeks) to the
              first day of your last menstrual period. This assumes a standard
              28-day menstrual cycle.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How is the due date calculated from the conception date?
            </AccordionTrigger>
            <AccordionContent>
              If you know the exact date of conception, the calculation is more
              direct. The estimated due date is calculated by adding 266 days
              (or 38 weeks) to the conception date. This is the average length
              of a human pregnancy from conception to birth.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How accurate is this due date calculator?
            </AccordionTrigger>
            <AccordionContent>
              This calculator provides an estimate, and it's important to
              remember that only about 5% of babies are born on their exact due
              date. It's a valuable tool for planning, but your doctor will
              provide the most accurate due date based on an ultrasound
              measurement. An early ultrasound is the best method for dating a
              pregnancy.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
