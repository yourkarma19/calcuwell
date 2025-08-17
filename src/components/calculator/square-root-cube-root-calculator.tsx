
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function SquareRootCubeRootCalculator() {
  const [number, setNumber] = useState(27);

  const { squareRoot, cubeRoot } = useMemo(() => {
    const num = Number(number);
    if (isNaN(num)) return { squareRoot: "Invalid", cubeRoot: "Invalid" };
    
    // For negative numbers, square root is imaginary, but cube root is real.
    const sqRoot = num >= 0 ? Math.sqrt(num) : `√${-num} i`;
    const cbRoot = Math.cbrt(num);

    return { 
        squareRoot: typeof sqRoot === 'number' ? sqRoot.toFixed(6) : sqRoot, 
        cubeRoot: cbRoot.toFixed(6) 
    };

  }, [number]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Square & Cube Root Calculator</CardTitle>
            <CardDescription>Enter a number to find its square and cube roots.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="number-input">Number</Label>
              <Input
                id="number-input"
                type="number"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>About the Root Calculator</CardTitle></CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>The **Square & Cube Root Calculator** is a simple tool for performing two fundamental mathematical operations. It helps you quickly find the square root and cube root of any number, which is useful in a wide range of applications, from basic algebra to complex engineering problems. This calculator handles both positive and negative inputs, correctly identifying real and imaginary roots.</p>
            
            <h3>How to Use the Calculator</h3>
            <p>Simply enter a number into the input field. The calculator will instantly compute and display both the square root and the cube root of the number.</p>
            
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is a square root?</AccordionTrigger>
                <AccordionContent>
                  A square root of a number is a value that, when multiplied by itself, gives the original number. For example, the square root of 9 is 3, because 3 × 3 = 9. The symbol for square root is √.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What is a cube root?</AccordionTrigger>
                <AccordionContent>
                  A cube root of a number is a value that, when multiplied by itself three times, gives the original number. For example, the cube root of 27 is 3, because 3 × 3 × 3 = 27. The symbol is ∛.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What about the root of a negative number?</AccordionTrigger>
                <AccordionContent>
                  You can find the real cube root of a negative number. For example, the cube root of -8 is -2, because (-2) × (-2) × (-2) = -8. However, you cannot find a real square root for a negative number. The square root of a negative number is an "imaginary number," which this calculator indicates with the symbol 'i'.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What is a "perfect square"?</AccordionTrigger>
                <AccordionContent>
                  A perfect square is an integer that is the square of another integer. For example, 4, 9, and 16 are perfect squares because they are 2², 3², and 4², respectively. Their square roots are whole numbers.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
             <div>
              <p className="text-sm text-muted-foreground">Square Root (√)</p>
              <p className="text-3xl font-bold font-headline text-primary break-all">{squareRoot}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cube Root (∛)</p>
              <p className="text-3xl font-bold font-headline">{cubeRoot}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
