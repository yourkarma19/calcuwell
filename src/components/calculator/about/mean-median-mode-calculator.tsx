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
      name: "Mean vs. Median vs. Mode: What's the Difference?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The mean is the arithmetic average of all numbers. The median is the middle value when the data is sorted. The mode is the number that appears most frequently in the set.",
      },
    },
    {
      "@type": "Question",
      name: "When should I use mean vs. median?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the mean for data that is symmetrically distributed without extreme outliers. Use the median for skewed data, such as income levels or house prices, because it isn't affected by a few extremely high or low values.",
      },
    },
    {
      "@type": "Question",
      name: "What if there is no mode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If no number in the dataset repeats, then there is no mode. A dataset can also have more than one mode (bimodal or multimodal) if multiple numbers appear with the same highest frequency.",
      },
    },
  ],
};

export default function AboutMeanMedianModeCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">
          About the Mean, Median, and Mode Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our <strong>Mean, Median, and Mode Calculator</strong> helps you
          understand the center of a numerical dataset. These three measures are
          all different ways of describing what&apos;s &quot;typical&quot; in a
          set of numbers. This calculator also gives you the sum and count of
          your data.
        </p>

        <h3>How to Use the Calculator</h3>
        <p>
          Enter your numbers into the text box. You can separate them with
          commas, spaces, or line breaks. The calculator will process the data
          and display the results in real-time.
        </p>

        <h3>Mean, Median, and Mode FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">
              Mean vs. Median vs. Mode: What&apos;s the Difference?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                The <strong>mean</strong> is the average of all numbers. The{" "}
                <strong>median</strong> is the middle value when the data is
                sorted. The <strong>mode</strong> is the number that appears
                most often.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold">
              When should I use mean vs. median?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Use the <strong>mean</strong> for data that is evenly
                distributed without extreme outliers. Use the{" "}
                <strong>median</strong> for skewed data, like income levels,
                because it isn&apos;t affected by a few very high or low values.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold">
              What if there is no mode?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                If no number in the dataset repeats, then there is no mode. A
                dataset can also have more than one mode (bimodal or multimodal)
                if multiple numbers appear with the same highest frequency.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
