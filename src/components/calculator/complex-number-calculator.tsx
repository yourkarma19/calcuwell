"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function ComplexNumberCalculator() {
  const [real1, setReal1] = usePersistentState("complex-real1", 3);
  const [imag1, setImag1] = usePersistentState("complex-imag1", 2);
  const [real2, setReal2] = usePersistentState("complex-real2", 1);
  const [imag2, setImag2] = usePersistentState("complex-imag2", 7);
  const [operation, setOperation] = usePersistentState<"add" | "subtract" | "multiply" | "divide">("complex-op", "add");

  const result = useMemo(() => {
    let resReal, resImag;
    switch (operation) {
      case 'add':
        resReal = real1 + real2;
        resImag = imag1 + imag2;
        break;
      case 'subtract':
        resReal = real1 - real2;
        resImag = imag1 - imag2;
        break;
      case 'multiply':
        resReal = real1 * real2 - imag1 * imag2;
        resImag = real1 * imag2 + imag1 * real2;
        break;
      case 'divide':
        const denominator = real2 * real2 + imag2 * imag2;
        if (denominator === 0) return { real: NaN, imag: NaN };
        resReal = (real1 * real2 + imag1 * imag2) / denominator;
        resImag = (imag1 * real2 - real1 * imag2) / denominator;
        break;
    }
    return { real: resReal, imag: resImag };
  }, [real1, imag1, real2, imag2, operation]);
  
  const formatResult = () => {
    if (isNaN(result.real)) return "Cannot divide by zero";
    if (result.imag === 0) return result.real.toFixed(4);
    if (result.real === 0) return `${result.imag.toFixed(4)}i`;
    return `${result.real.toFixed(4)} ${result.imag > 0 ? '+' : '-'} ${Math.abs(result.imag).toFixed(4)}i`;
  };

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Complex Number Calculator</CardTitle>
          <CardDescription>Perform arithmetic with complex numbers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Number 1 (a + bi)</Label>
              <div className="flex gap-2">
                <Input type="number" value={real1} onChange={e => setReal1(Number(e.target.value))} placeholder="Real"/>
                <Input type="number" value={imag1} onChange={e => setImag1(Number(e.target.value))} placeholder="Imaginary"/>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Number 2 (c + di)</Label>
              <div className="flex gap-2">
                <Input type="number" value={real2} onChange={e => setReal2(Number(e.target.value))} placeholder="Real"/>
                <Input type="number" value={imag2} onChange={e => setImag2(Number(e.target.value))} placeholder="Imaginary"/>
              </div>
            </div>
          </div>
           <div className="space-y-2">
              <Label>Operation</Label>
              <RadioGroup value={operation} onValueChange={(v) => setOperation(v as any)} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div className="flex items-center space-x-2"><RadioGroupItem value="add" id="add" /><Label htmlFor="add">Add</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="subtract" id="sub" /><Label htmlFor="sub">Subtract</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="multiply" id="mult" /><Label htmlFor="mult">Multiply</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="divide" id="div" /><Label htmlFor="div">Divide</Label></div>
              </RadioGroup>
          </div>
          <div className="pt-4 text-center">
            <h3 className="text-lg font-semibold">Result</h3>
            <p className="text-3xl font-bold font-mono text-primary">{formatResult()}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>About Complex Numbers</CardTitle></CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is a complex number?</AccordionTrigger>
              <AccordionContent>
                A complex number is a number that can be expressed in the form `a + bi`, where `a` and `b` are real numbers, and `i` is the imaginary unit, which satisfies the equation `i² = -1`.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
