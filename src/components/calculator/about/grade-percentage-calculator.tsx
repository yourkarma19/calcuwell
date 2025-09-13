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
      name: "How is the percentage calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formula is: Percentage = (Points Earned / Total Possible Points) * 100. This gives you the proportion of points you received out of the total available.",
      },
    },
    {
      "@type": "Question",
      name: "What is a standard grading scale?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard grading scale converts percentages to letter grades. A common scale is: 90%+=A, 80-89%=B, 70-79%=C, 60-69%=D, <60%=F. This calculator uses this standard scale.",
      },
    },
  ],
};

export default function AboutGradePercentageCalculator() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Grade Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            This simple tool helps you quickly calculate the percentage score of
            a test, quiz, or assignment. By entering your points and the total
            points, you can instantly see your performance as a percentage and
            its letter grade.
          </p>
          <h3>How to Use This Grade Calculator</h3>
          <ol>
            <li>Enter the total **Points Earned** (the score you received).</li>
            <li>Enter the **Total Possible Points** for the assignment.</li>
          </ol>
          <p>
            The calculator will instantly show your grade as a percentage and a
            letter.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h3">Grading FAQs</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How is the percentage calculated?
              </AccordionTrigger>
              <AccordionContent>
                The formula to calculate a grade percentage is: `Percentage =
                (Points Earned / Total Possible Points) * 100`. This shows the
                proportion of points you received.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What is a standard grading scale?
              </AccordionTrigger>
              <AccordionContent>
                A standard grading scale converts percentages into letter
                grades. A very common scale is:
                <ul className="list-disc pl-5 mt-2">
                  <li>90% and above: A</li>
                  <li>80% - 89%: B</li>
                  <li>70% - 79%: C</li>
                  <li>60% - 69%: D</li>
                  <li>Below 60%: F</li>
                </ul>
                This calculator uses this standard scale.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
