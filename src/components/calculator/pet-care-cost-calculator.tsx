
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function PetCareCostCalculator() {
  const [petType, setPetType] = usePersistentState<string>("pet-care-type", "dog");
  const [foodCost, setFoodCost] = usePersistentState("pet-care-food", 50);
  const [vetVisits, setVetVisits] = usePersistentState("pet-care-vet-visits", 2);
  const [costPerVetVisit, setCostPerVetVisit] = usePersistentState("pet-care-vet-cost", 100);
  const [groomingSessions, setGroomingSessions] = usePersistentState("pet-care-grooming-sessions", 4);
  const [costPerGrooming, setCostPerGrooming] = usePersistentState("pet-care-grooming-cost", 60);
  const [miscCost, setMiscCost] = usePersistentState("pet-care-misc", 20);

  const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

  const { monthlyCost, yearlyCost, costBreakdown } = useMemo(() => {
    const annualFood = foodCost * 12;
    const annualVet = vetVisits * costPerVetVisit;
    const annualGrooming = groomingSessions * costPerGrooming;
    const annualMisc = miscCost * 12;
    
    const total = annualFood + annualVet + annualGrooming + annualMisc;
    const breakdown = {
        "Food": annualFood,
        "Veterinary Care": annualVet,
        "Grooming": annualGrooming,
        "Toys & Miscellaneous": annualMisc,
    }

    return { 
        monthlyCost: total / 12, 
        yearlyCost: total,
        costBreakdown: breakdown,
    };
  }, [foodCost, vetVisits, costPerVetVisit, groomingSessions, costPerGrooming, miscCost]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pet Care Cost Calculator</CardTitle>
            <CardDescription>Estimate the annual and monthly costs of caring for your pet.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label>Pet Type</Label>
                <Select value={petType} onValueChange={setPetType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="rabbit">Rabbit</SelectItem>
                        <SelectItem value="bird">Bird</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="food">Monthly Food Cost</Label><Input id="food" type="number" value={foodCost} onChange={e => setFoodCost(Number(e.target.value))} /></div>
                <div className="space-y-2"><Label htmlFor="misc">Monthly Misc. (Toys, Treats)</Label><Input id="misc" type="number" value={miscCost} onChange={e => setMiscCost(Number(e.target.value))} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="vet-visits">Annual Vet Visits</Label><Input id="vet-visits" type="number" value={vetVisits} onChange={e => setVetVisits(Number(e.target.value))} /></div>
                <div className="space-y-2"><Label htmlFor="vet-cost">Avg. Cost per Vet Visit</Label><Input id="vet-cost" type="number" value={costPerVetVisit} onChange={e => setCostPerVetVisit(Number(e.target.value))} /></div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="grooming-sessions">Annual Grooming Sessions</Label><Input id="grooming-sessions" type="number" value={groomingSessions} onChange={e => setGroomingSessions(Number(e.target.value))} /></div>
                <div className="space-y-2"><Label htmlFor="grooming-cost">Avg. Cost per Session</Label><Input id="grooming-cost" type="number" value={costPerGrooming} onChange={e => setCostPerGrooming(Number(e.target.value))} /></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Tips to Save on Pet Care</CardTitle></CardHeader>
          <CardContent>
             <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Buy Food in Bulk</AccordionTrigger>
                    <AccordionContent>
                       Purchasing larger bags of pet food is almost always cheaper per kilogram than buying smaller bags frequently. Look for sales and stock up.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-2">
                    <AccordionTrigger>Prioritize Preventative Care</AccordionTrigger>
                    <AccordionContent>
                       Regular check-ups, vaccinations, and dental care can prevent more serious and expensive health problems down the line. It's an investment in their health and your wallet.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Consider Pet Insurance</AccordionTrigger>
                    <AccordionContent>
                       While it's a monthly expense, pet insurance can save you from massive, unexpected vet bills in the case of an accident or serious illness.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Estimated Costs</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
                <p className="text-sm text-muted-foreground">Total Yearly Cost</p>
                <p className="text-4xl font-bold font-headline text-primary">{formatCurrency(yearlyCost)}</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Average Monthly Cost</p>
                <p className="text-2xl font-semibold">{formatCurrency(monthlyCost)}</p>
            </div>
            <div className="space-y-2 text-sm pt-4 border-t">
                {Object.entries(costBreakdown).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                        <span>{key}:</span>
                        <span className="font-semibold">{formatCurrency(value)}</span>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
