
"use client";

import { useState } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function Base64Converter() {
    const [textInput, setTextInput] = usePersistentState("base64-text", "Hello World!");
    const [base64Input, setBase64Input] = usePersistentState("base64-b64", "SGVsbG8gV29ybGQh");
    const [error, setError] = useState<string | null>(null);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setTextInput(text);
    };
    
    const handleBase64Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const b64 = e.target.value;
        setBase64Input(b64);
    };
    
    const encode = () => {
        try {
            // btoa can fail on non-latin characters.
            // A more robust solution would handle unicode properly.
            const encoded = btoa(unescape(encodeURIComponent(textInput)));
            setBase64Input(encoded);
            setError(null);
        } catch (e) {
            setError("Invalid text for Base64 encoding. Ensure it's valid UTF-8.");
        }
    };
    
    const decode = () => {
        try {
            // atob can fail on invalid base64 strings
            const decoded = decodeURIComponent(escape(atob(base64Input)));
            setTextInput(decoded);
            setError(null);
        } catch (e) {
            setError("Invalid Base64 string. Check for correct padding and characters.");
        }
    }

    return (
        <div className="lg:col-span-3 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Base64 Encoder / Decoder</CardTitle>
                    <CardDescription>Convert text to its Base64 representation and back. This tool supports UTF-8 characters for robust encoding and decoding.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="text-input">Text (UTF-8)</Label>
                        <Textarea
                            id="text-input"
                            value={textInput}
                            onChange={handleTextChange}
                            rows={6}
                            placeholder="Enter text..."
                        />
                    </div>

                    <div className="flex justify-center items-center gap-4">
                        <Button onClick={encode}><ArrowDown className="mr-2"/> Encode to Base64</Button>
                        <Button onClick={decode} variant="outline"><ArrowUp className="mr-2"/> Decode from Base64</Button>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="base64-input">Base64</Label>
                        <Textarea
                            id="base64-input"
                            value={base64Input}
                            onChange={handleBase64Change}
                            rows={6}
                            placeholder="Enter Base64 string..."
                            className="font-mono"
                        />
                    </div>
                     {error && <p className="text-sm text-destructive">{error}</p>}
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>About Base64 Encoding</CardTitle></CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What is Base64 used for?</AccordionTrigger>
                            <AccordionContent>
                                Base64 is a method for encoding binary data (like images or files) into a text-based format. This is useful for transmitting data over media that are designed to handle text. Common uses include embedding images directly into HTML or CSS files (Data URIs) and sending attachments in emails.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is Base64 an encryption method?</AccordionTrigger>
                            <AccordionContent>
                                No, Base64 is an encoding method, not an encryption method. It is easily reversible and does not provide any security. Its purpose is to ensure data remains intact without modification during transport, not to conceal it.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>How does Base64 work?</AccordionTrigger>
                            <AccordionContent>
                                Base64 takes binary data, groups it into 6-bit chunks, and maps each chunk to one of 64 characters. The character set typically includes A-Z, a-z, 0-9, and two other symbols like '+' and '/'. The '=' character is used for padding at the end if needed.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
