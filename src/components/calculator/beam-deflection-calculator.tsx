"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

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
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Beam Deflection Calculator</CardTitle>
            <CardDescription>For a simple cantilever beam with a point load at the end.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="load">Load (P) in Newtons</Label>
                <Input id="load" type="number" value={load} onChange={e => setLoad(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="length">Length (L) in meters</Label>
                <Input id="length" type="number" value={length} onChange={e => setLength(Number(e.target.value))} />
              </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modulus">Modulus of Elasticity (E) in GPa</Label>
                <Input id="modulus" type="number" value={modulus} onChange={e => setModulus(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inertia">Area Moment of Inertia (I) in m⁴</Label>
                <Input id="inertia" type="number" value={inertia} onChange={e => setInertia(Number(e.target.value))} step="1e-7" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>About Beam Deflection</CardTitle></CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is beam deflection?</AccordionTrigger>
                <AccordionContent>
                  Beam deflection is the degree to which a structural element is displaced under a load. It is a critical factor in structural engineering for ensuring the safety and functionality of a structure.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What do the variables mean?</AccordionTrigger>
                <AccordionContent>
                  - **Load (P):** The force applied to the beam.
                  - **Length (L):** The total length of the beam.
                  - **Modulus of Elasticity (E):** A measure of the material's stiffness.
                  - **Area Moment of Inertia (I):** A property of a beam's cross-sectional shape that determines its resistance to bending.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Maximum Deflection</CardTitle></CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold font-headline text-primary">{deflection.toFixed(4)}</p>
            <p className="text-lg text-muted-foreground">mm</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
