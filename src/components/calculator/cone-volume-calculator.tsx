
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function ConeVolumeCalculator() {
  const [radius, setRadius] = usePersistentState("cone-radius", 5);
  const [height, setHeight] = usePersistentState("cone-height", 10);

  const { volume, slantHeight, surfaceArea } = useMemo(() => {
    const r = Number(radius);
    const h = Number(height);

    if (r > 0 && h > 0) {
      const vol = (1/3) * Math.PI * r * r * h;
      const sHeight = Math.sqrt(r * r + h * h);
      const lateralArea = Math.PI * r * sHeight;
      const baseArea = Math.PI * r * r;
      const sa = baseArea + lateralArea;
      return {
        volume: vol,
        slantHeight: sHeight,
        surfaceArea: sa
      };
    }
    return { volume: 0, slantHeight: 0, surfaceArea: 0 };
  }, [radius, height]);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter Cone Dimensions</CardTitle>
          <CardDescription>Enter the radius and height of the cone to find its volume and surface area.</CardDescription>
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
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Volume</p>
            <p className="text-2xl font-bold font-headline text-primary">{volume.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          </div>
          <div className="bg-muted p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Slant Height</p>
            <p className="text-2xl font-semibold">{slantHeight.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          </div>
           <div className="bg-muted p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Total Surface Area</p>
            <p className="text-2xl font-semibold">{surfaceArea.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>About the Cone Calculator</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>The **Cone Calculator** is a handy tool for anyone working with three-dimensional shapes in geometry, engineering, or design. It simplifies the process of finding a cone's key properties, such as its volume, slant height, and surface area, from two basic measurements. This calculator is perfect for students learning about geometric solids and professionals who need quick and accurate calculations for practical applications.</p>
            
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter the **Radius** of the cone's circular base.</li>
                <li>Enter the perpendicular **Height** of the cone (from the base to the apex).</li>
            </ol>
            <p>The calculator will instantly compute the volume, slant height, and total surface area of the cone.</p>

            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How is the volume of a cone calculated?</AccordionTrigger>
                    <AccordionContent>
                        The volume of a cone is one-third of the volume of a cylinder with the same base and height. The formula is `V = (1/3) * π * r² * h`, where 'r' is the radius of the circular base and 'h' is the height.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is the slant height and why is it important?</AccordionTrigger>
                    <AccordionContent>
                       The slant height ('l' or 's') is the distance from the apex (the pointy tip) of the cone down the side to a point on the edge of the circular base. It's not the same as the perpendicular height. It is crucial for calculating the surface area of the cone's lateral face. It can be found using the Pythagorean theorem: `s = √(r² + h²)`.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How is the surface area calculated?</AccordionTrigger>
                    <AccordionContent>
                       The total surface area of a cone is the sum of the area of its circular base (`π * r²`) and its lateral (side) surface area (`π * r * s`), where 's' is the slant height.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                    <AccordionTrigger>What is a "right circular cone"?</AccordionTrigger>
                    <AccordionContent>
                       This calculator deals with right circular cones, which are the most common type. This means the apex is directly above the center of the circular base, and the axis is perpendicular to the base. An oblique cone is one where the apex is not centered.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
