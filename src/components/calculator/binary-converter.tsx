
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
    <div className="lg:col-span-3 space-y-6">
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
      <Card>
        <CardHeader><CardTitle>About Number Systems</CardTitle></CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What are the different number systems?</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Decimal (Base-10):</strong> The system we use every day, with 10 digits (0-9).</li>
                  <li><strong>Binary (Base-2):</strong> The fundamental language of computers, using only two digits: 0 and 1.</li>
                  <li><strong>Hexadecimal (Base-16):</strong> Uses 16 symbols (0-9 and A-F) to represent numbers. It's often used in programming and computing as a more human-friendly representation of binary-coded values.</li>
                  <li><strong>Octal (Base-8):</strong> Uses 8 digits (0-7). It was more common in early computing systems.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Why is binary important in computing?</AccordionTrigger>
              <AccordionContent>
                Computers operate using transistors, which can be in one of two states: on or off. These two states are represented by the digits 1 (on) and 0 (off). All computer data, from text to images, is ultimately stored and processed in binary.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How does the conversion work?</AccordionTrigger>
              <AccordionContent>
                All conversions first go through the decimal system. To convert a number from any base to decimal, you multiply each digit by its base raised to the power of its position. To convert from decimal to another base, you repeatedly divide the number by the target base and record the remainders.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>What is Hexadecimal used for?</AccordionTrigger>
              <AccordionContent>
                Hexadecimal is commonly used to represent colors on the web (e.g., #FF0000 is red), in assembly language programming, and for memory addresses. It's more compact than binary, as one hex digit can represent four binary digits (a nibble).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
