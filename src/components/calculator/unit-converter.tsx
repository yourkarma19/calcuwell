"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRightLeft } from "lucide-react";

type ConversionType = "length" | "weight" | "temperature";

const units = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.34,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254,
  },
  weight: {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    pound: 0.453592,
    ounce: 0.0283495,
  },
  temperature: {
    celsius: "celsius",
    fahrenheit: "fahrenheit",
    kelvin: "kelvin",
  },
};

export default function UnitConverter() {
  const [conversionType, setConversionType] = usePersistentState<ConversionType>("unit-type", "length");
  const [fromUnit, setFromUnit] = useState(Object.keys(units[conversionType])[0]);
  const [toUnit, setToUnit] = useState(Object.keys(units[conversionType])[1]);
  const [value, setValue] = useState("1");

  const handleTypeChange = (type: ConversionType) => {
    setConversionType(type);
    setFromUnit(Object.keys(units[type])[0]);
    setToUnit(Object.keys(units[type])[1]);
    setValue("1");
  };

  const convertedValue = useMemo(() => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "";

    if (conversionType === "temperature") {
        if (fromUnit === toUnit) return value;
        if (fromUnit === "celsius") {
            if (toUnit === "fahrenheit") return (numValue * 9/5 + 32).toFixed(2);
            if (toUnit === "kelvin") return (numValue + 273.15).toFixed(2);
        }
        if (fromUnit === "fahrenheit") {
            if (toUnit === "celsius") return ((numValue - 32) * 5/9).toFixed(2);
            if (toUnit === "kelvin") return ((numValue - 32) * 5/9 + 273.15).toFixed(2);
        }
        if (fromUnit === "kelvin") {
            if (toUnit === "celsius") return (numValue - 273.15).toFixed(2);
            if (toUnit === "fahrenheit") return ((numValue - 273.15) * 9/5 + 32).toFixed(2);
        }
        return ""
    } else {
        const fromFactor = units[conversionType][fromUnit as keyof typeof units.length | keyof typeof units.weight];
        const toFactor = units[conversionType][toUnit as keyof typeof units.length | keyof typeof units.weight];
        if(typeof fromFactor === 'number' && typeof toFactor === 'number') {
            const result = (numValue * fromFactor) / toFactor;
             return result.toLocaleString(undefined, { maximumFractionDigits: result > 1 ? 2: 6});
        }
    }
    return "";
  }, [value, fromUnit, toUnit, conversionType]);
  
  const currentUnits = units[conversionType];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Unit Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Conversion Type</Label>
            <Select value={conversionType} onValueChange={(v) => handleTypeChange(v as ConversionType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select conversion type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="length">Length</SelectItem>
                <SelectItem value="weight">Weight</SelectItem>
                <SelectItem value="temperature">Temperature</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="from-value">From</Label>
              <Input id="from-value" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(currentUnits).map(unit => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <ArrowRightLeft className="w-6 h-6 text-primary shrink-0 mb-8" />
            <div className="flex-1 space-y-2">
              <Label htmlFor="to-value">To</Label>
              <Input id="to-value" value={convertedValue} readOnly className="font-bold bg-muted" />
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(currentUnits).map(unit => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="lg:col-span-2">
        <Card>
            <CardHeader>
                <CardTitle>Result</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                 <p className="text-sm text-muted-foreground">{value} {fromUnit} is</p>
                 <p className="text-6xl font-bold font-headline text-primary my-2">{convertedValue}</p>
                 <p className="text-xl font-semibold">{toUnit}</p>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
