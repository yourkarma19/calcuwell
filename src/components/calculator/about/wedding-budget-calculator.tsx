"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
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
       <Card>
            <CardHeader>
                <CardTitle as="h2">How to Plan Your Wedding Budget</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Our **Wedding Budget Calculator** is designed to help you plan and manage the financial aspect of your special day. By breaking down the costs into key categories, you can get a realistic estimate of your total expenses and see where your money is going. This is the first step to a stress-free wedding planning experience.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Start by setting the **Number of Guests** you plan to invite. This is the biggest factor affecting your costs.</li>
                    <li>Enter your estimated costs for each category, such as the **Venue**, **Catering**, **Photography**, and **Decor**.</li>
                    <li>Use the "Miscellaneous" field to account for other expenses like invitations, entertainment, or wedding rings.</li>
                </ol>
                <p>The calculator will instantly update the total estimated cost and show a visual breakdown in the pie chart.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What are the biggest wedding expenses?</AccordionTrigger>
                        <AccordionContent>
                            Typically, the venue and catering are the largest parts of a wedding budget, often accounting for 50% or more of the total cost. The number of guests you invite has a direct impact on this, as catering is usually priced per person.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How can we save money on our wedding?</AccordionTrigger>
                        <AccordionContent>
                            There are many ways to save! Consider having your wedding on a weekday or during the off-season. Trimming the guest list is the most effective way to cut costs. You can also explore DIY options for decorations or choose a less formal catering style, like a buffet instead of a plated dinner.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How much should we budget for unexpected costs?</AccordionTrigger>
                        <AccordionContent>
                           It's wise to set aside about 5-10% of your total budget as a contingency fund. This will help you cover any unexpected expenses that arise without adding stress. The "Miscellaneous" category in our calculator can be used for this.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    </div>
  );
}