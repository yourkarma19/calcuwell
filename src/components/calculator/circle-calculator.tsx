"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePersistentState from "@/hooks/use-persistent-state";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function CircleCalculator() {
    const [inputType, setInputType] = useState<"radius" | "diameter" | "circumference" | "area">("radius");
    const [value, setValue] = usePersistentState("circle-value", 10);

    const { radius, diameter, circumference, area } = useMemo(() => {
        const val = Number(value);
        if (val <= 0) return { radius: 0, diameter: 0, circumference: 0, area: 0 };
        
        let r = 0;
        switch (inputType) {
            case 'radius': r = val; break;
            case 'diameter': r = val / 2; break;
            case 'circumference': r = val / (2 * Math.PI); break;
            case 'area': r = Math.sqrt(val / Math.PI); break;
        }

        return {
            radius: r,
            diameter: r * 2,
            circumference: 2 * Math.PI * r,
            area: Math.PI * r * r,
        }

    }, [inputType, value]);

    return (
        <>
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader><CardTitle>Enter Circle Measurement</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Input Type</Label>
                                <Select value={inputType} onValueChange={(v) => setInputType(v as any)}>
                                    <SelectTrigger><SelectValue/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="radius">Radius</SelectItem>
                                        <SelectItem value="diameter">Diameter</SelectItem>
                                        <SelectItem value="circumference">Circumference</SelectItem>
                                        <SelectItem value="area">Area</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="value" className="capitalize">{inputType}</Label>
                                <Input id="value" type="number" value={value} onChange={e => setValue(Number(e.target.value))} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
             <div className="lg:col-span-1">
                <Card className="sticky top-24">
                    <CardHeader><CardTitle>Circle Properties</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Radius</p>
                            <p className="font-semibold">{radius.toFixed(4)}</p>
                        </div>
                         <div className="flex justify-between">
                            <p className="text-muted-foreground">Diameter</p>
                            <p className="font-semibold">{diameter.toFixed(4)}</p>
                        </div>
                         <div className="flex justify-between">
                            <p className="text-muted-foreground">Circumference</p>
                            <p className="font-semibold">{circumference.toFixed(4)}</p>
                        </div>
                         <div className="flex justify-between">
                            <p className="text-muted-foreground">Area</p>
                            <p className="font-semibold">{area.toFixed(4)}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
