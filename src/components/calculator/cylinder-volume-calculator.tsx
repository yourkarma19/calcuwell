"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function CylinderVolumeCalculator() {
  const [radius, setRadius] = usePersistentState("cylinder-radius", 5);
  const [height, setHeight] = usePersistentState("cylinder-height", 10);

  const { volume, lateralArea, baseArea, surfaceArea } = useMemo(() => {
    const r = Number(radius);
    const h = Number(height);

    if (r > 0 && h > 0) {
      const vol = Math.PI * r * r * h;
      const lArea = 2 * Math.PI * r * h;
      const bArea = Math.PI * r * r;
      const sArea = lArea + (2 * bArea);
      return {
        volume: vol,
        lateralArea: lArea,
        baseArea: bArea,
        surfaceArea: sArea,
      };
    }
    return { volume: 0, lateralArea: 0, baseArea: 0, surfaceArea: 0 };
  }, [radius, height]);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter Cylinder Dimensions</CardTitle>
          <CardDescription>Calculate the volume and surface area of a cylinder by providing its radius and height.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="radius">Radius</Label>
              <Input id="radius" type="number" value={radius} onChange={(e) => setRadius(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input id="height" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
            </div>
          </div>
        </CardContent>
      </Card>
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
             <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Volume</p>
                <p className="font-bold text-2xl text-primary">{volume.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Total Surface Area</p>
              <p className="font-semibold text-2xl">{surfaceArea.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
             <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Lateral Area</p>
              <p className="font-semibold text-2xl">{lateralArea.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Base Area</p>
              <p className="font-semibold text-2xl">{baseArea.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
          </CardContent>
        </Card>
         <Card>
            <CardHeader><CardTitle>About the Cylinder Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The **Cylinder Calculator** is a versatile tool for students, engineers, and DIY enthusiasts who need to determine the geometric properties of a cylinder. By simply providing the radius and height, you can instantly find the volume (the space it can hold) and the surface area (the total area of its exterior). This is useful for everything from calculating the capacity of a tank to estimating the amount of material needed to construct a cylindrical object.</p>
                
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter the **Radius** of the cylinder's circular base.</li>
                    <li>Enter the **Height** of the cylinder.</li>
                </ol>
                <p>The calculator will automatically display the cylinder's volume, total surface area, lateral area, and base area.</p>

                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How is the volume of a cylinder calculated?</AccordionTrigger>
                        <AccordionContent>
                            The volume of a cylinder is found by multiplying the area of its circular base by its height. The formula is `Volume = π * r² * h`, where 'r' is the radius of the base and 'h' is the height. This tells you the total capacity of the cylinder.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is the difference between lateral and total surface area?</AccordionTrigger>
                        <AccordionContent>
                            The **lateral surface area** is the area of the curved side of the cylinder (imagine the label on a can). It's calculated as `2 * π * r * h`. The **total surface area** is the lateral area plus the area of the two circular bases at the top and bottom, calculated as `2 * π * r * h + 2 * π * r²`.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What are some real-world applications?</AccordionTrigger>
                        <AccordionContent>
                           Cylinder calculations are essential in many fields. Engineers use them to design pipes, tanks, and pillars. In manufacturing, they are used to determine the volume of cans and containers. They are also fundamental in physics for problems involving fluid dynamics and pressure.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    </div>
  );
}
