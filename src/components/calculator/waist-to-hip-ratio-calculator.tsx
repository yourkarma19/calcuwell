
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const whrCategories = {
    male: [
      { range: "< 0.90", risk: "Low Risk" },
      { range: "0.90 - 1.0", risk: "Moderate Risk" },
      { range: "> 1.0", risk: "High Risk" },
    ],
    female: [
      { range: "< 0.80", risk: "Low Risk" },
      { range: "0.80 - 0.85", risk: "Moderate Risk" },
      { range: "> 0.85", risk: "High Risk" },
    ],
};

const getWhrCategory = (whr: number, gender: 'male' | 'female') => {
  if (gender === 'male') {
    if (whr < 0.9) return { category: "Low Risk", color: "text-green-500" };
    if (whr <= 1.0) return { category: "Moderate Risk", color: "text-yellow-500" };
    return { category: "High Risk", color: "text-red-500" };
  } else { // female
    if (whr < 0.8) return { category: "Low Risk", color: "text-green-500" };
    if (whr <= 0.85) return { category: "Moderate Risk", color: "text-yellow-500" };
    return { category: "High Risk", color: "text-red-500" };
  }
};

export default function WaistToHipRatioCalculator() {
  const [gender, setGender] = usePersistentState<'male' | 'female'>("whr-gender", "male");
  const [waist, setWaist] = usePersistentState("whr-waist", 90);
  const [hip, setHip] = usePersistentState("whr-hip", 100);

  const whr = useMemo(() => {
    if (waist > 0 && hip > 0) {
      return waist / hip;
    }
    return 0;
  }, [waist, hip]);
  
  const { category, color } = getWhrCategory(whr, gender);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Measurements (cm)</CardTitle>
            <CardDescription>Calculate your Waist-to-Hip Ratio and understand its health implications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup value={gender} onValueChange={(v) => setGender(v as 'male' | 'female')} className="flex items-center space-x-4 pt-2">
                <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male">Male</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female">Female</Label></div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="waist">Waist Circumference</Label>
                <Input id="waist" type="number" value={waist} onChange={e => setWaist(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hip">Hip Circumference</Label>
                <Input id="hip" type="number" value={hip} onChange={e => setHip(Number(e.target.value))} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Health Risk Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Gender</TableHead>
                        <TableHead>Low Risk</TableHead>
                        <TableHead>Moderate Risk</TableHead>
                        <TableHead>High Risk</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Male</TableCell>
                        <TableCell>{whrCategories.male[0].range}</TableCell>
                        <TableCell>{whrCategories.male[1].range}</TableCell>
                        <TableCell>{whrCategories.male[2].range}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Female</TableCell>
                        <TableCell>{whrCategories.female[0].range}</TableCell>
                        <TableCell>{whrCategories.female[1].range}</TableCell>
                        <TableCell>{whrCategories.female[2].range}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground mt-2">Waist-to-Hip Ratio (WHR) is an indicator of health risk associated with fat distribution. A higher ratio indicates more abdominal fat, which is linked to a higher risk of cardiovascular disease.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>About Waist-to-Hip Ratio (WHR)</CardTitle></CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>The **Waist-to-Hip Ratio (WHR) Calculator** is a simple and effective tool for assessing body fat distribution, which is a key indicator of potential health risks. Unlike BMI, which measures overall weight, WHR focuses on where you store fat. A higher ratio can be a warning sign, helping you take proactive steps towards a healthier lifestyle.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Select your **Gender**.</li>
                <li>Enter your **Waist Circumference** in centimeters.</li>
                <li>Enter your **Hip Circumference** in centimeters.</li>
            </ol>
            <p>The calculator will instantly provide your WHR and classify it into a health risk category (Low, Moderate, or High) based on World Health Organization (WHO) guidelines.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What does WHR indicate about my health?</AccordionTrigger>
                <AccordionContent>
                  Waist-to-Hip Ratio is a measurement of fat distribution. A higher WHR suggests more fat is stored around the abdomen (an "apple" body shape), which is linked to a higher risk of conditions like heart disease, type 2 diabetes, and high blood pressure compared to fat stored on the hips (a "pear" body shape).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I measure my waist and hip circumference correctly?</AccordionTrigger>
                <AccordionContent>
                  For an accurate measurement, use a flexible tape measure and ensure it is level.
                  <ul className="list-disc pl-5 mt-2">
                    <li>**Waist:** Measure at the narrowest point of your torso, usually just above your belly button. Breathe out normally and don't pull the tape too tight.</li>
                    <li>**Hips:** Measure at the widest part of your hips and buttocks.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is WHR better than BMI?</AccordionTrigger>
                <AccordionContent>
                  Neither is "better"; they measure different things and are best used together. BMI assesses your overall weight relative to your height, while WHR assesses how that weight is distributed. A person can have a normal BMI but a high WHR, which could still indicate an increased health risk.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Your Result</CardTitle></CardHeader>
          <CardContent className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Waist-to-Hip Ratio</p>
            <p className="text-5xl font-bold font-headline text-primary">
              {whr.toFixed(2)}
            </p>
            <p className={cn("text-lg font-semibold", color)}>{category}</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
