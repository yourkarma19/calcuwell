"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft } from "lucide-react";
import { Button } from "../ui/button";

const units = {
  bit: 1,
  byte: 8,
  kilobyte: 8 * 1024,
  megabyte: 8 * 1024 * 1024,
  gigabyte: 8 * 1024 * 1024 * 1024,
  terabyte: 8 * 1024 * 1024 * 1024 * 1024,
  petabyte: 8 * 1024 * 1024 * 1024 * 1024 * 1024,
};

type Unit = keyof typeof units;

export default function DataStorageConverter() {
  const [fromUnit, setFromUnit] = useState<Unit>("megabyte");
  const [toUnit, setToUnit] = useState<Unit>("gigabyte");
  const [value, setValue] = useState("1024");

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
    return result.toLocaleString(undefined, { maximumFractionDigits: result > 1 ? 4 : 8 });
  }, [value, fromUnit, toUnit]);
  
  return (
    <div className="lg:col-span-3">
      <Card>
        <CardHeader>
          <CardTitle>Data Storage Converter</CardTitle>
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
    </div>
  );
}
