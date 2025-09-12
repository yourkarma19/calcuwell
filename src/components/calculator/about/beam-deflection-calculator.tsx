
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
      name: "What is the formula used for beam deflection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a simple cantilever beam with a point load at the free end, the formula for maximum deflection is: Deflection = (P * L³) / (3 * E * I). Where P is the load, L is the length, E is the Modulus of Elasticity, and I is the Area Moment of Inertia.",
      },
    },
    {
      "@type": "Question",
      name: "Why is beam deflection calculation important?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Understanding beam deflection is critical in structural engineering for safety and functionality. Excessive deflection can lead to structural failure or damage to attached finishes. Engineers use this calculation to select the appropriate beam size and material for a given span and load.",
      },
    },
  ],
};

export default function AboutBeamDeflectionCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Beam Deflection Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Beam Deflection Calculator is an engineering tool. It finds the
          maximum displacement of a simple cantilever beam with a point load. A
          cantilever beam is only supported at one end. This calculation is key
          for engineers to make sure a beam can safely support its load without
          bending too much.
        </p>

        <h3>How to Use the Beam Deflection Calculator</h3>
        <ol>
          <li>
            Enter the <strong>Load (P)</strong> in Newtons.
          </li>
          <li>
            Enter the total <strong>Length (L)</strong> of the beam in meters.
          </li>
          <li>
            Enter the <strong>Modulus of Elasticity (E)</strong> in
            Gigapascals (GPa). This value shows the material&apos;s stiffness.
          </li>
          <li>
            Enter the <strong>Area Moment of Inertia (I)</strong>. This value
            shows the beam&apos;s resistance to bending.
          </li>
        </ol>
        <p>
          The calculator will instantly find the maximum deflection at the end
          of the beam.
        </p>

        <h3>Beam Deflection FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What is the formula for beam deflection?
            </AccordionTrigger>
            <AccordionContent>
              For a cantilever beam with a point load at the end, the formula
              is:
              <p className="font-mono bg-muted p-2 rounded-md text-center my-2">
                Deflection = (P * L³) / (3 * E * I)
              </p>
              Here, P is the load, L is length, E is Modulus of Elasticity, and
              I is Area Moment of Inertia.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Why is this calculation important?
            </AccordionTrigger>
            <AccordionContent>
              Understanding beam deflection is critical for safety. Too much
              deflection can cause structural failure or damage. Engineers use
              this calculation to choose the right beam size and material for a
              given load.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
