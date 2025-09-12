
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
      name: "What is Base64 and why is it used?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Base64 is an encoding system that turns binary data into a set of 64 ASCII characters. This makes it safe for use in text-based systems like email (MIME) or for embedding data directly into HTML or CSS files. It prevents data from being changed or corrupted during transfer.",
      },
    },
    {
      "@type": "Question",
      name: "Is Base64 a form of encryption?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, Base64 is an encoding, not an encryption. It's a way to represent data, not secure it. Anyone can decode a Base64 string back to its original form, so it offers no privacy. For security, you should use an encryption algorithm like AES.",
      },
    },
    {
      "@type": "Question",
      name: "What is a Data URI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Data URI lets you embed small files, like images, directly into a web page's HTML or CSS code using Base64 encoded data. This can reduce the number of HTTP requests a browser needs to make and speed up page load times for very small files.",
      },
    },
  ],
};

export default function AboutBase64Converter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Base64 Converter</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <p>
          The Base64 Converter is a key tool for web developers. It lets you
          encode data (like images) into a safe, text-based format. This format
          can be sent reliably over systems designed for text. You can also
          decode Base64 strings back to their original form.
        </p>
        <h3>How to Use the Base64 Converter</h3>
        <ol>
          <li>Enter the text you want to convert into the top input box.</li>
          <li>
            Click <strong>"Encode"</strong> to turn it into a Base64 string.
          </li>
          <li>
            To decode, paste a Base64 string into the input box and click{" "}
            <strong>"Decode"</strong>.
          </li>
        </ol>
        <p>The result will appear in the bottom box instantly.</p>
        <h3>Base64 Converter FAQs</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Base64 used for?</AccordionTrigger>
            <AccordionContent>
              Base64 is a system that turns binary data into simple text. This
              is useful for sending data over systems that are built to handle
              only text, like email attachments. It prevents data from getting
              corrupted during transfer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is Base64 a form of security?</AccordionTrigger>
            <AccordionContent>
              No. Base64 is an encoding, not an encryption. It's a way to
              represent data, not to secure it. Anyone can decode a Base64
              string. For security, you need an encryption method like AES.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is a Data URI?</AccordionTrigger>
            <AccordionContent>
              A Data URI lets you embed small files, like images, directly into
              a web page's HTML or CSS code. The file's data is encoded using
              Base64. This can reduce the number of HTTP requests a browser
              needs to make, which can help speed up page load times for very
              small files.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
