"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutCrcHashGenerator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About the CRC-32 Hash Generator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <p>
          This tool creates a <strong>CRC-32 checksum</strong> for any text you
          enter. Think of a checksum as a unique fingerprint for your data.
          It&apos;s a fast and easy way to check if data has been accidentally
          changed or corrupted during transfer or storage.
        </p>
        <h3>How to Use the Calculator</h3>
        <p>
          Just type or paste any text into the input box. The calculator will
          instantly generate the 32-bit CRC hash for that text below.
        </p>
        <h3>Frequently Asked Questions (FAQs)</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What is CRC (Cyclic Redundancy Check)?
            </AccordionTrigger>
            <AccordionContent>
              CRC is a method used to detect errors in digital data. It runs a
              calculation on a block of data and produces a short, fixed-length
              number called a checksum. When the data is moved or read, the
              calculation is done again. If the two checksums match, the data is
              almost certainly error-free.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is CRC a form of security?</AccordionTrigger>
            <AccordionContent>
              No. CRC is great at catching <strong>accidental errors</strong>{" "}
              (like from network noise or data corruption), but it is not secure
              against <strong>intentional changes</strong>. Someone trying to
              tamper with data could easily calculate a new, valid checksum for
              the modified data. For security, you need a cryptographic hash
              like SHA-256.
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
                  drives and other storage media.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
