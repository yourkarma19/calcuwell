
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

const bodyFatCategories = {
  women: [
    { range: "10-13%", category: "Essential fat" },
    { range: "14-20%", category: "Athletes" },
    { range: "21-24%", category: "Fitness" },
    { range: "25-31%", category: "Average" },
    { range: "32%+", category: "Obese" },
  ],
  men: [
    { range: "2-5%", category: "Essential fat" },
    { range: "6-13%", category: "Athletes" },
    { range: "14-17%", category: "Fitness" },
    { range: "18-24%", category: "Average" },
    { range: "25%+", category: "Obese" },
  ],
};

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why is body fat percentage better than BMI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Body fat percentage directly measures fat mass, while BMI is a general measure that can be misleading for muscular people. Body fat percentage gives a clearer picture of your body composition.",
      },
    },
    {
      "@type": "Question",
      name: "How does the U.S. Navy method work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This method uses body measurements to estimate body density. It's a convenient way to estimate body fat without special equipment, though it's not as accurate as clinical methods like DEXA scans.",
      },
    },
    {
      "@type": "Question",
      name: "How do I measure myself correctly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a flexible tape measure. Measure the neck just below the Adam's apple, the waist at the narrowest point (usually above the navel), and the hips at the widest point.",
      },
    },
  ],
};

export default function AboutBodyFatPercentageCalculator() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle as="h2">About the Body Fat Calculator</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            The Body Fat Percentage Calculator gives a better look at your body
            composition than weight or BMI alone. It helps you track your
            fitness progress more accurately by estimating the amount of fat in
            your body. This tool uses the U.S. Navy method.
          </p>

          <h3>How to Use the Body Fat Calculator</h3>
          <ol>
            <li>
              Select your <strong>Gender</strong>.
            </li>
            <li>
              Enter your <strong>Height</strong> and <strong>Weight</strong>.
            </li>
            <li>
              Measure and enter your <strong>Neck</strong> and{" "}
              <strong>Waist</strong> size in centimeters.
            </li>
            <li>
              If you are female, also enter your <strong>Hip</strong>{" "}
              measurement.
            </li>
          </ol>
          <p>
            The calculator will instantly estimate your body fat percentage.
          </p>

          <h3>Body Fat Percentage FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Why is body fat percentage better than BMI?
              </AccordionTrigger>
              <AccordionContent>
                Body fat percentage directly measures fat, while BMI is more
                general. BMI can be misleading for muscular people, who may be
                called &quot;overweight&quot; even if they are healthy. Body fat gives a
                clearer picture of your body composition.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                How does the U.S. Navy method work?
              </AccordionTrigger>
              <AccordionContent>
                This method uses body measurements to estimate body density.
                It&apos;s a convenient way to estimate body fat without special
                tools. However, it&apos;s not as accurate as clinical methods like
                DEXA scans.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I measure myself?</AccordionTrigger>
              <AccordionContent>
                Use a flexible tape measure. For the <strong>neck</strong>,
                measure just below the Adam&apos;s apple. For the{" "}
                <strong>waist</strong>, measure at the narrowest point, usually
                just above the navel. For the <strong>hips</strong>, measure at
                the widest point. Keep the tape snug but not tight.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h3">Body Fat Percentage Categories</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Women</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bodyFatCategories.women.map((item) => (
                  <TableRow key={item.category}>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.range}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Men</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bodyFatCategories.men.map((item) => (
                  <TableRow key={item.category}>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.range}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
