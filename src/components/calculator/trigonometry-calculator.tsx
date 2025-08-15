"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type TrigFunction = 'sin' | 'cos' | 'tan' | 'asin' | 'acos' | 'atan';
type AngleUnit = 'degrees' | 'radians';

const calculateTrig = (func: TrigFunction, value: number, unit: AngleUnit): number => {
    const angle = unit === 'degrees' ? value * (Math.PI / 180) : value;

    switch (func) {
        case 'sin': return Math.sin(angle);
        case 'cos': return Math.cos(angle);
        case 'tan': return Math.tan(angle);
        case 'asin': {
            const result = Math.asin(value);
            return unit === 'degrees' ? result * (180 / Math.PI) : result;
        }
        case 'acos': {
            const result = Math.acos(value);
            return unit === 'degrees' ? result * (180 / Math.PI) : result;
        }
        case 'atan': {
            const result = Math.atan(value);
            return unit === 'degrees' ? result * (180 / Math.PI) : result;
        }
    }
};

export default function TrigonometryCalculator() {
  const [trigFunction, setTrigFunction] = useState<TrigFunction>("sin");
  const [angleUnit, setAngleUnit] = useState<AngleUnit>("degrees");
  const [inputValue, setInputValue] = useState("30");

  const result = useMemo(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return "Invalid Input";
    
    if (['asin', 'acos'].includes(trigFunction) && (value < -1 || value > 1)) {
        return "Input must be between -1 and 1";
    }

    const res = calculateTrig(trigFunction, value, angleUnit);
    return res.toFixed(8);

  }, [trigFunction, inputValue, angleUnit]);

  return (
    <div className="lg:col-span-3">
      <Card>
        <CardHeader>
            <CardTitle>Trigonometry Calculator</CardTitle>
            <CardDescription>Calculate sine, cosine, tangent, and their inverses.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>Function</Label>
                    <Select value={trigFunction} onValueChange={v => setTrigFunction(v as TrigFunction)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sin">sin</SelectItem>
                            <SelectItem value="cos">cos</SelectItem>
                            <SelectItem value="tan">tan</SelectItem>
                            <SelectItem value="asin">asin (sin⁻¹)</SelectItem>
                            <SelectItem value="acos">acos (cos⁻¹)</SelectItem>
                            <SelectItem value="atan">atan (tan⁻¹)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="input-value">Value</Label>
                    <Input id="input-value" type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Unit</Label>
                     <RadioGroup value={angleUnit} onValueChange={(v) => setAngleUnit(v as AngleUnit)} className="flex items-center space-x-4 pt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="degrees" id="degrees" /><Label htmlFor="degrees">Degrees</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="radians" id="radians" /><Label htmlFor="radians">Radians</Label></div>
                    </RadioGroup>
                </div>
            </div>
             <div className="pt-4 text-center">
                <h3 className="text-lg font-semibold">Result</h3>
                <p className="text-4xl font-bold font-headline text-primary break-all">
                    {result}
                </p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
