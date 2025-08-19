
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import usePersistentState from "@/hooks/use-persistent-state";

interface Solution {
    finalAnswer: string;
    steps: {
        factoredDenominator: string;
        setup: string;
        coefficients: string[];
    }
}

export default function PartialFractionCalculator() {
    const [expression, setExpression] = usePersistentState("partial-fraction-expr", "(x-1)/(x^2+x)");
    const [solution, setSolution] = useState<Solution | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSolve = () => {
        // In a real application, this would call a backend service or a robust math library.
        // For this example, we will mock the result for the default expression.
        if (expression === "(x-1)/(x^2+x)") {
            setSolution({
                finalAnswer: "-1/x + 2/(x+1)",
                steps: {
                    factoredDenominator: "x(x+1)",
                    setup: "(x-1)/(x(x+1)) = A/x + B/(x+1)",
                    coefficients: [
                        "Multiply by x(x+1): x-1 = A(x+1) + Bx",
                        "To find A, let x = 0: 0-1 = A(0+1) + B(0) => -1 = A",
                        "To find B, let x = -1: -1-1 = A(-1+1) + B(-1) => -2 = -B => B = 2"
                    ]
                }
            });
            setError(null);
        } else {
            setError("Sorry, the mock calculation for this expression is not implemented. Please use the example (x-1)/(x^2+x).");
            setSolution(null);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Partial Fraction Calculator</CardTitle>
                    <CardDescription>Solve partial fraction decomposition problems and get a full, step-by-step solution.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="expression-input">Enter a rational function (e.g., (x-1)/(x^2+x))</Label>
                        <Input 
                            id="expression-input" 
                            value={expression}
                            onChange={e => setExpression(e.target.value)}
                            className="font-mono text-lg"
                        />
                    </div>
                    <Button onClick={handleSolve} className="w-full">Decompose</Button>
                </CardContent>
            </Card>

            <AnimatePresence>
                {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Card className="border-destructive">
                            <CardHeader>
                                <CardTitle className="text-destructive">Error</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{error}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {solution && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Card>
                            <CardHeader>
                                <CardTitle><h2>Solution</h2></CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg">Final Answer</h3>
                                    <div className="p-4 bg-muted rounded-md mt-2 font-mono text-xl text-primary text-center">
                                        {solution.finalAnswer}
                                    </div>
                                </div>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                            <h2 className="text-lg font-semibold">Show Step-by-Step Breakdown</h2>
                                        </AccordionTrigger>
                                        <AccordionContent className="prose dark:prose-invert max-w-none">
                                            <h4>Step 1: Factor the Denominator</h4>
                                            <p>The denominator `x²+x` factors to `{solution.steps.factoredDenominator}`.</p>
                                            
                                            <h4>Step 2: Set Up the Partial Fraction Form</h4>
                                            <p>Based on the factors, we set up the equation with unknown coefficients (A, B, etc.):</p>
                                            <pre><code>{solution.steps.setup}</code></pre>
                                            
                                            <h4>Step 3: Solve for Coefficients</h4>
                                            <p>We can find the values of A and B by clearing the denominators and substituting convenient values for x.</p>
                                            <ul>
                                                {solution.steps.coefficients.map((step, i) => <li key={i}>{step}</li>)}
                                            </ul>

                                            <h4>Step 4: Final Result</h4>
                                            <p>Substitute the coefficients back into the form to get the final answer:</p>
                                            <pre><code>{solution.finalAnswer}</code></pre>
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
