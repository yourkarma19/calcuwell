
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VoltageToWattsCalculator() {
  const [voltage, setVoltage] = usePersistentState("vtw-voltage", 12); // Volts
  const [current, setCurrent] = usePersistentState("vtw-current", 2);  // Amps

  const watts = useMemo(() => {
    const v = Number(voltage);
    const i = Number(current);

    if (v > 0 && i > 0) {
      return v * i;
    }
    return 0;
  }, [voltage, current]);

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Voltage to Watts Calculator</CardTitle>
                <CardDescription>Quickly find electrical power by entering the voltage and current.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="voltage">Voltage (V)</Label>
                        <Input id="voltage" type="number" value={voltage} onChange={e => setVoltage(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="current">Current (A)</Label>
                        <Input id="current" type="number" value={current} onChange={e => setCurrent(Number(e.target.value))} />
                    </div>
                </div>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Result</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                 <p className="text-sm text-muted-foreground">Power (W)</p>
                 <p className="text-5xl font-bold font-headline text-primary my-2">
                    {watts.toFixed(2)}
                 </p>
            </CardContent>
        </Card>
    </div>
  );
}
