
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
      name: "Why is Lean Body Mass (LBM) an important health metric?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tracking LBM is more useful than body weight alone because it differentiates between fat loss and muscle loss. Preserving muscle is crucial for a healthy metabolism and overall strength.",
      },
    },
    {
      "@type": "Question",
      name: "How is LBM different from BMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BMI is a simple ratio of weight to height and cannot distinguish between fat and muscle. LBM specifically measures your non-fat mass, providing a clearer picture of your body composition.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is this LBM estimate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This calculator uses the Boer formula, which provides a reliable estimate for most people. However, for precise measurements, a clinical method like a DEXA scan is required. This tool is best used for tracking progress over time.",
      },
    },
  ],
};

export default function AboutLeanBodyMassCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Lean Body Mass (LBM) Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Lean Body Mass (LBM) Calculator estimates the total weight of your
          body minus all fat. LBM is a key part of your body composition and
          includes the weight of your bones, muscles, organs, and water. This
          calculator uses the Boer formula, a common estimation method.
        </p>
        <h3>How to Use the LBM Calculator</h3>
        <ol>
          <li>Select your **Gender**.</li>
          <li>Enter your **Weight** in kilograms (kg).</li>
          <li>Enter your **Height** in centimeters (cm).</li>
        </ol>
        <p>
          The calculator will instantly estimate your LBM and body fat
          percentage.
        </p>
        <h3>LBM FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Why is LBM an important health metric?
            </AccordionTrigger>
            <AccordionContent>
              Tracking LBM is more useful than tracking body weight alone because
              it separates fat loss from muscle loss. Preserving muscle is key
              for a healthy metabolism and overall strength.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How is LBM different from BMI?</AccordionTrigger>
            <AccordionContent>
              LBM and BMI measure different things. BMI is a simple ratio of
              weight to height and can&apos;t distinguish between fat and muscle.
              LBM specifically measures your non-fat mass, giving a clearer
              picture of your body composition.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How accurate is this LBM estimate?
            </AccordionTrigger>
            <AccordionContent>
              This calculator uses the Boer formula, which gives a reliable
              estimate for most people. However, for precise measurements, you
              would need a clinical method like a DEXA scan. Use this tool to
              track your progress over time.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
