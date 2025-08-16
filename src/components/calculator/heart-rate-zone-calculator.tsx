
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const zones = [
  { name: 'Zone 1: Very Light', percentage: '50-60%', color: 'bg-blue-200' },
  { name: 'Zone 2: Light', percentage: '60-70%', color: 'bg-green-200' },
  { name: 'Zone 3: Moderate', percentage: '70-80%', color: 'bg-yellow-200' },
  { name: 'Zone 4: Hard', percentage: '80-90%', color: 'bg-orange-200' },
  { name: 'Zone 5: Maximum', percentage: '90-100%', color: 'bg-red-200' },
];

export default function HeartRateZoneCalculator() {
  const [age, setAge] = usePersistentState("hrz-age", 30);
  const [restingHr, setRestingHr] = usePersistentState("hrz-resting", 65);

  const { maxHr, heartRateZones } = useMemo(() => {
    const maxHeartRate = 220 - age;
    const reserveHr = maxHeartRate - restingHr;

    const zonesData = [
      { min: restingHr + reserveHr * 0.5, max: restingHr + reserveHr * 0.6 },
      { min: restingHr + reserveHr * 0.6, max: restingHr + reserveHr * 0.7 },
      { min: restingHr + reserveHr * 0.7, max: restingHr + reserveHr * 0.8 },
      { min: restingHr + reserveHr * 0.8, max: restingHr + reserveHr * 0.9 },
      { min: restingHr + reserveHr * 0.9, max: restingHr + reserveHr * 1.0 },
    ];

    return { maxHr: maxHeartRate, heartRateZones: zonesData };
  }, [age, restingHr]);

  return (
    <div className="lg:col-span-3 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Details</CardTitle>
            <CardDescription>Calculate your target heart rate zones for effective workouts using the Karvonen formula.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" value={age} onChange={e => setAge(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resting-hr">Resting Heart Rate (BPM)</Label>
                <Input id="resting-hr" type="number" value={restingHr} onChange={e => setRestingHr(Number(e.target.value))} />
              </div>
          </CardContent>
        </Card>
      
        <Card>
          <CardHeader>
            <CardTitle>Your Heart Rate Zones (Karvonen Formula)</CardTitle>
            <CardContent className="pt-4">
              <p className="text-center mb-4">Maximum Heart Rate: <span className="font-bold text-primary">{maxHr} BPM</span></p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zone</TableHead>
                    <TableHead>Intensity</TableHead>
                    <TableHead className="text-right">Heart Rate Range (BPM)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {zones.map((zone, index) => (
                    <TableRow key={zone.name}>
                      <TableCell className="font-medium">
                        <span className={cn("p-1 rounded-sm", zone.color)}>{zone.name}</span>
                      </TableCell>
                      <TableCell>{zone.percentage}</TableCell>
                      <TableCell className="text-right font-mono">{`${heartRateZones[index].min.toFixed(0)} - ${heartRateZones[index].max.toFixed(0)}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader><CardTitle>About Heart Rate Zones</CardTitle></CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What are heart rate zones?</AccordionTrigger>
                <AccordionContent>
                  Heart rate zones are ranges based on a percentage of your maximum heart rate. Training in different zones helps you achieve specific fitness goals, such as burning fat, improving endurance, or increasing your anaerobic threshold.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What is the Karvonen formula?</AccordionTrigger>
                <AccordionContent>
                  The Karvonen formula is a method for calculating target heart rate zones that takes your resting heart rate into account, making it more personalized than methods that only use your maximum heart rate.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
    </div>
  );
}
