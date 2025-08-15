
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const bodyFatCategories = {
    women: [
      { range: "10-13%", category: "Essential fat" },
      { range: "14-20%", category: "Athletes" },
      { range: "21-24%", category: "Fitness" },
      { range: "25-31%", category: "Average" },
      { range: "32%+", category: "Obese" },
    ],
    men: [
      { range: "2-5%", category: "Essential fat" },
      { range: "6-13%", category: "Athletes" },
      { range: "14-17%", category: "Fitness" },
      { range: "18-24%", category: "Average" },
      { range: "25%+", category: "Obese" },
    ],
};

const getBfpCategory = (bfp: number, gender: "male" | "female") => {
    if (gender === 'female') {
        if (bfp < 14) return { category: "Essential fat", color: "text-blue-500" };
        if (bfp < 21) return { category: "Athletes", color: "text-green-500" };
        if (bfp < 25) return { category: "Fitness", color: "text-green-500" };
        if (bfp < 32) return { category: "Average", color: "text-yellow-500" };
        return { category: "Obese", color: "text-red-500" };
    } else { // male
        if (bfp < 6) return { category: "Essential fat", color: "text-blue-500" };
        if (bfp < 14) return { category: "Athletes", color: "text-green-500" };
        if (bfp < 18) return { category: "Fitness", color: "text-green-500" };
        if (bfp < 25) return { category: "Average", color: "text-yellow-500" };
        return { category: "Obese", color: "text-red-500" };
    }
};

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

        // US Navy Method
        if (gender === 'male') {
            const bfp = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
            return bfp > 0 ? bfp : null;
        } else {
            const bfp = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
            return bfp > 0 ? bfp : null;
        }
    }, [gender, height, weight, neck, waist, hip]);

    const { category, color } = bodyFatPercentage !== null ? getBfpCategory(bodyFatPercentage, gender) : { category: '-', color: 'text-muted-foreground' };

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
                        <p className="text-xs text-muted-foreground pt-2">This calculator uses the U.S. Navy method, which requires gender, height, neck, and waist measurements. For women, hip measurement is also required.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Body Fat Percentage Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-2">Women</h3>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Percentage</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bodyFatCategories.women.map((item) => (
                                        <TableRow key={item.category}>
                                            <TableCell>{item.category}</TableCell>
                                            <TableCell>{item.range}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Men</h3>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Percentage</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bodyFatCategories.men.map((item) => (
                                        <TableRow key={item.category}>
                                            <TableCell>{item.category}</TableCell>
                                            <TableCell>{item.range}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
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
                        <p className={cn("text-xl font-semibold", color)}>{category}</p>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
