"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Base64Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

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
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter text or Base64..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex gap-3">
            <Button onClick={encode}>Encode</Button>
            <Button onClick={decode} variant="secondary">
              Decode
            </Button>
          </div>

          <Textarea
            placeholder="Result..."
            value={output}
            readOnly
          />
        </CardContent>
      </Card>
    </div>
  );
}
