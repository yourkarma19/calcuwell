
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function ProbabilityCalculator() {
  const [mode, setMode] = usePersistentState<'single' | 'independent'>('prob-mode', 'single');
  const [probA, setProbA] = usePersistentState('prob-a', 0.5);
  const [probB, setProbB] = usePersistentState('prob-b', 0.5);

  const result = useMemo(() => {
    if (mode === 'single') {
        const pA = Number(probA);
        if (pA < 0 || pA > 1) return { value: "Probabilities must be between 0 and 1", percentage: "" };
        return {
            value: `P(A) = ${pA}`,
            percentage: `Not A = ${(1-pA).toFixed(4)}`
        };
    } else {
        const pA = Number(probA);
        const pB = Number(probB);
        if (pA < 0 || pA > 1 || pB < 0 || pB > 1) return { value: "Probabilities must be between 0 and 1", percentage: "" };
        const pAandB = pA * pB;
        const pAorB = pA + pB - pAandB;
        return {
            value: `P(A and B) = ${pAandB.toFixed(4)}`,
            percentage: `P(A or B) = ${pAorB.toFixed(4)}`
        };
    }
  }, [mode, probA, probB]);


  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
            <CardTitle>Probability Calculator</CardTitle>
            <CardDescription>Calculate probabilities for single or two independent events.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label>Mode</Label>
                <Select value={mode} onValueChange={m => setMode(m as any)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="single">Single Event Probability</SelectItem>
                        <SelectItem value="independent">Two Independent Events</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="probA">Probability of A (0 to 1)</Label>
                    <Input id="probA" type="number" value={probA} onChange={e => setProbA(Number(e.target.value))} step="0.01" min="0" max="1" />
                </div>
                {mode === 'independent' && (
                    <div className="space-y-2">
                        <Label htmlFor="probB">Probability of B (0 to 1)</Label>
                        <Input id="probB" type="number" value={probB} onChange={e => setProbB(Number(e.target.value))} step="0.01" min="0" max="1" />
                    </div>
                )}
            </div>
             <div className="pt-4 text-center">
                <h3 className="text-lg font-semibold">Results</h3>
                <p className="text-2xl font-bold font-headline text-primary">{result.value}</p>
                {result.percentage && <p className="text-xl font-semibold text-muted-foreground">{result.percentage}</p>}
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>About the Probability Calculator</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>The **Probability Calculator** provides a simple way to compute the likelihood of different outcomes. Probability is a fundamental concept in mathematics and statistics that helps us quantify uncertainty. This tool allows you to calculate the probability of a single event (and its opposite) or the combined probability of two independent events happening.</p>
            
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Select the **Mode**: choose between "Single Event" or "Two Independent Events".</li>
                <li>Enter the probability for **Event A** (a number between 0 and 1).</li>
                <li>If you chose "Two Independent Events", also enter the probability for **Event B**.</li>
            </ol>
            <p>The calculator will instantly display the relevant probabilities, such as the probability of "not A," "A and B," and "A or B."</p>

            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>The Basic Formula for Probability Explained</AccordionTrigger>
                    <AccordionContent>
                        Probability is calculated by dividing the number of desired outcomes by the total number of possible outcomes. For example, the probability of rolling a 4 on a six-sided die is 1 (favorable outcome) divided by 6 (total outcomes), which is 1/6 or approximately 0.167.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What do 'P(A and B)' and 'P(A or B)' mean?</AccordionTrigger>
                    <AccordionContent>
                       <p className="mb-2"><strong>P(A and B)</strong> is the probability that both independent events A and B occur. It's calculated by multiplying their individual probabilities: `P(A) * P(B)`.</p>
                       <p><strong>P(A or B)</strong> is the probability that either event A, event B, or both events occur. It's calculated with the formula: `P(A) + P(B) - P(A and B)`.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Understanding Independent and Dependent Events</AccordionTrigger>
                    <AccordionContent>
                       An **independent event** is one where the outcome is not affected by previous events (e.g., a coin flip). A **dependent event** is one where the outcome is influenced by a previous event (e.g., drawing a card from a deck without replacement). This calculator deals with independent events.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                    <AccordionTrigger>What is the probability of an impossible event?</AccordionTrigger>
                    <AccordionContent>
                       The probability of an event that can never happen is 0. For example, the probability of rolling a 7 on a standard six-sided die is 0. Conversely, the probability of an event that is certain to happen is 1.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
