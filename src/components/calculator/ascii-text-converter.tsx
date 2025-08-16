
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
                <CardHeader><CardTitle>About ASCII</CardTitle></CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What is ASCII?</AccordionTrigger>
                            <AccordionContent>
                                ASCII (American Standard Code for Information Interchange) is a character encoding standard for electronic communication. It represents text in computers, telecommunications equipment, and other devices. Each character, including letters, numbers, and symbols, is assigned a unique number from 0 to 127.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Why is ASCII important?</AccordionTrigger>
                            <AccordionContent>
                                ASCII was one of the first major standards that allowed different computers and devices to share information. While modern systems often use more advanced encodings like UTF-8 (which is backward-compatible with ASCII), ASCII remains a fundamental concept in computing.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>What is the difference between ASCII and UTF-8?</AccordionTrigger>
                            <AccordionContent>
                                ASCII uses 7 bits and can represent 128 characters, mainly for the English language. UTF-8 is a variable-width encoding that can represent every character in the Unicode standard, including international characters and emojis. The first 128 characters of UTF-8 are identical to ASCII, making it highly compatible.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
