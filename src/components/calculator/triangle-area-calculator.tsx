
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePersistentState from "@/hooks/use-persistent-state";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

type FormulaType = "base-height" | "sss" | "sas"; // SSS: 3 sides, SAS: 2 sides and angle between them

export default function TriangleAreaCalculator() {
  const [formula, setFormula] = usePersistentState<FormulaType>("triangle-formula", "base-height");
  
  const [base, setBase] = usePersistentState("triangle-base", 10);
  const [height, setHeight] = usePersistentState("triangle-height", 5);
  
  const [sideA, setSideA] = usePersistentState("triangle-sideA", 5);
  const [sideB, setSideB] = usePersistentState("triangle-sideB", 7);
  const [sideC, setSideC] = usePersistentState("triangle-sideC", 8);

  const [angleC, setAngleC] = usePersistentState("triangle-angleC", 60);

  const { area, perimeter, error } = useMemo(() => {
    let a=0, p=0, err=null;

    if (formula === "base-height") {
      a = (base * height) / 2;
      p = NaN; // Perimeter cannot be determined from base and height alone
    } else if (formula === "sss") {
      // Triangle inequality theorem
      if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
        err = "The given sides do not form a valid triangle.";
        a = NaN; p = NaN;
      } else {
        const s = (sideA + sideB + sideC) / 2; // semi-perimeter
        a = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC)); // Heron's formula
        p = sideA + sideB + sideC;
      }
    } else if (formula === "sas") {
      const angleRad = (angleC * Math.PI) / 180;
      a = 0.5 * sideA * sideB * Math.sin(angleRad);
      // Law of Cosines to find side c for perimeter
      const c = Math.sqrt(sideA*sideA + sideB*sideB - 2*sideA*sideB*Math.cos(angleRad));
      p = sideA + sideB + c;
    }

    return { area: a, perimeter: p, error: err };
  }, [formula, base, height, sideA, sideB, sideC, angleC]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Triangle Area & Perimeter Calculator</CardTitle>
            <CardDescription>Calculate triangle properties using different formulas. Choose the method based on the values you know.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Formula Type</Label>
              <Select value={formula} onValueChange={v => setFormula(v as FormulaType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="base-height">Base & Height (Area = 0.5 * b * h)</SelectItem>
                  <SelectItem value="sss">3 Sides (Heron's Formula)</SelectItem>
                  <SelectItem value="sas">2 Sides & Included Angle (Area = 0.5 * a * b * sin(C))</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {formula === "base-height" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Base</Label><Input type="number" value={base} onChange={e => setBase(Number(e.target.value))} /></div>
                <div className="space-y-2"><Label>Height</Label><Input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} /></div>
              </div>
            )}

            {formula === "sss" && (
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2"><Label>Side A</Label><Input type="number" value={sideA} onChange={e => setSideA(Number(e.target.value))} /></div>
                <div className="space-y-2"><Label>Side B</Label><Input type="number" value={sideB} onChange={e => setSideB(Number(e.target.value))} /></div>
                <div className="space-y-2"><Label>Side C</Label><Input type="number" value={sideC} onChange={e => setSideC(Number(e.target.value))} /></div>
              </div>
            )}

            {formula === "sas" && (
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2"><Label>Side A</Label><Input type="number" value={sideA} onChange={e => setSideA(Number(e.target.value))} /></div>
                <div className="space-y-2"><Label>Side B</Label><Input type="number" value={sideB} onChange={e => setSideB(Number(e.target.value))} /></div>
                <div className="space-y-2"><Label>Angle (deg)</Label><Input type="number" value={angleC} onChange={e => setAngleC(Number(e.target.value))} /></div>
              </div>
            )}
             {error && (
                <div className="pt-2 flex items-start gap-2 text-sm text-destructive">
                    <Info className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                </div>
            )}
          </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>About Triangle Formulas</CardTitle></CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Base & Height Formula</AccordionTrigger>
                        <AccordionContent>
                           The most common formula, `Area = 0.5 * base * height`, works for any triangle as long as you know the length of a side (the base) and the perpendicular height to that side.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Heron's Formula (3 Sides)</AccordionTrigger>
                        <AccordionContent>
                            Heron's formula is used when you know the lengths of all three sides (a, b, c). You first calculate the semi-perimeter, `s = (a + b + c) / 2`. Then, the area is `√[s(s-a)(s-b)(s-c)]`.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Side-Angle-Side (SAS) Formula</AccordionTrigger>
                        <AccordionContent>
                           If you know two sides and the angle between them, you can use the formula `Area = 0.5 * a * b * sin(C)`, where C is the angle between sides a and b.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>What is the Triangle Inequality Theorem?</AccordionTrigger>
                        <AccordionContent>
                           This theorem states that the sum of the lengths of any two sides of a triangle must be greater than the length of the third side. This calculator uses it to validate that the provided side lengths can form a real triangle.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Results</CardTitle></CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Area</p>
              <p className="text-4xl font-bold font-headline text-primary">{isNaN(area) ? 'Invalid' : area.toFixed(2)}</p>
            </div>
             <div>
              <p className="text-sm text-muted-foreground">Perimeter</p>
              <p className="text-2xl font-semibold">{isNaN(perimeter) ? 'N/A' : perimeter.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
