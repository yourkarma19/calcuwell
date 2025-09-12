
"use client";
import Link from "next/link";
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

const bmiCategories = [
  { range: "< 18.5", category: "Underweight" },
  { range: "18.5 - 24.9", category: "Normal weight" },
  { range: "25.0 - 29.9", category: "Overweight" },
  { range: "30.0+", category: "Obesity" },
];

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a healthy BMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "According to the World Health Organization (WHO), a healthy BMI for most adults is between 18.5 and 24.9. A BMI below 18.5 is considered underweight, 25.0 to 29.9 is overweight, and 30.0 or higher is categorized as obesity.",
      },
    },
    {
      "@type": "Question",
      name: "How is BMI calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formula for BMI is your weight in kilograms divided by the square of your height in meters (`kg/m²`). For imperial units, the formula is `(weight in lbs / (height in inches)²) * 703`.",
      },
    },
    {
      "@type": "Question",
      name: "What are the limitations of BMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BMI is a useful screening tool, but it does not differentiate between fat and muscle mass. Very muscular people may have a high BMI but low body fat. It should be used as a general indicator, and a healthcare provider should be consulted for a complete health assessment.",
      },
    },
  ],
};

export default function AboutBMICalculator() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the BMI Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The <strong>Body Mass Index (BMI)</strong> is a measure to check
            if your weight is healthy for your height. It&apos;s a simple screening
            tool that can spot potential weight-related health issues.
          </p>

          <h3>How to Use the BMI Calculator</h3>
          <ol>
            <li>
              Select your units (<strong>Metric</strong> or{" "}
              <strong>Imperial</strong>).
            </li>
            <li>
              Enter your current <strong>Weight</strong>.
            </li>
            <li>
              Enter your <strong>Height</strong>.
            </li>
            <li>Your BMI result will be shown automatically.</li>
          </ol>

          <h3>BMI Calculator FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold">
                What is a healthy BMI?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  According to the WHO, a healthy BMI for most adults is between{" "}
                  <strong>18.5 and 24.9</strong>. A BMI below 18.5 is
                  underweight, 25.0 to 29.9 is overweight, and 30.0 or higher
                  is obesity.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold">
                How is BMI calculated?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  The formula for BMI is your weight (kg) divided by the square
                  of your height (m). For imperial units, the formula is `(lbs /
                  inches²) * 703`. Our calculator does the math for you.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-semibold">
                What are the limits of BMI?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  BMI is a useful screening tool, but it doesn&apos;t separate fat
                  from muscle. Very muscular people (like athletes) might have a
                  high BMI but still be healthy. You should use it as a general
                  guide and talk to a healthcare provider for a full health
                  check.
                </p>
                <p>
                  For a closer look at your body composition, try our{" "}
                  <Link
                    href="/calculators/body-fat-percentage-calculator"
                    className="text-primary hover:underline"
                  >
                    Body Fat Percentage Calculator
                  </Link>{" "}
                  or{" "}
                  <Link
                    href="/calculators/lean-body-mass-calculator"
                    className="text-primary hover:underline"
                  >
                    Lean Body Mass Calculator
                  </Link>
                  .
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle as="h3">BMI Categories (WHO)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>BMI Range</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bmiCategories.map((item) => (
                <TableRow key={item.category}>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.range}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-2">
            Note: BMI is a screening tool and does not diagnose health. Consult
            a healthcare provider for a complete assessment.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
