"use client";

import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

// Simple cantilever beam with a point load at the end
export default function BeamDeflectionCalculator() {
  const [load, setLoad] = usePersistentState("beam-load", 1000); // in Newtons
  const [length, setLength] = usePersistentState("beam-length", 2); // in meters
  const [modulus, setModulus] = usePersistentState("beam-modulus", 200); // in GPa
  const [inertia, setInertia] = usePersistentState("beam-inertia", 5e-6); // in m^4

  const deflection = useMemo(() => {
    const P = load;
    const L = length;
    const E = modulus * 1e9; // Convert GPa to Pa
    const I = inertia;

    if (P <= 0 || L <= 0 || E <= 0 || I <= 0) return 0;

    // Formula for cantilever beam with point load at the end: PL³ / 3EI
    const def = (P * Math.pow(L, 3)) / (3 * E * I);

    return def * 1000; // Convert to mm
  }, [load, length, modulus, inertia]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Beam Deflection Calculator</CardTitle>
          <CardDescription>
            For a simple cantilever beam with a point load at the end.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="load">Load (P) in Newtons</Label>
              <Input
                id="load"
                type="number"
                value={load}
                onChange={(e) => setLoad(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="length">Length (L) in meters</Label>
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="modulus">Modulus of Elasticity (E) in GPa</Label>
              <Input
                id="modulus"
                type="number"
                value={modulus}
                onChange={(e) => setModulus(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inertia">Area Moment of Inertia (I) in m⁴</Label>
              <Input
                id="inertia"
                type="number"
                value={inertia}
                onChange={(e) => setInertia(Number(e.target.value))}
                step="1e-7"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Maximum Deflection</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-4xl font-bold font-headline text-primary">
            {deflection.toFixed(4)}
          </p>
          <p className="text-lg text-muted-foreground">mm</p>
        </CardContent>
      </Card>

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
            for engineers to make sure a beam can safely support its load
            without bending too much.
          </p>

          <h3>How to Use the Beam Deflection Calculator</h3>
          <ol>
            <li>
              Enter the <strong>Load (P)</strong> in Newtons.
            </li>
            <li>
              Enter the total <strong>Length (L)</strong> of the beam in
              meters.
            </li>
            <li>
              Enter the <strong>Modulus of Elasticity (E)</strong> in
              Gigapascals (GPa). This value shows the material&apos;s
              stiffness.
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
                Here, P is the load, L is length, E is Modulus of Elasticity,
                and I is Area Moment of Inertia.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Why is this calculation important?
              </AccordionTrigger>
              <AccordionContent>
                Understanding beam deflection is critical for safety. Too much
                deflection can cause structural failure or damage. Engineers use
                this calculation to choose the right beam size and material for
                a given load.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
