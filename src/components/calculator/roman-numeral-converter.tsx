"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";

// Conversion logic
const toRoman = (num: number): string => {
  if (num < 1 || num > 3999) return "Invalid";
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

const fromRoman = (str: string): number => {
  const romanMap: { [key: string]: number } = {M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1};
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    const current = romanMap[str[i]];
    const next = romanMap[str[i + 1]];
    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  return result;
};


export default function RomanNumeralConverter() {
    const [isRomanToNumber, setIsRomanToNumber] = useState(false);
    const [inputValue, setInputValue] = useState(isRomanToNumber ? "X" : "10");

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
        setInputValue(result.toString());
        setIsRomanToNumber(!isRomanToNumber);
    };

    return (
        <div className="lg:col-span-3">
            <Card>
                <CardHeader><CardTitle>Roman Numeral Converter</CardTitle></CardHeader>
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
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
