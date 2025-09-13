"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between HEX, RGB, and HSL color formats?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HEX is a six-digit code common in web design. RGB (Red, Green, Blue) is an additive model for digital screens. HSL (Hue, Saturation, Lightness) is an intuitive model for creating color variations.",
      },
    },
    {
      "@type": "Question",
      name: "Why are there different color models?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Different models are suited for different tasks. RGB is how screens create color, HEX is a compact way to write RGB, and HSL is often preferred by designers for its intuitive controls.",
      },
    },
    {
      "@type": "Question",
      name: "What does the 'alpha' value in RGBA or HSLA mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 'A' stands for Alpha, which represents the opacity of the color. An alpha value of 1 is fully opaque, while 0 is fully transparent. It is used to create semi-transparent effects.",
      },
    },
  ],
};

export default function AboutColorConverter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Color Code Converter</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our <strong>Color Code Converter</strong> is a key tool for web
          designers and developers. It easily translates colors between common
          web formats: <strong>HEX</strong>, <strong>RGB</strong>, and{" "}
          <strong>HSL</strong>. This tool helps you find the perfect shade and
          ensures consistency.
        </p>
        <h3>How to Use the Color Code Converter</h3>
        <ol>
          <li>
            Enter a color value in any of the three formats (HEX, RGB, or HSL).
          </li>
          <li>
            As you type, the other formats will update instantly to show the
            same color.
          </li>
          <li>Use the color preview to see your selected color.</li>
        </ol>
        <p>
          This makes it easy to experiment with colors and find the exact code
          you need.
        </p>
        <h3>Color Converter FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What&apos;s the difference between HEX, RGB, and HSL?
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                <strong>HEX</strong> is a six-digit code (e.g., `#FF5733`)
                common in web design.
              </p>
              <p className="mb-2">
                <strong>RGB</strong> is how digital screens create color by
                combining red, green, and blue light. Each value is from 0 to
                255.
              </p>
              <p>
                <strong>HSL</strong> is a more human-friendly way to represent
                color. Hue is the color itself, Saturation is its intensity, and
                Lightness is its brightness.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Why are there different color models?
            </AccordionTrigger>
            <AccordionContent>
              Different models are good for different tasks. RGB is how screens
              work. HEX is a shorter way to write RGB values. HSL is often
              preferred by designers because it’s easier to adjust.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What does the &quot;alpha&quot; value in RGBA mean?
            </AccordionTrigger>
            <AccordionContent>
              The &apos;A&apos; stands for Alpha, which controls the opacity of
              the color. An alpha value of 1 is fully opaque, while 0 is fully
              transparent. This is used in CSS for semi-transparent effects.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
