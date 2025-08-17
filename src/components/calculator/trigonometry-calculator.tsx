
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

type TrigFunction = 'sin' | 'cos' | 'tan' | 'asin' | 'acos' | 'atan';
type AngleUnit = 'degrees' | 'radians';

const calculateTrig = (func: TrigFunction, value: number, unit: AngleUnit): number => {
    const angle = unit === 'degrees' ? value * (Math.PI / 180) : value;

    switch (func) {
        case 'sin': return Math.sin(angle);
        case 'cos': return Math.cos(angle);
        case 'tan': return Math.tan(angle);
        case 'asin': {
            const result = Math.asin(value);
            return unit === 'degrees' ? result * (180 / Math.PI) : result;
        }
        case 'acos': {
            const result = Math.acos(value);
            return unit === 'degrees' ? result * (180 / Math.PI) : result;
        }
        case 'atan': {
            const result = Math.atan(value);
            return unit === 'degrees' ? result * (180 / Math.PI) : result;
        }
    }
};

export default function TrigonometryCalculator() {
  const [trigFunction, setTrigFunction] = usePersistentState<TrigFunction>("trig-function", "sin");
  const [angleUnit, setAngleUnit] = usePersistentState<AngleUnit>("trig-unit", "degrees");
  const [inputValue, setInputValue] = usePersistentState("trig-input", "30");

  const result = useMemo(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return "Invalid Input";
    
    if (['asin', 'acos'].includes(trigFunction) && (value < -1 || value > 1)) {
        return "Input must be between -1 and 1";
    }

    const res = calculateTrig(trigFunction, value, angleUnit);
    return res.toFixed(8);

  }, [trigFunction, inputValue, angleUnit]);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
            <CardTitle>Trigonometry Calculator</CardTitle>
            <CardDescription>Calculate sine, cosine, tangent, and their inverses.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>Function</Label>
                    <Select value={trigFunction} onValueChange={v => setTrigFunction(v as TrigFunction)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sin">sin</SelectItem>
                            <SelectItem value="cos">cos</SelectItem>
                            <SelectItem value="tan">tan</SelectItem>
                            <SelectItem value="asin">asin (sin⁻¹)</SelectItem>
                            <SelectItem value="acos">acos (cos⁻¹)</SelectItem>
                            <SelectItem value="atan">atan (tan⁻¹)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="input-value">Value</Label>
                    <Input id="input-value" type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Unit</Label>
                     <RadioGroup value={angleUnit} onValueChange={(v) => setAngleUnit(v as AngleUnit)} className="flex items-center space-x-4 pt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="degrees" id="degrees" /><Label htmlFor="degrees">Degrees</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="radians" id="radians" /><Label htmlFor="radians">Radians</Label></div>
                    </RadioGroup>
                </div>
            </div>
             <div className="pt-4 text-center">
                <h3 className="text-lg font-semibold">Result</h3>
                <p className="text-4xl font-bold font-headline text-primary break-all">
                    {result}
                </p>
            </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>About Trigonometry</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our **Trigonometry Calculator** provides a powerful and easy-to-use interface for solving complex trigonometric problems. Whether you're a student tackling geometry homework, an engineer designing a structure, or a professional needing a quick calculation, this tool simplifies the process. It allows you to find the values of sine, cosine, tangent, and their inverse functions (arcsin, arccos, arctan) for any angle, specified in either degrees or radians.</p>

            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Select the trigonometric **Function** you want to use from the dropdown menu (e.g., sin, cos, asin).</li>
                <li>Enter the **Value** (either an angle for sin/cos/tan, or a ratio for asin/acos/atan).</li>
                <li>Choose the **Unit** for your angle (Degrees or Radians).</li>
            </ol>
            <p>The result of the calculation is displayed instantly.</p>
            
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What are Sine, Cosine, and Tangent?</AccordionTrigger>
                    <AccordionContent>
                        Sine (sin), Cosine (cos), and Tangent (tan) are the three primary trigonometric functions. They are defined as ratios of the sides of a right-angled triangle.
                        <ul className="list-disc pl-5 mt-2">
                            <li><strong>Sine (sin):</strong> Opposite / Hypotenuse</li>
                            <li><strong>Cosine (cos):</strong> Adjacent / Hypotenuse</li>
                            <li><strong>Tangent (tan):</strong> Opposite / Adjacent</li>
                        </ul>
                        The acronym **SOH-CAH-TOA** is often used to remember these fundamental ratios.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What are Inverse Trigonometric Functions?</AccordionTrigger>
                    <AccordionContent>
                        Inverse trigonometric functions (like asin, acos, atan, often written as sin⁻¹, cos⁻¹, tan⁻¹) are used to find the angle when you know the ratio of the sides. For example, if you know that the sine of an angle is 0.5, you can use arcsin (sin⁻¹) to find that the angle is 30 degrees.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Degrees vs. Radians</AccordionTrigger>
                    <AccordionContent>
                        Degrees and Radians are two different units for measuring angles. A full circle is 360 degrees or 2π radians. It's crucial to use the correct unit for your calculations, as using the wrong one will lead to incorrect results. Most advanced mathematical and physics formulas use radians for simplicity and consistency.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Real-World Applications</AccordionTrigger>
                    <AccordionContent>
                        Trigonometry is used in many fields, including astronomy (to measure distances to stars), navigation (GPS systems), engineering (to build structures), physics (to analyze waves), and video game development (to control object movement and camera angles).
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
