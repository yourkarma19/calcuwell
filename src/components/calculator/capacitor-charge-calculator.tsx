"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function CapacitorChargeCalculator() {
  const [voltage, setVoltage] = usePersistentState("cap-voltage", 12); // Volts
  const [capacitance, setCapacitance] = usePersistentState("cap-capacitance", 100); // microFarads
  const [resistance, setResistance] = usePersistentState("cap-resistance", 10); // kOhms
  const [time, setTime] = usePersistentState("cap-time", 1); // seconds

  const { charge, current, timeConstant } = useMemo(() => {
    const V = voltage;
    const C = capacitance * 1e-6; // to Farads
    const R = resistance * 1e3; // to Ohms
    const t = time;

    if (V <= 0 || C <= 0 || R <= 0 || t < 0) {
      return { charge: 0, current: 0, timeConstant: 0 };
    }

    const T = R * C; // Time constant (tau)
    const q = V * (1 - Math.exp(-t / T));
    const i = (V / R) * Math.exp(-t / T);

    return { charge: q, current: i, timeConstant: T };
  }, [voltage, capacitance, resistance, time]);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Capacitor Charging Calculator</CardTitle>
          <CardDescription>Calculate charge and current for an RC circuit over time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voltage">Voltage (V)</Label>
              <Input id="voltage" type="number" value={voltage} onChange={e => setVoltage(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacitance">Capacitance (µF)</Label>
              <Input id="capacitance" type="number" value={capacitance} onChange={e => setCapacitance(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resistance">Resistance (kΩ)</Label>
              <Input id="resistance" type="number" value={resistance} onChange={e => setResistance(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time (s)</Label>
              <Input id="time" type="number" value={time} onChange={e => setTime(Number(e.target.value))} />
            </div>
          </div>
          <Card>
            <CardHeader><CardTitle className="text-xl">Circuit Analysis Results</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Charge (V)</p>
                    <p className="text-2xl font-bold font-headline text-primary">{charge.toFixed(4)}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Current (A)</p>
                    <p className="text-2xl font-bold font-headline text-primary">{current.toFixed(4)}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Time Constant (τ)</p>
                    <p className="text-2xl font-bold font-headline text-primary">{timeConstant.toFixed(4)}</p>
                </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Understanding RC Circuits</CardTitle></CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is an RC circuit?</AccordionTrigger>
              <AccordionContent>
                An RC circuit is an electric circuit composed of resistors and capacitors. When connected to a voltage source, the capacitor charges up over time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is the time constant (τ)?</AccordionTrigger>
              <AccordionContent>
                The time constant (tau, τ) is a measure of how quickly the capacitor charges. It is calculated as `τ = R × C`. After one time constant, the capacitor charges to about 63.2% of the full voltage.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
