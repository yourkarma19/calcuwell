
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Basic CRC32 implementation
const makeCRCTable = () => {
  let c;
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    crcTable[n] = c;
  }
  return crcTable;
};

const crc32 = (str: string) => {
  const crcTable = makeCRCTable();
  let crc = 0 ^ (-1);
  for (let i = 0; i < str.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
};


export default function CrcHashGenerator() {
    const [input, setInput] = usePersistentState("crc-input", "Hello World");
    
    const hashResult = useMemo(() => {
        if (!input) return "";
        const result = crc32(input);
        return result.toString(16).toUpperCase().padStart(8, '0');
    }, [input]);

    return (
        <div className="lg:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle>CRC-32 Hash Generator</CardTitle>
                    <CardDescription>Generate a CRC-32 checksum for your text input.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="input-text">Input Text</Label>
                        <Textarea id="input-text" value={input} onChange={e => setInput(e.target.value)} rows={6} />
                    </div>
                    <div className="space-y-2">
                        <Label>CRC-32 Hash Result</Label>
                        <div className="p-4 bg-muted rounded-md font-mono text-primary text-xl break-all">
                            {hashResult}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
