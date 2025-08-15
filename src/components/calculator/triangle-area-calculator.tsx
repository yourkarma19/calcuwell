"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePersistentState from "@/hooks/use-persistent-state";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FormulaType = "base-height" | "sss" | "sas"; // SSS: 3 sides, SAS: 2 sides and angle between them

export default function TriangleAreaCalculator() {
  const [formula, setFormula] = usePersistentState<FormulaType>("triangle-formula", "base-height");
  
  const [base, setBase] = usePersistentState("triangle-base", 10);
  const [height, setHeight] = usePersistentState("triangle-height", 5);
  
  const [sideA, setSideA] = usePersistentState("triangle-sideA", 5);
  const [sideB, setSideB] = usePersistentState("triangle-sideB", 7);
  const [sideC, setSideC] = usePersistentState("triangle-sideC", 8);

  const [angleC, setAngleC] = usePersistentState("triangle-angleC", 60);

  const { area, perimeter } = useMemo(() => {
    let a=0, p=0;

    if (formula === "base-height") {
      a = (base * height) / 2;
      p = NaN; // Perimeter cannot be determined from base and height alone
    } else if (formula === "sss") {
      const s = (sideA + sideB + sideC) / 2;
      if (s <= sideA || s <= sideB || s <= sideC) a = NaN; // Not a valid triangle
      else a = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));
      p = sideA + sideB + sideC;
    } else if (formula === "sas") {
      const angleRad = (angleC * Math.PI) / 180;
      a = 0.5 * sideA * sideB * Math.sin(angleRad);
      // Law of Cosines to find side c for perimeter
      const c = Math.sqrt(sideA*sideA + sideB*sideB - 2*sideA*sideB*Math.cos(angleRad));
      p = sideA + sideB + c;
    }

    return { area: a, perimeter: p };
  }, [formula, base, height, sideA, sideB, sideC, angleC]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader><CardTitle>Enter Triangle Dimensions</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Formula Type</Label>
              <Select value={formula} onValueChange={v => setFormula(v as FormulaType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="base-height">Base & Height</SelectItem>
                  <SelectItem value="sss">3 Sides (SSS)</SelectItem>
                  <SelectItem value="sas">2 Sides & Angle (SAS)</SelectItem>
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
