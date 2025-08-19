
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AboutPermutationCombinationCalculator() {
    return (
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
    )
}
