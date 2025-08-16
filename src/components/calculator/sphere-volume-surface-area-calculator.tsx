
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function SphereVolumeSurfaceAreaCalculator() {
  const [radius, setRadius] = usePersistentState("sphere-radius", 10);

  const { volume, surfaceArea, diameter } = useMemo(() => {
    const r = Number(radius);

    if (r > 0) {
      return {
        volume: (4 / 3) * Math.PI * Math.pow(r, 3),
        surfaceArea: 4 * Math.PI * Math.pow(r, 2),
        diameter: r * 2,
      };
    }
    return { volume: 0, surfaceArea: 0, diameter: 0 };
  }, [radius]);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sphere Property Calculator</CardTitle>
          <CardDescription>Enter the radius of a sphere to calculate its volume, surface area, and diameter.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="radius">Radius</Label>
              <Input id="radius" type="number" value={radius} onChange={(e) => setRadius(Number(e.target.value))} />
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-muted-foreground">Volume</p>
              <p className="font-bold text-2xl text-primary">{volume.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
          </div>
          <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-muted-foreground">Surface Area</p>
              <p className="font-semibold text-2xl">{surfaceArea.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
          </div>
           <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-muted-foreground">Diameter</p>
              <p className="font-semibold text-2xl">{diameter.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>About Sphere Formulas</CardTitle></CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How is the volume of a sphere calculated?</AccordionTrigger>
                    <AccordionContent>
                        The volume of a sphere is calculated using the formula `V = (4/3) * π * r³`, where 'r' is the radius of the sphere. This formula gives the total amount of space inside the sphere.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How is the surface area of a sphere calculated?</AccordionTrigger>
                    <AccordionContent>
                       The surface area of a sphere is calculated with the formula `A = 4 * π * r²`, where 'r' is the radius. This represents the total area on the outer surface of the sphere. An interesting fact is that this is the same area as four circles with the same radius.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Real-World Applications</AccordionTrigger>
                    <AccordionContent>
                        Sphere calculations are used in many fields. For example, astronomers use them to estimate the volume of planets, engineers use them to design ball bearings and spherical tanks, and meteorologists use them to model weather patterns on a global scale.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
