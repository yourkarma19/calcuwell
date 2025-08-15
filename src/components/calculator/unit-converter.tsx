"use client";

import { useState, useMemo, useEffect } from "react";
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
import { Button } from "../ui/button";

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
  const [fromUnit, setFromUnit] = usePersistentState("unit-from", Object.keys(units[conversionType])[0]);
  const [toUnit, setToUnit] = usePersistentState("unit-to", Object.keys(units[conversionType])[1]);
  const [value, setValue] = useState("1");
  const [swapped, setSwapped] = useState(false);

  useEffect(() => {
    setFromUnit(Object.keys(units[conversionType])[0]);
    setToUnit(Object.keys(units[conversionType])[1]);
  }, [conversionType, setFromUnit, setToUnit]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setSwapped(!swapped);
  };

  const convertedValue = useMemo(() => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "";

    const from = swapped ? toUnit : fromUnit;
    const to = swapped ? fromUnit : toUnit;

    if (conversionType === "temperature") {
        if (from === to) return value;
        if (from === "celsius") {
            if (to === "fahrenheit") return (numValue * 9/5 + 32).toFixed(2);
            if (to === "kelvin") return (numValue + 273.15).toFixed(2);
        }
        if (from === "fahrenheit") {
            if (to === "celsius") return ((numValue - 32) * 5/9).toFixed(2);
            if (to === "kelvin") return ((numValue - 32) * 5/9 + 273.15).toFixed(2);
        }
        if (from === "kelvin") {
            if (to === "celsius") return (numValue - 273.15).toFixed(2);
            if (to === "fahrenheit") return ((numValue - 273.15) * 9/5 + 32).toFixed(2);
        }
        return ""
    } else {
        const fromFactor = units[conversionType][from as keyof typeof units.length | keyof typeof units.weight];
        const toFactor = units[conversionType][to as keyof typeof units.length | keyof typeof units.weight];
        if(typeof fromFactor === 'number' && typeof toFactor === 'number') {
            const result = (numValue * fromFactor) / toFactor;
            return result.toLocaleString(undefined, { maximumFractionDigits: result > 1 ? 4 : 8});
        }
    }
    return "";
  }, [value, fromUnit, toUnit, conversionType, swapped]);
  
  const currentUnits = units[conversionType];

  const DisplayFromUnit = swapped ? toUnit : fromUnit;
  const DisplayToUnit = swapped ? fromUnit : toUnit;

  return (
    <div className="lg:col-span-3">
      <Card>
        <CardHeader>
          <CardTitle>Unit Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Conversion Type</Label>
            <Select value={conversionType} onValueChange={(v) => setConversionType(v as ConversionType)}>
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
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full space-y-2">
              <Label htmlFor="from-value">From</Label>
              <Input id="from-value" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
              <Select value={DisplayFromUnit} onValueChange={swapped ? setToUnit : setFromUnit}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(currentUnits).map(unit => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="ghost" size="icon" className="shrink-0 mt-4 md:mt-7" onClick={handleSwap}>
                <ArrowRightLeft className="w-5 h-5 text-primary" />
            </Button>
            
            <div className="w-full space-y-2">
              <Label htmlFor="to-value">To</Label>
              <Input id="to-value" value={convertedValue} readOnly className="font-bold text-primary bg-primary/10 border-primary/20" />
               <Select value={DisplayToUnit} onValueChange={swapped ? setFromUnit : setToUnit}>
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
    </div>
  );
}
