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
      name: "What are heart rate zones?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Heart rate zones are ranges based on a percentage of your maximum heart rate. Training in different zones stimulates different physiological responses. For example, Zone 2 is ideal for building aerobic base and burning fat, while Zone 4 helps improve your anaerobic threshold and speed.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Karvonen formula?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Karvonen formula is a popular method for calculating target heart rate zones because it takes your resting heart rate into account. This makes it more personalized than simpler formulas that only use age to estimate maximum heart rate.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find my resting heart rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best time to measure your resting heart rate is in the morning, shortly after you wake up and before you get out of bed. Place your index and middle fingers on your wrist or neck to find your pulse. Count the number of beats in 60 seconds. Do this for a few consecutive days and take the average for the most accurate result.",
      },
    },
    {
      "@type": "Question",
      name: "Is this calculator 100% accurate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator provides a very good estimate for most people. However, the `220 - age` formula for maximum heart rate is a general guideline. Your true maximum heart rate can be influenced by genetics and fitness level. For a precise measurement, a clinical stress test is required.",
      },
    },
  ],
};

export default function AboutHeartRateZoneCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About Heart Rate Zone Training</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our **Heart Rate Zone Calculator** helps you optimize your workouts.
          By calculating your personalized training zones, you can exercise at
          the right intensity to meet your fitness goals. This tool uses the
          Karvonen formula for a more accurate result.
        </p>
        <h3>How to Use the Heart Rate Zone Calculator</h3>
        <ol>
          <li>Enter your **Age** in years.</li>
          <li>
            Enter your **Resting Heart Rate** in beats per minute (BPM). You can
            find this by checking your pulse after resting.
          </li>
        </ol>
        <p>
          The calculator will instantly display your five training zones and
          your estimated maximum heart rate.
        </p>
        <h3>Heart Rate Zone FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What are heart rate zones?</AccordionTrigger>
            <AccordionContent>
              Heart rate zones are ranges based on a percentage of your max
              heart rate. Training in different zones gets you different
              results. For example, Zone 2 is ideal for building endurance,
              while Zone 4 improves speed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is the Karvonen formula?</AccordionTrigger>
            <AccordionContent>
              The Karvonen formula is a popular way to calculate heart rate
              zones because it uses your resting heart rate. This makes it more
              personalized than formulas that only use age.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How do I find my resting heart rate?
            </AccordionTrigger>
            <AccordionContent>
              The best time to measure your resting heart rate is in the morning
              after you wake up. Find your pulse on your wrist or neck. Count
              the number of beats in 60 seconds. Do this for a few days and take
              the average.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Is this calculator 100% accurate?
            </AccordionTrigger>
            <AccordionContent>
              This calculator provides a good estimate. However, the `220 - age`
              formula for max heart rate is a general guideline. Your true max
              heart rate can be different based on genetics and fitness. A
              clinical stress test is required for a precise measurement.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
