
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Shape = "slab" | "footer" | "post";
type Unit = "feet" | "inches" | "meters" | "centimeters";

const unitToMeters = {
  feet: 0.3048,
  inches: 0.0254,
  meters: 1,
  centimeters: 0.01,
};

export default function ConcreteSlabCalculator() {
  const [shape, setShape] = usePersistentState<Shape>("concrete-shape", "slab");
  
  const [length, setLength] = usePersistentState("concrete-length", 10);
  const [width, setWidth] = usePersistentState("concrete-width", 10);
  const [thickness, setThickness] = usePersistentState("concrete-thickness", 4);
  const [diameter, setDiameter] = usePersistentState("concrete-diameter", 12);
  const [depth, setDepth] = usePersistentState("concrete-depth", 24);
  
  const [unit, setUnit] = usePersistentState<Unit>("concrete-unit", "feet");
  const [bagWeight, setBagWeight] = usePersistentState("concrete-bag-weight", 60);

  const { volumeCubicYards, bagsNeeded } = useMemo(() => {
    const bagYields: { [key: number]: number } = { 40: 0.011, 60: 0.017, 80: 0.022 }; // cubic yards per bag
    const conversionFactor = unitToMeters[unit];
    
    let volumeMeters = 0;
    if (shape === 'slab' || shape === 'footer') {
      const l = length * conversionFactor;
      const w = width * conversionFactor;
      const t = thickness * (unit === 'feet' ? unitToMeters.inches : conversionFactor);
      volumeMeters = l * w * t;
    } else { // post
      const r = (diameter * conversionFactor) / 2;
      const d = depth * conversionFactor;
      volumeMeters = Math.PI * r * r * d;
    }
    
    const volumeYards = volumeMeters * 1.30795; // cubic meters to cubic yards
    const bags = volumeYards / bagYields[bagWeight];
    
    return { volumeCubicYards: volumeYards, bagsNeeded: Math.ceil(bags) };
  }, [shape, length, width, thickness, diameter, depth, unit, bagWeight]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Concrete Calculator</CardTitle>
          <CardDescription>Estimate the volume and number of concrete bags required for your project.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Shape</Label>
              <Select value={shape} onValueChange={(v) => setShape(v as Shape)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="slab">Slab</SelectItem>
                  <SelectItem value="footer">Footer</SelectItem>
                  <SelectItem value="post">Round Post Hole</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Units</Label>
              <Select value={unit} onValueChange={(v) => setUnit(v as Unit)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="feet">Feet</SelectItem>
                  <SelectItem value="inches">Inches</SelectItem>
                  <SelectItem value="meters">Meters</SelectItem>
                  <SelectItem value="centimeters">Centimeters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {(shape === 'slab' || shape === 'footer') && (
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2"><Label>Length ({unit})</Label><Input type="number" value={length} onChange={e => setLength(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Width ({unit})</Label><Input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Thickness (in)</Label><Input type="number" value={thickness} onChange={e => setThickness(Number(e.target.value))} /></div>
            </div>
          )}
          
          {shape === 'post' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Diameter ({unit})</Label><Input type="number" value={diameter} onChange={e => setDiameter(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label>Depth ({unit})</Label><Input type="number" value={depth} onChange={e => setDepth(Number(e.target.value))} /></div>
            </div>
          )}

          <div className="space-y-2 pt-4">
            <Label>Concrete Bag Weight</Label>
            <Select value={bagWeight.toString()} onValueChange={(v) => setBagWeight(Number(v))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="40">40 lbs</SelectItem>
                <SelectItem value="60">60 lbs</SelectItem>
                <SelectItem value="80">80 lbs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader><CardTitle>Estimated Materials</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Concrete Volume Needed</p>
                <p className="text-3xl font-bold font-headline text-primary">{volumeCubicYards.toFixed(2)} yd³</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Bags Required</p>
                <p className="text-3xl font-bold font-headline text-primary">{bagsNeeded}</p>
                 <p className="text-xs text-muted-foreground">({bagWeight} lb bags)</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

  