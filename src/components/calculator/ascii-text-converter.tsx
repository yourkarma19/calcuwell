
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";

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
        <div className="lg:col-span-3">
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
        </div>
    )
}
