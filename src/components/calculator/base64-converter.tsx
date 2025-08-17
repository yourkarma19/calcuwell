
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
                <CardHeader>
                    <CardTitle>About the Base64 Converter</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>Our **Base64 Encoder & Decoder** is a vital tool for developers, email technicians, and anyone needing to safely transmit data. It converts binary data (like images or text with special characters) into a simple, text-based format that can be reliably sent over systems designed to handle plain text. This ensures data integrity during transport.</p>
                    <h3>How to Use the Calculator</h3>
                    <ol>
                        <li>**To Encode:** Enter your text in the "Text (UTF-8)" box and click "Encode to Base64". The Base64 string will appear below.</li>
                        <li>**To Decode:** Enter a Base64 string in the "Base64" box and click "Decode from Base64". The original text will appear above.</li>
                    </ol>
                    <p>The tool supports UTF-8, allowing for the encoding of international characters and emojis.</p>
                    <h3>Frequently Asked Questions (FAQs)</h3>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What is Base64 used for?</AccordionTrigger>
                            <AccordionContent>
                                Base64 is commonly used to embed binary data directly within text-based files or messages. Its most frequent applications include sending email attachments and embedding images directly into HTML or CSS files using Data URIs (e.g., `<img src="data:image/png;base64,...">`). This avoids the need for separate file requests.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is Base64 an encryption method?</AccordionTrigger>
                            <AccordionContent>
                                No, Base64 is an **encoding** method, not an **encryption** method. It is easily reversible and provides no security or confidentiality. Its purpose is to ensure data remains intact without modification during transport, not to conceal it from being read.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>How does Base64 work?</AccordionTrigger>
                            <AccordionContent>
                                Base64 takes binary data, groups it into 24-bit chunks (three 8-bit bytes), and then splits those chunks into four 6-bit segments. Each 6-bit segment is mapped to one of 64 characters from a specific set (A-Z, a-z, 0-9, '+', '/'). If the original data isn't a multiple of three bytes, padding (`=`) is added to the end.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>What does the padding character `=` mean?</AccordionTrigger>
                            <AccordionContent>
                                The `=` character is used as padding at the end of a Base64 string to ensure that the encoded output is a multiple of 4 characters. A Base64 string can have zero, one, or two padding characters. This padding is essential for the decoder to correctly reconstruct the original binary data.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
