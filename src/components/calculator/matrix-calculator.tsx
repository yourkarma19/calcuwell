
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// For simplicity, we'll use a fixed 2x2 matrix
const MATRIX_SIZE = 2;

export default function MatrixCalculator() {
  const [matrixA, setMatrixA] = usePersistentState("matrix-a", [[1, 2], [3, 4]]);
  const [matrixB, setMatrixB] = usePersistentState("matrix-b", [[5, 6], [7, 8]]);
  const [operation, setOperation] = usePersistentState<"add" | "subtract">("matrix-op", "add");

  const handleMatrixChange = (matrix: "A" | "B", row: number, col: number, value: string) => {
    const setter = matrix === "A" ? setMatrixA : setMatrixB;
    const currentMatrix = matrix === "A" ? matrixA : matrixB;
    const newMatrix = currentMatrix.map(r => [...r]);
    const intValue = parseInt(value, 10);
    newMatrix[row][col] = isNaN(intValue) ? 0 : intValue;
    setter(newMatrix);
  };

  const resultMatrix = useMemo(() => {
    return matrixA.map((row, rIndex) => 
        row.map((_, cIndex) => {
            if (operation === 'add') {
                return (matrixA[rIndex][cIndex] || 0) + (matrixB[rIndex][cIndex] || 0);
            } else {
                return (matrixA[rIndex][cIndex] || 0) - (matrixB[rIndex][cIndex] || 0);
            }
        })
    );
  }, [matrixA, matrixB, operation]);

  const MatrixInput = ({ matrix, name }: { matrix: number[][], name: "A" | "B" }) => (
    <div className="space-y-2">
        <Label>Matrix {name}</Label>
        <div className="space-y-1" role="grid" aria-label={`Matrix ${name}`}>
            {matrix.map((row, rIndex) => (
                <div key={rIndex} className="flex gap-1" role="row">
                    {row.map((val, cIndex) => (
                        <Input key={cIndex} type="number" value={val} onChange={e => handleMatrixChange(name, rIndex, cIndex, e.target.value)} aria-label={`Matrix ${name} Row ${rIndex + 1} Column ${cIndex + 1}`} role="gridcell" />
                    ))}
                </div>
            ))}
        </div>
    </div>
  );

  return (
    <div className="lg:col-span-3">
        <Card>
            <CardHeader>
                <CardTitle>Matrix Calculator</CardTitle>
                <CardDescription>Perform addition and subtraction on 2x2 matrices.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MatrixInput matrix={matrixA} name="A" />
                    <MatrixInput matrix={matrixB} name="B" />
                </div>
                <div className="space-y-2">
                    <Label>Operation</Label>
                     <RadioGroup value={operation} onValueChange={(v) => setOperation(v as any)} className="flex items-center space-x-4 pt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="add" id="add" /><Label htmlFor="add">Addition</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="subtract" id="sub" /><Label htmlFor="sub">Subtraction</Label></div>
                    </RadioGroup>
                </div>
                <div>
                    <Label>Result</Label>
                    <div className="p-4 bg-muted rounded-md text-center text-xl font-bold" aria-live="polite">
                        {resultMatrix.map((row, rIndex) => (
                            <div key={rIndex} className="flex justify-center gap-4">
                                {row.map((val, cIndex) => <span key={cIndex}>{val}</span>)}
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
