"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Label } from "../ui/label";

export default function Base64Converter() {
  const [input, setInput] = useState("Hello World!");
  const [output, setOutput] = useState("SGVsbG8gV29ybGQh");

  const encode = () => {
    try {
      setOutput(btoa(input));
    } catch (e) {
      setOutput("⚠️ Invalid input for encoding");
    }
  };

  const decode = () => {
    try {
      setOutput(atob(input));
    } catch (e) {
      setOutput("⚠️ Invalid Base64 string");
    }
  };

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Base64 Encoder / Decoder</CardTitle>
          <CardDescription>Easily encode text into Base64 format or decode a Base64 string back to its original text. This tool is useful for developers working with web data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input-textarea">Enter text or Base64...</Label>
            <Textarea
              id="input-textarea"
              placeholder="Enter text or Base64..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={6}
              className="font-mono"
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={encode}>Encode</Button>
            <Button onClick={decode} variant="secondary">
              Decode
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="output-textarea">Result</Label>
            <Textarea
              id="output-textarea"
              placeholder="Result..."
              value={output}
              readOnly
              rows={6}
              className="font-mono bg-muted"
            />
          </div>
        </CardContent>
      </Card>
      <Card>
          <CardHeader>
              <CardTitle>About the Base64 Converter</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
              <p>The Base64 Converter is a key tool for web developers and anyone working with data. It allows you to encode data (like images or files) and text into a safe, text-based format. This format can be reliably sent over systems designed to handle only text. You can also decode Base64 strings back to their original form.</p>
              <h3>How to Use the Converter</h3>
              <ol>
                  <li>Enter the text or data you want to convert into the top input box.</li>
                  <li>Click **"Encode"** to turn it into a Base64 string.</li>
                  <li>To decode, paste a Base64 string into the input box and click **"Decode"**.</li>
              </ol>
              <p>The result will appear in the bottom box instantly.</p>
              <h3>Frequently Asked Questions (FAQs)</h3>
              <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                      <AccordionTrigger>What is Base64 and why is it used?</AccordionTrigger>
                      <AccordionContent>
                          Base64 is an encoding system that turns binary data into a set of 64 ASCII characters. This makes it safe for use in text-based systems like email (MIME) or for embedding data directly into HTML or CSS files. It prevents data from being changed or corrupted during transfer.
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                      <AccordionTrigger>Is Base64 a form of encryption?</AccordionTrigger>
                      <AccordionContent>
                          No, Base64 is an encoding, not an encryption. It's a way to represent data, not secure it. Anyone can decode a Base64 string back to its original form, so it offers no privacy. For security, you should use an encryption algorithm like AES.
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                      <AccordionTrigger>What is a Data URI?</AccordionTrigger>
                      <AccordionContent>
                         A Data URI lets you embed small files, like images, directly into a web page's HTML or CSS code. The file data is encoded using Base64. This can reduce the number of HTTP requests a browser needs to make. This can help speed up page load times for very small files.
                      </AccordionContent>
                  </AccordionItem>
              </Accordion>
          </CardContent>
      </Card>
    </div>
  );
}
