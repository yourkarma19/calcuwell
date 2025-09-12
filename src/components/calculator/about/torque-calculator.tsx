
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
      name: "What is the formula for Torque?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When the force is applied perpendicular to the lever arm, the formula for torque (τ) is: τ = F × r. Where 'F' is the applied force and 'r' is the distance from the pivot point (the lever arm).",
      },
    },
    {
      "@type": "Question",
      name: "What if the force is not applied perpendicularly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If the force is applied at an angle (θ) to the lever arm, the formula becomes τ = F × r × sin(θ). The sin(θ) term accounts for the component of the force that is perpendicular to the lever arm, which is the only part that contributes to the torque.",
      },
    },
    {
      "@type": "Question",
      name: "What are some real-world examples of torque?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Torque is present in many everyday situations, such as using a wrench to tighten a bolt, opening a door by pushing on the handle (the hinge is the pivot), a car engine's crankshaft rotating, and pedaling a bicycle.",
      },
    },
  ],
};

export default function AboutTorqueCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Torque Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Torque Calculator is a tool used to calculate the rotational
          force, or torque. Torque is the measure of how much a force acting on
          an object causes that object to rotate. This calculator simplifies the
          calculation for a force applied perpendicularly to a lever arm.
        </p>

        <h3>How to Use the Torque Calculator</h3>
        <ol>
          <li>Enter the amount of <strong>Force</strong> applied in Newtons (N).</li>
          <li>
            Enter the <strong>Distance</strong> from the pivot point to where
            the force is applied. This is also known as the lever arm, measured
            in meters (m).
          </li>
        </ol>
        <p>
          The calculator will instantly compute the resulting torque in
          Newton-meters (Nm).
        </p>

        <h3>Torque Calculator FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the formula for Torque?</AccordionTrigger>
            <AccordionContent>
              When the force is applied perpendicular to the lever arm, the
              formula for torque (τ) is:
              <p className="font-mono bg-muted p-2 rounded-md text-center my-2">
                τ = F × r
              </p>
              Where `F` is the force and `r` is the distance from the pivot.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What if the force is not perpendicular?
            </AccordionTrigger>
            <AccordionContent>
              If the force is applied at an angle (θ), the formula becomes `τ = F
              × r × sin(θ)`. The `sin(θ)` term accounts for the part of the force
              that is perpendicular to the lever arm. This calculator assumes
              a perpendicular force.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What are some real-world examples of torque?
            </AccordionTrigger>
            <AccordionContent>
              Torque is present in many everyday situations:
              <ul className="list-disc pl-5 mt-2">
                <li>Using a wrench to tighten a bolt.</li>
                <li>Opening a door by pushing on the handle.</li>
                <li>A car engine's crankshaft rotating.</li>
                <li>Pedaling a bicycle.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
