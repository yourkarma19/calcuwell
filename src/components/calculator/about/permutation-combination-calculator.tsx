
"use client";
import Link from "next/link";
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
      name: "Permutation vs. Combination: What's the Difference?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a Permutation when the order of selection is important (e.g., arranging books on a shelf, 1st/2nd/3rd place winners). Use a Combination when the order of selection does not matter (e.g., picking a team, choosing pizza toppings).",
      },
    },
    {
      "@type": "Question",
      name: "What are the formulas for nPr and nCr?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Permutation (nPr): n! / (n-r)! Combination (nCr): n! / (r! * (n-r)!)",
      },
    },
    {
      "@type": "Question",
      name: "What is a factorial (!)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A factorial is the product of all positive integers up to that number (e.g., 5! = 5×4×3×2×1). They represent the total number of ways to arrange a set of items.",
      },
    },
  ],
};

export default function AboutPermutationCombinationCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About Permutations & Combinations</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The **Permutation and Combination Calculator** helps you figure out
          the number of ways a subset of items can be selected from a larger
          set. The key difference is whether the order of selection matters.
        </p>

        <h3>How to Use the Calculator</h3>
        <ol>
          <li>
            Enter the **Total number of items (n)**, which is the size of the
            entire set.
          </li>
          <li>
            Enter the **Number of items to choose (r)**, which is the size of
            the subset.
          </li>
        </ol>
        <p>
          The calculator will automatically display the results for both
          permutations (nPr) and combinations (nCr).
        </p>

        <h3>Permutation & Combination FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">
              Permutation vs. Combination: What&apos;s the Difference?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                The key difference is whether **order matters**. Use a
                **Permutation** when the order is important (e.g., arranging
                books on a shelf). Use a **Combination** when the order does
                not matter (e.g., picking a team).
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold">
              Can you give a clear example?
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                **Permutation Example:** Picking a 3-digit lock code. The order
                `1-2-3` is different from `3-2-1`.
              </p>
              <p>
                **Combination Example:** Picking three friends for a committee.
                Picking Alice, Bob, and Carol is the same as picking Carol,
                Bob, and Alice.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold">
              What are the formulas for nPr and nCr?
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">**Permutation (nPr):** `n! / (n-r)!`</p>
              <p>**Combination (nCr):** `n! / (r! * (n-r)!)`</p>
              <p className="mt-2">
                Where &apos;n&apos; is the total items, and &apos;r&apos; is the items to choose.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="font-semibold">
              What is a factorial (!)?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                A factorial is the product of all positive integers up to that
                number (e.g., 5! = 5×4×3×2×1). You can learn more with our{" "}
                <Link
                  href="/calculators/factorial-calculator"
                  className="text-primary hover:underline"
                >
                  Factorial Calculator
                </Link>
                .
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
