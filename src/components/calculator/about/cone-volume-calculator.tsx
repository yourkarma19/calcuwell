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
      name: "How is the volume of a cone calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The volume of a cone is one-third of the volume of a cylinder with the same base and height. The formula is V = (1/3) * π * r² * h.",
      },
    },
    {
      "@type": "Question",
      name: "What is the slant height of a cone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The slant height ('s') is the distance from the tip of the cone down the side to a point on the edge of the base. It is needed to calculate the surface area of the cone's side and can be found using the formula: s = √(r² + h²).",
      },
    },
    {
      "@type": "Question",
      name: "How is the surface area of a cone calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The total surface area of a cone is the area of its circular base (π * r²) plus its side surface area (π * r * s), where 's' is the slant height.",
      },
    },
  ],
};

export default function AboutConeVolumeCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Cone Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Cone Calculator is a useful tool for anyone working with 3D
          shapes. It helps find a cone&rsquo;s key properties, like its volume,
          slant height, and surface area.
        </p>

        <h3>How to Use the Cone Calculator</h3>
        <ol>
          <li>
            Enter the <strong>Radius</strong> of the cone&rsquo;s circular base.
          </li>
          <li>
            Enter the perpendicular <strong>Height</strong> of the cone.
          </li>
        </ol>
        <p>
          The calculator will instantly compute the volume, slant height, and
          total surface area.
        </p>

        <h3>Cone Calculator FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How is the volume of a cone calculated?
            </AccordionTrigger>
            <AccordionContent>
              The volume of a cone is one-third of the volume of a cylinder with
              the same base and height. The formula is `V = (1/3) * π * r² * h`.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is the slant height?</AccordionTrigger>
            <AccordionContent>
              The slant height (&rsquo;s&rsquo;) is the distance from the tip of
              the cone down the side to a point on the edge of the base. It is
              needed to calculate the surface area. You can find it using the
              formula: `s = √(r² + h²)`.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How is the surface area calculated?
            </AccordionTrigger>
            <AccordionContent>
              The total surface area of a cone is the area of its circular base
              (`π * r²`) plus its side surface area (`π * r * s`), where
              &rsquo;s&rsquo; is the slant height.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              What is a &quot;right circular cone&quot;?
            </AccordionTrigger>
            <AccordionContent>
              This calculator is for right circular cones. This is the most
              common type. It means the tip is directly above the center of the
              circular base.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
