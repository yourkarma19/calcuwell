
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
                <CardHeader>
                    <CardTitle>About the CRC-32 Hash Generator</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>Our **CRC-32 Hash Generator** is a utility for developers and data analysts to compute a Cyclic Redundancy Check (CRC) checksum. This tool is designed to verify data integrity by creating a fixed-size checksum from an input string. It's a fast and efficient way to check if data has been accidentally altered during transmission or storage.</p>
                    <h3>How to Use the Calculator</h3>
                    <ol>
                        <li>Enter any text, string, or data into the **Input Text** field.</li>
                        <li>The 32-bit CRC hash (checksum) will be generated and displayed instantly in the result box below.</li>
                    </ol>
                    <p>The process is automatic and updates in real-time as you type.</p>
                    <h3>Frequently Asked Questions (FAQs)</h3>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What is CRC (Cyclic Redundancy Check)?</AccordionTrigger>
                            <AccordionContent>
                                CRC is an error-detecting code used in digital networks and storage devices to detect accidental changes to raw data. It works by performing a polynomial division on the data and using the remainder as the checksum. When the data is received, the calculation is repeated, and if the checksums don't match, it indicates that the data has been corrupted.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>How is CRC different from a cryptographic hash like SHA-256?</AccordionTrigger>
                            <AccordionContent>
                                The key difference is their purpose. **CRC** is designed to detect **accidental errors** (like those from network noise or data degradation) and is very fast but not secure. **Cryptographic hashes** (like SHA-256) are designed to be secure against **malicious, intentional modifications**. They are one-way functions, making it computationally infeasible to reverse them or find two different inputs that produce the same hash (a "collision").
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>What is CRC-32 used for?</AccordionTrigger>
                            <AccordionContent>
                                CRC-32 is a specific and widely used version of CRC that produces a 32-bit checksum. You can find it in many common applications, including:
                                <ul className="list-disc pl-5 mt-2">
                                    <li>**File formats:** ZIP and PNG files use CRC-32 to verify that files are not corrupted.</li>
                                    <li>**Network protocols:** Ethernet and other network protocols use it to ensure the integrity of data packets.</li>
                                    <li>**Storage systems:** It's used in storage systems to detect errors on disk drives.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
