
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

// Emission factors (kg CO2e). Simplified for demonstration.
const emissionFactors = {
  transport: {
    car_gasoline: 0.2, // per km
    car_electric: 0.05, // per km
    bus: 0.1, // per km
    train: 0.04, // per km
  },
  energy: 0.233, // per kWh
  diet: {
    high_meat: 10.2, // kg per day
    medium_meat: 7.2,
    low_meat: 5.6,
    vegetarian: 3.8,
    vegan: 2.9,
  }
};

export default function CarbonFootprintCalculator() {
  const [distance, setDistance] = usePersistentState("cf-distance", 20);
  const [transportMode, setTransportMode] = usePersistentState<keyof typeof emissionFactors.transport>("cf-transport", "car_gasoline");
  const [electricity, setElectricity] = usePersistentState("cf-electricity", 150); // kWh per month
  const [diet, setDiet] = usePersistentState<keyof typeof emissionFactors.diet>("cf-diet", "medium_meat");

  const totalFootprint = useMemo(() => {
    const transportEmissions = distance * 30 * emissionFactors.transport[transportMode]; // monthly
    const electricityEmissions = electricity * emissionFactors.energy; // monthly
    const dietEmissions = emissionFactors.diet[diet] * 30; // monthly
    
    const totalMonthlyKg = transportEmissions + electricityEmissions + dietEmissions;
    return totalMonthlyKg / 1000; // convert to tonnes
  }, [distance, transportMode, electricity, diet]);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
            <CardTitle>Estimate Your Monthly Footprint</CardTitle>
            <CardDescription>Get a rough estimate of your monthly carbon footprint based on your daily commute, energy use, and diet.</CardDescription>
          </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="font-semibold">Daily Commute</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="distance">Distance (km, one way)</Label>
              <Input id="distance" type="number" value={distance} onChange={e => setDistance(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Transport Mode</Label>
              <Select value={transportMode} onValueChange={v => setTransportMode(v as any)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="car_gasoline">Gasoline Car</SelectItem>
                  <SelectItem value="car_electric">Electric Car</SelectItem>
                  <SelectItem value="bus">Bus</SelectItem>
                  <SelectItem value="train">Train</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <h3 className="font-semibold pt-4">Household Energy</h3>
          <div className="space-y-2">
            <Label htmlFor="electricity">Monthly Electricity Usage (kWh)</Label>
            <Input id="electricity" type="number" value={electricity} onChange={e => setElectricity(Number(e.target.value))} />
          </div>
          <h3 className="font-semibold pt-4">Diet</h3>
          <div className="space-y-2">
            <Label>Typical Daily Diet</Label>
            <Select value={diet} onValueChange={v => setDiet(v as any)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="high_meat">High Meat</SelectItem>
                <SelectItem value="medium_meat">Medium Meat</SelectItem>
                <SelectItem value="low_meat">Low Meat</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Your Estimated Footprint</CardTitle></CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">Monthly CO₂e</p>
          <p className="text-5xl font-bold font-headline text-primary my-2">
            {totalFootprint.toFixed(2)}
          </p>
          <p className="text-lg text-muted-foreground">tonnes</p>
          <p className="text-xs text-muted-foreground mt-4">Average is ~1.5 tonnes per month.</p>
        </CardContent>
      </Card>
      <Card>
          <CardHeader><CardTitle>About Your Carbon Footprint</CardTitle></CardHeader>
          <CardContent>
              <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                      <AccordionTrigger>What is a carbon footprint?</AccordionTrigger>
                      <AccordionContent>
                          A carbon footprint is the total amount of greenhouse gases (including carbon dioxide and methane) that are generated by our actions. This calculator provides a simplified estimate based on common daily activities like travel, energy consumption, and diet.
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                      <AccordionTrigger>How can I reduce my carbon footprint?</AccordionTrigger>
                      <AccordionContent>
                          There are many ways to reduce your footprint. Consider using public transport, walking, or cycling instead of driving. Reduce energy consumption at home by using energy-efficient appliances and turning off lights. Reducing meat consumption, especially red meat, can also significantly lower your dietary footprint.
                      </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-3">
                      <AccordionTrigger>Why is this an estimate?</AccordionTrigger>
                      <AccordionContent>
                          Calculating a precise carbon footprint is very complex. It depends on factors like your local power grid's energy sources, the specific model of your car, and the supply chains of the food you eat. This tool uses averages to provide a general idea of your impact.
                      </AccordionContent>
                  </AccordionItem>
              </Accordion>
          </CardContent>
      </Card>
    </div>
  );
}
