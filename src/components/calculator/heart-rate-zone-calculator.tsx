
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
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our **Heart Rate Zone Calculator** is a vital tool for anyone looking to optimize their cardiovascular workouts. By calculating your personalized training zones, you can ensure you are exercising at the right intensity to meet your specific fitness goals, whether that's burning fat, improving endurance, or boosting your peak performance. This tool uses the Karvonen formula for a more accurate, personalized result.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter your **Age** in years.</li>
                <li>Enter your **Resting Heart Rate** in beats per minute (BPM). You can find this by checking your pulse after resting for several minutes.</li>
            </ol>
            <p>The calculator will instantly display your five training zones and your estimated maximum heart rate.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What are heart rate zones?</AccordionTrigger>
                <AccordionContent>
                  Heart rate zones are ranges based on a percentage of your maximum heart rate. Training in different zones stimulates different physiological responses. For example, Zone 2 is ideal for building aerobic base and burning fat, while Zone 4 helps improve your anaerobic threshold and speed.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What is the Karvonen formula?</AccordionTrigger>
                <AccordionContent>
                  The Karvonen formula is a popular method for calculating target heart rate zones because it takes your **resting heart rate** into account. This makes it more personalized than simpler formulas that only use age to estimate maximum heart rate. It calculates your Heart Rate Reserve (Max HR - Resting HR) to define more accurate training intensities.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How do I find my resting heart rate?</AccordionTrigger>
                <AccordionContent>
                  The best time to measure your resting heart rate is in the morning, shortly after you wake up and before you get out of bed. Place your index and middle fingers on your wrist or neck to find your pulse. Count the number of beats in 60 seconds. Do this for a few consecutive days and take the average for the most accurate result.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Is this calculator 100% accurate?</AccordionTrigger>
                <AccordionContent>
                  This calculator provides a very good estimate for most people. However, the `220 - age` formula for maximum heart rate is a general guideline. Your true maximum heart rate can be influenced by genetics and fitness level. For a precise measurement, a clinical stress test is required.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
    </div>
  );
}
