"use client";

import { ArrowRightLeft } from "lucide-react";
import { useMemo } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePersistentState from "@/hooks/use-persistent-state";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What's the difference between a Bit and a Byte?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A bit is the most basic unit of data, a single binary value of 0 or 1. A byte is a group of 8 bits. Bytes are the standard unit used to measure file sizes as one byte can represent one character of text.",
      },
    },
    {
      "@type": "Question",
      name: "Why is a Kilobyte (KB) 1024 Bytes, not 1000?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Computers use a binary (base-2) system, and data storage units are based on powers of 2. Since 2^10 is 1024, this became the standard for computer memory and storage. So, 1 Kilobyte = 1024 Bytes.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between KB (kilobyte) and KiB (kibibyte)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To reduce confusion, official standards bodies designated 'kilobyte (KB)' as 1000 bytes and 'kibibyte (KiB)' as 1024 bytes. However, in common use, 'kilobyte' is still widely understood to mean 1024 bytes, which is why a 1 TB hard drive shows up as about 931 GB in your OS.",
      },
    },
  ],
};

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
  const [fromUnit, setFromUnit] = usePersistentState<Unit>(
    "data-storage-from",
    "megabyte",
  );
  const [toUnit, setToUnit] = usePersistentState<Unit>(
    "data-storage-to",
    "gigabyte",
  );
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
    return result.toLocaleString(undefined, {
      maximumFractionDigits: result > 1 ? 4 : 8,
    });
  }, [value, fromUnit, toUnit]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Storage Converter</CardTitle>
          <CardDescription>
            Convert between different units of digital data storage, from bits to
            petabytes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full space-y-2">
              <Label htmlFor="from-value">From</Label>
              <Input
                id="from-value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Select
                value={fromUnit}
                onValueChange={(v) => setFromUnit(v as Unit)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(units).map((unit) => (
                    <SelectItem key={unit} value={unit} className="capitalize">
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 mt-4 md:mt-7"
              onClick={handleSwap}
            >
              <ArrowRightLeft className="w-5 h-5 text-primary" />
            </Button>

            <div className="w-full space-y-2">
              <Label htmlFor="to-value">To</Label>
              <Input
                id="to-value"
                value={convertedValue}
                readOnly
                className="font-bold text-primary bg-primary/10 border-primary/20"
              />
              <Select value={toUnit} onValueChange={(v) => setToUnit(v as Unit)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(units).map((unit) => (
                    <SelectItem key={unit} value={unit} className="capitalize">
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Data Storage Converter</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            Our Data Storage Converter helps you quickly convert between different
            units of digital information. This includes bits, bytes, kilobytes
            (KB), megabytes (MB), and gigabytes (GB). This makes it easy to
            understand file sizes and disk space.
          </p>
          <h3>How to Use the Data Storage Converter</h3>
          <ol>
            <li>Enter the data size you want to convert.</li>
            <li>Select the starting unit (e.g., Megabyte).</li>
            <li>Select the target unit (e.g., Gigabyte).</li>
          </ol>
          <p>The new value will be instantly calculated.</p>
          <h3>Data Storage FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What&apos;s the difference between a Bit and a Byte?
              </AccordionTrigger>
              <AccordionContent>
                A <strong>bit</strong> is the most basic unit of data, a single 0
                or 1. A <strong>byte</strong> is a group of 8 bits. Bytes are the
                standard unit to measure file sizes because one byte can represent
                one character of text.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Why is a Kilobyte 1024 Bytes, not 1000?
              </AccordionTrigger>
              <AccordionContent>
                Computers use a binary (base-2) system. Data storage units are
                based on powers of 2. `2^10` is 1024, which is very close to 1000.
                This became the standard. So, 1 Kilobyte = 1024 Bytes, 1 Megabyte
                = 1024 Kilobytes, and so on.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What is the difference between KB and KiB?
              </AccordionTrigger>
              <AccordionContent>
                To reduce confusion, official standards created binary prefixes. A{" "}
                <strong>kilobyte (KB)</strong> is technically 1000 bytes. A{" "}
                <strong>kibibyte (KiB)</strong> is 1024 bytes. But in common use,
                &quot;kilobyte&quot; still means 1024 bytes. This is why a 1 TB
                hard drive appears as about 931 GB in your operating system.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
