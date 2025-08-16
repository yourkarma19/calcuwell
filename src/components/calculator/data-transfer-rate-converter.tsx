
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
  "bit/s (bps)": 1,
  "kilobit/s (Kbps)": 1000,
  "megabit/s (Mbps)": 1e6,
  "gigabit/s (Gbps)": 1e9,
  "terabit/s (Tbps)": 1e12,
  "kibibit/s (Kibps)": 1024,
  "mebibit/s (Mibps)": 1048576,
  "gibibit/s (Gibps)": 1073741824,
  "tebibit/s (Tibps)": 1099511627776,
  "byte/s (Bps)": 8,
  "kilobyte/s (KB/s)": 8000,
  "megabyte/s (MB/s)": 8e6,
  "gigabyte/s (GB/s)": 8e9,
  "terabyte/s (TB/s)": 8e12,
};

type Unit = keyof typeof units;

export default function DataTransferRateConverter() {
  const [fromUnit, setFromUnit] = usePersistentState<Unit>("data-transfer-from", "megabit/s (Mbps)");
  const [toUnit, setToUnit] = usePersistentState<Unit>("data-transfer-to", "megabyte/s (MB/s)");
  const [value, setValue] = usePersistentState("data-transfer-value", "100");

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
          <CardTitle>Data Transfer Rate Converter</CardTitle>
          <CardDescription>Convert between different units of data transfer speed, like Mbps to MB/s.</CardDescription>
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
        <CardHeader><CardTitle>About Data Transfer Rates</CardTitle></CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Bits vs. Bytes in Internet Speed</AccordionTrigger>
              <AccordionContent>
                Internet service providers (ISPs) advertise speeds in **megabits per second (Mbps)**, while file downloads in your browser are often shown in **megabytes per second (MB/s)**. Since 1 byte = 8 bits, a 100 Mbps internet connection has a maximum theoretical download speed of 12.5 MB/s.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
