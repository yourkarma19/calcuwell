"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function BodyFatPercentageCalculator() {
    const [gender, setGender] = usePersistentState<'male' | 'female'>("bfp-gender", "male");
    const [height, setHeight] = usePersistentState("bfp-height", 175);
    const [weight, setWeight] = usePersistentState("bfp-weight", 70);
    const [neck, setNeck] = usePersistentState("bfp-neck", 38);
    const [waist, setWaist] = usePersistentState("bfp-waist", 85);
    const [hip, setHip] = usePersistentState("bfp-hip", 95);

    const bodyFatPercentage = useMemo(() => {
        if(height <= 0 || weight <= 0 || neck <= 0 || waist <= 0 || (gender === 'female' && hip <= 0)) {
            return null;
        }

        if (gender === 'male') {
            const bfp = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
            return bfp > 0 ? bfp : null;
        } else {
            const bfp = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
            return bfp > 0 ? bfp : null;
        }
    }, [gender, height, weight, neck, waist, hip]);

    return (
        <>
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader><CardTitle>Enter Your Measurements</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label>Gender</Label>
                            <RadioGroup value={gender} onValueChange={(v) => setGender(v as 'male'|'female')} className="flex items-center space-x-4 pt-2">
                                <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male">Male</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female">Female</Label></div>
                            </RadioGroup>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="height">Height (cm)</Label>
                                <Input id="height" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="weight">Weight (kg)</Label>
                                <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="neck">Neck (cm)</Label>
                                <Input id="neck" type="number" value={neck} onChange={(e) => setNeck(Number(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="waist">Waist (cm)</Label>
                                <Input id="waist" type="number" value={waist} onChange={(e) => setWaist(Number(e.target.value))} />
                            </div>
                        </div>
                        {gender === 'female' && (
                            <div className="space-y-2">
                                <Label htmlFor="hip">Hip (cm)</Label>
                                <Input id="hip" type="number" value={hip} onChange={(e) => setHip(Number(e.target.value))} />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1">
                <Card className="sticky top-24">
                    <CardHeader><CardTitle>Your Body Fat</CardTitle></CardHeader>
                    <CardContent className="text-center">
                        <p className="text-sm text-muted-foreground">Body Fat Percentage (BFP)</p>
                        <p className="text-6xl font-bold font-headline text-primary my-2">
                            {bodyFatPercentage !== null ? bodyFatPercentage.toFixed(1) : '-'}%
                        </p>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
