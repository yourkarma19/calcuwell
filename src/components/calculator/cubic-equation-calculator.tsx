
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Wrench } from "lucide-react";
import { complex, format, type Complex } from "mathjs";
import { solveCubic } from "@/lib/math/equations";


export default function CubicEquationCalculator() {
    const [a, setA] = usePersistentState("cubic-a", 1);
    const [b, setB] = usePersistentState("cubic-b", -6);
    const [c, setC] = usePersistentState("cubic-c", 11);
    const [d, setD] = usePersistentState("cubic-d", -6);
    const [solution, setSolution] = useState<Complex[] | null>(null);

    const handleSolve = () => {
        setSolution(solveCubic(a,b,c,d));
    }
    
    const formatRoot = (root: Complex) => {
        if (Math.abs(root.im) < 1e-10) {
            return format(root.re, { precision: 4 });
        }
        return format(root, { precision: 4 });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Cubic Equation Calculator</CardTitle>
                    <CardDescription>Solve cubic equations of the form ax³ + bx² + cx + d = 0.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto] gap-x-2 items-center font-mono">
                        <Input type="number" value={a} onChange={e => setA(Number(e.target.value))} aria-label="Coefficient a"/><span>x³ +</span>
                        <Input type="number" value={b} onChange={e => setB(Number(e.target.value))} aria-label="Coefficient b"/><span>x² +</span>
                        <Input type="number" value={c} onChange={e => setC(Number(e.target.value))} aria-label="Coefficient c"/><span>x +</span>
                        <Input type="number" value={d} onChange={e => setD(Number(e.target.value))} aria-label="Coefficient d"/><span>= 0</span>
                    </div>
                    <Button className="w-full" onClick={handleSolve}>Solve</Button>
                </CardContent>
            </Card>

           {solution && (
                <Card>
                    <CardHeader><CardTitle>Roots</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="bg-muted p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">x₁</p>
                            <p className="text-2xl font-bold font-headline text-primary break-words">{formatRoot(solution[0])}</p>
                        </div>
                         <div className="bg-muted p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">x₂</p>
                            <p className="text-2xl font-bold font-headline text-primary break-words">{formatRoot(solution[1])}</p>
                        </div>
                         <div className="bg-muted p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">x₃</p>
                            <p className="text-2xl font-bold font-headline text-primary break-words">{formatRoot(solution[2])}</p>
                        </div>
                    </CardContent>
                </Card>
           )}
        </div>
    );
}

