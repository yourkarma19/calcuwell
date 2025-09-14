"use client";

import { ArrowRightLeft } from "lucide-react";
import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the different number systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Decimal (Base-10): The system we use every day, with digits 0-9. Binary (Base-2): The fundamental language of computers, using only digits 0 and 1. Hexadecimal (Base-16): Uses digits 0-9 and letters A-F. It's a more compact way to represent binary data. Octal (Base-8): Uses digits 0-7.",
      },
    },
    {
      "@type": "Question",
      name: "Why is hexadecimal used in programming?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hexadecimal is widely used because it's a human-friendly way to represent long binary values. For example, the binary value `11111111` is much easier to read as `FF` in hexadecimal. It's commonly used for memory addresses and color codes.",
      },
    },
  ],
};

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
  const [fromSystem, setFromSystem] = usePersistentState<NumberSystem>(
    "binary-from",
    "decimal",
  );
  const [toSystem, setToSystem] = usePersistentState<NumberSystem>(
    "binary-to",
    "binary",
  );
  const [value, setValue] = usePersistentState("binary-value", "10");

  const handleSwap = () => {
    setFromSystem(toSystem);
    setToSystem(fromSystem);
    setValue(convertedValue === "Invalid input" ? "" : convertedValue);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (validationPatterns[fromSystem].test(newValue) || newValue === "") {
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
          <CardDescription>
            Convert values between binary, decimal, hexadecimal, and octal
            systems.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full space-y-2">
              <Label htmlFor="from-value">From</Label>
              <Input
                id="from-value"
                value={value}
                onChange={handleValueChange}
                className="font-mono"
              />
              <Select
                value={fromSystem}
                onValueChange={(v) => {
                  setValue("");
                  setFromSystem(v as NumberSystem);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(bases).map((system) => (
                    <SelectItem
                      key={system}
                      value={system}
                      className="capitalize"
                    >
                      {system}
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
                className="font-bold font-mono text-primary bg-primary/10 border-primary/20"
              />
              <Select
                value={toSystem}
                onValueChange={(v) => setToSystem(v as NumberSystem)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(bases).map((system) => (
                    <SelectItem
                      key={system}
                      value={system}
                      className="capitalize"
                    >
                      {system}
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
          <CardTitle as="h2">About the Number System Converter</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            Our <strong>Number System Converter</strong> is a key tool for
            programmers, computer science students, and IT professionals. It lets
            you quickly convert between the four most common number systems in
            computing: binary, decimal, hexadecimal, and octal.
          </p>
          <h3>How to Use the Number System Converter</h3>
          <ol>
            <li>Enter a value in the &quot;From&quot; field.</li>
            <li>Select the number system you are converting from.</li>
            <li>Select the target number system you want to convert to.</li>
          </ol>
          <p>
            The result will appear instantly. The calculator checks your input to
            make sure it is valid for the selected base.
          </p>
          <h3>Number System FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What are the different number systems?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  <strong>Decimal (Base-10):</strong> The system we use every
                  day, with digits 0-9.
                </p>
                <p className="mb-2">
                  <strong>Binary (Base-2):</strong> The main language of
                  computers, using only digits 0 and 1.
                </p>
                <p className="mb-2">
                  <strong>Hexadecimal (Base-16):</strong> Uses digits 0-9 and
                  letters A-F. It&apos;s a shorter way to write binary data.
                </p>
                <p>
                  <strong>Octal (Base-8):</strong> Uses digits 0-7. It was more
                  common in older computers.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Why is hexadecimal used in programming?
              </AccordionTrigger>
              <AccordionContent>
                Hexadecimal is popular because it&apos;s a human-friendly way to
                show long binary values. For example, `11111111` is easier to
                read as `FF`. It&apos;s often used for memory addresses and color
                codes (e.g., `#FF0000` for red).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
