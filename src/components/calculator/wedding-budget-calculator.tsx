
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";


export default function WeddingBudgetCalculator() {
  const [guests, setGuests] = usePersistentState("wedding-guests", 100);
  const [venue, setVenue] = usePersistentState("wedding-venue", 5000);
  const [cateringPerPlate, setCateringPerPlate] = usePersistentState("wedding-catering", 75);
  const [photography, setPhotography] = usePersistentState("wedding-photo", 3000);
  const [dress, setDress] = usePersistentState("wedding-dress", 2000);
  const [decor, setDecor] = usePersistentState("wedding-decor", 1500);
  const [misc, setMisc] = usePersistentState("wedding-misc", 1000);

  const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

  const { totalCost, chartData } = useMemo(() => {
    const cateringCost = cateringPerPlate * guests;
    const total = venue + cateringCost + photography + dress + decor + misc;
    
    const data = [
        { name: "Venue", value: venue, fill: "hsl(var(--chart-1))" },
        { name: "Catering", value: cateringCost, fill: "hsl(var(--chart-2))" },
        { name: "Photography", value: photography, fill: "hsl(var(--chart-3))" },
        { name: "Dress & Attire", value: dress, fill: "hsl(var(--chart-4))" },
        { name: "Decorations", value: decor, fill: "hsl(var(--chart-5))" },
        { name: "Miscellaneous", value: misc, fill: "hsl(var(--chart-2))" },
    ].filter(item => item.value > 0);

    return { totalCost: total, chartData: data };
  }, [guests, venue, cateringPerPlate, photography, dress, decor, misc]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Wedding Budget Calculator</CardTitle>
          <CardDescription>Estimate the total cost of your wedding by filling in the details below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Number of Guests</Label>
            <div className="flex items-center gap-4">
              <Slider value={[guests]} onValueChange={v => setGuests(v[0])} min={10} max={500} step={5} />
              <Input type="number" value={guests} onChange={e => setGuests(Number(e.target.value))} className="w-24" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label htmlFor="venue">Venue Cost</Label><Input id="venue" type="number" value={venue} onChange={e => setVenue(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label htmlFor="catering">Catering (per plate)</Label><Input id="catering" type="number" value={cateringPerPlate} onChange={e => setCateringPerPlate(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label htmlFor="photo">Photography</Label><Input id="photo" type="number" value={photography} onChange={e => setPhotography(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label htmlFor="dress">Dress & Attire</Label><Input id="dress" type="number" value={dress} onChange={e => setDress(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label htmlFor="decor">Decorations</Label><Input id="decor" type="number" value={decor} onChange={e => setDecor(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label htmlFor="misc">Miscellaneous</Label><Input id="misc" type="number" value={misc} onChange={e => setMisc(Number(e.target.value))} /></div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Total Estimated Cost</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-5xl font-bold font-headline text-primary">
              {formatCurrency(totalCost)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Cost Breakdown</CardTitle></CardHeader>
        <CardContent className="h-[25rem]">
            <ChartContainer config={{}} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                      <Tooltip
                      cursor={false}
                      content={<ChartTooltipContent 
                          formatter={(value) => formatCurrency(Number(value))}
                          />}
                      />
                      <Pie data={chartData} dataKey="value" nameKey="name" innerRadius="50%" outerRadius="80%" strokeWidth={2}>
                          {chartData.map((entry) => (
                              <Cell key={entry.name} fill={entry.fill} />
                          ))}
                      </Pie>
                      <ChartLegend content={<ChartLegendContent />} />
                  </PieChart>
              </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
