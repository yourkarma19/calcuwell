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
      name: "What is CRC (Cyclic Redundancy Check)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CRC is a method used to detect accidental errors in digital data. It runs a calculation on a block of data and produces a short, fixed-length number called a checksum. If the two checksums match when the data is moved or read, the data is almost certainly error-free.",
      },
    },
    {
      "@type": "Question",
      name: "Is CRC a form of security or encryption?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. CRC is great at catching accidental errors (like from network noise), but it is not secure against intentional changes. For security against tampering, you need a cryptographic hash like SHA-256.",
      },
    },
    {
      "@type": "Question",
      name: "Where is CRC-32 used?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CRC-32 is common in file formats (ZIP, PNG) to check for corruption, networking (Ethernet, Wi-Fi) to ensure data packets are intact, and storage (hard drives) to detect errors.",
      },
    },
  ],
};

export default function AboutCrcHashGenerator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the CRC-32 Hash Generator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          This tool creates a <strong>CRC-32 checksum</strong> for any text you
          enter. A checksum is like a unique fingerprint for your data.
          It&apos;s a fast way to check if data has been accidentally changed
          during transfer or storage.
        </p>
        <h3>How to Use the CRC-32 Hash Generator</h3>
        <p>
          Just type or paste any text into the input box. The calculator will
          instantly generate the 32-bit CRC hash for that text.
        </p>
        <h3>CRC-32 Hash FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What is CRC (Cyclic Redundancy Check)?
            </AccordionTrigger>
            <AccordionContent>
              CRC is a method used to detect errors in digital data. It runs a
              calculation on data and produces a short number called a checksum.
              When the data is moved or read, the calculation is done again. If
              the checksums match, the data is error-free.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is CRC a form of security?</AccordionTrigger>
            <AccordionContent>
              No. CRC is great at catching <strong>accidental errors</strong>,
              but it is not secure against <strong>intentional changes</strong>.
              For security, you need a cryptographic hash like SHA-256.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Where is CRC-32 used?</AccordionTrigger>
            <AccordionContent>
              CRC-32 is very common because it&apos;s fast and effective.
              You&apos;ll find it in:
              <ul className="list-disc pl-5 mt-2">
                <li>
                  <strong>File formats:</strong> ZIP and PNG files use it to
                  check for corruption.
                </li>
                <li>
                  <strong>Networking:</strong> Ethernet and Wi-Fi use it to
                  ensure data packets are intact.
                </li>
                <li>
                  <strong>Storage:</strong> It helps detect errors on hard
                  drives.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
