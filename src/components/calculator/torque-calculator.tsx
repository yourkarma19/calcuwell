"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TorqueCalculator() {
  const [force, setForce] = useState(100); // in Newtons
  const [distance, setDistance] = useState(0.5); // in meters

  const torque = useMemo(() => {
    return force * distance;
  }, [force, distance]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Torque Calculator</CardTitle>
            <CardDescription>Calculate torque based on force and distance from the axis of rotation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="force">Force (Newtons)</Label>
                <Input
                  id="force"
                  type="number"
                  value={force}
                  onChange={(e) => setForce(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distance">Distance (meters)</Label>
                <Input
                  id="distance"
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Resulting Torque</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-5xl font-bold font-headline text-primary my-2">
              {torque.toFixed(2)}
            </p>
            <p className="text-lg text-muted-foreground">Newton-meters (Nm)</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
