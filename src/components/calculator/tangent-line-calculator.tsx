
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";

// Mock parser and derivative functions. In a real-world scenario,
// you would use a robust math library like math.js or similar.
const evaluate = (expr: string, x: number) => {
    try {
        const safeExpr = expr.replace(/\^/g, '**');
        // A very limited, unsafe evaluator for demonstration.
        return new Function('x', `return ${safeExpr}`)(x);
    } catch {
        return NaN;
    }
};

const getDerivative = (expr: string): string => {
    // This is a mock function. A real implementation is very complex.
    if (expr === 'x^2') return '2*x';
    if (expr === 'x^3') return '3*x^2';
    if (expr === 'sin(x)') return 'cos(x)';
    return "Derivative not supported for this function";
}

export default function TangentLineCalculator() {
    const [func, setFunc] = usePersistentState("tangent-func", "x^2");
    const [point, setPoint] = usePersistentState("tangent-point", 2);
    const [solution, setSolution] = useState<any>(null);

    const handleSolve = () => {
        const x = Number(point);
        const y = evaluate(func, x);
        const derivative = getDerivative(func);
        const slope = evaluate(derivative, x);

        if (isNaN(y) || isNaN(slope) || typeof derivative !== 'string') {
            setSolution({ error: "Could not process the function or point." });
            return;
        }

        const yIntercept = y - slope * x;
        const equation = `y = ${slope.toFixed(2)}x ${yIntercept >= 0 ? '+' : '-'} ${Math.abs(yIntercept).toFixed(2)}`;

        setSolution({
            equation,
            steps: [
                `Given function f(x) = ${func} at x = ${x}.`,
                `Find the y-coordinate: f(${x}) = ${y.toFixed(2)}. The point is (${x}, ${y.toFixed(2)}).`,
                `Find the derivative: f'(x) = ${derivative}.`,
                `Evaluate the derivative at x=${x} to find the slope (m): f'(${x}) = ${slope.toFixed(2)}.`,
                `Use the point-slope formula y - y₁ = m(x - x₁): y - ${y.toFixed(2)} = ${slope.toFixed(2)}(x - ${x}).`,
                `Simplify to y = mx + b form: ${equation}.`,
            ]
        })
    };


    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Tangent Line Calculator</CardTitle>
                    <CardDescription>Find the equation of a line tangent to a function at a specific point.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="function">Function f(x)</Label>
                            <Input id="function" value={func} onChange={e => setFunc(e.target.value)} placeholder="e.g., x^2" className="font-mono"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="point">Point x =</Label>
                            <Input id="point" type="number" value={point} onChange={e => setPoint(Number(e.target.value))} />
                        </div>
                    </div>
                    <Button onClick={handleSolve} className="w-full">Find Tangent Line</Button>
                </CardContent>
            </Card>

            <AnimatePresence>
                {solution && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Card>
                            <CardHeader><CardTitle>Solution</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                {solution.error ? (
                                    <p className="text-destructive">{solution.error}</p>
                                ) : (
                                    <>
                                        <div className="text-center">
                                            <h3 className="font-semibold text-lg">Tangent Line Equation</h3>
                                            <p className="text-2xl font-bold font-mono text-primary">{solution.equation}</p>
                                        </div>
                                         <Accordion type="single" collapsible>
                                            <AccordionItem value="steps">
                                                <AccordionTrigger>Show Step-by-Step Solution</AccordionTrigger>
                                                <AccordionContent className="prose dark:prose-invert max-w-none">
                                                    <ol>
                                                        {solution.steps.map((s: string, i: number) => <li key={i}>{s}</li>)}
                                                    </ol>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
