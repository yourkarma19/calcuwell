"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePersistentState from "@/hooks/use-persistent-state";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this the exact amount of water I must drink?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, this is a general guideline. Your individual needs can vary based on climate, health, and other factors. The best indicator is to drink when you feel thirsty and monitor the color of your urine (it should be light yellow).",
      },
    },
    {
      "@type": "Question",
      name: "Does this calculation include water from food and other drinks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This estimate is for total fluid intake. You get about 20% of your daily water from solid foods (like fruits and vegetables). Other beverages like milk and juice also count towards your total. However, water is the best source of hydration.",
      },
    },
    {
      "@type": "Question",
      name: "Why is hydration so important?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Adequate hydration is critical for physical and mental performance. Even mild dehydration can lead to fatigue, headaches, and reduced concentration. Proper fluid intake supports nutrient transport, waste removal, and overall cellular health.",
      },
    },
  ],
};

const activityLevels = {
  sedentary: 1.0,
  light: 1.2,
  moderate: 1.4,
  active: 1.6,
  veryActive: 1.8,
};

type ActivityLevel = keyof typeof activityLevels;

export default function WaterIntakeCalculator() {
  const [age, setAge] = usePersistentState("water-age", 30);
  const [weight, setWeight] = usePersistentState("water-weight", 70); // in kg
  const [gender, setGender] = usePersistentState<"male" | "female">(
    "water-gender",
    "male",
  );
  const [activityLevel, setActivityLevel] = usePersistentState<ActivityLevel>(
    "water-activity",
    "moderate",
  );

  const dailyWaterIntake = useMemo(() => {
    if (weight <= 0 || age <= 0) return 0;

    // Base calculation: 35ml per kg for adults (adjust for age)
    let baseIntake;
    if (age < 30) {
      baseIntake = weight * 40;
    } else if (age <= 55) {
      baseIntake = weight * 35;
    } else {
      baseIntake = weight * 30;
    }

    // Adjust for activity level
    const totalIntakeMl = baseIntake * activityLevels[activityLevel];

    // Return in Liters
    return totalIntakeMl / 1000;
  }, [age, weight, activityLevel]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Water Intake Calculator</CardTitle>
          <CardDescription>
            Estimate your recommended daily water intake based on your age,
            weight, and activity level.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup
              value={gender}
              onValueChange={(v) => setGender(v as "male" | "female")}
              className="flex items-center space-x-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Activity Level</Label>
            <Select
              value={activityLevel}
              onValueChange={(v) => setActivityLevel(v as ActivityLevel)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">
                  Sedentary (little or no exercise)
                </SelectItem>
                <SelectItem value="light">
                  Lightly active (light exercise/sports 1-3 days/week)
                </SelectItem>
                <SelectItem value="moderate">
                  Moderately active (moderate exercise/sports 3-5 days/week)
                </SelectItem>
                <SelectItem value="active">
                  Very active (hard exercise/sports 6-7 days a week)
                </SelectItem>
                <SelectItem value="veryActive">
                  Extra active (very hard exercise/sports & physical job)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Water Intake</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            Recommended Daily Intake
          </p>
          <p className="text-5xl font-bold font-headline text-primary my-2">
            {dailyWaterIntake.toFixed(2)}
          </p>
          <p className="text-lg text-muted-foreground">Liters / day</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Daily Water Intake Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The Daily Water Intake Calculator provides a personalized
            recommendation for your daily fluid needs. Proper hydration is
            essential for nearly every bodily function. This tool uses common
            formulas based on age, weight, and activity level to give you a
            baseline for your hydration goals.
          </p>

          <h3>How to Use the Water Intake Calculator</h3>
          <ol>
            <li>Enter your **Age** in years.</li>
            <li>Enter your **Weight** in kilograms.</li>
            <li>
              Select the **Activity Level** that best describes your typical day.
            </li>
          </ol>
          <p>
            The calculator will display your estimated daily water requirement in
            liters.
          </p>

          <h3>Water Intake FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Is this the exact amount I must drink?
              </AccordionTrigger>
              <AccordionContent>
                No, this is a general guideline. Your individual needs can vary
                based on climate, health, and other factors. It&apos;s a great
                starting point, but the best indicator is to drink when you feel
                thirsty.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Does this include water from food and other drinks?
              </AccordionTrigger>
              <AccordionContent>
                This estimate is for total fluid intake. You get about 20% of your
                daily water from solid foods. Other beverages like milk and juice
                also count towards your total. However, water is the best source
                of hydration.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Why is hydration so important?</AccordionTrigger>
              <AccordionContent>
                Adequate hydration is critical for physical and mental
                performance. Even mild dehydration can lead to fatigue, headaches,
                and reduced concentration. Proper fluid intake supports overall
                cellular health.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
