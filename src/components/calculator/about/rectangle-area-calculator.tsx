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

export default function RectangleAreaCalculator() {
  const [length, setLength] = usePersistentState("rect-length", 10);
  const [width, setWidth] = usePersistentState("rect-width", 5);

  const { area, perimeter } = useMemo(() => {
    const l = Number(length);
    const w = Number(width);

    if (l > 0 && w > 0) {
      return {
        area: l * w,
        perimeter: 2 * (l + w),
      };
    }
    return { area: 0, perimeter: 0 };
  }, [length, width]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rectangle Area & Perimeter</CardTitle>
          <CardDescription>
            Enter the length and width of a rectangle to calculate its area and
            perimeter.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="length">Length</Label>
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Area</p>
            <p className="text-4xl font-bold font-headline text-primary">
              {area.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Perimeter</p>
            <p className="text-2xl font-semibold">
              {perimeter.toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>
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
            you&rsquo;re a student, a homeowner, or a contractor, this calculator
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
                The area is the amount of space a rectangle covers. It&rsquo;s
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
                It&rsquo;s found by adding the lengths of all four sides. The
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
    </div>
  );
}
