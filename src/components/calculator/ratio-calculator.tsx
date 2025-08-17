
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

// Helper function to find the greatest common divisor
const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

export default function RatioCalculator() {
  const [valA, setValA] = useState(16);
  const [valB, setValB] = useState(9);
  const [valC, setValC] = useState(1920);
  const [isSolvingForD, setIsSolvingForD] = useState(true);

  const { simplifiedA, simplifiedB, resultD } = useMemo(() => {
    const a = Number(valA);
    const b = Number(valB);
    const c = Number(valC);

    if (!a || !b || !c) return { simplifiedA: a, simplifiedB: b, resultD: "" };
    
    const commonDivisor = gcd(a, b);
    const sA = a / commonDivisor;
    const sB = b / commonDivisor;

    let rD = "";
    if (isSolvingForD) {
      const res = (c * sB) / sA;
      rD = Number.isInteger(res) ? res.toString() : res.toFixed(2);
    }

    return { simplifiedA: sA, simplifiedB: sB, resultD: rD };
  }, [valA, valB, valC, isSolvingForD]);


  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
            <CardTitle>Ratio Calculator</CardTitle>
            <CardDescription>Enter three values in the proportion A : B = C : D to solve for the missing value. Also simplifies the A : B ratio.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <Label htmlFor="valA">A</Label>
              <Input id="valA" aria-label="Value A" type="number" value={valA} onChange={e => setValA(Number(e.target.value))} className="w-24 text-center" />
            </div>
            <span className="text-2xl mt-6">:</span>
            <div className="flex flex-col items-center gap-1">
               <Label htmlFor="valB">B</Label>
              <Input id="valB" aria-label="Value B" type="number" value={valB} onChange={e => setValB(Number(e.target.value))} className="w-24 text-center" />
            </div>
            <span className="text-2xl mt-6">=</span>
             <div className="flex flex-col items-center gap-1">
               <Label htmlFor="valC">C</Label>
              <Input id="valC" aria-label="Value C" type="number" value={valC} onChange={e => setValC(Number(e.target.value))} className="w-24 text-center" />
            </div>
            <span className="text-2xl mt-6">:</span>
             <div className="flex flex-col items-center gap-1">
               <Label htmlFor="valD">D (Result)</Label>
              <Input id="valD" aria-label="Value D (Result)" value={resultD} readOnly className="w-24 text-center bg-primary/10 border-primary/20 font-bold" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader><CardTitle>Simplified Ratio (A : B)</CardTitle></CardHeader>
        <CardContent className="text-center">
            <p className="text-4xl font-bold font-headline text-primary">
                {simplifiedA} : {simplifiedB}
            </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>About Ratios</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our **Ratio Calculator** is a versatile tool designed to simplify ratios and solve for missing values in a proportion. Ratios are a fundamental mathematical concept used to compare the relative size of two or more quantities. This calculator is perfect for students learning about ratios, as well as for professionals in fields like design, engineering, and finance who need to work with proportions regularly.</p>
            
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter the values for **A**, **B**, and **C** in the proportion `A : B = C : D`.</li>
                <li>The calculator will automatically solve for the missing value **D**.</li>
                <li>It will also display the simplified version of the ratio `A : B`.</li>
            </ol>
            <p>This makes it easy to scale quantities, such as when resizing an image while maintaining its aspect ratio.</p>

            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is a Ratio? A Simple Explanation with Examples</AccordionTrigger>
                    <AccordionContent>
                        A ratio compares two quantities. It shows how much of one thing there is compared to another. For example, if there are 8 girls and 12 boys in a class, the ratio of girls to boys is 8:12. This doesn't tell you the total number of students, but it describes their relationship. Ratios can be simplified just like fractions, so 8:12 is equivalent to 2:3.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How to Simplify a Ratio</AccordionTrigger>
                    <AccordionContent>
                        To simplify a ratio, you find the largest number that both parts of the ratio can be divided by without a remainder. This is called the Greatest Common Divisor (GCD). For the ratio 12:18, the largest number that divides both 12 and 18 is 6. So, you divide both parts by 6: (12 ÷ 6) : (18 ÷ 6) = 2:3. The simplified ratio is 2:3.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Understanding Aspect Ratios in Screens and Images (e.g., 16:9 vs 4:3)</AccordionTrigger>
                    <AccordionContent>
                        Aspect ratio describes the proportional relationship between the width and height of a screen or image. A 16:9 aspect ratio, common for modern TVs and monitors, means that for every 16 units of width, there are 9 units of height. This creates a widescreen look. An older, more squarish TV screen typically used a 4:3 aspect ratio. This calculator can help you find the corresponding height for a given width (e.g., if a 16:9 screen is 1920 pixels wide, its height is 1080 pixels).
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Is a ratio the same as a fraction?</AccordionTrigger>
                    <AccordionContent>
                       They are closely related but not exactly the same. A fraction represents a part of a whole (e.g., 1/2 means one part out of two total parts). A ratio compares two different quantities (e.g., a ratio of 1:2 could mean 1 teacher for every 2 students, a total of 3 people). While the ratio A:B can be written as the fraction A/B, their conceptual meaning can be different depending on the context.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
