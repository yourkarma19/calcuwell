"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutBinaryConverter() {
    return (
      <Card>
        <CardHeader>
            <CardTitle as="h2">About Number System Conversions</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our **Binary & Number System Converter** is an essential tool for programmers, computer science students, and networking professionals. It allows for quick and accurate conversion between the four most common number systems used in computing: binary (base-2), decimal (base-10), hexadecimal (base-16), and octal (base-8). Understanding these systems is fundamental to working with computers at a low level.</p>
            <h2>How to Use the Calculator</h2>
            <ol>
                <li>Enter a value in the "From" field.</li>
                <li>Select the number system you are converting from (e.g., Decimal).</li>
                <li>Select the target number system you wish to convert to (e.g., Binary).</li>
            </ol>
            <p>The result will appear instantly. The calculator validates your input to ensure it is valid for the selected base (e.g., binary only accepts 0s and 1s).</p>
            <h2>Frequently Asked Questions (FAQs)</h2>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What are the different number systems?</AccordionTrigger>
                    <AccordionContent>
                        <p className="mb-2">**Decimal (Base-10):** The system we use every day, with digits 0-9.</p>
                        <p className="mb-2">**Binary (Base-2):** The fundamental language of computers, using only digits 0 and 1.</p>
                        <p className="mb-2">**Hexadecimal (Base-16):** Uses digits 0-9 and letters A-F. It's a more compact way to represent binary data, as one hex digit represents four binary digits.</p>
                        <p>**Octal (Base-8):** Uses digits 0-7. It was more common in older computing systems.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Why is hexadecimal used in programming?</AccordionTrigger>
                    <AccordionContent>
                       Hexadecimal is widely used because it's a human-friendly way to represent long binary values. For example, the binary value `11111111` is much easier to read and write as `FF` in hexadecimal. It's commonly used for memory addresses, color codes (e.g., `#FF0000` for red), and file-level data.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    );
}
