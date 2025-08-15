"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Simplified age conversion:
// Dog: 1st year = 15 human years, 2nd year = +9 years, subsequent years = +5 years
// Cat: 1st year = 15 human years, 2nd year = +9 years, subsequent years = +4 years
const calculateHumanYears = (petAge: number, petType: "dog" | "cat") => {
    if (petAge <= 0) return 0;
    if (petAge === 1) return 15;
    if (petAge === 2) return 24;
    
    const subsequentYears = petAge - 2;
    const multiplier = petType === 'dog' ? 5 : 4;
    return 24 + subsequentYears * multiplier;
};

export default function PetAgeCalculator() {
  const [petType, setPetType] = usePersistentState<"dog" | "cat">("pet-type", "dog");
  const [petAge, setPetAge] = usePersistentState("pet-age", 5);

  const humanYears = useMemo(() => {
    return calculateHumanYears(petAge, petType);
  }, [petAge, petType]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Pet's Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Pet Type</Label>
              <RadioGroup
                value={petType}
                onValueChange={(val) => setPetType(val as "dog" | "cat")}
                className="flex items-center space-x-4 pt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dog" id="dog" />
                  <Label htmlFor="dog">Dog</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cat" id="cat" />
                  <Label htmlFor="cat">Cat</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pet-age">Pet's Age (in years)</Label>
              <Input
                id="pet-age"
                type="number"
                value={petAge}
                onChange={(e) => setPetAge(Number(e.target.value))}
                placeholder="e.g., 5"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Your Pet's Age</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">is equivalent to</p>
            <p className="text-5xl font-bold font-headline text-primary my-2">
              {humanYears}
            </p>
            <p className="text-lg text-muted-foreground">human years</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
