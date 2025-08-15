
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";

export default function AngleConverter() {
    const [isDegreesToRadians, setIsDegreesToRadians] = useState(true);
    const [value, setValue] = usePersistentState("angle-converter-value", "180");

    const result = useMemo(() => {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) return "";
        
        if (isDegreesToRadians) {
            // Degrees to Radians
            return (numValue * (Math.PI / 180)).toFixed(4);
        } else {
            // Radians to Degrees
            return (numValue * (180 / Math.PI)).toFixed(4);
        }
    }, [value, isDegreesToRadians]);

    const handleSwap = () => {
        setValue(result);
        setIsDegreesToRadians(!isDegreesToRadians);
    };

    const fromLabel = isDegreesToRadians ? "Degrees (°)" : "Radians (rad)";
    const toLabel = isDegreesToRadians ? "Radians (rad)" : "Degrees (°)";
    
    return (
        <div className="lg:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle>Angle Converter</CardTitle>
                    <CardDescription>Quickly convert angle values between degrees and radians. Use the swap button to change the conversion direction.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-full space-y-2">
                            <Label htmlFor="from-value">{fromLabel}</Label>
                            <Input 
                                id="from-value"
                                type="number"
                                value={value} 
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </div>
                        <Button variant="ghost" size="icon" className="shrink-0 mt-4 md:mt-7" onClick={handleSwap}>
                            <ArrowRightLeft className="w-5 h-5 text-primary" />
                        </Button>
                        <div className="w-full space-y-2">
                            <Label htmlFor="to-value">{toLabel}</Label>
                            <Input 
                                id="to-value"
                                value={result} 
                                readOnly 
                                className="font-bold text-primary bg-primary/10 border-primary/20"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
