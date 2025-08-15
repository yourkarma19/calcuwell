
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CylinderVolumeCalculator() {
  const [radius, setRadius] = usePersistentState("cylinder-radius", 5);
  const [height, setHeight] = usePersistentState("cylinder-height", 10);

  const { volume, surfaceArea } = useMemo(() => {
    const r = Number(radius);
    const h = Number(height);

    if (r > 0 && h > 0) {
      const vol = Math.PI * r * r * h;
      const sa = (2 * Math.PI * r * h) + (2 * Math.PI * r * r);
      return {
        volume: vol,
        surfaceArea: sa,
      };
    }
    return { volume: 0, surfaceArea: 0 };
  }, [radius, height]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Cylinder Dimensions</CardTitle>
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
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Volume</p>
              <p className="text-4xl font-bold font-headline text-primary">{volume.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Surface Area</p>
              <p className="text-2xl font-semibold">{surfaceArea.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
