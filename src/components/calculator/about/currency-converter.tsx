
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
      name: "What is an exchange rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An exchange rate is the value of one currency when converting to another. For example, if the USD to INR exchange rate is 83, it means 1 US Dollar is worth 83 Indian Rupees.",
      },
    },
    {
      "@type": "Question",
      name: "Why do currency exchange rates change?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Exchange rates change all the time because of many economic and political factors. These include inflation, interest rates, trade balances, and economic performance.",
      },
    },
    {
      "@type": "Question",
      name: "What does 'mock data' mean for this currency converter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The exchange rates in this calculator are for demonstration purposes only. They are not real-time market values and should not be used for actual financial trades. For real trades, always check with a bank or a verified currency exchange service.",
      },
    },
  ],
};

export default function AboutCurrencyConverter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Currency Converter</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our Currency Converter is a key tool for anyone dealing with
          international money. It makes it easy to convert one currency to
          another using mock exchange rates. This tool helps you understand the
          cost of items in your local currency.
        </p>
        <h3>How to Use the Currency Converter</h3>
        <ol>
          <li>Enter the <strong>Amount</strong> you wish to convert.</li>
          <li>
            Select the currency you are converting <strong>from</strong>.
          </li>
          <li>
            Select the currency you want to convert <strong>to</strong>.
          </li>
        </ol>
        <p>
          The converted amount will be displayed instantly. Use the swap button
          to quickly reverse the currencies.
        </p>
        <h3>Currency Converter FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is an exchange rate?</AccordionTrigger>
            <AccordionContent>
              An exchange rate is the value of one currency when converting to
              another. For example, if the USD to INR exchange rate is 83, it
              means 1 US Dollar is worth 83 Indian Rupees.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Why do exchange rates change?</AccordionTrigger>
            <AccordionContent>
              Exchange rates change all the time due to economic and political
              factors. These include inflation, interest rates, and trade
              balances.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What does &quot;mock data&quot; mean?
            </AccordionTrigger>
            <AccordionContent>
              The exchange rates in this calculator are for demonstration
              purposes only. They are not real-time market values. You should
              not use them for actual financial trades. For real trades, always
              check with a bank or verified exchange service.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What is a currency pair?</AccordionTrigger>
            <AccordionContent>
              A currency pair shows the value of one currency against another.
              The first currency is the &quot;base&quot; and the second is the
              &quot;quote.&quot; For example, in EUR/USD = 1.08, one Euro is worth 1.08 US
              Dollars.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
