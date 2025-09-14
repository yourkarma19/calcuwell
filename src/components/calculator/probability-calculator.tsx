"use client";

import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePersistentState from "@/hooks/use-persistent-state";

export default function ProbabilityCalculator() {
  const [mode, setMode] = usePersistentState<"single" | "independent">(
    "prob-mode",
    "single",
  );
  const [probA, setProbA] = usePersistentState("prob-a", 0.5);
  const [probB, setProbB] = usePersistentState("prob-b", 0.5);

  const result = useMemo(() => {
    if (mode === "single") {
      const pA = Number(probA);
      if (pA < 0 || pA > 1)
        return {
          value: "Probabilities must be between 0 and 1",
          percentage: "",
        };
      return {
        value: `P(A) = ${pA}`,
        percentage: `Not A = ${(1 - pA).toFixed(4)}`,
      };
    } else {
      const pA = Number(probA);
      const pB = Number(probB);
      if (pA < 0 || pA > 1 || pB < 0 || pB > 1)
        return {
          value: "Probabilities must be between 0 and 1",
          percentage: "",
        };
      const pAandB = pA * pB;
      const pAorB = pA + pB - pAandB;
      return {
        value: `P(A and B) = ${pAandB.toFixed(4)}`,
        percentage: `P(A or B) = ${pAorB.toFixed(4)}`,
      };
    }
  }, [mode, probA, probB]);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Probability Calculator</CardTitle>
          <CardDescription>
            Calculate probabilities for single or two independent events.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Mode</Label>
            <Select
              value={mode}
              onValueChange={(m: string) =>
                setMode(m as "single" | "independent")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Event Probability</SelectItem>
                <SelectItem value="independent">
                  Two Independent Events
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="probA">Probability of A (0 to 1)</Label>
              <Input
                id="probA"
                type="number"
                value={probA}
                onChange={(e) => setProbA(Number(e.target.value))}
                step="0.01"
                min="0"
                max="1"
              />
            </div>
            {mode === "independent" && (
              <div className="space-y-2">
                <Label htmlFor="probB">Probability of B (0 to 1)</Label>
                <Input
                  id="probB"
                  type="number"
                  value={probB}
                  onChange={(e) => setProbB(Number(e.target.value))}
                  step="0.01"
                  min="0"
                  max="1"
                />
              </div>
            )}
          </div>
          <div className="pt-4 text-center">
            <h3 className="text-lg font-semibold">Results</h3>
            <p className="text-2xl font-bold font-headline text-primary">
              {result.value}
            </p>
            {result.percentage && (
              <p className="text-xl font-semibold text-muted-foreground">
                {result.percentage}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>About Probability</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                The Basic Formula for Probability
              </AccordionTrigger>
              <AccordionContent>
                Probability is calculated by dividing the number of desired
                outcomes by the total number of possible outcomes. For example,
                the probability of rolling a 4 on a six-sided die is 1/6
                because there is only one '4' (desired outcome) and six total
                possible outcomes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What do &apos;P(A and B)&apos; and &apos;P(A or B)&apos; mean for
                independent events?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  **P(A and B)** is the probability that both independent events
                  A and B occur. It's calculated by multiplying their individual
                  probabilities: `P(A) * P(B)`. For example, the probability of
                  flipping two heads in a row is 0.5 * 0.5 = 0.25.
                </p>
                <p>
                  **P(A or B)** is the probability that either event A or event
                  B (or both) occur. It's calculated as: `P(A) + P(B) - P(A and
                  B)`. You subtract the "and" probability to avoid double-counting
                  the scenario where both happen.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What is the difference between independent and dependent events?
              </AccordionTrigger>
              <AccordionContent>
                An **independent event** is one where the outcome is not
                affected by previous events (e.g., a coin flip). A **dependent
                event** is one where the outcome is influenced by a previous
                event (e.g., drawing a card from a deck *without* replacement).
                This calculator deals with independent events.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
