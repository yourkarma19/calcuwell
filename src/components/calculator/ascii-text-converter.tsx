
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function AsciiTextConverter() {
    const [textInput, setTextInput] = useState("Hello World");
    const [asciiInput, setAsciiInput] = useState("72 101 108 108 111 32 87 111 114 108 100");

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setTextInput(text);
        const ascii = text.split('').map(char => char.charCodeAt(0)).join(' ');
        setAsciiInput(ascii);
    };

    const handleAsciiChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const ascii = e.target.value;
        setAsciiInput(ascii);
        const text = ascii.split(' ')
            .filter(code => code !== '')
            .map(code => String.fromCharCode(Number(code)))
            .join('');
        setTextInput(text);
    };

    return (
        <div className="lg:col-span-3 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>ASCII ↔ Text Converter</CardTitle>
                    <CardDescription>Convert text to ASCII character codes and back.</CardDescription>
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
                    <CardTitle>About the ASCII & Text Converter</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>Our **ASCII to Text Converter** is a simple yet powerful tool for developers, data analysts, and students. It allows for quick, two-way conversion between plain text and its corresponding ASCII (American Standard Code for Information Interchange) values. This is particularly useful for debugging data, understanding character encodings, or for educational purposes.</p>
                    <h3>How to Use the Calculator</h3>
                    <p>The converter works in both directions simultaneously:</p>
                    <ol>
                        <li>To convert **text to ASCII**, type your message in the "Text" box. The corresponding space-separated ASCII codes will appear instantly in the "ASCII Codes" box.</li>
                        <li>To convert **ASCII to text**, type the space-separated numeric codes in the "ASCII Codes" box. The decoded text will appear in the "Text" box.</li>
                    </ol>
                    <h3>Frequently Asked Questions (FAQs)</h3>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What is ASCII?</AccordionTrigger>
                            <AccordionContent>
                                ASCII is a character encoding standard that assigns a unique number to represent each letter, digit, and symbol. For example, the capital letter 'A' is represented by the number 65, 'B' is 66, and so on. This allows computers to store and manipulate text as numerical data.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Why is ASCII important?</AccordionTrigger>
                            <AccordionContent>
                                ASCII was one of the first major standards that allowed different computers and devices to reliably share text-based information. While modern systems often use more advanced encodings like UTF-8 to support international languages and emojis, ASCII remains a fundamental concept in computing and the first 128 characters of UTF-8 are identical to ASCII.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>What is the difference between ASCII and UTF-8?</AccordionTrigger>
                            <AccordionContent>
                                ASCII uses 7 bits and can represent 128 characters, which is sufficient for English text and common control characters. UTF-8 is a more comprehensive, variable-width encoding that can represent every character in the Unicode standard, covering virtually all characters and symbols from languages worldwide. Importantly, UTF-8 is backward-compatible with ASCII.
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-4">
                            <AccordionTrigger>What is an ASCII code?</AccordionTrigger>
                            <AccordionContent>
                                An ASCII code is the numerical representation of a character. For instance, the text "Hello" is represented by the ASCII codes `72 101 108 108 111`. Each number corresponds to a specific character that the computer can understand and display.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
