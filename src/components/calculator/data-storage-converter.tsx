
"use client";

import { useState, useMemo, useEffect } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

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
  const [fromUnit, setFromUnit] = usePersistentState<Unit>("data-storage-from", "megabyte");
  const [toUnit, setToUnit] = usePersistentState<Unit>("data-storage-to", "gigabyte");
  const [value, setValue] = usePersistentState("data-storage-value", "1024");

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
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Storage Converter</CardTitle>
          <CardDescription>Convert between different units of digital data storage, from bits to petabytes.</CardDescription>
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
        <CardHeader>
            <CardTitle>About the Data Storage Converter</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our **Data Storage Converter** is an essential tool for anyone working with digital files, from software developers and IT professionals to casual computer users. It helps you quickly and accurately convert between different units of digital information, such as bits, bytes, kilobytes (KB), megabytes (MB), gigabytes (GB), terabytes (TB), and petabytes (PB). This makes it easy to understand file sizes, disk space, and data limits.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter the numeric value of the data size you want to convert in the "From" field.</li>
                <li>Select the starting unit (e.g., Megabyte).</li>
                <li>Select the target unit you want to convert to (e.g., Gigabyte).</li>
            </ol>
            <p>The equivalent value will be instantly calculated and displayed in the "To" field.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What's the difference between a Bit and a Byte?</AccordionTrigger>
                    <AccordionContent>
                        A **bit** is the most basic unit of data in computing, representing a single binary value of either 0 or 1. A **byte** is a group of 8 bits. Bytes are the standard unit used to measure file sizes and storage capacity because a single byte can represent one character of text (in ASCII).
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Why is a Kilobyte 1024 Bytes, not 1000?</AccordionTrigger>
                    <AccordionContent>
                        Computers operate on a binary (base-2) system. Therefore, data storage units are based on powers of 2. `2^10` is 1024, which is the closest power of 2 to 1000. This became the standard for computer memory and storage, so 1 Kilobyte = 1024 Bytes, 1 Megabyte = 1024 Kilobytes, and so on. This calculator uses the 1024-byte standard.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What is the difference between KB and KiB?</AccordionTrigger>
                    <AccordionContent>
                       To reduce confusion, official standards bodies introduced binary prefixes. A **kilobyte (KB)** is now technically defined as 1000 bytes, while a **kibibyte (KiB)** is 1024 bytes. However, in common usage (and in this calculator), "kilobyte" is still widely understood to mean 1024 bytes. This discrepancy is why a hard drive advertised as 1 TB (1 trillion bytes) appears as about 931 GB in your operating system.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
