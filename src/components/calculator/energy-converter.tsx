"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const units = {
  Joule: 1,
  "Kilojoule (kJ)": 1000,
  "Gram calorie (cal)": 4.184,
  "Kilocalorie (kcal)": 4184,
  "Watt hour (Wh)": 3600,
  "Kilowatt hour (kWh)": 3.6e+6,
  "Electronvolt (eV)": 1.6022e-19,
  "British thermal unit (BTU)": 1055.06,
};

type Unit = keyof typeof units;

export default function EnergyConverter() {
  const [fromUnit, setFromUnit] = usePersistentState<Unit>("energy-from", "Kilowatt hour (kWh)");
  const [toUnit, setToUnit] = usePersistentState<Unit>("energy-to", "Joule");
  const [value, setValue] = usePersistentState("energy-value", "1");

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const convertedValue = useMemo(() => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "";
    
    const fromFactor = units[fromUnit];
    const toFactor = units[toUnit];
    
    const result = (numValue * fromFactor) / toFactor;
    return result.toLocaleString(undefined, { maximumFractionDigits: result > 1 ? 4 : 8, notation: result > 1e10 || result < 1e-6 ? 'scientific' : 'standard' });
  }, [value, fromUnit, toUnit]);
  
  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Energy Converter</CardTitle>
          <CardDescription>Convert between different units of energy, such as Joules, calories, and kWh.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full space-y-2">
              <Label htmlFor="from-value">From</Label>
              <Input id="from-value" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
              <Select value={fromUnit} onValueChange={(v) => setFromUnit(v as Unit)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(units).map(unit => (
                    <SelectItem key={unit} value={unit} className="capitalize">{unit}</SelectItem>
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
               <Select value={toUnit} onValueChange={(v) => setToUnit(v as Unit)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(units).map(unit => (
                    <SelectItem key={unit} value={unit} className="capitalize">{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>About Energy Units</CardTitle></CardHeader>
        <CardContent>
          <p>This tool helps you convert between different units of energy like Joules, calories, and kilowatt-hours (kWh). It's useful for students, engineers, and anyone who needs to work with energy measurements.</p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Joule vs. Calorie</AccordionTrigger>
              <AccordionContent>
                The **Joule (J)** is the standard SI unit of energy. A **calorie (cal)** is an older unit, often used in chemistry. The "calorie" on food labels is actually a **kilocalorie (kcal)**. One kcal is equal to 1,000 calories.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is a Kilowatt-hour (kWh)?</AccordionTrigger>
              <AccordionContent>
                A Kilowatt-hour is a unit of energy. It is commonly used by utility companies to bill for electricity. It is the energy used by a 1,000-watt appliance running for one hour.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
