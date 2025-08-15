
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type SolveFor = "voltage" | "current" | "resistance" | "power";

export default function OhmsLawCalculator() {
  const [solveFor, setSolveFor] = useState<SolveFor>("voltage");
  
  const [voltage, setVoltage] = useState(12); // V (Volts)
  const [current, setCurrent] = useState(0.5); // I (Amps)
  const [resistance, setResistance] = useState(24); // R (Ohms)
  const [power, setPower] = useState(6); // P (Watts)

  const result = useMemo(() => {
    const V = Number(voltage);
    const I = Number(current);
    const R = Number(resistance);
    const P = Number(power);

    if (solveFor === 'voltage') {
      if(I > 0 && R > 0) return { value: I * R, unit: 'Volts' };
      if(P > 0 && I > 0) return { value: P / I, unit: 'Volts' };
      if(P > 0 && R > 0) return { value: Math.sqrt(P * R), unit: 'Volts' };
    } else if (solveFor === 'current') {
      if(V > 0 && R > 0) return { value: V / R, unit: 'Amps' };
      if(P > 0 && V > 0) return { value: P / V, unit: 'Amps' };
      if(P > 0 && R > 0) return { value: Math.sqrt(P / R), unit: 'Amps' };
    } else if (solveFor === 'resistance') {
      if(V > 0 && I > 0) return { value: V / I, unit: 'Ohms' };
      if(V > 0 && P > 0) return { value: (V * V) / P, unit: 'Ohms' };
      if(P > 0 && I > 0) return { value: P / (I * I), unit: 'Ohms' };
    } else if (solveFor === 'power') {
      if(V > 0 && I > 0) return { value: V * I, unit: 'Watts' };
      if(I > 0 && R > 0) return { value: (I * I) * R, unit: 'Watts' };
      if(V > 0 && R > 0) return { value: (V * V) / R, unit: 'Watts' };
    }
    
    return { value: NaN, unit: '' };

  }, [solveFor, voltage, current, resistance, power]);
  
  const getInputProps = (field: SolveFor) => {
    if (field === solveFor) {
      return { value: isNaN(result.value) ? "Result" : result.value.toFixed(4), readOnly: true, className: "font-bold text-primary bg-primary/10 border-primary/20" };
    }
    
    let value, setter;
    if (field === 'voltage') { value = voltage; setter = setVoltage; }
    if (field === 'current') { value = current; setter = setCurrent; }
    if (field === 'resistance') { value = resistance; setter = setResistance; }
    if (field === 'power') { value = power; setter = setPower; }
    
    return { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setter?.(Number(e.target.value)) };
  };

  return (
    <div className="lg:col-span-3">
      <Card>
        <CardHeader>
          <CardTitle>Ohm's Law Calculator</CardTitle>
          <CardDescription>Calculate Voltage (V), Current (I), Resistance (R), and Power (P).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>What do you want to calculate?</Label>
            <RadioGroup value={solveFor} onValueChange={(v) => setSolveFor(v as any)} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="flex items-center space-x-2"><RadioGroupItem value="voltage" id="v" /><Label htmlFor="v">Voltage (V)</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="current" id="i" /><Label htmlFor="i">Current (I)</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="resistance" id="r" /><Label htmlFor="r">Resistance (R)</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="power" id="p" /><Label htmlFor="p">Power (P)</Label></div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voltage">Voltage (Volts)</Label>
              <Input id="voltage" type="number" {...getInputProps('voltage')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current">Current (Amps)</Label>
              <Input id="current" type="number" {...getInputProps('current')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resistance">Resistance (Ohms)</Label>
              <Input id="resistance" type="number" {...getInputProps('resistance')} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="power">Power (Watts)</Label>
              <Input id="power" type="number" {...getInputProps('power')} />
            </div>
          </div>
           {result && !isNaN(result.value) && (
              <div className="pt-4 text-center">
                  <h3 className="text-lg font-semibold">Result</h3>
                  <p className="text-4xl font-bold font-headline text-primary">
                      {result.value.toFixed(4)} <span className="text-2xl text-muted-foreground">{result.unit}</span>
                  </p>
              </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
