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
      name: "What is VO₂ max?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VO₂ max stands for maximal oxygen uptake. It is the maximum amount of oxygen your body can effectively use during one minute of strenuous exercise. It is measured in milliliters of oxygen per kilogram of body weight per minute (mL/kg/min) and is a key indicator of cardiorespiratory fitness.",
      },
    },
    {
      "@type": "Question",
      name: "How accurate is this VO₂ max estimate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This formula provides a general estimate without needing exercise. However, it is not as accurate as a clinical stress test in a lab, which directly measures oxygen consumption. Factors like genetics and training can affect your true VO₂ max.",
      },
    },
    {
      "@type": "Question",
      name: "How can I improve my VO₂ max?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can improve your VO₂ max with consistent aerobic exercise. High-Intensity Interval Training (HIIT) is particularly effective, involving short bursts of intense effort followed by brief recovery periods. Long, steady-state cardio also helps improve your aerobic base.",
      },
    },
  ],
};

export default function Vo2MaxCalculator() {
  const [gender, setGender] = usePersistentState<"male" | "female">(
    "vo2max-gender",
    "male",
  );
  const [age, setAge] = usePersistentState("vo2max-age", 30);
  const [restingHR, setRestingHR] = usePersistentState("vo2max-resting-hr", 65);

  // Using the Uth-Sørensen-Overgaard-Pedersen estimation formula
  const vo2Max = useMemo(() => {
    const maxHR = 220 - age; // A simple estimation for Max HR
    const vo2 = 15.3 * (maxHR / restingHR);
    return vo2 > 0 ? vo2 : 0;
  }, [age, restingHR]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>VO₂ Max Estimator</CardTitle>
          <CardDescription>
            Estimate your maximum oxygen uptake based on resting heart rate and
            age.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup
              value={gender}
              onValueChange={(v: "male" | "female") => setGender(v)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resting-hr">Resting Heart Rate (BPM)</Label>
              <Input
                id="resting-hr"
                type="number"
                value={restingHR}
                onChange={(e) => setRestingHR(Number(e.target.value))}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            Disclaimer: This is a non-exercise estimation and may not be as
            accurate as a clinical test. It&apos;s for informational purposes
            only.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estimated VO₂ Max</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-5xl font-bold font-headline text-primary">
            {vo2Max.toFixed(1)}
          </p>
          <p className="text-lg text-muted-foreground">mL/kg/min</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the VO₂ Max Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            This tool gives you an estimate of your VO₂ max, a key measure of your
            aerobic fitness. It shows how well your body can use oxygen during
            intense exercise. A higher VO₂ max usually means better cardiovascular
            health and endurance.
          </p>

          <h3>How to Use the VO₂ Max Estimator</h3>
          <p>
            This calculator uses a non-exercise method to estimate your VO₂ max.
            It&apos;s a convenient way to get a general idea of your fitness
            level. Simply enter your age and your resting heart rate. Your resting
            heart rate is your pulse when you are completely calm and relaxed.
          </p>

          <h3>VO₂ Max FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is VO₂ max?</AccordionTrigger>
              <AccordionContent>
                VO₂ max is the maximum amount of oxygen your body can use during
                one minute of strenuous exercise. It&apos;s measured in mL/kg/min
                and is a key indicator of cardiorespiratory fitness.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How accurate is this estimate?</AccordionTrigger>
              <AccordionContent>
                This formula provides a general estimate without needing exercise.
                However, it&apos;s not as accurate as a clinical stress test in a
                lab. Think of this result as a useful starting point, not a
                definitive medical value.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How can I improve my VO₂ max?</AccordionTrigger>
              <AccordionContent>
                You can improve your VO₂ max with consistent aerobic exercise.
                High-Intensity Interval Training (HIIT) is particularly effective.
                This involves short bursts of intense effort followed by brief
                recovery periods.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
