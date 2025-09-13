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
      name: "What is the average reading speed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The average adult reads at about 200-250 words per minute (WPM). For technical material, this is slower (50-75 WPM), and for light fiction, much faster. This calculator defaults to 200 WPM.",
      },
    },
    {
      "@type": "Question",
      name: "How is reading time calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formula is Reading Time = Total Word Count / Words Per Minute. This gives an estimate of how many minutes it will take to read the text.",
      },
    },
    {
      "@type": "Question",
      name: "How can I test my own reading speed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can test your speed by setting a timer for one minute, reading a passage of text comfortably, and then counting the number of words you read in that minute. Do this a few times with different texts to find your average WPM.",
      },
    },
  ],
};

export default function AboutReadingTimeCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Reading Time Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our <strong>Reading Time Estimator</strong> is a useful tool for
          writers, bloggers, and students. It gives a quick estimate of how long
          it will take to read a piece of text. This is the same type of tool
          used by popular blogging platforms.
        </p>
        <h2>How to Use the Reading Time Calculator</h2>
        <ol>
          <li>Paste your text into the text area.</li>
          <li>
            Adjust the <strong>Reading Speed (WPM)</strong> slider to match your
            personal speed.
          </li>
        </ol>
        <p>
          The calculator will instantly display the estimated reading time and
          the total word count.
        </p>
        <h2>Reading Time FAQs</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What is the average reading speed?
            </AccordionTrigger>
            <AccordionContent>
              The average adult reads at about 200-250 words per minute (WPM).
              For technical material, this speed is slower. For light fiction,
              it can be much faster. This calculator defaults to 200 WPM.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How is reading time calculated?</AccordionTrigger>
            <AccordionContent>
              The calculation is simple: `Reading Time = Total Word Count /
              Words Per Minute`. This provides an estimate of how many minutes
              it will take to read the text.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How can I test my own reading speed?
            </AccordionTrigger>
            <AccordionContent>
              You can test your speed by setting a timer for one minute, reading
              a passage of text, and then counting the number of words you read.
              Do this a few times with different texts to find your average WPM.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
