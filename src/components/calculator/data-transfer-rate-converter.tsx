
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
        <CardHeader>
            <CardTitle>About the Data Transfer Rate Converter</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our **Data Transfer Rate Converter** is a crucial tool for understanding internet speeds, download times, and network performance. It helps you translate between the different units used to measure how quickly digital data moves from one point to another, such as from a server to your computer. This is essential for comparing internet plans, estimating file download times, and troubleshooting network issues.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter the speed value you want to convert in the "From" field.</li>
                <li>Select the starting unit (e.g., Megabits per second - Mbps).</li>
                <li>Select the target unit you want to convert to (e.g., Megabytes per second - MB/s).</li>
            </ol>
            <p>The converted speed will be displayed instantly, helping you understand your connection's true performance.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What's the difference between Megabits (Mbps) and Megabytes (MB/s)?</AccordionTrigger>
                    <AccordionContent>
                        This is the most common point of confusion. **Internet Service Providers (ISPs)** advertise speeds in **megabits per second (Mbps)**. However, the download speed shown in your web browser or applications is usually in **megabytes per second (MB/s)**. Since there are 8 bits in 1 byte, to find your theoretical maximum download speed in MB/s, you divide the Mbps value by 8. For example, a 100 Mbps connection has a maximum theoretical download speed of 12.5 MB/s.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Why is my download speed slower than what my ISP advertises?</AccordionTrigger>
                    <AccordionContent>
                        Advertised speeds are "up to" a certain maximum under ideal conditions. Real-world speeds can be affected by many factors, including network congestion, the quality of your router and local network (Wi-Fi vs. Ethernet), the server you're downloading from, and the number of devices using your connection simultaneously.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What are decimal (Mbps) vs. binary (Mibps) prefixes?</AccordionTrigger>
                    <AccordionContent>
                       **Decimal prefixes (kilo, mega, giga)** use powers of 1000. For example, 1 Mbps = 1,000,000 bits per second. This is the standard for measuring data transfer rates. **Binary prefixes (kibi, mebi, gibi)** use powers of 1024 (e.g., 1 Mibps = 1,048,576 bits per second) and are more commonly associated with data storage, but can sometimes appear in networking contexts.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
