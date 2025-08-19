
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutDataStorageConverter() {
    return (
      <Card>
        <CardHeader>
            <CardTitle>About the Data Storage Converter</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our Data Storage Converter is a key tool for anyone who works with digital files. This includes software developers, IT professionals, and casual computer users. It helps you quickly convert between different units of digital information, such as bits, bytes, kilobytes (KB), megabytes (MB), and gigabytes (GB). This makes it easy to understand file sizes, disk space, and data limits.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter the data size you want to convert in the "From" field.</li>
                <li>Select the starting unit (e.g., Megabyte).</li>
                <li>Select the target unit you want to convert to (e.g., Gigabyte).</li>
            </ol>
            <p>The new value will be instantly calculated and displayed in the "To" field.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What's the difference between a Bit and a Byte?</AccordionTrigger>
                    <AccordionContent>
                        A **bit** is the most basic unit of data in computing. It represents a single binary value of either 0 or 1. A **byte** is a group of 8 bits. Bytes are the standard unit used to measure file sizes because one byte can represent one character of text.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Why is a Kilobyte 1024 Bytes, not 1000?</AccordionTrigger>
                    <AccordionContent>
                        Computers use a binary (base-2) system. Data storage units are based on powers of 2. `2^10` is 1024, which is very close to 1000. This became the standard for computer memory and storage. So, 1 Kilobyte = 1024 Bytes, 1 Megabyte = 1024 Kilobytes, and so on.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What is the difference between KB and KiB?</AccordionTrigger>
                    <AccordionContent>
                       To reduce confusion, official standards bodies created binary prefixes. A **kilobyte (KB)** is now technically 1000 bytes. A **kibibyte (KiB)** is 1024 bytes. But in common use, "kilobyte" is still widely understood to mean 1024 bytes. This is why a 1 TB hard drive appears as about 931 GB in your operating system.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    );
}
