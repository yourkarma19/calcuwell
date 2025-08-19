
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type FormulaType = "sss" | "sas";

export default function TriangleAngleCalculator() {
  const [formula, setFormula] = usePersistentState<FormulaType>("triangle-angle-formula", "sss");
  
  const [sideA, setSideA] = usePersistentState("triangle-angle-sideA", 5);
  const [sideB, setSideB] = usePersistentState("triangle-angle-sideB", 7);
  const [sideC, setSideC] = usePersistentState("triangle-angle-sideC", 8);

  const [sasAngle, setSasAngle] = usePersistentState("triangle-angle-sasAngle", 60);

  const { angleA, angleB, angleC, error } = useMemo(() => {
    let A = NaN, B = NaN, C = NaN, err = null;
    const radToDeg = (rad: number) => (rad * 180) / Math.PI;

    if (formula === "sss") {
      if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
        err = "The given sides do not form a valid triangle.";
      } else {
        // Law of Cosines to find all angles
        A = radToDeg(Math.acos((sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC)));
        B = radToDeg(Math.acos((sideA * sideA + sideC * sideC - sideB * sideB) / (2 * sideA * sideC)));
        C = 180 - A - B;
      }
    } else if (formula === "sas") {
      // Given A, B, and angle C
      const angleCRad = (sasAngle * Math.PI) / 180;
      const calcSideC = Math.sqrt(sideA * sideA + sideB * sideB - 2 * sideA * sideB * Math.cos(angleCRad));
      
      // Law of Sines to find angle A
      const angleARad = Math.asin((sideA * Math.sin(angleCRad)) / calcSideC);
      A = radToDeg(angleARad);
      C = sasAngle;
      B = 180 - A - C;
    }

    return { angleA: A, angleB: B, angleC: C, error: err };
  }, [formula, sideA, sideB, sideC, sasAngle]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Triangle Angle Calculator</CardTitle>
          <CardDescription>Find the unknown angles of a triangle based on the information you have.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>What information do you have?</Label>
            <Select value={formula} onValueChange={v => setFormula(v as FormulaType)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sss">Three Sides (SSS)</SelectItem>
                <SelectItem value="sas">Two Sides and an Angle (SAS)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
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
              <div className="space-y-2"><Label>Angle C (deg)</Label><Input type="number" value={sasAngle} onChange={e => setSasAngle(Number(e.target.value))} /></div>
            </div>
          )}
            {error && (
              <div className="pt-2">
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
              </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader><CardTitle>Calculated Angles</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Angle A</p>
                <p className="text-3xl font-bold font-headline text-primary">{isNaN(angleA) ? 'N/A' : angleA.toFixed(2)}°</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Angle B</p>
                <p className="text-3xl font-bold font-headline text-primary">{isNaN(angleB) ? 'N/A' : angleB.toFixed(2)}°</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Angle C</p>
                <p className="text-3xl font-bold font-headline text-primary">{isNaN(angleC) ? 'N/A' : angleC.toFixed(2)}°</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
