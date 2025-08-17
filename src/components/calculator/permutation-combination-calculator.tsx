
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
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Permutation vs. Combination: The Easiest Explanation</AccordionTrigger>
                        <AccordionContent>
                            The key difference is whether **order matters**. <br/><br/>
                            Use a **Permutation** when the order of selection is important. Think of it as arranging items. For example, arranging books on a shelf, assigning roles to people (like President, VP), or determining the 1st, 2nd, and 3rd place winners in a race. <br/><br/>
                            Use a **Combination** when the order of selection does not matter. Think of it as choosing a group. For example, picking a team of 3 people from a group of 10, choosing pizza toppings, or selecting lottery numbers.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Clear Examples</AccordionTrigger>
                        <AccordionContent>
                            <p className="mb-2"><strong>Permutation Example:</strong> Imagine you're picking a 3-digit lock code from the digits 0-9 without repetition. The order `1-2-3` is different from `3-2-1`. This is a permutation, and you would calculate it as P(10, 3).</p>
                            <p><strong>Combination Example:</strong> Imagine you're picking three friends from a group of ten to go to the movies. It doesn't matter if you pick Alice, Bob, and then Carol, or Carol, Bob, and then Alice. The final group of three is all that matters. This is a combination, calculated as C(10, 3).</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>The Formulas for nPr and nCr Explained</AccordionTrigger>
                        <AccordionContent>
                           <p className="mb-2"><strong>Permutation (nPr):</strong> `n! / (n-r)!`</p>
                           <p><strong>Combination (nCr):</strong> `n! / (r! * (n-r)!)`</p>
                           <p className="mt-2">Where 'n' is the total number of items, and 'r' is the number of items to choose. Notice that the combination formula is just the permutation formula divided by r!, which accounts for the removal of the different orderings.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>The Role of Factorials</AccordionTrigger>
                        <AccordionContent>
                           Factorials (like n!) are a key part of calculating permutations and combinations. A factorial is the product of all positive integers up to that number (e.g., 5! = 5*4*3*2*1). They represent the total number of ways to arrange a set of items. You can learn more about them with our <Link href="/calculators/factorial-calculator" className="text-primary hover:underline">Factorial Calculator</Link>.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>Can permutations and combinations be used together?</AccordionTrigger>
                        <AccordionContent>
                           Yes, in more complex probability problems. For example, you might use a combination to determine how many ways you can choose a committee, and then use a permutation to determine how many ways you can assign specific roles (like chairperson and secretary) to the members of that committee.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    </div>
  );
}
