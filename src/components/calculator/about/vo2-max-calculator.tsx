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
      name: "What is VO₂ max?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VO₂ max stands for maximal oxygen uptake. It is the maximum amount of oxygen your body can effectively use during one minute of strenuous exercise. It is measured in milliliters of oxygen per kilogram of body weight per minute (mL/kg/min) and is a key indicator of cardiorespiratory fitness.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is this VO₂ max estimate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This formula provides a general estimate without needing exercise. However, it is not as accurate as a clinical stress test in a lab, which directly measures oxygen consumption. Factors like genetics and training can affect your true VO₂ max.",
      },
    },
    {
      "@type": "Question",
      name: "How can I improve my VO₂ max?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can improve your VO₂ max with consistent aerobic exercise. High-Intensity Interval Training (HIIT) is particularly effective, involving short bursts of intense effort followed by brief recovery periods. Long, steady-state cardio also helps improve your aerobic base.",
      },
    },
  ],
};

export default function AboutVo2MaxCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the VO₂ Max Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          This tool gives you an estimate of your VO₂ max, a key measure of your
          aerobic fitness. It shows how well your body can use oxygen during
          intense exercise. A higher VO₂ max usually means better cardiovascular
          health and endurance.
        </p>

        <h3>How to Use the VO₂ Max Estimator</h3>
        <p>
          This calculator uses a non-exercise method to estimate your VO₂ max.
          It&apos;s a convenient way to get a general idea of your fitness
          level. Simply enter your age and your resting heart rate. Your resting
          heart rate is your pulse when you are completely calm and relaxed.
        </p>

        <h3>VO₂ Max FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is VO₂ max?</AccordionTrigger>
            <AccordionContent>
              VO₂ max is the maximum amount of oxygen your body can use during
              one minute of strenuous exercise. It&apos;s measured in mL/kg/min
              and is a key indicator of cardiorespiratory fitness.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How accurate is this estimate?</AccordionTrigger>
            <AccordionContent>
              This formula provides a general estimate without needing exercise.
              However, it&apos;s not as accurate as a clinical stress test in a
              lab. Think of this result as a useful starting point, not a
              definitive medical value.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How can I improve my VO₂ max?</AccordionTrigger>
            <AccordionContent>
              You can improve your VO₂ max with consistent aerobic exercise.
              High-Intensity Interval Training (HIIT) is particularly effective.
              This involves short bursts of intense effort followed by brief
              recovery periods.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
