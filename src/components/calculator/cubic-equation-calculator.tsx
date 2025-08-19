
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";

// Helper function to find complex roots of a cubic equation
const solveCubic = (a: number, b: number, c: number, d: number) => {
    if (a === 0) return { roots: ["Not a cubic equation"], steps: [] };

    // Normalize to x^3 + Ax^2 + Bx + C = 0
    const A = b / a;
    const B = c / a;
    const C = d / a;

    const p = B - (A * A) / 3;
    const q = (2 * A * A * A) / 27 - (A * B) / 3 + C;

    const discriminant = (q * q) / 4 + (p * p * p) / 27;

    const steps = [
        `Normalized equation: x³ + ${A.toFixed(2)}x² + ${B.toFixed(2)}x + ${C.toFixed(2)} = 0`,
        `Calculated discriminant: ${discriminant.toFixed(4)}`
    ];

    let roots: string[] = [];

    if (discriminant > 0) {
        steps.push("Discriminant > 0: One real root and two complex conjugate roots.");
        const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
        const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
        const x1 = u + v;
        const realPart = - (u + v) / 2;
        const imagPart = (Math.sqrt(3) / 2) * (u - v);
        roots = [
            `x₁ = ${x1.toFixed(4)}`,
            `x₂ = ${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i`,
            `x₃ = ${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`,
        ];
    } else if (discriminant === 0) {
        steps.push("Discriminant = 0: All three roots are real, with at least two being equal.");
        const u = Math.cbrt(-q / 2);
        const x1 = 2 * u;
        const x2 = -u;
        roots = [
            `x₁ = ${x1.toFixed(4)}`,
            `x₂ = x₃ = ${x2.toFixed(4)}`,
        ];
    } else { // discriminant < 0
        steps.push("Discriminant < 0: All three roots are real and distinct.");
        const r = Math.sqrt(-(p*p*p)/27);
        const phi = Math.acos(-q / (2*r));
        const x1 = 2 * Math.cbrt(r) * Math.cos(phi / 3);
        const x2 = 2 * Math.cbrt(r) * Math.cos((phi + 2 * Math.PI) / 3);
        const x3 = 2 * Math.cbrt(r) * Math.cos((phi + 4 * Math.PI) / 3);
        roots = [
            `x₁ = ${(x1 - A / 3).toFixed(4)}`,
            `x₂ = ${(x2 - A / 3).toFixed(4)}`,
            `x₃ = ${(x3 - A / 3).toFixed(4)}`,
        ];
    }
    
    // Adjust roots for the original equation
    const finalRoots = roots.map(root => {
        if(root.includes("=")){
             const parts = root.split("=");
             const val = parseFloat(parts[1]);
             if(!isNaN(val) && discriminant > 0){
                 return `${parts[0]} = ${(val - A/3).toFixed(4)}`;
             }
             if(root.includes("i")){
                 const real = parseFloat(parts[1].split("+")[0].split("-")[0]);
                 const imagSign = parts[1].includes("+") ? "+" : "-";
                 const imag = parseFloat(parts[1].split("i")[0].split(imagSign)[1]);
                 return `${parts[0]} = ${(real - A/3).toFixed(4)} ${imagSign} ${imag.toFixed(4)}i`;
             }
        }
        return root;
    });

    return { roots: finalRoots, steps };
};


export default function CubicEquationCalculator() {
    const [a, setA] = usePersistentState("cubic-a", 1);
    const [b, setB] = usePersistentState("cubic-b", -6);
    const [c, setC] = usePersistentState("cubic-c", 11);
    const [d, setD] = usePersistentState("cubic-d", -6);
    const [solution, setSolution] = useState<{ roots: string[], steps: string[] } | null>(null);

    const handleSolve = () => {
        setSolution(solveCubic(a,b,c,d));
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Cubic Equation Calculator</CardTitle>
                    <CardDescription>Solve cubic equations of the form ax³ + bx² + cx + d = 0.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center font-mono">
                        <Input type="number" value={a} onChange={e => setA(Number(e.target.value))} aria-label="Coefficient a"/><span>x³ +</span>
                        <Input type="number" value={b} onChange={e => setB(Number(e.target.value))} aria-label="Coefficient b"/><span>x² +</span>
                        <Input type="number" value={c} onChange={e => setC(Number(e.target.value))} aria-label="Coefficient c"/><span>x +</span>
                        <Input type="number" value={d} onChange={e => setD(Number(e.target.value))} aria-label="Coefficient d"/><span>= 0</span>
                    </div>
                    <Button onClick={handleSolve} className="w-full">Solve</Button>
                </CardContent>
            </Card>

            <AnimatePresence>
                {solution && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Card>
                            <CardHeader><CardTitle>Solution</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold">Roots</h3>
                                    <div className="text-xl font-bold font-mono text-primary space-y-1">
                                        {solution.roots.map((root, i) => <p key={i}>{root}</p>)}
                                    </div>
                                </div>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="steps">
                                        <AccordionTrigger>Show Work</AccordionTrigger>
                                        <AccordionContent className="prose dark:prose-invert max-w-none">
                                            <ol>
                                                {solution.steps.map((step, i) => <li key={i}>{step}</li>)}
                                            </ol>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
