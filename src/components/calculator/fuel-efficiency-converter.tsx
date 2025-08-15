
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";

// Conversions:
// 1 MPG = 235.215 L/100km
// 1 L/100km = 235.215 / 1 MPG

export default function FuelEfficiencyConverter() {
    const [isMpgToL, setIsMpgToL] = useState(true);
    const [value, setValue] = useState("25");

    const result = useMemo(() => {
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue === 0) return "";
        
        if (isMpgToL) {
            // MPG to L/100km
            return (235.215 / numValue).toFixed(2);
        } else {
            // L/100km to MPG
            return (235.215 / numValue).toFixed(2);
        }
    }, [value, isMpgToL]);

    const handleSwap = () => {
        setValue(result);
        setIsMpgToL(!isMpgToL);
    };

    const fromLabel = isMpgToL ? "Miles per Gallon (MPG)" : "Liters per 100km (L/100km)";
    const toLabel = isMpgToL ? "Liters per 100km (L/100km)" : "Miles per Gallon (MPG)";
    
    return (
        <div className="lg:col-span-3">
            <Card>
                <CardHeader><CardTitle>Fuel Efficiency Converter</CardTitle></CardHeader>
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
