"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import usePersistentState from "@/hooks/use-persistent-state";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is the discount calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The amount saved is calculated by multiplying the original price by the discount percentage (in decimal form). The final price is then found by subtracting the saved amount from the original price. For example, for a ₹100 item with a 20% discount, you save ₹20 (100 * 0.20), and the final price is ₹80 (100 - 20).",
      },
    },
    {
      "@type": "Question",
      name: "What if there are multiple discounts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you have multiple discounts (e.g., 20% off, plus an additional 10% off), you cannot simply add them together (it's not 30% off). You must apply them sequentially. First, calculate the price after the 20% discount. Then, take that new, lower price and apply the 10% discount to it.",
      },
    },
    {
      "@type": "Question",
      name: "Does this include sales tax?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, this calculator does not include sales tax. The discount is typically applied to the pre-tax price of an item. Sales tax, if applicable, would be calculated on the final discounted price.",
      },
    },
  ],
};

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = usePersistentState(
    "discount-price",
    100,
  );
  const [discount, setDiscount] = usePersistentState("discount-percentage", 25);

  const { finalPrice, amountSaved } = useMemo(() => {
    const price = Number(originalPrice);
    const disc = Number(discount);

    if (price > 0 && disc >= 0) {
      const saved = price * (disc / 100);
      const final = price - saved;
      return { finalPrice: final, amountSaved: saved };
    }
    return { finalPrice: price, amountSaved: 0 };
  }, [originalPrice, discount]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Discount Calculator</CardTitle>
          <CardDescription>
            Calculate the final price of an item after a discount has been
            applied.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="original-price">Original Price</Label>
            <Input
              id="original-price"
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount">Discount Percentage</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="discount"
                value={[discount]}
                onValueChange={(v) => setDiscount(v[0])}
                min={0}
                max={100}
                step={1}
              />
              <Input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-24"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Final Price</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">You Pay</p>
            <p className="text-4xl font-bold font-headline text-primary">
              ₹{finalPrice.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">You Save</p>
            <p className="text-2xl font-semibold">₹{amountSaved.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Discount Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The Discount Calculator helps you figure out the final price of an
            item after a discount. It&apos;s perfect for shoppers who want to
            quickly see the sale price and how much money they are saving.
          </p>
          <h3>How to Use the Discount Calculator</h3>
          <ol>
            <li>Enter the **Original Price** of the item.</li>
            <li>Use the slider to set the **Discount Percentage**.</li>
          </ol>
          <p>
            The calculator will instantly show you the final price and how much
            you save.
          </p>
          <h3>Discount Calculator FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How is the discount calculated?</AccordionTrigger>
              <AccordionContent>
                The amount saved is the original price multiplied by the discount
                percentage (as a decimal). The final price is the original price
                minus the amount saved. For example, for a ₹100 item with a 20%
                discount, you save ₹20, and the final price is ₹80.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What if there are multiple discounts?
              </AccordionTrigger>
              <AccordionContent>
                You can&apos;t just add multiple discounts together. You must
                apply them one by one. First, calculate the price after the first
                discount. Then, apply the second discount to that new, lower
                price.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Does this include sales tax?</AccordionTrigger>
              <AccordionContent>
                No, this calculator does not include sales tax. The discount is
                applied to the pre-tax price. Sales tax would be calculated on the
                final discounted price.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
