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
      name: "How do you multiply feet and inches?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The easiest way is to convert both measurements entirely into inches, multiply them, and then convert the result back to feet and inches. Note that multiplying two length measurements results in an area (square inches).",
      },
    },
    {
      "@type": "Question",
      name: "How do you convert decimal inches to fractions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'To convert a decimal to a fraction, you can use a conversion chart or a calculator. For example, 0.5 inches is 1/2", 0.25 inches is 1/4", and 0.75 inches is 3/4". This is common for woodworking and other precise crafts.',
      },
    },
    {
      "@type": "Question",
      name: "How many inches are in a foot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are exactly 12 inches in one foot.",
      },
    },
  ],
};

export default function AboutFeetAndInchesCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">Working with Feet and Inches</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <h3>How to Use the Feet and Inches Calculator</h3>
        <ol>
          <li>
            Enter your first measurement in the &apos;Feet&apos; and
            &apos;Inches&apos; boxes.
          </li>
          <li>Select the operation you want to perform.</li>
          <li>Enter your second measurement.</li>
          <li>Click the &apos;Calculate&apos; button to see the result.</li>
        </ol>

        <h3>Example: How to Add Feet and Inches</h3>
        <p>Let&rsquo;s add 5&apos; 7&quot; + 2&apos; 10&quot;:</p>
        <ol>
          <li>
            <strong>Add inches:</strong> 7&quot; + 10&quot; = 17&quot;.
          </li>
          <li>
            <strong>Convert excess inches:</strong> Since there are 12 inches in
            a foot, 17&quot; becomes 1 foot and 5 inches.
          </li>
          <li>
            <strong>Add feet:</strong> 5&apos; + 2&apos; + 1&apos; (from inches)
            = 8&apos;.
          </li>
          <li>
            <strong>Combine:</strong> The final answer is 8&apos; 5&quot;.
          </li>
        </ol>

        <h3>Common Uses</h3>
        <ul>
          <li>
            <strong>Construction &amp; Carpentry:</strong> Calculating material
            lengths and room dimensions.
          </li>
          <li>
            <strong>Interior Design:</strong> Planning furniture placement.
          </li>
          <li>
            <strong>DIY Home Projects:</strong> Measuring for flooring or
            wallpaper.
          </li>
        </ul>

        <h3>Feet and Inches FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How do you multiply feet and inches?
            </AccordionTrigger>
            <AccordionContent>
              The easiest way is to convert both measurements to inches,
              multiply them, and then convert the result back. Note that
              multiplying two lengths results in an area (square inches).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How do you convert decimal inches to fractions?
            </AccordionTrigger>
            <AccordionContent>
              You can use a conversion chart or a calculator. For example, 0.5
              inches is 1/2&quot;, 0.25 is 1/4&quot;, and 0.75 is 3/4&quot;.
              This is common for woodworking and other precise crafts.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How many inches are in a foot?</AccordionTrigger>
            <AccordionContent>
              There are exactly 12 inches in one foot.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
