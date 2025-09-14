"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FAQPage, WithContext } from "schema-dts";

const indianFoods = [
  { food: "Roti (1 medium)", calories: "80-100" },
  { food: "Dal (1 cup, cooked)", calories: "100-150" },
  { food: "White Rice (1 cup, cooked)", calories: "205" },
  { food: "Poha (1 plate)", calories: "250-300" },
  { food: "Idli (2 pieces)", calories: "80-100" },
  { food: "Paneer (100g)", calories: "265" },
  { food: "Mixed Vegetable Sabzi (1 cup)", calories: "100-200" },
  { food: "Samosa (1 piece)", calories: "250" },
];

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many calories should I eat to lose weight in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This depends on your age, weight, height, and activity level. This calculator gives you a personalized number. A safe rate of weight loss is creating a calorie deficit of 300-500 calories from your maintenance level.",
      },
    },
    {
      "@type": "Question",
      name: "Can I eat rice and still lose weight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can. The key is portion control. A single cup of cooked rice has over 200 calories, so managing how much you eat is important. Consider switching to brown rice for more fiber.",
      },
    },
    {
      "@type": "Question",
      name: "Is an Indian vegetarian diet good for weight loss?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A vegetarian diet can be excellent for weight loss if it's rich in vegetables, lentils, and whole grains, and low in fried foods and sweets. However, it's important to ensure you get enough protein from sources like dal, paneer, and yogurt.",
      },
    },
  ],
};

export default function AboutCalorieNeedsCalculator() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle as="h2">
            Your Guide to Weight Loss with an Indian Diet
          </CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            Understanding your calorie needs is the first step to achieving your
            weight loss goals. This calculator uses the Mifflin-St Jeor
            equation to estimate your **maintenance calories**—the energy you
            need to stay at your current weight. To lose weight, you need to
            consume fewer calories than this number, creating a calorie deficit.
          </p>
          <h3>How to Use This Calculator for Weight Loss</h3>
          <ol>
            <li>
              Enter your details to find your **maintenance calories**.
            </li>
            <li>
              Select your **weight loss goal** (e.g., lose 0.5 kg per week).
            </li>
            <li>
              The calculator will show you a **target calorie intake** for your
              goal. A deficit of 500 calories per day typically leads to a loss
              of about 0.5 kg per week.
            </li>
          </ol>

          <h3>Indian Food Calorie Chart (Approximate Values)</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Food Item</TableHead>
                <TableHead>Calories</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {indianFoods.map((item) => (
                <TableRow key={item.food}>
                  <TableCell>{item.food}</TableCell>
                  <TableCell>{item.calories}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-2">
            Note: These are estimates. Calorie content can vary based on
            ingredients and cooking methods.
          </p>

          <h3>Indian Diet FAQs for Weight Loss</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Can I drink chai while on a diet?
              </AccordionTrigger>
              <AccordionContent>
                Yes, but be mindful of sugar and full-fat milk, which add
                calories. A simple cup of tea without sugar has almost no
                calories. Try using less sugar or a sugar substitute.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Are fruits good for weight loss?
              </AccordionTrigger>
              <AccordionContent>
                Fruits are a great source of vitamins and fiber. However, they
                contain natural sugars and calories. It's important to eat them
                in moderation as part of your overall calorie goal.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What's a good pre-workout snack in India?
              </AccordionTrigger>
              <AccordionContent>
                A small banana, a handful of makhana (fox nuts), or a small
                bowl of dahi (yogurt) are great options. They provide quick
                energy without being too heavy.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
