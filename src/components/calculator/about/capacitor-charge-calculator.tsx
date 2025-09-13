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
      name: "What is an RC circuit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An RC circuit is a basic electronic circuit made of a Resistor (R) and a Capacitor (C). These circuits are often used as timers or filters because the capacitor takes a predictable amount of time to charge and discharge through the resistor.",
      },
    },
    {
      "@type": "Question",
      name: "What is the time constant (τ)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The time constant (tau, or τ) tells you how quickly the capacitor charges. It's calculated as τ = R × C. After one time constant, the capacitor is about 63.2% charged. It's considered fully charged after five time constants.",
      },
    },
    {
      "@type": "Question",
      name: "How does current change over time in an RC circuit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When the circuit is first turned on, the current is at its highest because the capacitor is empty. As the capacitor charges, the current decreases, eventually reaching zero when the capacitor is full.",
      },
    },
  ],
};

export default function AboutCapacitorChargeCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the RC Circuit Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          This calculator helps you understand a simple RC circuit, which has a
          resistor (R) and a capacitor (C). When you apply voltage, the
          capacitor starts to store energy, or &quot;charge.&quot; This tool
          shows how much charge it has and the current at any given time.
        </p>
        <h3>How to Use the Capacitor Charge Calculator</h3>
        <p>
          Enter the voltage of your power source, the resistance, the
          capacitance, and the time that has passed since the circuit was turned
          on. The calculator will do the rest.
        </p>

        <h3>RC Circuit FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is an RC circuit?</AccordionTrigger>
            <AccordionContent>
              An RC circuit is a simple electronic circuit made with a Resistor
              (R) and a Capacitor (C). They are often used as timers or filters
              because a capacitor takes a set amount of time to charge and
              discharge.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is the time constant (τ)?</AccordionTrigger>
            <AccordionContent>
              The time constant (tau, or τ) shows how quickly the capacitor
              charges. You find it by multiplying the resistance by the
              capacitance (τ = R × C). After one time constant, the capacitor is
              about 63.2% charged. It&apos;s considered full after about five
              time constants.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How does the current change over time?
            </AccordionTrigger>
            <AccordionContent>
              When you first turn on the circuit, the current is highest because
              the capacitor is empty. As the capacitor charges, the current gets
              lower, finally reaching zero when the capacitor is full.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
