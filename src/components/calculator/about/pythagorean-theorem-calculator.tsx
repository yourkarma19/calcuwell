
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
          <CardTitle as="h2">The Ultimate Guide to the Pythagorean Theorem</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
           <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        <p>
            The Pythagorean Theorem is one of the most famous and fundamental principles in all of mathematics, forming the bedrock of geometry and trigonometry. This calculator is designed to be a comprehensive tool for students, carpenters, engineers, and anyone who needs to quickly find the missing side of a right-angled triangle. By providing any two side lengths, our tool instantly computes the third, saving you time and ensuring accuracy in your calculations.
        </p>

        <h2 className="text-2xl font-bold font-headline text-primary mt-8">How to Use Our Pythagorean Theorem Calculator</h2>
        <p>
            Our calculator is designed for simplicity and speed. Follow these steps to get your answer instantly:
        </p>
        <ol>
            <li>
                <strong>Select the Missing Side:</strong> First, determine which side of the triangle you need to calculate. The calculator allows you to solve for Side &apos;a&apos;, Side &apos;b&apos;, or the Hypotenuse &apos;c&apos;. The hypotenuse is always the side opposite the right angle and is the longest side of the triangle.
            </li>
            <li>
                <strong>Enter the Known Side Lengths:</strong> Input the lengths of the two sides you already know into their respective fields. Ensure you are entering positive numbers.
            </li>
            <li>
                <strong>View the Result:</strong> The calculator will automatically compute and display the length of the missing side. Our tool also validates the input; for example, it will show an error if you enter a value for side &apos;a&apos; or &apos;b&apos; that is longer than the hypotenuse &apos;c&apos;, as this is geometrically impossible.
            </li>
        </ol>

        <h2 className="text-2xl font-bold font-headline text-primary mt-8">The Pythagorean Theorem Formula Explained</h2>
        <p>
            The theorem is elegantly simple yet incredibly powerful. It states that for any right-angled triangle, the square of the length of the hypotenuse (side &apos;c&apos;) is equal to the sum of the squares of the other two sides (sides &apos;a&apos; and &apos;b&apos;).
        </p>
        <p className="font-mono bg-muted p-4 rounded-md text-center text-xl">
            a² + b² = c²
        </p>
        <p>
            From this core formula, we can derive the formulas to solve for any of the sides:
        </p>
        <ul>
            <li>To find the <strong>hypotenuse (c)</strong>: c = √(a² + b²)</li>
            <li>To find <strong>side a</strong>: a = √(c² - b²)</li>
            <li>To find <strong>side b</strong>: b = √(c² - a²)</li>
        </ul>
        <p>
            These are the exact formulas our calculator uses to provide you with accurate results for your geometric problems.
        </p>


        <h2 className="text-2xl font-bold font-headline text-primary mt-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold">
                What is the Pythagorean Theorem?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  The Pythagorean theorem is a fundamental principle of
                  Euclidean geometry. It states that for any right-angled
                  triangle, the square of the length of the hypotenuse (the side
                  opposite the right angle, denoted as &apos;c&apos;) is equal
                  to the sum of the squares of the other two sides (denoted as
                  &apos;a&apos; and &apos;b&apos;). The formula is written as:{" "}
                  <strong>a² + b² = c²</strong>.
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
                  formula a² + b² = c², &apos;c&apos; represents the hypotenuse.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-semibold">
                What are some real-world uses?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  This theorem is not just for textbooks; it is used in many
                  real-world applications, such as architecture (ensuring
                  corners are square), navigation (calculating the shortest
                  distance), and even in video game design for calculating
                  distances and movements.
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
