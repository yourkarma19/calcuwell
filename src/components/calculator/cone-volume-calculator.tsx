"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Cone Dimensions</CardTitle>
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
              <p className="text-sm text-muted-foreground">Slant Height</p>
              <p className="text-2xl font-semibold">{slantHeight.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
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
