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
      name: "What is the formula to convert Volts to Watts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formula is Power (Watts) = Voltage (Volts) × Current (Amps), or P = V × I. This is known as Watt's Law.",
      },
    },
    {
      "@type": "Question",
      name: "Can you convert volts to watts without knowing the amps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, you cannot directly convert volts to watts without knowing either the current (amps) or the resistance (ohms). Power (Watts) depends on both the electrical pressure (Volts) and the flow rate (Amps). If you know resistance, you can use the formula P = V² / R.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a watt and a kilowatt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A kilowatt (kW) is a larger unit of power, where one kilowatt is equal to 1,000 watts. This unit is often used for high-power devices or to measure household energy consumption (as kilowatt-hours).",
      },
    },
  ],
};

export default function AboutVoltageToWattsCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Voltage to Watts Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          This calculator helps you understand the relationship between voltage,
          current, and power. By converting volts and amps to watts, you can
          determine how much power an electrical device is using. This is a
          fundamental calculation in electronics.
        </p>

        <h3>How to Convert Volts to Watts</h3>
        <p>
          The conversion is based on Watt&apos;s Law. Simply input the voltage
          (in Volts) and the current (in Amps) of your circuit, and it will
          instantly compute the power in Watts.
        </p>
        <p className="font-mono bg-muted p-2 rounded-md text-center my-2">
          Power (Watts) = Voltage (Volts) × Current (Amps)
        </p>

        <h3>Voltage to Watts FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Can you convert volts to watts without amps?
            </AccordionTrigger>
            <AccordionContent>
              No, you cannot directly convert volts to watts without knowing
              either the current (amps) or the resistance (ohms). Power (Watts)
              depends on both the electrical pressure (Volts) and the flow rate
              (Amps).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What is the difference between a watt and a kilowatt?
            </AccordionTrigger>
            <AccordionContent>
              A kilowatt (kW) is a larger unit of power, where one kilowatt is
              equal to 1,000 watts. This unit is often used for high-power
              devices or to measure household energy consumption.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
