"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Scores</CardTitle>
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
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Your Grade</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Percentage</p>
              <p className="text-5xl font-bold font-headline text-primary my-2">
                {percentage.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Letter Grade</p>
              <p className="text-3xl font-semibold">{letterGrade}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
