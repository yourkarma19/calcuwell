
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
      name: "What is the difference between VAT and GST?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Functionally, for the end consumer, there is very little difference. VAT (Value-Added Tax) and GST (Goods and Services Tax) are both forms of consumption tax. The name simply differs by country. This calculator can be used for either.",
      },
    },
    {
      "@type": "Question",
      name: "How do you calculate the tax amount from a gross price (price including tax)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To find the original price (Net Price) from a price that already includes tax (Gross Price), you use this formula: Net Price = Gross Price / (1 + (Tax Rate / 100)). The tax amount is then simply the Gross Price - Net Price.",
      },
    },
    {
      "@type": "Question",
      name: "Why is this calculator useful for businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Businesses need to clearly separate the net price and the tax amount for accounting and tax filing purposes. This tool makes it easy to generate accurate invoices and keep financial records straight.",
      },
    },
  ],
};

export default function AboutVatGstCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About VAT &amp; GST</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our VAT / GST Calculator is a key tool for consumers and business
          owners. It lets you quickly add or remove a sales tax from a price.
          This makes it easy to see the pre-tax cost or the final gross amount.
          This is perfect for checking receipts, creating invoices, or
          understanding the true cost of a product.
        </p>

        <h3>How to Use the Calculator</h3>
        <ol>
          <li>
            Enter the <strong>Initial Amount</strong> of the product or service.
          </li>
          <li>
            Specify if this amount already includes tax by selecting{" "}
            <strong>&quot;Add Tax&quot;</strong> or{" "}
            <strong>&quot;Remove Tax&quot;</strong>.
          </li>
          <li>
            Adjust the <strong>Tax Rate (%)</strong> slider to match your local
            VAT or GST rate.
          </li>
        </ol>
        <p>
          The results will instantly show you the Net Price (pre-tax), the Tax
          Amount, and the Gross Price (inclusive of tax).
        </p>

        <h3>Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What's the difference between VAT and GST?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Functionally, for the end consumer, there is very little
                difference. <strong>VAT (Value-Added Tax)</strong> and{" "}
                <strong>GST (Goods and Services Tax)</strong> are both forms of
                consumption tax. The name simply differs by country. This
                calculator can be used for either.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How do you calculate the tax amount from a gross price?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                To find the original price (Net Price) from a price that already
                includes tax (Gross Price), you use this formula: `Net Price =
                Gross Price / (1 + (Tax Rate / 100))`. The tax amount is then
                simply the `Gross Price - Net Price`.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Why is this calculator useful for businesses?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Businesses need to clearly separate the net price and the tax
                amount for accounting and tax filing purposes. This tool makes
                it easy to generate accurate invoices and keep financial records
                straight.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
