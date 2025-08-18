
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function EquationSolver() {
  const [mode, setMode] = usePersistentState<'linear' | 'quadratic'>('equation-mode', 'linear');
  
  // Linear: ax + b = c
  const [la, setLa] = usePersistentState('equation-la', 2);
  const [lb, setLb] = usePersistentState('equation-lb', 5);
  const [lc, setLc] = usePersistentState('equation-lc', 10);
  
  // Quadratic: ax^2 + bx + c = 0
  const [qa, setQa] = usePersistentState('equation-qa', 1);
  const [qb, setQb] = usePersistentState('equation-qb', -3);
  const [qc, setQc] = usePersistentState('equation-qc', 2);

  const result = useMemo(() => {
    if (mode === 'linear') {
      if (la === 0) return "Not a linear equation (a=0)";
      const x = (lc - lb) / la;
      return `x = ${x.toFixed(4)}`;
    } else {
      if (qa === 0) return "Not a quadratic equation (a=0)";
      const discriminant = qb * qb - 4 * qa * qc;
      if (discriminant > 0) {
        const x1 = (-qb + Math.sqrt(discriminant)) / (2 * qa);
        const x2 = (-qb - Math.sqrt(discriminant)) / (2 * qa);
        return `x1 = ${x1.toFixed(4)}, x2 = ${x2.toFixed(4)}`;
      } else if (discriminant === 0) {
        const x = -qb / (2 * qa);
        return `x = ${x.toFixed(4)}`;
      } else {
        return "No real roots (discriminant < 0)";
      }
    }
  }, [mode, la, lb, lc, qa, qb, qc]);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Equation Solver</CardTitle>
          <CardDescription>Solve linear and quadratic equations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={mode} onValueChange={m => setMode(m as any)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="linear">Linear Equation (ax + b = c)</SelectItem>
              <SelectItem value="quadratic">Quadratic Equation (ax² + bx + c = 0)</SelectItem>
            </SelectContent>
          </Select>
          
          {mode === 'linear' && (
            <div className="grid grid-cols-3 gap-2 items-center">
              <Input type="number" value={la} onChange={e => setLa(Number(e.target.value))}/>
              <Label className="text-center text-lg">x +</Label>
              <Input type="number" value={lb} onChange={e => setLb(Number(e.target.value))}/>
              <Label className="text-center text-lg">=</Label>
              <Input type="number" value={lc} onChange={e => setLc(Number(e.target.value))}/>
            </div>
          )}

          {mode === 'quadratic' && (
             <div className="grid grid-cols-3 gap-2 items-center">
              <Input type="number" value={qa} onChange={e => setQa(Number(e.target.value))}/>
              <Label className="text-center text-lg">x² +</Label>
              <Input type="number" value={qb} onChange={e => setQb(Number(e.target.value))}/>
               <Label className="text-center text-lg">x +</Label>
              <Input type="number" value={qc} onChange={e => setQc(Number(e.target.value))}/>
               <Label className="text-center text-lg">= 0</Label>
            </div>
          )}
          
          <div className="pt-4 text-center">
            <h3 className="text-lg font-semibold">Solution</h3>
            <p className="text-3xl font-bold font-headline text-primary">{result}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Understanding Equation Types</CardTitle></CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is a linear equation?</AccordionTrigger>
              <AccordionContent>
                A linear equation is an equation for a straight line. This calculator solves for 'x' in the form ax + b = c.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is a quadratic equation?</AccordionTrigger>
              <AccordionContent>
                A quadratic equation is a second-order polynomial equation in a single variable x with the form ax² + bx + c = 0. It can have two solutions, one solution, or no real solutions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
