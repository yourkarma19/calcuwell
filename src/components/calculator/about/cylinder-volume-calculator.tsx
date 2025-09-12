
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
          The <strong>Cylinder Calculator</strong> is a tool for finding the
          geometric properties of a cylinder. Simply provide the radius and
          height to instantly find the volume and surface area. This is useful
          for calculating a tank&apos;s capacity or the material needed to build a
          cylindrical object.
        </p>

        <h3>How to Use the Cylinder Calculator</h3>
        <ol>
          <li>
            Enter the <strong>Radius</strong> of the cylinder&apos;s circular base.
          </li>
          <li>
            Enter the <strong>Height</strong> of the cylinder.
          </li>
        </ol>
        <p>
          The calculator will automatically display the volume and surface areas.
        </p>

        <h3>Cylinder Calculator FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How is the volume of a cylinder calculated?
            </AccordionTrigger>
            <AccordionContent>
              The volume is found by multiplying the area of its circular base
              by its height. The formula is `Volume = π * r² * h`.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What is the difference between lateral and total surface area?
            </AccordionTrigger>
            <AccordionContent>
              The <strong>lateral surface area</strong> is the area of the
              curved side of the cylinder (like a can&apos;s label). The{" "}
              <strong>total surface area</strong> is the lateral area plus the
              area of the two circular bases at the top and bottom.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What are some real-world applications?
            </AccordionTrigger>
            <AccordionContent>
              Engineers use these calculations to design pipes and tanks.
              Manufacturers use them to find the volume of cans. They are also
              used in physics for problems involving fluid dynamics.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
