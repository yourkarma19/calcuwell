"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const colors = {
  black: { value: 0, multiplier: 1, tolerance: 20 },
  brown: { value: 1, multiplier: 10, tolerance: 1 },
  red: { value: 2, multiplier: 100, tolerance: 2 },
  orange: { value: 3, multiplier: 1000 },
  yellow: { value: 4, multiplier: 10000 },
  green: { value: 5, multiplier: 100000, tolerance: 0.5 },
  blue: { value: 6, multiplier: 1000000, tolerance: 0.25 },
  violet: { value: 7, multiplier: 10000000, tolerance: 0.1 },
  grey: { value: 8, multiplier: 100000000, tolerance: 0.05 },
  white: { value: 9, multiplier: 1000000000 },
  gold: { multiplier: 0.1, tolerance: 5 },
  silver: { multiplier: 0.01, tolerance: 10 },
  none: { tolerance: 20 },
};

type Color = keyof typeof colors;

export default function ResistorColorCodeCalculator() {
  const [band1, setBand1] = useState<Color>("brown");
  const [band2, setBand2] = useState<Color>("black");
  const [band3, setBand3] = useState<Color>("orange");
  const [band4, setBand4] = useState<Color>("gold");

  const resistance = () => {
    const val1 = colors[band1]?.value;
    const val2 = colors[band2]?.value;
    const mult = colors[band3]?.multiplier;
    const tol = colors[band4]?.tolerance;

    if (val1 === undefined || val2 === undefined || mult === undefined || tol === undefined) return "Invalid selection";

    const baseValue = (val1 * 10 + val2) * mult;

    let displayValue;
    if (baseValue >= 1e9) displayValue = `${baseValue / 1e9} GΩ`;
    else if (baseValue >= 1e6) displayValue = `${baseValue / 1e6} MΩ`;
    else if (baseValue >= 1e3) displayValue = `${baseValue / 1e3} kΩ`;
    else displayValue = `${baseValue} Ω`;

    return `${displayValue} ±${tol}%`;
  };

  const ColorSelect = ({ value, onValueChange, bandType }: { value: Color, onValueChange: (v: Color) => void, bandType: 'digit' | 'multiplier' | 'tolerance' }) => (
    <Select value={value} onValueChange={v => onValueChange(v as Color)}>
        <SelectTrigger style={{ backgroundColor: value !== 'none' ? value : 'transparent' }} className="capitalize text-white font-bold">
            <SelectValue>{value}</SelectValue>
        </SelectTrigger>
        <SelectContent>
            {Object.entries(colors).map(([name, props]) => {
                if (bandType === 'digit' && props.value === undefined) return null;
                if (bandType === 'multiplier' && props.multiplier === undefined) return null;
                if (bandType === 'tolerance' && props.tolerance === undefined && name !== 'none') return null;
                return <SelectItem key={name} value={name} className="capitalize">{name}</SelectItem>
            })}
        </SelectContent>
    </Select>
  );

  return (
    <div className="lg:col-span-3">
      <Card>
        <CardHeader>
            <CardTitle>Resistor Color Code Calculator</CardTitle>
            <CardDescription>Select the colors for a 4-band resistor to determine its value.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2"><Label>1st Band (Digit)</Label><ColorSelect value={band1} onValueChange={setBand1} bandType="digit"/></div>
                <div className="space-y-2"><Label>2nd Band (Digit)</Label><ColorSelect value={band2} onValueChange={setBand2} bandType="digit"/></div>
                <div className="space-y-2"><Label>3rd Band (Multiplier)</Label><ColorSelect value={band3} onValueChange={setBand3} bandType="multiplier"/></div>
                <div className="space-y-2"><Label>4th Band (Tolerance)</Label><ColorSelect value={band4} onValueChange={setBand4} bandType="tolerance"/></div>
            </div>
            <div className="pt-4 text-center">
                <h3 className="text-lg font-semibold">Resistance Value</h3>
                <p className="text-4xl font-bold font-headline text-primary">{resistance()}</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
