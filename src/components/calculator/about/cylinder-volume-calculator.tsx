
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
      name: "How is the volume of a cylinder calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The volume of a cylinder is found by multiplying the area of its circular base by its height. The formula is Volume = π * r² * h, where 'r' is the radius of the base and 'h' is the height.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between lateral and total surface area of a cylinder?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The lateral surface area is the area of the curved side of the cylinder (like a can's label). The total surface area is the lateral area plus the area of the two circular bases at the top and bottom.",
      },
    },
    {
      "@type": "Question",
      name: "What are some real-world applications of cylinder calculations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Engineers use them to design pipes and tanks. In manufacturing, they determine the volume of cans. They are also fundamental in physics for problems involving fluid dynamics and pressure.",
      },
    },
  ],
};

export default function AboutCylinderVolumeCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Cylinder Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The <strong>Cylinder Calculator</strong> is a versatile tool for
          students, engineers, and DIY enthusiasts who need to determine the
          geometric properties of a cylinder. By simply providing the radius and
          height, you can instantly find the volume (the space it can hold) and
          the surface area (the total area of its exterior). This is useful for
          everything from calculating the capacity of a tank to estimating the
          amount of material needed to construct a cylindrical object.
        </p>

        <h3>How to Use the Calculator</h3>
        <ol>
          <li>
            Enter the <strong>Radius</strong> of the cylinder&apos;s circular
            base.
          </li>
          <li>
            Enter the <strong>Height</strong> of the cylinder.
          </li>
        </ol>
        <p>
          The calculator will automatically display the cylinder&apos;s
          volume, total surface area, lateral area, and base area.
        </p>

        <h3>Frequently Asked Questions (FAQs)</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How is the volume of a cylinder calculated?
            </AccordionTrigger>
            <AccordionContent>
              The volume of a cylinder is found by multiplying the area of its
              circular base by its height. The formula is `Volume = π * r² * h`,
              where &apos;r&apos; is the radius of the base and &apos;h&apos; is
              the height. This tells you the total capacity of the cylinder.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What is the difference between lateral and total surface area?
            </AccordionTrigger>
            <AccordionContent>
              The <strong>lateral surface area</strong> is the area of the
              curved side of the cylinder (imagine the label on a can).
              It&apos;s calculated as `2 * π * r * h`. The{" "}
              <strong>total surface area</strong> is the lateral area plus the
              area of the two circular bases at the top and bottom, calculated
              as `2 * π * r * h + 2 * π * r²`.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What are some real-world applications?
            </AccordionTrigger>
            <AccordionContent>
              Cylinder calculations are essential in many fields. Engineers use
              them to design pipes, tanks, and pillars. In manufacturing, they
              are used to determine the volume of cans and containers. They are
              also fundamental in physics for problems involving fluid dynamics
              and pressure.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
