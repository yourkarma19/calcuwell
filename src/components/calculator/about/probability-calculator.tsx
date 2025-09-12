
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
      name: "How is probability calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Probability is calculated by dividing the number of desired outcomes by the total number of possible outcomes. For example, the probability of rolling a 4 on a six-sided die is 1/6.",
      },
    },
    {
      "@type": "Question",
      name: "What do 'P(A and B)' and 'P(A or B)' mean for independent events?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "P(A and B) is the probability that both events A and B occur, calculated by multiplying their probabilities: P(A) * P(B). P(A or B) is the probability that either A or B (or both) occur, calculated as P(A) + P(B) - P(A and B).",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between independent and dependent events?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An independent event is one where the outcome is not affected by previous events (e.g., a coin flip). A dependent event is one where the outcome is influenced by a previous event (e.g., drawing a card from a deck without replacement). This calculator deals with independent events.",
      },
    },
  ],
};

export default function AboutProbabilityCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Probability Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The **Probability Calculator** provides a simple way to compute the
          likelihood of different outcomes. Probability helps us quantify
          uncertainty. This tool allows you to calculate the probability of a
          single event or the combined probability of two independent events.
        </p>

        <h3>How to Use the Probability Calculator</h3>
        <ol>
          <li>
            Select the **Mode**: choose between "Single Event" or "Two
            Independent Events".
          </li>
          <li>Enter the probability for **Event A** (a number from 0 to 1).</li>
          <li>If needed, enter the probability for **Event B**.</li>
        </ol>
        <p>
          The calculator will instantly display the relevant probabilities.
        </p>

        <h3>Probability FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              The Basic Formula for Probability
            </AccordionTrigger>
            <AccordionContent>
              Probability is the number of desired outcomes divided by the total
              number of possible outcomes. For example, the probability of
              rolling a 4 on a six-sided die is 1/6.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What do 'P(A and B)' and 'P(A or B)' mean?
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                **P(A and B)** is the probability that both events occur. It's
                calculated by multiplying their probabilities: `P(A) * P(B)`.
              </p>
              <p>
                **P(A or B)** is the probability that either A or B (or both)
                occur. It's calculated as: `P(A) + P(B) - P(A and B)`.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Independent and Dependent Events
            </AccordionTrigger>
            <AccordionContent>
              An **independent event** is not affected by previous events (e.g.,
              a coin flip). A **dependent event** is influenced by a previous
              event (e.g., drawing a card from a deck without replacement). This
              calculator deals with independent events.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              What is the probability of an impossible event?
            </AccordionTrigger>
            <AccordionContent>
              The probability of an event that can never happen is 0. The
              probability of an event that is certain to happen is 1.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
