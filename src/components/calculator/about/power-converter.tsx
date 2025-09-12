
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
      name: "What is a Watt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Watt (W) is the standard unit of power in the International System of Units (SI). One watt is defined as one joule of energy per second. It is commonly used to measure the output of electrical devices, like light bulbs and appliances. A kilowatt (kW) is simply 1,000 watts.",
      },
    },
    {
      "@type": "Question",
      name: "What is Horsepower?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Horsepower (hp) is an older unit of power that is still widely used, especially in the automotive industry to describe the power output of engines. Mechanical horsepower is equivalent to approximately 745.7 watts.",
      },
    },
    {
      "@type": "Question",
      name: "Power vs. Energy: What's the difference?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Energy is the capacity to do work (measured in joules or kWh), while Power is the rate at which energy is used (measured in watts or joules per second). For example, a 100-watt light bulb uses 100 joules of energy every second it is on.",
      },
    },
  ],
};

export default function AboutPowerConverter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Power Converter</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Power Converter is a tool for engineers, physicists, and
          students who need to work with different units of power. Power is the
          rate at which work is done or energy is transferred. This calculator
          allows for quick conversion between units like watts and horsepower.
        </p>
        <h3>How to Use the Power Converter</h3>
        <ol>
          <li>Enter the value you want to convert in the "From" field.</li>
          <li>Select the unit you are converting from.</li>
          <li>Select the unit you want to convert to.</li>
        </ol>
        <p>
          The converted value will be displayed instantly. Use the swap button
          to easily reverse the units.
        </p>
        <h3>Power Conversion FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a Watt?</AccordionTrigger>
            <AccordionContent>
              The **Watt (W)** is the standard unit of power. One watt is one
              joule of energy per second. It is commonly used to measure the
              output of electrical devices. A **kilowatt (kW)** is 1,000 watts.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is Horsepower?</AccordionTrigger>
            <AccordionContent>
              **Horsepower (hp)** is an older unit of power still used in the
              automotive industry for engines. One mechanical horsepower is
              about 745.7 watts.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Power vs. Energy: What's the difference?
            </AccordionTrigger>
            <AccordionContent>
              **Energy** is the capacity to do work (measured in joules or kWh).
              **Power** is the rate at which energy is used (measured in
              watts). For example, a 100-watt light bulb uses 100 joules of
              energy every second.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
