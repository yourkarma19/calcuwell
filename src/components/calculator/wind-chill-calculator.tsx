
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Unit = "fahrenheit" | "celsius";

const getWindChillInfo = (wc: number, unit: Unit) => {
    const temp = unit === 'celsius' ? wc : (wc - 32) * 5/9; // convert to celsius for comparison
    if (temp > 0) return { risk: "Low", color: "text-green-500", description: "Low risk of frostbite." };
    if (temp > -27) return { risk: "Caution", color: "text-yellow-500", description: "Frostbite possible in 10-30 minutes for exposed skin." };
    if (temp > -40) return { risk: "Warning", color: "text-orange-500", description: "Frostbite possible in 5-10 minutes." };
    return { risk: "Danger", color: "text-red-500", description: "Frostbite in under 5 minutes." };
};

export default function WindChillCalculator() {
  const [unit, setUnit] = usePersistentState<Unit>("windchill-unit", "fahrenheit");
  const [temperature, setTemperature] = usePersistentState("windchill-temp", 20);
  const [windSpeed, setWindSpeed] = usePersistentState("windchill-speed", 15);

  const windChill = useMemo(() => {
    const T = Number(temperature);
    const V = unit === 'fahrenheit' ? Number(windSpeed) : Number(windSpeed) * 0.621371; // convert kmh to mph if needed

    if (V < 3) return T; // Formula is not valid for wind speeds below 3 mph
    
    if(unit === 'fahrenheit') {
      return 35.74 + 0.6215 * T - 35.75 * Math.pow(V, 0.16) + 0.4275 * T * Math.pow(V, 0.16);
    } else { // Celsius
      const T_c = T;
      const V_kmh = Number(windSpeed);
      return 13.12 + 0.6215 * T_c - 11.37 * Math.pow(V_kmh, 0.16) + 0.3965 * T_c * Math.pow(V_kmh, 0.16);
    }

  }, [temperature, windSpeed, unit]);

  const { risk, color, description } = getWindChillInfo(windChill, unit);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Wind Chill Calculator</CardTitle>
          <CardDescription>Calculate the "feels like" temperature based on wind speed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Temperature Unit</Label>
            <Select value={unit} onValueChange={v => setUnit(v as Unit)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="fahrenheit">Fahrenheit (°F) / mph</SelectItem>
                    <SelectItem value="celsius">Celsius (°C) / km/h</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Air Temperature (°{unit === 'fahrenheit' ? 'F' : 'C'})</Label>
                <Input type="number" value={temperature} onChange={e => setTemperature(Number(e.target.value))}/>
            </div>
             <div className="space-y-2">
                <Label>Wind Speed ({unit === 'fahrenheit' ? 'mph' : 'km/h'})</Label>
                <Input type="number" value={windSpeed} onChange={e => setWindSpeed(Number(e.target.value))}/>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader><CardTitle>Feels Like</CardTitle></CardHeader>
        <CardContent className="text-center">
            <p className={cn("text-6xl font-bold font-headline my-2", color)}>
                {windChill.toFixed(1)}°
            </p>
            <p className={cn("text-xl font-semibold", color)}>{risk}</p>
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}

  