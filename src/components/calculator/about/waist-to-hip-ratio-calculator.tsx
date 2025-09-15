
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
import { cn } from "@/lib/utils";
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
      name: "What is Waist-to-Hip Ratio (WHR)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Waist-to-Hip Ratio (WHR) is a measurement used as an indicator of health and the risk of developing serious health conditions. It compares the circumference of your waist to the circumference of your hips.",
      },
    },
    {
      "@type": "Question",
      name: "How do I measure my waist and hips correctly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For the waist, measure at the narrowest point, typically just above the belly button. For the hips, measure at the widest part of your buttocks. Ensure the tape measure is snug but not compressing the skin, and parallel to the floor.",
      },
    },
    {
      "@type": "Question",
      name: "Why is WHR a better health indicator than BMI for some people?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WHR provides information about body fat distribution. Storing more fat around your waist (an 'apple' shape) is associated with a higher risk of heart disease and type 2 diabetes than storing fat on your hips (a 'pear' shape). BMI does not account for fat distribution.",
      },
    },
  ],
};


const getWhrCategory = (whr: number, gender: "male" | "female") => {
  if (gender === "male") {
    if (whr < 0.9) return { category: "Low Risk", color: "text-green-500" };
    if (whr <= 1.0)
      return { category: "Moderate Risk", color: "text-yellow-500" };
    return { category: "High Risk", color: "text-red-500" };
  } else {
    // female
    if (whr < 0.8) return { category: "Low Risk", color: "text-green-500" };
    if (whr <= 0.85)
      return { category: "Moderate Risk", color: "text-yellow-500" };
    return { category: "High Risk", color: "text-red-500" };
  }
};

export default function WaistToHipRatioCalculator() {
  const [gender, setGender] = usePersistentState<"male" | "female">(
    "whr-gender",
    "male",
  );
  const [waist, setWaist] = usePersistentState("whr-waist", 90);
  const [hip, setHip] = usePersistentState("whr-hip", 100);

  const whr = useMemo(() => {
    if (waist > 0 && hip > 0) {
      return waist / hip;
    }
    return 0;
  }, [waist, hip]);

  const { category, color } = getWhrCategory(whr, gender);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Measurements (cm)</CardTitle>
          <CardDescription>
            Calculate your Waist-to-Hip Ratio and understand its health
            implications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="waist">Waist Circumference</Label>
              <Input
                id="waist"
                type="number"
                value={waist}
                onChange={(e) => setWaist(Number(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hip">Hip Circumference</Label>
              <Input
                id="hip"
                type="number"
                value={hip}
                onChange={(e) => setHip(Number(e.target.value) || 0)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Result</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">Waist-to-Hip Ratio</p>
          <p className="text-5xl font-bold font-headline text-primary">
            {whr.toFixed(2)}
          </p>
          <p className={cn("text-lg font-semibold", color)}>{category}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the WHR Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The **Waist-to-Hip Ratio (WHR) Calculator** is a health tool used
            to measure body fat distribution. A higher WHR is often associated
            with higher levels of visceral fat (fat around the organs), which is
            a risk factor for several health issues. This calculator provides a
            quick and simple way to assess your body shape and its potential
            health implications.
          </p>
          <h3>How to Use the WHR Calculator</h3>
          <ol>
            <li>Select your **Gender**.</li>
            <li>
              Enter your **Waist Circumference** in centimeters, measured at the
              narrowest point of your torso.
            </li>
            <li>
              Enter your **Hip Circumference** in centimeters, measured at the
              widest part of your hips and buttocks.
            </li>
          </ol>
          <p>
            The calculator will instantly provide your WHR and classify your
            health risk based on WHO guidelines.
          </p>

          <h3>Waist-to-Hip Ratio FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Waist-to-Hip Ratio (WHR)?</AccordionTrigger>
              <AccordionContent>
                WHR is a measurement used as an indicator of health and the risk
                of developing serious conditions. It compares the circumference
                of your waist to your hips.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                How do I measure my waist and hips correctly?
              </AccordionTrigger>
              <AccordionContent>
                For the waist, measure at the narrowest point, typically just
                above the belly button. For the hips, measure at the widest part
                of your buttocks. Keep the tape measure snug but not tight.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Why is WHR a better health indicator than BMI for some?
              </AccordionTrigger>
              <AccordionContent>
                WHR provides information about body fat distribution. Storing
                more fat around your waist (an &apos;apple&apos; shape) is linked to a higher
                risk of heart disease and type 2 diabetes than storing fat on
                your hips (a &apos;pear&apos; shape). BMI does not account for this.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
