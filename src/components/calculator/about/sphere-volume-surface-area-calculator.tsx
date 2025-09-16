
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
      name: "How is the volume of a sphere calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The volume of a sphere is the total amount of space inside it. It is calculated using the formula V = (4/3) * π * r³, where 'r' is the radius of the sphere.",
      },
    },
    {
      "@type": "Question",
      name: "How is the surface area of a sphere calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The surface area is the total area on the outer surface of the sphere. It is calculated with the formula A = 4 * π * r², where 'r' is the radius. This is the same area as four circles with the same radius.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a sphere's radius and its diameter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The radius (r) is the distance from the center of the sphere to any point on its surface. The diameter (d) is the distance straight through the center of the sphere, from one side to the other. The diameter is always twice the length of the radius (d = 2r).",
      },
    },
  ],
};

export default function AboutSphereVolumeSurfaceAreaCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Sphere Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The <strong>Sphere Calculator</strong> is a tool for computing the
          properties of a sphere from its radius. It is ideal for students,
          engineers, and designers who need to quickly find the volume or
          surface area of a spherical object.
        </p>

        <h3>How to Use the Sphere Calculator</h3>
        <p>
          Enter the <strong>Radius</strong> of the sphere into the input box.
          The calculator will automatically compute the volume, surface area,
          and diameter.
        </p>

        <h3>Sphere Calculator FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How is the volume of a sphere calculated?
            </AccordionTrigger>
            <AccordionContent>
              The volume is the total space inside the sphere. It is calculated
              using the formula `V = (4/3) * π * r³`, where &rsquo;r&rsquo; is the
              radius.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How is the surface area of a sphere calculated?
            </AccordionTrigger>
            <AccordionContent>
              The surface area is the total area on the outer surface. It is
              calculated with the formula `A = 4 * π * r²`, where &rsquo;r&rsquo;
              is the radius.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Real-World Applications</AccordionTrigger>
            <AccordionContent>
              Sphere calculations are used in many fields. For example,
              astronomers use them to estimate the volume of planets, and
              engineers use them to design ball bearings and spherical tanks.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Radius vs. Diameter</AccordionTrigger>
            <AccordionContent>
              The <strong>radius (r)</strong> is the distance from the center to
              any point on its surface. The <strong>diameter (d)</strong> is the
              distance straight through the center. The diameter is always twice
              the radius (d = 2r).
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
