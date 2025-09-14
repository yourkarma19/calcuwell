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
      name: "What is the Pythagorean Theorem?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Pythagorean theorem states that for any right-angled triangle, the square of the length of the hypotenuse (c) is equal to the sum of the squares of the other two sides (a and b). The formula is written as: a² + b² = c².",
      },
    },
    {
      "@type": "Question",
      name: "What is a Hypotenuse?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The hypotenuse is the longest side of a right-angled triangle. It is always the side opposite the 90-degree angle. In the formula a² + b² = c², 'c' represents the hypotenuse.",
      },
    },
    {
      "@type": "Question",
      name: "What are some real-world uses of the Pythagorean Theorem?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The theorem is used in many real-world applications, such as architecture (ensuring corners are square), navigation (calculating the shortest distance), and video game design for calculating distances.",
      },
    },
  ],
};

export default function AboutPythagoreanTheoremCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Pythagorean Theorem</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Pythagorean Theorem is a fundamental principle in geometry,
          forming the bedrock of trigonometry. This calculator is a vital tool
          for students, carpenters, and engineers who need to find the missing
          side of a right-angled triangle.
        </p>

        <h3>How to Use the Pythagorean Theorem Calculator</h3>
        <ol>
          <li>
            <strong>Select the Missing Side:</strong> Choose whether you want to
            solve for Side 'a', Side 'b', or the Hypotenuse 'c'.
          </li>
          <li>
            <strong>Enter Known Side Lengths:</strong> Input the lengths of the
            two sides you already know.
          </li>
          <li>
            <strong>View the Result:</strong> The calculator automatically
            computes the missing side length.
          </li>
        </ol>

        <h3>The Pythagorean Theorem Formula Explained</h3>
        <p>
          The theorem states that for any right-angled triangle, the square of
          the hypotenuse (c) is equal to the sum of the squares of the other two
          sides (a and b).
        </p>
        <p className="font-mono bg-muted p-4 rounded-md text-center text-xl">
          a² + b² = c²
        </p>
        <p>From this, we can solve for any side:</p>
        <ul>
          <li>To find the <strong>hypotenuse (c)</strong>: c = √(a² + b²)</li>
          <li>To find <strong>side a</strong>: a = √(c² - b²)</li>
          <li>To find <strong>side b</strong>: b = √(c² - a²)</li>
        </ul>

        <h3>Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">
              What is the Pythagorean Theorem?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                The theorem states that for any right-angled triangle, the
                square of the length of the hypotenuse (the side opposite the
                right angle) is equal to the sum of the squares of the other
                two sides. The formula is: <strong>a² + b² = c²</strong>.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold">
              What is a Hypotenuse?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                The hypotenuse is the longest side of a right-angled triangle.
                It is always the side opposite the 90-degree angle. In the
                formula a² + b² = c², 'c' represents the hypotenuse.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold">
              What are some real-world uses?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                This theorem is used in architecture (ensuring corners are
                square), navigation (calculating the shortest distance), and
                video game design for calculating distances and movements.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="font-semibold">
              Learn More
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Read our detailed article on{" "}
                <Link
                  href="/blog/what-is-the-pythagorean-theorem"
                  className="text-primary hover:underline"
                >
                  What is the Pythagorean Theorem?
                </Link>{" "}
                to understand its history, proof, and further applications.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
