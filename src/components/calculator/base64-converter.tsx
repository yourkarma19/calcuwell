
"use client";

import { useState } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

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
        <div className="lg:col-span-3">
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
        </div>
    )
}
