
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
      name: "What's the difference between a Bit and a Byte?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A bit is the most basic unit of data, a single binary value of 0 or 1. A byte is a group of 8 bits. Bytes are the standard unit used to measure file sizes as one byte can represent one character of text.",
      },
    },
    {
      "@type": "Question",
      name: "Why is a Kilobyte (KB) 1024 Bytes, not 1000?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Computers use a binary (base-2) system, and data storage units are based on powers of 2. Since 2^10 is 1024, this became the standard for computer memory and storage. So, 1 Kilobyte = 1024 Bytes.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between KB (kilobyte) and KiB (kibibyte)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To reduce confusion, official standards bodies designated 'kilobyte (KB)' as 1000 bytes and 'kibibyte (KiB)' as 1024 bytes. However, in common use, 'kilobyte' is still widely understood to mean 1024 bytes, which is why a 1 TB hard drive shows up as about 931 GB in your OS.",
      },
    },
  ],
};

export default function AboutDataStorageConverter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Data Storage Converter</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          Our Data Storage Converter helps you quickly convert between
          different units of digital information. This includes bits, bytes,
          kilobytes (KB), megabytes (MB), and gigabytes (GB). This makes it easy
          to understand file sizes and disk space.
        </p>
        <h3>How to Use the Data Storage Converter</h3>
        <ol>
          <li>Enter the data size you want to convert.</li>
          <li>Select the starting unit (e.g., Megabyte).</li>
          <li>Select the target unit (e.g., Gigabyte).</li>
        </ol>
        <p>The new value will be instantly calculated.</p>
        <h3>Data Storage FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What's the difference between a Bit and a Byte?
            </AccordionTrigger>
            <AccordionContent>
              A <strong>bit</strong> is the most basic unit of data, a single 0
              or 1. A <strong>byte</strong> is a group of 8 bits. Bytes are the
              standard unit to measure file sizes because one byte can
              represent one character of text.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Why is a Kilobyte 1024 Bytes, not 1000?
            </AccordionTrigger>
            <AccordionContent>
              Computers use a binary (base-2) system. Data storage units are
              based on powers of 2. `2^10` is 1024, which is very close to 1000.
              This became the standard. So, 1 Kilobyte = 1024 Bytes, 1 Megabyte
              = 1024 Kilobytes, and so on.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What is the difference between KB and KiB?
            </AccordionTrigger>
            <AccordionContent>
              To reduce confusion, official standards created binary prefixes.
              A <strong>kilobyte (KB)</strong> is technically 1000 bytes. A{" "}
              <strong>kibibyte (KiB)</strong> is 1024 bytes. But in common use,
              "kilobyte" still means 1024 bytes. This is why a 1 TB hard drive
              appears as about 931 GB in your operating system.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
