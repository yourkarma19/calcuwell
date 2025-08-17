
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

type SolveFor = "voltage" | "current" | "resistance" | "power";

export default function OhmsLawCalculator() {
  const [solveFor, setSolveFor] = usePersistentState<SolveFor>("ohms-solveFor", "voltage");
  
  const [voltage, setVoltage] = usePersistentState("ohms-voltage", 12); // V (Volts)
  const [current, setCurrent] = usePersistentState("ohms-current", 0.5); // I (Amps)
  const [resistance, setResistance] = usePersistentState("ohms-resistance", 24); // R (Ohms)
  const [power, setPower] = usePersistentState("ohms-power", 6); // P (Watts)

  const result = useMemo(() => {
    const V = Number(voltage);
    const I = Number(current);
    const R = Number(resistance);
    const P = Number(power);

    if (solveFor === 'voltage') {
      if(I > 0 && R > 0) return { value: I * R, unit: 'Volts' };
      if(P > 0 && I > 0) return { value: P / I, unit: 'Volts' };
      if(P > 0 && R > 0) return { value: Math.sqrt(P * R), unit: 'Volts' };
    } else if (solveFor === 'current') {
      if(V > 0 && R > 0) return { value: V / R, unit: 'Amps' };
      if(P > 0 && V > 0) return { value: P / V, unit: 'Amps' };
      if(P > 0 && R > 0) return { value: Math.sqrt(P / R), unit: 'Amps' };
    } else if (solveFor === 'resistance') {
      if(V > 0 && I > 0) return { value: V / I, unit: 'Ohms' };
      if(V > 0 && P > 0) return { value: (V * V) / P, unit: 'Ohms' };
      if(P > 0 && I > 0) return { value: P / (I * I), unit: 'Ohms' };
    } else if (solveFor === 'power') {
      if(V > 0 && I > 0) return { value: V * I, unit: 'Watts' };
      if(I > 0 && R > 0) return { value: (I * I) * R, unit: 'Watts' };
      if(V > 0 && R > 0) return { value: (V * V) / R, unit: 'Watts' };
    }
    
    return { value: NaN, unit: '' };

  }, [solveFor, voltage, current, resistance, power]);
  
  const getInputProps = (field: SolveFor) => {
    if (field === solveFor) {
      return { value: isNaN(result.value) ? "Result" : result.value.toFixed(4), readOnly: true, className: "font-bold text-primary bg-primary/10 border-primary/20" };
    }
    
    let value, setter;
    if (field === 'voltage') { value = voltage; setter = setVoltage; }
    if (field === 'current') { value = current; setter = setCurrent; }
    if (field === 'resistance') { value = resistance; setter = setResistance; }
    if (field === 'power') { value = power; setter = setPower; }
    
    return { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setter?.(Number(e.target.value)) };
  };

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ohm's Law Calculator</CardTitle>
          <CardDescription>Calculate Voltage (V), Current (I), Resistance (R), and Power (P). Enter any two values to solve for the other two.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>What do you want to calculate?</Label>
            <RadioGroup value={solveFor} onValueChange={(v) => setSolveFor(v as any)} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="flex items-center space-x-2"><RadioGroupItem value="voltage" id="v" /><Label htmlFor="v">Voltage (V)</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="current" id="i" /><Label htmlFor="i">Current (I)</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="resistance" id="r" /><Label htmlFor="r">Resistance (R)</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="power" id="p" /><Label htmlFor="p">Power (P)</Label></div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voltage">Voltage (Volts)</Label>
              <Input id="voltage" type="number" {...getInputProps('voltage')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current">Current (Amps)</Label>
              <Input id="current" type="number" {...getInputProps('current')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resistance">Resistance (Ohms)</Label>
              <Input id="resistance" type="number" {...getInputProps('resistance')} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="power">Power (Watts)</Label>
              <Input id="power" type="number" {...getInputProps('power')} />
            </div>
          </div>
           {result && !isNaN(result.value) && (
              <div className="pt-4 text-center">
                  <h3 className="text-lg font-semibold">Result</h3>
                  <p className="text-4xl font-bold font-headline text-primary">
                      {result.value.toFixed(4)} <span className="text-2xl text-muted-foreground">{result.unit}</span>
                  </p>
              </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>About the Ohm's Law Calculator</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>The **Ohm's Law Calculator** is an essential tool for students, hobbyists, and engineers working with electronic circuits. It simplifies the relationship between **Voltage (V)**, **Current (I)**, **Resistance (R)**, and **Power (P)**. By providing any two of these values, you can instantly find the other two, making it invaluable for circuit design, analysis, and troubleshooting.</p>
          <h3>How to Use the Calculator</h3>
          <ol>
              <li>First, select the value you want to calculate (e.g., Voltage).</li>
              <li>Enter any two of the other known values into their respective fields.</li>
          </ol>
          <p>The calculator will automatically compute the result based on the formulas derived from Ohm's Law and the Power Law.</p>
          <h3>Frequently Asked Questions (FAQs)</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Ohm's Law?</AccordionTrigger>
              <AccordionContent>
                Ohm's Law is a fundamental principle in electronics that describes the relationship between voltage (V), current (I), and resistance (R). The classic formula is `V = I × R`, which states that the voltage across a resistor is directly proportional to the current flowing through it.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>The Ohm's Law Triangle</AccordionTrigger>
              <AccordionContent>
                A common way to remember the formulas is the Ohm's Law Triangle. By covering up the value you want to find, the remaining two values show you how to calculate it:
                <ul className="list-disc pl-5 mt-2">
                  <li>To find Voltage (V): Cover V, you are left with I × R.</li>
                  <li>To find Current (I): Cover I, you are left with V / R.</li>
                  <li>To find Resistance (R): Cover R, you are left with V / I.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What about Power (P)?</AccordionTrigger>
              <AccordionContent>
                Power (measured in Watts) is the rate at which energy is consumed in a circuit. It's related to Ohm's Law through several formulas, including `P = V × I`, `P = I² × R`, and `P = V² / R`. This calculator can also solve for power if you provide any two other values.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Why is Ohm's Law important?</AccordionTrigger>
              <AccordionContent>
                Ohm's Law is essential for designing, analyzing, and troubleshooting electronic circuits. It allows engineers and hobbyists to determine the correct components to use, ensure safety by managing current flow, and diagnose problems in circuits.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
