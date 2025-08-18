"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function GradePercentageCalculator() {
  const [pointsEarned, setPointsEarned] = usePersistentState("grade-points-earned", 85);
  const [totalPoints, setTotalPoints] = usePersistentState("grade-points-total", 100);

  const percentage = useMemo(() => {
    if (totalPoints > 0) {
      return (pointsEarned / totalPoints) * 100;
    }
    return 0;
  }, [pointsEarned, totalPoints]);

  const getLetterGrade = (p: number) => {
    if (p >= 90) return "A";
    if (p >= 80) return "B";
    if (p >= 70) return "C";
    if (p >= 60) return "D";
    return "F";
  };
  
  const letterGrade = getLetterGrade(percentage);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calculate Your Grade</CardTitle>
          <CardDescription>Enter the points you earned and the total possible points to find your percentage and letter grade.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="points-earned">Points Earned</Label>
              <Input
                id="points-earned"
                type="number"
                value={pointsEarned}
                onChange={(e) => setPointsEarned(Number(e.target.value))}
                placeholder="e.g., 85"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total-points">Total Possible Points</Label>
              <Input
                id="total-points"
                type="number"
                value={totalPoints}
                onChange={(e) => setTotalPoints(Number(e.target.value))}
                placeholder="e.g., 100"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Grade</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4" aria-live="polite">
          <div>
            <p className="text-sm text-muted-foreground">Percentage</p>
            <p className="text-5xl font-bold font-headline text-primary my-2">
              {percentage.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Letter Grade</p>
            <p className="text-3xl font-semibold">{letterGrade}</p>
            <p className="text-xs text-muted-foreground">(Based on a standard scale)</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>About Grade Calculation</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>This tool helps you quickly find your grade on a test or assignment. Just enter the points you earned and the total points possible. The calculator will show your percentage and a letter grade based on a standard scale.</p>
            <h3>How to Use This Tool</h3>
            <p>Enter the number of points you earned and the total points possible. The calculator will instantly show your grade.</p>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How is the percentage calculated?</AccordionTrigger>
                    <AccordionContent>
                        The formula is `(Points Earned / Total Possible Points) * 100`. This gives you the percentage of points you received out of the total.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is a standard grading scale?</AccordionTrigger>
                    <AccordionContent>
                        A standard grading scale assigns letters to percentage ranges. A common scale is: 90-100% = A, 80-89% = B, 70-79% = C, 60-69% = D, and below 60% = F. However, these scales can vary between schools and teachers.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
