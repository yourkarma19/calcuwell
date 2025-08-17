
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
        <CardHeader>
            <CardTitle>About the Number System Converter</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our **Number System Converter** is an essential tool for programmers, computer science students, and anyone working with low-level data. It allows you to seamlessly translate numbers between the four most common number systems in computing: **Decimal (Base-10)**, **Binary (Base-2)**, **Hexadecimal (Base-16)**, and **Octal (Base-8)**. Understanding these systems is fundamental to computing, and this tool makes their conversion effortless.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter the number you want to convert in the "From" field.</li>
                <li>Select its current number system (e.g., Decimal).</li>
                <li>Select the target number system you want to convert to (e.g., Binary).</li>
            </ol>
            <p>The converted value will appear instantly in the "To" field. The input is validated to ensure you only enter characters appropriate for the selected base.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What are the different number systems?</AccordionTrigger>
                    <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Decimal (Base-10):</strong> The system we use every day, with 10 digits (0-9).</li>
                            <li><strong>Binary (Base-2):</strong> The fundamental language of computers, using only two digits: 0 and 1. Each digit is a "bit".</li>
                            <li>**Hexadecimal (Base-16):** Uses 16 symbols (0-9 and A-F). It's a compact way to represent binary data, as one hex digit represents four binary digits.</li>
                            <li>**Octal (Base-8):** Uses 8 digits (0-7). It was more common in early computing systems.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Why is binary important in computing?</AccordionTrigger>
                    <AccordionContent>
                        Computers operate using transistors, which can be in one of two states: on or off. These two states are perfectly represented by the binary digits 1 (on) and 0 (off). All computer data—from text and images to executable programs—is ultimately stored and processed in binary form.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How does the conversion work?</AccordionTrigger>
                    <AccordionContent>
                        This calculator works by first converting the input number from its original base into the decimal (base-10) system. Once it has the decimal value, it can then easily convert that value into any other target base. This two-step process (Source Base → Decimal → Target Base) is a standard method for number system conversion.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>What is Hexadecimal used for?</AccordionTrigger>
                    <AccordionContent>
                        Hexadecimal is very common in computing because it's a human-friendly way to represent long binary numbers. For example, it's used for color codes on the web (e.g., `#FFC0CB` is pink), defining memory addresses, and in debugging. A single hexadecimal digit can represent four binary digits (a nibble), making `1111` in binary simply `F` in hex.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
