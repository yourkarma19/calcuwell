"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import usePersistentState from "@/hooks/use-persistent-state";
import type { FAQPage, WithContext } from "schema-dts";

const jsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is ASCII?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ASCII (American Standard Code for Information Interchange) is a system that gives a unique number to each letter, digit, and symbol. For example, the capital letter 'A' is 65. This allows computers to store and handle text as numbers.",
      },
    },
    {
      "@type": "Question",
      name: "Why is ASCII important?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ASCII was one of the first systems that let different computers share text information. While modern systems use newer codes like UTF-8, ASCII is still a basic concept in computing, and the first 128 characters of UTF-8 are the same as ASCII.",
      },
    },
    {
      "@type": "Question",
      name: "What is an ASCII code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An ASCII code is the number for a character. For example, the text 'Hello' is represented by the ASCII codes 72 101 108 108 111. Each number matches a specific character.",
      },
    },
  ],
};

export default function AsciiTextConverter() {
  const [textInput, setTextInput] = usePersistentState(
    "ascii-text",
    "Hello World",
  );
  const [asciiInput, setAsciiInput] = usePersistentState(
    "ascii-codes",
    "72 101 108 108 111 32 87 111 114 108 100",
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setTextInput(text);
    const ascii = text
      .split("")
      .map((char) => char.charCodeAt(0))
      .join(" ");
    setAsciiInput(ascii);
  };

  const handleAsciiChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const ascii = e.target.value;
    setAsciiInput(ascii);
    const text = ascii
      .split(" ")
      .filter((code) => code !== "" && !isNaN(Number(code)))
      .map((code) => String.fromCharCode(Number(code)))
      .join("");
    setTextInput(text);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ASCII ↔ Text Converter</CardTitle>
          <CardDescription>
            Convert text to ASCII character codes and back.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="text-input">Text</Label>
              <Textarea
                id="text-input"
                value={textInput}
                onChange={handleTextChange}
                rows={6}
                placeholder="Enter text here..."
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ascii-input">ASCII Codes (space-separated)</Label>
              <Textarea
                id="ascii-input"
                value={asciiInput}
                onChange={handleAsciiChange}
                rows={6}
                placeholder="Enter ASCII codes here..."
                className="font-mono"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle as="h2">About the ASCII & Text Converter</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <p>
            Our ASCII to Text Converter is a simple tool for developers, data
            analysts, and students. It lets you quickly convert plain text into
            its ASCII value, and back again.
          </p>
          <h3>How to Use the ASCII Converter</h3>
          <p>The converter works both ways at the same time:</p>
          <ol>
            <li>
              To convert <strong>text to ASCII</strong>, type your message in the
              &quot;Text&quot; box. The matching ASCII codes will appear in the
              &quot;ASCII Codes&quot; box.
            </li>
            <li>
              To convert <strong>ASCII to text</strong>, type number codes in the
              &quot;ASCII Codes&quot; box. The translated text will appear in the
              &quot;Text&quot; box.
            </li>
          </ol>
          <h3>ASCII Converter FAQs</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is ASCII?</AccordionTrigger>
              <AccordionContent>
                ASCII is a system that gives a unique number to each letter,
                digit, and symbol. For example, &apos;A&apos; is 65, and
                &apos;B&apos; is 66. This lets computers store and work with text
                as numbers.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Why is ASCII important?</AccordionTrigger>
              <AccordionContent>
                ASCII was one of the first systems that let different computers
                share text. While modern systems like UTF-8 support more
                languages, ASCII is still a basic concept. The first 128
                characters of UTF-8 are the same as ASCII.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What is the difference between ASCII and UTF-8?
              </AccordionTrigger>
              <AccordionContent>
                ASCII uses 7 bits and can only represent 128 characters, which is
                enough for English text. UTF-8 is a more modern code that can
                represent almost every character and symbol in the world,
                including emojis.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What is an ASCII code?</AccordionTrigger>
              <AccordionContent>
                An ASCII code is simply the number for a character. For example,
                the text &quot;Hello&quot; is represented by the ASCII codes `72
                101 108 108 111`. Each number matches a specific character.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
