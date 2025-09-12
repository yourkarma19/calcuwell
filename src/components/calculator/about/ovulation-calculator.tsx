
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
      name: "What is ovulation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ovulation is the part of the female menstrual cycle when a mature egg is released from an ovary. This typically happens about 12 to 14 days before the start of the next menstrual period.",
      },
    },
    {
      "@type": "Question",
      name: "What is a fertile window?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The fertile window is the time in your menstrual cycle when pregnancy is possible. It typically includes the five days leading up to ovulation and the day of ovulation itself. Sperm can survive in the female reproductive tract for up to five days.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is this ovulation calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator provides an estimate based on average cycle data. Individual cycles can vary due to factors like stress or diet. For more accuracy, consider tracking basal body temperature or using ovulation predictor kits (OPKs).",
      },
    },
    {
      "@type": "Question",
      name: "My cycle is irregular. Can I still use this calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If your cycle is irregular, prediction is more challenging. It's best to use your average cycle length over the last several months. However, for irregular cycles, other methods like ovulation predictor kits may be more reliable. Always consult a healthcare provider for personalized advice.",
      },
    },
  ],
};

export default function AboutOvulationCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About Ovulation &amp; Fertility</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our **Ovulation Calculator** is a simple tool designed to help you
          predict your most fertile days based on your menstrual cycle. By
          estimating your ovulation date, you can identify your &quot;fertile
          window,&quot; which is the period when you have the highest chance of
          conceiving. This calculator is a helpful first step for anyone
          planning a pregnancy.
        </p>
        <h3>How to Use the Ovulation Calculator</h3>
        <ol>
          <li>
            Select the **First Day of Your Last Menstrual Period** from the
            calendar.
          </li>
          <li>
            Enter your **Average Cycle Length** in days (the time from the first
            day of one period to the first day of the next).
          </li>
        </ol>
        <p>
          The calculator will instantly estimate your next ovulation date and
          highlight your most fertile window.
        </p>
        <h3>Ovulation & Fertility FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is ovulation?</AccordionTrigger>
            <AccordionContent>
              Ovulation is the part of the female menstrual cycle when a mature
              egg is released from an ovary. This typically happens about 12 to
              14 days before the start of the next menstrual period.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is a fertile window?</AccordionTrigger>
            <AccordionContent>
              The fertile window is the time in your menstrual cycle when
              pregnancy is possible. It typically includes the five days leading
              up to ovulation and the day of ovulation itself. Sperm can survive
              in the female reproductive tract for up to five days, so
              intercourse during this window can lead to conception.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How accurate is this calculator?
            </AccordionTrigger>
            <AccordionContent>
              This calculator provides an estimate based on the information you
              provide and average cycle data. However, individual cycles can
              vary from month to month due to factors like stress, diet, or
              health conditions. For more accuracy, consider tracking your basal
              body temperature, monitoring cervical mucus, or using ovulation
              predictor kits (OPKs).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              My cycle is irregular. Can I still use this calculator?
            </AccordionTrigger>
            <AccordionContent>
              If your cycle is irregular, prediction can be more challenging.
              It's best to calculate your average cycle length over the
              last several months to use in the calculator. However, for
              irregular cycles, other methods like ovulation predictor kits may
              provide more reliable results. Always consult a healthcare
              provider for personalized advice.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
