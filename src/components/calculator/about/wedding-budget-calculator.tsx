
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
      name: "What are the biggest wedding expenses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typically, the venue and catering are the largest parts of a wedding budget, often accounting for 50% or more of the total cost. The number of guests you invite has a direct impact on this, as catering is usually priced per person.",
      },
    },
    {
      "@type": "Question",
      name: "How can we save money on our wedding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are many ways to save! Consider having your wedding on a weekday or during the off-season. Trimming the guest list is the most effective way to cut costs. You can also explore DIY options for decorations or choose a less formal catering style, like a buffet.",
      },
    },
    {
      "@type": "Question",
      name: "How much should we budget for unexpected wedding costs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's wise to set aside about 5-10% of your total budget as a contingency fund. This will help you cover any unexpected expenses that arise without adding stress. The 'Miscellaneous' category in our calculator can be used for this.",
      },
    },
  ],
};

export default function AboutWeddingBudgetCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Wedding Budget Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our **Wedding Budget Calculator** helps you plan and manage the
          financial side of your special day. By breaking down the costs into
          key categories, you can get a realistic estimate of your total
          expenses and see where your money is going.
        </p>
        <h3>How to Use the Wedding Budget Calculator</h3>
        <ol>
          <li>Start by setting the **Number of Guests**.</li>
          <li>
            Enter your estimated costs for each category, such as the **Venue**,
            **Catering**, and **Photography**.
          </li>
          <li>
            Use the "Miscellaneous" field to account for other expenses like
            invitations or entertainment.
          </li>
        </ol>
        <p>
          The calculator will instantly update the total estimated cost and show
          a visual breakdown in the pie chart.
        </p>
        <h3>Wedding Budget FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What are the biggest wedding expenses?
            </AccordionTrigger>
            <AccordionContent>
              Typically, the venue and catering are the largest parts of a
              wedding budget, often 50% or more of the total cost. The number of
              guests has a direct impact on this, as catering is usually
              priced per person.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How can we save money on our wedding?
            </AccordionTrigger>
            <AccordionContent>
              There are many ways to save! Consider having your wedding on a
              weekday or during the off-season. Trimming the guest list is the
              most effective way to cut costs. You can also explore DIY options
              for decorations.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How much should we budget for unexpected costs?
            </AccordionTrigger>
            <AccordionContent>
              It's wise to set aside 5-10% of your total budget as a contingency
              fund. This will help you cover any unexpected expenses that arise
              without adding stress.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
