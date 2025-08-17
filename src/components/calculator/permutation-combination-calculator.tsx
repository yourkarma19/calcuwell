
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import Link from "next/link";

// Helper function to calculate factorial
const factorial = (n: number): number => {
  if (n < 0 || n > 170) return Infinity; // Prevent overflow
  if (n === 0) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

export default function PermutationCombinationCalculator() {
  const [mode, setMode] = useState<"permutation" | "combination">("permutation");
  const [totalItems, setTotalItems] = useState(10); // n
  const [chosenItems, setChosenItems] = useState(3); // r

  const { permutations, combinations } = useMemo(() => {
    const n = Number(totalItems);
    const r = Number(chosenItems);

    if (n < 0 || r < 0 || r > n || !Number.isInteger(n) || !Number.isInteger(r)) {
      return { permutations: "Invalid input", combinations: "Invalid input" };
    }

    const nFact = factorial(n);
    const rFact = factorial(r);
    const nMinusRFact = factorial(n - r);
    
    if (!isFinite(nFact) || !isFinite(rFact) || !isFinite(nMinusRFact)) {
      return { permutations: "Overflow", combinations: "Overflow" };
    }

    const p = nFact / nMinusRFact;
    const c = p / rFact;

    return {
      permutations: isFinite(p) ? p.toLocaleString() : "Overflow",
      combinations: isFinite(c) ? c.toLocaleString() : "Overflow",
    };
  }, [totalItems, chosenItems]);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
          <CardHeader>
            <CardTitle>Permutations & Combinations</CardTitle>
            <CardDescription>
                Calculate the number of ways to choose 'r' items from a set of 'n' items. <br />
                - <span className="font-semibold">Permutation (nPr):</span> Order matters. <br />
                - <span className="font-semibold">Combination (nCr):</span> Order does not matter.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="total-items">Total number of items (n)</Label>
                <Input id="total-items" type="number" value={totalItems} onChange={e => setTotalItems(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chosen-items">Number of items to choose (r)</Label>
                <Input id="chosen-items" type="number" value={chosenItems} onChange={e => setChosenItems(Number(e.target.value))} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Permutations (nPr)</p>
              <p className="text-3xl font-bold font-headline text-primary">{permutations}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Combinations (nCr)</p>
              <p className="text-3xl font-bold font-headline">{combinations}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle>About Permutations & Combinations</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The **Permutation and Combination Calculator** is a tool used in combinatorics and probability to figure out the number of ways a subset of items can be selected from a larger set. The key difference between the two is whether the order of selection matters. This tool instantly calculates both, helping you solve complex problems quickly.</p>

                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter the **Total number of items (n)**, which is the size of the entire set you are choosing from.</li>
                    <li>Enter the **Number of items to choose (r)**, which is the size of the subset you are selecting.</li>
                </ol>
                <p>The calculator will automatically display the results for both permutations (nPr) and combinations (nCr).</p>

                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold">Permutation vs. Combination: What's the Difference?</AccordionTrigger>
                        <AccordionContent>
                            <p>The key difference is whether **order matters**. Use a **Permutation** when the order of selection is important (e.g., arranging books on a shelf, 1st/2nd/3rd place winners). Use a **Combination** when the order of selection does not matter (e.g., picking a team, choosing pizza toppings).</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-semibold">Can you give a clear example?</AccordionTrigger>
                        <AccordionContent>
                            <p className="mb-2">**Permutation Example:** Picking a 3-digit lock code from digits 0-9 without repetition. The order `1-2-3` is different from `3-2-1`. This is a permutation.</p>
                            <p>**Combination Example:** Picking three friends from a group of ten for a committee. Picking Alice, Bob, and Carol is the same as picking Carol, Bob, and Alice. This is a combination.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-semibold">What are the formulas for nPr and nCr?</AccordionTrigger>
                        <AccordionContent>
                           <p className="mb-2">**Permutation (nPr):** `n! / (n-r)!`</p>
                           <p>**Combination (nCr):** `n! / (r! * (n-r)!)`</p>
                           <p className="mt-2">Where 'n' is the total items, and 'r' is the items to choose. Notice the combination formula is the permutation formula divided by `r!`, which removes the different orderings.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="font-semibold">What is a factorial (!)?</AccordionTrigger>
                        <AccordionContent>
                           <p>Factorials (like n!) are a key part of these calculations. A factorial is the product of all positive integers up to that number (e.g., 5! = 5×4×3×2×1). They represent the total number of ways to arrange a set of items. You can learn more with our <Link href="/calculators/factorial-calculator" className="text-primary hover:underline">Factorial Calculator</Link>.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    </div>
  );
}
