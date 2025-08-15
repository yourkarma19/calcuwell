"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader><CardTitle>Estimate Your Monthly Footprint</CardTitle></CardHeader>
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
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
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
      </div>
    </>
  );
}
