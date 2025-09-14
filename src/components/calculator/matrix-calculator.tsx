"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import usePersistentState from "@/hooks/use-persistent-state";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a matrix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A matrix is a rectangular grid of numbers arranged in rows and columns. A 2x2 matrix has two rows and two columns.",
      },
    },
    {
      "@type": "Question",
      name: "How do you add or subtract matrices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To add or subtract two matrices, they must have the same dimensions. The operation is performed element-wise, meaning you add or subtract the elements in the same position in each matrix.",
      },
    },
    {
      "@type": "Question",
      name: "What about matrix multiplication?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Matrix multiplication is more complex and involves a 'dot product' of rows and columns. It is a key operation in linear algebra for transformations and solving systems of equations.",
      },
    },
  ],
};

export default function MatrixCalculator() {
  const [matrixA, setMatrixA] = usePersistentState("matrix-a", [
    [1, 2],
    [3, 4],
  ]);
  const [matrixB, setMatrixB] = usePersistentState("matrix-b", [
    [5, 6],
    [7, 8],
  ]);
  const [operation, setOperation] = usePersistentState<"add" | "subtract">(
    "matrix-op",
    "add",
  );

  const handleMatrixChange = (
    matrix: "A" | "B",
    row: number,
    col: number,
    value: string,
  ) => {
    const setter = matrix === "A" ? setMatrixA : setMatrixB;
    const currentMatrix = matrix === "A" ? matrixA : matrixB;
    const newMatrix = currentMatrix.map((r) => [...r]);
    const intValue = parseInt(value, 10);
    newMatrix[row][col] = isNaN(intValue) ? 0 : intValue;
    setter(newMatrix);
  };

  const resultMatrix = useMemo(() => {
    return matrixA.map((row, rIndex) =>
      row.map((_, cIndex) => {
        if (operation === "add") {
          return (
            (matrixA[rIndex][cIndex] || 0) + (matrixB[rIndex][cIndex] || 0)
          );
        } else {
          return (
            (matrixA[rIndex][cIndex] || 0) - (matrixB[rIndex][cIndex] || 0)
          );
        }
      }),
    );
  }, [matrixA, matrixB, operation]);

  const MatrixInput = ({
    matrix,
    name,
  }: {
    matrix: number[][];
    name: "A" | "B";
  }) => (
    <div className="space-y-2">
      <Label>Matrix {name}</Label>
      <div className="space-y-1" role="grid" aria-label={`Matrix ${name}`}>
        {matrix.map((row, rIndex) => (
          <div key={rIndex} className="flex gap-1" role="row">
            {row.map((val, cIndex) => (
              <Input
                key={cIndex}
                type="number"
                value={val}
                onChange={(e) =>
                  handleMatrixChange(name, rIndex, cIndex, e.target.value)
                }
                aria-label={`Matrix ${name} Row ${rIndex + 1} Column ${
                  cIndex + 1
                }`}
                role="gridcell"
                step="1"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Matrix Calculator</CardTitle>
          <CardDescription>
            Perform addition and subtraction on 2x2 matrices.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MatrixInput matrix={matrixA} name="A" />
            <MatrixInput matrix={matrixB} name="B" />
          </div>
          <div className="space-y-2">
            <Label>Operation</Label>
            <RadioGroup
              value={operation}
              onValueChange={(v: "add" | "subtract") => setOperation(v)}
              className="flex items-center space-x-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add" id="add" />
                <Label htmlFor="add">Addition</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="subtract" id="sub" />
                <Label htmlFor="sub">Subtraction</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>Result</Label>
            <div
              className="p-4 bg-muted rounded-md text-center text-xl font-bold"
              aria-live="polite"
            >
              {resultMatrix.map((row, rIndex) => (
                <div key={rIndex} className="flex justify-center gap-4">
                  {row.map((val, cIndex) => (
                    <span key={cIndex}>{val}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Matrix Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The **Matrix Calculator** helps you perform basic arithmetic
            operations on matrices. Matrices are rectangular arrays of numbers
            used in many fields like linear algebra and computer graphics. This
            calculator simplifies adding and subtracting 2x2 matrices.
          </p>

          <h3>How to Use the Calculator</h3>
          <ol>
            <li>
              Enter the numbers for each element in **Matrix A** and **Matrix B**.
            </li>
            <li>Select the operation (Addition or Subtraction).</li>
          </ol>
          <p>The calculator will instantly display the resulting matrix.</p>

          <h3>Matrix FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is a matrix?</AccordionTrigger>
              <AccordionContent>
                A matrix is a rectangular grid of numbers in rows and columns. A
                2x2 matrix has two rows and two columns.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                How do you add or subtract matrices?
              </AccordionTrigger>
              <AccordionContent>
                To add or subtract two matrices, they must have the same size. You
                perform the operation on the elements in the same position in each
                matrix.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What about matrix multiplication?
              </AccordionTrigger>
              <AccordionContent>
                Matrix multiplication is more complex. It involves a &quot;dot
                product&quot; of rows and columns. It is a key operation in linear
                algebra. This calculator does not currently support
                multiplication.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
