
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
      name: "Is this the exact amount of water I must drink?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, this is a general guideline. Your individual needs can vary based on climate, health, and other factors. The best indicator is to drink when you feel thirsty and monitor the color of your urine (it should be light yellow).",
      },
    },
    {
      "@type": "Question",
      name: "Does this calculation include water from food and other drinks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This estimate is for total fluid intake. You get about 20% of your daily water from solid foods (like fruits and vegetables). Other beverages like milk and juice also count towards your total. However, water is the best source of hydration.",
      },
    },
    {
      "@type": "Question",
      name: "Why is hydration so important?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Adequate hydration is critical for physical and mental performance. Even mild dehydration can lead to fatigue, headaches, and reduced concentration. Proper fluid intake supports nutrient transport, waste removal, and overall cellular health.",
      },
    },
  ],
};

export default function AboutWaterIntakeCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Daily Water Intake Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Daily Water Intake Calculator provides a personalized
          recommendation for your daily fluid needs. Proper hydration is
          essential for nearly every bodily function. This tool uses common
          formulas based on age, weight, and activity level to give you a
          baseline for your hydration goals.
        </p>

        <h3>How to Use the Water Intake Calculator</h3>
        <ol>
          <li>Enter your **Age** in years.</li>
          <li>Enter your **Weight** in kilograms.</li>
          <li>
            Select the **Activity Level** that best describes your typical day.
          </li>
        </ol>
        <p>
          The calculator will display your estimated daily water requirement in
          liters.
        </p>

        <h3>Water Intake FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Is this the exact amount I must drink?
            </AccordionTrigger>
            <AccordionContent>
              No, this is a general guideline. Your individual needs can vary
              based on climate, health, and other factors. It's a great
              starting point, but the best indicator is to drink when you feel
              thirsty.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Does this include water from food and other drinks?
            </AccordionTrigger>
            <AccordionContent>
              This estimate is for total fluid intake. You get about 20% of your
              daily water from solid foods. Other beverages like milk and juice
              also count towards your total. However, water is the best source
              of hydration.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Why is hydration so important?</AccordionTrigger>
            <AccordionContent>
              Adequate hydration is critical for physical and mental
              performance. Even mild dehydration can lead to fatigue, headaches,
              and reduced concentration. Proper fluid intake supports overall
              cellular health.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
