
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function RectangleAreaCalculator() {
  const [length, setLength] = usePersistentState("rect-length", 10);
  const [width, setWidth] = usePersistentState("rect-width", 5);

  const { area, perimeter } = useMemo(() => {
    const l = Number(length);
    const w = Number(width);

    if (l > 0 && w > 0) {
      return {
        area: l * w,
        perimeter: 2 * (l + w),
      };
    }
    return { area: 0, perimeter: 0 };
  }, [length, width]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rectangle Area & Perimeter</CardTitle>
          <CardDescription>Enter the length and width of a rectangle to calculate its area and perimeter.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="length">Length</Label>
              <Input id="length" type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input id="width" type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Area</p>
            <p className="text-4xl font-bold font-headline text-primary">{area.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Perimeter</p>
            <p className="text-2xl font-semibold">{perimeter.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
