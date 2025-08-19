
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { rationalize } from "mathjs";

export default function PartialFractionCalculator() {
    const [expression, setExpression] = useState("(x^2 + 1) / (x^3 - x^2 + 2x - 2)");
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDecompose = () => {
        try {
            setError(null);
            const simplified = rationalize(expression, {}, true);
            
            if (!simplified || !simplified.expression) {
                throw new Error("Could not simplify the expression.");
            }
            
            setResult(simplified.expression.toString());

        } catch (e: any) {
            setError(e.message || "Failed to parse or decompose the expression.");
            setResult(null);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Partial Fraction Calculator</CardTitle>
                    <CardDescription>Solve partial fraction decomposition problems.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="expression-input">Enter a rational function f(x)</Label>
                        <Input
                            id="expression-input"
                            value={expression}
                            onChange={e => setExpression(e.target.value)}
                            className="font-mono text-lg"
                        />
                    </div>
                    <Button className="w-full" onClick={handleDecompose}>Decompose</Button>
                </CardContent>
            </Card>

            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {result && (
                <Card>
                    <CardHeader><CardTitle>Result</CardTitle></CardHeader>
                    <CardContent className="text-center">
                        <p className="text-sm text-muted-foreground">Decomposed Expression</p>
                        <p className="text-3xl font-bold font-mono text-primary break-words">
                            {result}
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
