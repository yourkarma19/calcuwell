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

export default function VoltageToWattsCalculator() {
  const [voltage, setVoltage] = usePersistentState("vtw-voltage", 12); // Volts
  const [current, setCurrent] = usePersistentState("vtw-current", 2); // Amps

  const watts = useMemo(() => {
    const v = Number(voltage);
    const i = Number(current);

    if (v > 0 && i > 0) {
      return v * i;
    }
    return 0;
  }, [voltage, current]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Voltage to Watts Calculator</CardTitle>
          <CardDescription>
            Quickly find electrical power by entering the voltage and current.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voltage">Voltage (V)</Label>
              <Input
                id="voltage"
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current">Current (A)</Label>
              <Input
                id="current"
                type="number"
                value={current}
                onChange={(e) => setCurrent(Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">Power (W)</p>
          <p className="text-5xl font-bold font-headline text-primary my-2">
            {watts.toFixed(2)}
          </p>
        </CardContent>
      </Card>
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
    </div>
  );
}
