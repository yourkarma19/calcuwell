"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
  );
}
