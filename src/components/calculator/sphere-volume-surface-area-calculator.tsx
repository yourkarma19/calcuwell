"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <>
      <div className="lg:col-span-2 space-y-6">
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
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-baseline">
                <p className="text-muted-foreground">Volume</p>
                <p className="font-bold text-2xl text-primary">{volume.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
            </div>
            <div className="flex justify-between items-baseline">
                <p className="text-muted-foreground">Surface Area</p>
                <p className="font-semibold">{surfaceArea.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
            </div>
             <div className="flex justify-between items-baseline">
                <p className="text-muted-foreground">Diameter</p>
                <p className="font-semibold">{diameter.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
