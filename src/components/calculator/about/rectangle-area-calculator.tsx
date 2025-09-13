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
      name: "How is the area of a rectangle calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The area of a rectangle is the amount of space it covers. It's calculated by multiplying its length by its width. The formula is: Area = Length × Width. The result is expressed in square units (e.g., square meters).",
      },
    },
    {
      "@type": "Question",
      name: "How is the perimeter of a rectangle calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The perimeter is the total distance around the outside of the rectangle. It's found by adding the lengths of all four sides. Since opposite sides are equal, the formula is: Perimeter = 2 × (Length + Width).",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this calculator for a square?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A square is a special type of rectangle where all four sides are equal. To calculate the area or perimeter of a square, simply enter the same value for both the length and the width.",
      },
    },
    {
      "@type": "Question",
      name: "What are some real-world applications of this calculation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "These calculations are used constantly in everyday life, such as figuring out how much paint or carpet is needed for a room, calculating the amount of fencing required for a yard, and determining the floor space of a house or office.",
      },
    },
  ],
};

export default function AboutRectangleAreaCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Rectangle Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The <strong>Rectangle Area & Perimeter Calculator</strong> is a tool
          for calculating the basic properties of a rectangle. Whether
          you&apos;re a student, a homeowner, or a contractor, this calculator
          provides instant and accurate measurements.
        </p>

        <h3>How to Use the Rectangle Calculator</h3>
        <p>
          Simply enter the <strong>length</strong> and <strong>width</strong> of
          the rectangle. The calculator will automatically compute the area and
          perimeter.
        </p>

        <h3>Rectangle Calculator FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How is the area of a rectangle calculated?
            </AccordionTrigger>
            <AccordionContent>
              The area is the amount of space a rectangle covers. It&apos;s
              calculated by multiplying its length by its width. The formula is:
              `Area = Length × Width`.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How is the perimeter of a rectangle calculated?
            </AccordionTrigger>
            <AccordionContent>
              The perimeter is the distance around the outside of the rectangle.
              It&apos;s found by adding the lengths of all four sides. The
              formula is: `Perimeter = 2 × (Length + Width)`.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I use this for a square?</AccordionTrigger>
            <AccordionContent>
              Yes. A square is a special type of rectangle where all four sides
              are equal. To calculate the area or perimeter of a square, enter
              the same value for both length and width.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              What are some real-world applications?
            </AccordionTrigger>
            <AccordionContent>
              These calculations are used in everyday life, such as:
              <ul className="list-disc pl-5 mt-2">
                <li>Figuring out how much paint or carpet is needed.</li>
                <li>Calculating the amount of fencing required for a yard.</li>
                <li>Determining the floor space of a house.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
