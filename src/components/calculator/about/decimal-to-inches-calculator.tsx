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

const conversionChart = [
  { decimal: 0.0625, fraction: "1/16" },
  { decimal: 0.125, fraction: "1/8" },
  { decimal: 0.1875, fraction: "3/16" },
  { decimal: 0.25, fraction: "1/4" },
  { decimal: 0.3125, fraction: "5/16" },
  { decimal: 0.375, fraction: "3/8" },
  { decimal: 0.4375, fraction: "7/16" },
  { decimal: 0.5, fraction: "1/2" },
  { decimal: 0.5625, fraction: "9/16" },
  { decimal: 0.625, fraction: "5/8" },
  { decimal: 0.6875, fraction: "11/16" },
  { decimal: 0.75, fraction: "3/4" },
  { decimal: 0.8125, fraction: "13/16" },
  { decimal: 0.875, fraction: "7/8" },
  { decimal: 0.9375, fraction: "15/16" },
];

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why is precision important in these conversions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Precision determines the smallest fraction you are measuring to. For woodworking or machining, higher precision like 1/32" is often necessary for accurate fits. For general measurements, a lower precision like 1/8" or 1/4" may be sufficient.',
      },
    },
    {
      "@type": "Question",
      name: "What fields use decimal to inch conversions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This conversion is crucial in many fields that use the Imperial system, including woodworking, construction, machining, and engineering. It allows for easy translation between digital plans (often in decimals) and physical measurements made with a tape measure.",
      },
    },
    {
      "@type": "Question",
      name: "How do you convert a number with feet and inches into a decimal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'To convert from feet and inches to a decimal, first convert the feet to inches (1 foot = 12 inches). Add this to the inch measurement. Then, if there is a fraction, convert it to a decimal by dividing the numerator by the denominator. Add this decimal to your total inches. For example, 2\' 6 1/2" becomes (2 * 12) + 6 + (1/2) = 24 + 6 + 0.5 = 30.5".',
      },
    },
  ],
};

export default function AboutDecimalToInchesCalculator() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle as="h2">
            How to Manually Convert Decimal to Inches
          </CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>You can convert a decimal to an inch fraction in a few steps:</p>
          <ol>
            <li>
              Separate the whole number from the decimal. The whole number is
              your whole inches.
            </li>
            <li>
              Multiply the decimal part by your desired denominator (e.g., 16
              for 1/16&quot; precision). This gives you the numerator.
            </li>
            <li>Place the numerator over the denominator.</li>
            <li>
              Simplify the fraction by finding the greatest common divisor (GCD)
              and dividing both parts by it.
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle as="h3">
            Common Decimal to Inch Fraction Conversions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Decimal</TableHead>
                <TableHead>Inch Fraction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conversionChart.map((item) => (
                <TableRow key={item.decimal}>
                  <TableCell>{item.decimal}&quot;</TableCell>
                  <TableCell>{item.fraction}&quot;</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle as="h3">Decimal to Inches FAQs</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Why is precision important in these conversions?
              </AccordionTrigger>
              <AccordionContent>
                Precision determines the smallest fraction you measure to. For
                woodworking, higher precision like 1/32&quot; is often needed
                for accurate fits. For general measurements, 1/8&quot; or
                1/4&quot; may be enough.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What fields use decimal to inch conversions?
              </AccordionTrigger>
              <AccordionContent>
                This conversion is key in woodworking, construction, and
                engineering. It helps translate between digital plans (often in
                decimals) and physical measurements.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How do you convert feet and inches to a decimal?
              </AccordionTrigger>
              <AccordionContent>
                First, convert feet to inches (1 foot = 12 inches). Add this to
                the inch measurement. Then, convert any fraction to a decimal by
                dividing the top number by the bottom number. Add this to your
                total inches. For example, 2&apos; 6 1/2&quot; becomes (2 * 12)
                + 6 + (1/2) = 30.5&quot;.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
