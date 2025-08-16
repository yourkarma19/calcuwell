
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

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
        <div className="lg:col-span-3 space-y-6">
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
            <Card>
                <CardHeader><CardTitle>About CRC-32</CardTitle></CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What is CRC (Cyclic Redundancy Check)?</AccordionTrigger>
                            <AccordionContent>
                                CRC is an error-detecting code used in digital networks and storage devices to detect accidental changes to raw data. It calculates a short, fixed-length binary sequence, known as a checksum or CRC value, for each block of data.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>How is CRC different from a cryptographic hash?</AccordionTrigger>
                            <AccordionContent>
                                CRC is designed to detect accidental errors (like those from network noise), not malicious ones. It's very fast but not secure against intentional data modification. Cryptographic hashes (like SHA-256) are designed to be one-way and collision-resistant, making them suitable for security purposes like password storage.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>What is CRC-32 used for?</AccordionTrigger>
                            <AccordionContent>
                                CRC-32 is a specific version of CRC that produces a 32-bit checksum. It's widely used in file formats like ZIP and PNG, and in network protocols like Ethernet, to verify data integrity and ensure that a file has not been corrupted during transfer or storage.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
