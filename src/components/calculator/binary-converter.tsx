
"use client";

import { useState, useMemo } from "react";
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

type NumberSystem = "decimal" | "binary" | "hexadecimal" | "octal";

const bases: Record<NumberSystem, number> = {
  decimal: 10,
  binary: 2,
  hexadecimal: 16,
  octal: 8,
};

const validationPatterns: Record<NumberSystem, RegExp> = {
  decimal: /^[0-9]*$/,
  binary: /^[01]*$/,
  hexadecimal: /^[0-9a-fA-F]*$/,
  octal: /^[0-7]*$/,
};

export default function BinaryConverter() {
  const [fromSystem, setFromSystem] = usePersistentState<NumberSystem>("binary-from", "decimal");
  const [toSystem, setToSystem] = usePersistentState<NumberSystem>("binary-to", "binary");
  const [value, setValue] = usePersistentState("binary-value", "10");

  const handleSwap = () => {
    setFromSystem(toSystem);
    setToSystem(fromSystem);
  };
  
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (validationPatterns[fromSystem].test(newValue)) {
      setValue(newValue);
    }
  };

  const convertedValue = useMemo(() => {
    if (!value) return "";
    
    if (!validationPatterns[fromSystem].test(value)) {
        return "Invalid input";
    }

    try {
      const decimalValue = parseInt(value, bases[fromSystem]);
      if (isNaN(decimalValue)) return "";

      const result = decimalValue.toString(bases[toSystem]).toUpperCase();
      return result;
    } catch (error) {
      return "Error";
    }
  }, [value, fromSystem, toSystem]);


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Binary & Number System Converter</CardTitle>
          <CardDescription>Convert values between binary, decimal, hexadecimal, and octal systems.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full space-y-2">
              <Label htmlFor="from-value">From</Label>
              <Input id="from-value" value={value} onChange={handleValueChange} className="font-mono"/>
              <Select value={fromSystem} onValueChange={(v) => { setValue(''); setFromSystem(v as NumberSystem)}}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(bases).map(system => (
                    <SelectItem key={system} value={system} className="capitalize">{system}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="ghost" size="icon" className="shrink-0 mt-4 md:mt-7" onClick={handleSwap}>
                <ArrowRightLeft className="w-5 h-5 text-primary" />
            </Button>
            
            <div className="w-full space-y-2">
              <Label htmlFor="to-value">To</Label>
              <Input id="to-value" value={convertedValue} readOnly className="font-bold font-mono text-primary bg-primary/10 border-primary/20" />
               <Select value={toSystem} onValueChange={(v) => setToSystem(v as NumberSystem)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(bases).map(system => (
                    <SelectItem key={system} value={system} className="capitalize">{system}</SelectItem>
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
