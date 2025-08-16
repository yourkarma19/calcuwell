
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

// Conversion logic
const toRoman = (num: number): string => {
  if (num < 1 || num > 3999 || !Number.isInteger(num)) return "Invalid Input";
  const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const rom = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let result = "";
  for (let i = 0; i < val.length; i++) {
    while (num >= val[i]) {
      result += rom[i];
      num -= val[i];
    }
  }
  return result;
};

const fromRoman = (str: string): number | string => {
  const romanMap: { [key: string]: number } = {M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1};
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    const currentVal = romanMap[str[i]];
    const nextVal = romanMap[str[i + 1]];

    if(!currentVal) return "Invalid Roman Numeral";

    if (nextVal && currentVal < nextVal) {
      result -= currentVal;
    } else {
      result += currentVal;
    }
  }
  // Check if converting back gives the same string
  if (toRoman(result) !== str) return "Invalid Roman Numeral";
  
  return result;
};


export default function RomanNumeralConverter() {
    const [isRomanToNumber, setIsRomanToNumber] = usePersistentState("roman-isRomanToNumber", false);
    const [inputValue, setInputValue] = usePersistentState("roman-inputValue", "10");

    const result = useMemo(() => {
        if (isRomanToNumber) {
            return fromRoman(inputValue.toUpperCase());
        } else {
            const num = parseInt(inputValue, 10);
            if (isNaN(num)) return "Invalid Number";
            return toRoman(num);
        }
    }, [inputValue, isRomanToNumber]);

    const handleSwap = () => {
        if (typeof result === 'number' || (typeof result === 'string' && !result.toLowerCase().includes('invalid'))) {
            setInputValue(result.toString());
        }
        setIsRomanToNumber(!isRomanToNumber);
    };

    return (
        <div className="lg:col-span-3 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Roman Numeral Converter</CardTitle>
                    <CardDescription>Convert numbers (1-3999) to Roman numerals and back. Use the swap button to change the conversion direction.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-full space-y-2">
                            <Label>{isRomanToNumber ? "Roman Numeral" : "Number"}</Label>
                            <Input 
                                value={inputValue} 
                                onChange={(e) => setInputValue(e.target.value)}
                                className="font-mono"
                            />
                        </div>
                        <Button variant="ghost" size="icon" className="shrink-0 mt-4 md:mt-7" onClick={handleSwap}>
                            <ArrowRightLeft className="w-5 h-5 text-primary" />
                        </Button>
                        <div className="w-full space-y-2">
                            <Label>{isRomanToNumber ? "Number" : "Roman Numeral"}</Label>
                            <Input 
                                value={result.toString()} 
                                readOnly 
                                className="font-bold font-mono text-primary bg-primary/10 border-primary/20"
                                aria-live="polite"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>About Roman Numerals</CardTitle></CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How do Roman numerals work?</AccordionTrigger>
                            <AccordionContent>
                                Roman numerals use letters from the Latin alphabet to represent numbers. The main symbols are I (1), V (5), X (10), L (50), C (100), D (500), and M (1000). The values are combined to form larger numbers.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>What is the subtractive principle?</AccordionTrigger>
                            <AccordionContent>
                                Usually, symbols are placed from left to right in order of value, starting with the largest. However, to avoid repeating a symbol four times (like IIII), a smaller value is placed before a larger one to subtract it. For example, 4 is written as IV (5 - 1), and 90 is written as XC (100 - 10).
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Why are Roman numerals still used today?</AccordionTrigger>
                            <AccordionContent>
                                Roman numerals are often used for stylistic purposes, such as on clock faces, for chapter numbers in books, in the names of monarchs (like Queen Elizabeth II), and for the Super Bowl. They add a sense of history and formality.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
