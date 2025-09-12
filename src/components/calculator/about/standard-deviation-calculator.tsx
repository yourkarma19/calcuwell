
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
      name: "What is Standard Deviation, in Simple Terms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard deviation is a measure of how spread out numbers are from their average (mean). A low standard deviation means the numbers are very close to the average, indicating consistency. A high standard deviation means the numbers are spread out over a wider range, indicating variability.",
      },
    },
    {
      "@type": "Question",
      name: "What's the Difference Between Sample and Population Standard Deviation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use Population standard deviation (σ) when your data represents the entire group you are interested in. Use Sample standard deviation (s) when your data is a smaller sample of a larger population. The sample formula uses n-1 in the denominator for a better, unbiased estimate.",
      },
    },
    {
      "@type": "Question",
      name: "Why is standard deviation important?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's crucial in many fields. In finance, it measures the volatility of an investment. In manufacturing, it's used for quality control to ensure products are consistent. In science, it helps determine if the results of an experiment are statistically significant.",
      },
    },
  ],
};

export default function AboutStandardDeviationCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Standard Deviation Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our <strong>Standard Deviation Calculator</strong> measures the amount
          of variation of a set of values. It helps you understand how spread
          out your data is from the average (mean). This calculator provides
          both the population and sample standard deviation.
        </p>

        <h3>How to Use the Standard Deviation Calculator</h3>
        <p>
          Enter your dataset into the text box. The numbers can be separated by
          commas, spaces, or line breaks. The calculator will automatically
          compute the standard deviation, variance, and mean.
        </p>

        <h3>Standard Deviation FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">
              What is Standard Deviation, in Simple Terms?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Standard deviation measures how spread out numbers are from their
                average. A low standard deviation means the numbers are close to
                the average. A high standard deviation means the numbers are
                spread out over a wider range.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold">
              Sample vs. Population Standard Deviation
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Use <strong>Population standard deviation (σ)</strong> when your
                data represents the entire group. Use{" "}
                <strong>Sample standard deviation (s)</strong> when your data
                is a smaller sample of a larger population. The sample formula
                uses `n-1` for a better estimate.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold">
              Why is standard deviation important?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                It's crucial in many fields. In finance, it measures the
                volatility of an investment. In manufacturing, it's used for
                quality control. In science, it helps determine if experimental
                results are statistically significant.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
