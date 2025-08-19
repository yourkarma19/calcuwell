
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type EquationForm = "slope-intercept" | "standard" | "point-slope";

export default function InterceptCalculator() {
    const [form, setForm] = usePersistentState<EquationForm>("intercept-form", "slope-intercept");

    // State for y = mx + b
    const [m, setM] = usePersistentState("intercept-m", 2);
    const [b, setB] = usePersistentState("intercept-b", -4);

    // State for Ax + By = C
    const [valA, setValA] = usePersistentState("intercept-A", 2);
    const [valB, setValB] = usePersistentState("intercept-B", 3);
    const [valC, setValC] = usePersistentState("intercept-C", 6);
    
    const [showSolution, setShowSolution] = useState(false);

    const { xIntercept, yIntercept, steps } = useMemo(() => {
        let xInt, yInt, calcSteps;

        switch (form) {
            case "slope-intercept":
                // y = mx + b
                yInt = { x: 0, y: b };
                 if (m === 0) { // Horizontal line
                    xInt = b === 0 ? {x: Infinity, y: 0} : {x: NaN, y: 0} // All points if y=0, else none
                } else {
                    xInt = { x: -b / m, y: 0 };
                }
                calcSteps = {
                    yIntercept: `Set x = 0: y = ${m}(0) + ${b}  => y = ${b}`,
                    xIntercept: `Set y = 0: 0 = ${m}x + ${b} => ${m}x = ${-b} => x = ${-b / m}`
                };
                break;
            
            case "standard":
                // Ax + By = C
                yInt = valB !== 0 ? { x: 0, y: valC / valB } : { x: 0, y: NaN }; // No y-intercept if B=0 (vertical line)
                xInt = valA !== 0 ? { x: valC / valA, y: 0 } : { x: NaN, y: 0 }; // No x-intercept if A=0 (horizontal line)
                calcSteps = {
                    yIntercept: `Set x = 0: A(0) + By = C => ${valB}y = ${valC} => y = ${valC / valB}`,
                    xIntercept: `Set y = 0: Ax + B(0) = C => ${valA}x = ${valC} => x = ${valC / valA}`
                };
                break;
            default:
                 yInt = { x: 0, y: 0 };
                 xInt = { x: 0, y: 0 };
                 calcSteps = { yIntercept: "", xIntercept: ""};
        }
        
        return { xIntercept: xInt, yIntercept: yInt, steps: calcSteps };
    }, [form, m, b, valA, valB, valC]);
    
    const handleCalculate = () => {
        setShowSolution(true);
    };

    const formatPoint = (point: { x: number, y: number }) => {
        if (isNaN(point.x) || isNaN(point.y)) return "None";
        if (!isFinite(point.x) || !isFinite(point.y)) return "Infinite";
        return `(${point.x.toFixed(2).replace('.00', '')}, ${point.y.toFixed(2).replace('.00', '')})`;
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Equation Details</CardTitle>
                    <CardDescription>Select the form of your linear equation and enter the values.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Equation Form</Label>
                        <Select value={form} onValueChange={(v) => { setForm(v as EquationForm); setShowSolution(false); }}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="slope-intercept">Slope-Intercept (y = mx + b)</SelectItem>
                                <SelectItem value="standard">Standard Form (Ax + By = C)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {form === 'slope-intercept' && (
                        <div className="grid grid-cols-2 gap-4 items-center">
                            <Label className="text-center text-lg font-mono">y =</Label>
                            <div className="flex items-center gap-2">
                                <Input type="number" value={m} onChange={e => setM(Number(e.target.value))} aria-label="m value"/>
                                <span className="font-mono text-lg">x +</span>
                                <Input type="number" value={b} onChange={e => setB(Number(e.target.value))} aria-label="b value"/>
                            </div>
                        </div>
                    )}
                     {form === 'standard' && (
                        <div className="flex items-center gap-2 font-mono text-lg">
                           <Input type="number" value={valA} onChange={e => setValA(Number(e.target.value))} aria-label="A value" className="w-20"/>
                           <span>x +</span>
                           <Input type="number" value={valB} onChange={e => setValB(Number(e.target.value))} aria-label="B value" className="w-20"/>
                           <span>y =</span>
                           <Input type="number" value={valC} onChange={e => setValC(Number(e.target.value))} aria-label="C value" className="w-20"/>
                        </div>
                    )}

                    <Button onClick={handleCalculate} className="w-full">Find Intercepts</Button>
                </CardContent>
            </Card>

            {showSolution && (
                <Card>
                    <CardHeader><CardTitle>Solution</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                            <div className="bg-muted p-4 rounded-lg">
                                <p className="text-sm text-muted-foreground">X-Intercept</p>
                                <p className="text-3xl font-bold font-headline text-primary">{formatPoint(xIntercept)}</p>
                            </div>
                            <div className="bg-muted p-4 rounded-lg">
                                <p className="text-sm text-muted-foreground">Y-Intercept</p>
                                <p className="text-3xl font-bold font-headline text-primary">{formatPoint(yIntercept)}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold">Finding the Y-Intercept (Set x=0)</h3>
                                <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded-md">{steps.yIntercept}</p>
                            </div>
                             <div>
                                <h3 className="font-semibold">Finding the X-Intercept (Set y=0)</h3>
                                <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded-md">{steps.xIntercept}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
