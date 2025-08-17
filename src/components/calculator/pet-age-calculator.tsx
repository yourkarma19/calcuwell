
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

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
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Pet's Details</CardTitle>
          <CardDescription>Curious how old your furry friend is in human years? Select your pet type and enter their age to find out.</CardDescription>
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
      
      <Card>
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
      <Card>
        <CardHeader><CardTitle>About the Pet Age Calculator</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>The **Pet Age Calculator** is a fun and easy way to translate your dog's or cat's age into equivalent human years. While the old "7 dog years to 1 human year" rule is a popular myth, the aging process for our pets is more complex. This tool uses a more modern and widely accepted method to give you a better understanding of your pet's life stage.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Select the **Pet Type** (Dog or Cat).</li>
                <li>Enter your pet's current **Age** in years.</li>
            </ol>
            <p>The calculator will instantly show you their estimated age in human years, helping you better appreciate their current needs and life stage.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is the "7 dog years to 1 human year" rule true?</AccordionTrigger>
                    <AccordionContent>
                        The 7:1 ratio is a common myth. In reality, dogs and cats mature much faster in their first two years than humans do. This calculator uses a more widely accepted method where the first year equals about 15 human years, the second year adds another 9, and every subsequent year adds 4-5 years.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Does breed or size matter?</AccordionTrigger>
                    <AccordionContent>
                       Yes, significantly. Smaller dog breeds tend to live longer and mature slower than large breeds. For example, a 7-year-old Great Dane is much "older" in human years than a 7-year-old Chihuahua. This calculator provides a general estimate for an average-sized pet, but breed-specific charts can offer more accuracy.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How can I tell my pet's age if they were a rescue?</AccordionTrigger>
                    <AccordionContent>
                       A veterinarian is the best person to help estimate a pet's age. They look at factors like the condition of the teeth, coat, eyes, and overall physical health to make an educated guess.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
