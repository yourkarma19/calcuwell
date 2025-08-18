
"use client";

import { useState, useMemo, useEffect } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const units = {
  length: { meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001, mile: 1609.34, yard: 0.9144, foot: 0.3048, inch: 0.0254 },
  weight: { kilogram: 1, gram: 0.001, milligram: 1e-6, pound: 0.453592, ounce: 0.0283495, ton: 1000 },
  temperature: { celsius: "c", fahrenheit: "f", kelvin: "k" },
  area: { "square-meter": 1, "square-kilometer": 1e6, "square-foot": 0.092903, "square-yard": 0.836127, acre: 4046.86, hectare: 10000 },
  volume: { liter: 1, milliliter: 0.001, "cubic-meter": 1000, "cubic-foot": 28.3168, gallon: 3.78541, quart: 0.946353, pint: 0.473176, cup: 0.24, "fluid-ounce": 0.0295735 },
  speed: { "m/s": 1, "km/h": 0.277778, mph: 0.44704, knot: 0.514444 },
};

type ConversionType = keyof typeof units;

export default function UnitConverter() {
  const [conversionType, setConversionType] = usePersistentState<ConversionType>("unit-type", "length");
  
  const [fromUnit, setFromUnit] = useState(Object.keys(units[conversionType])[0]);
  const [toUnit, setToUnit] = useState(Object.keys(units[conversionType])[1]);
  
  const [value, setValue] = useState("1");

  useEffect(() => {
    const unitKeys = Object.keys(units[conversionType]);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1]);
    setValue("1");
  }, [conversionType]);

  const handleSwap = () => {
    const currentFrom = fromUnit;
    setFromUnit(toUnit);
    setToUnit(currentFrom);
  };

  const convertedValue = useMemo(() => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "";

    if (conversionType === "temperature") {
        let celsiusValue;
        if (fromUnit === 'celsius') celsiusValue = numValue;
        if (fromUnit === 'fahrenheit') celsiusValue = (numValue - 32) * 5/9;
        if (fromUnit === 'kelvin') celsiusValue = numValue - 273.15;
        if (celsiusValue === undefined) return "";

        if (toUnit === 'celsius') return celsiusValue.toFixed(2);
        if (toUnit === 'fahrenheit') return (celsiusValue * 9/5 + 32).toFixed(2);
        if (toUnit === 'kelvin') return (celsiusValue + 273.15).toFixed(2);

    } else {
        const fromFactor = (units[conversionType] as any)[fromUnit];
        const toFactor = (units[conversionType] as any)[toUnit];
        const result = (numValue * fromFactor) / toFactor;
        return result.toLocaleString(undefined, { maximumFractionDigits: result > 1 ? 4 : 8});
    }
    return "";
  }, [value, fromUnit, toUnit, conversionType]);
  
  const currentUnits = units[conversionType];

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Universal Unit Converter</CardTitle>
          <CardDescription>A versatile tool to convert between various units of measurement. Select a conversion type to get started.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Conversion Type</Label>
            <Select value={conversionType} onValueChange={(v) => setConversionType(v as ConversionType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select conversion type" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(units).map(type => (
                    <SelectItem key={type} value={type} className="capitalize">{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full space-y-2">
              <Label htmlFor="from-value">From</Label>
              <Input id="from-value" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(currentUnits).map(unit => (
                    <SelectItem key={unit} value={unit} className="capitalize">{unit.replace("-", " ")}</SelectItem>
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
               <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(currentUnits).map(unit => (
                    <SelectItem key={unit} value={unit} className="capitalize">{unit.replace("-", " ")}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>About the Unit Converter</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our Universal Unit Converter is a powerful tool for a wide range of measurement conversions. From length and weight to energy and pressure, this calculator is an essential utility for students, professionals, and anyone who needs to work with different measurement systems.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>First, select the Conversion Type (e.g., Length, Weight, Temperature).</li>
                <li>Enter the value you wish to convert in the "From" field.</li>
                <li>Select the starting unit and the target unit from the dropdown menus.</li>
            </ol>
            <p>The result of the conversion will be displayed instantly. Use the swap button to quickly reverse the units.</p>
            <h3>Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is the SI system?</AccordionTrigger>
                    <AccordionContent>
                        The International System of Units (SI) is the modern form of the metric system. It is the most widely used system of measurement. This calculator uses SI base units (like the meter for length) to perform conversions accurately.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How does temperature conversion work?</AccordionTrigger>
                    <AccordionContent>
                        Temperature conversion does not use a simple multiplication factor. It uses specific formulas to convert between Celsius, Fahrenheit, and Kelvin. This is because their scales have different starting points and interval sizes.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Imperial vs. Metric systems?</AccordionTrigger>
                    <AccordionContent>
                       The **Metric system** is a decimal-based system used by most of the world, with units like meters, grams, and liters. The **Imperial system** is mainly used in the United States and includes units like feet, pounds, and gallons. This converter allows for easy translation between both systems.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
