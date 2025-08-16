
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
    <>
      <div className="lg:col-span-2 space-y-6">
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
          <CardHeader><CardTitle>About Rectangle Formulas</CardTitle></CardHeader>
          <CardContent>
              <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                      <AccordionTrigger>How is the area of a rectangle calculated?</AccordionTrigger>
                      <AccordionContent>
                          The area of a rectangle is calculated by multiplying its length by its width. The formula is `Area = Length × Width`. The result is in square units (e.g., square meters).
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                      <AccordionTrigger>How is the perimeter of a rectangle calculated?</AccordionTrigger>
                      <AccordionContent>
                         The perimeter is the total distance around the outside of the rectangle. It is calculated by adding up all four sides, or using the formula `Perimeter = 2 * (Length + Width)`.
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                      <AccordionTrigger>What is the difference between a rectangle and a square?</AccordionTrigger>
                      <AccordionContent>
                         A square is a special type of rectangle where all four sides are equal in length. This calculator can be used for squares by entering the same value for both length and width.
                      </AccordionContent>
                  </AccordionItem>
              </Accordion>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
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
    </>
  );
}
