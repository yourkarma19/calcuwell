
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutDataTransferRateConverter() {
    return (
      <Card>
        <CardHeader>
            <CardTitle>About the Data Transfer Rate Converter</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our Data Transfer Rate Converter helps you understand internet speeds, download times, and network performance. It translates between the different units used to measure how quickly digital data moves from one point to another. This is key for comparing internet plans and estimating file download times.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter the speed value you want to convert in the "From" field.</li>
                <li>Select the starting unit (e.g., Megabits per second - Mbps).</li>
                <li>Select the target unit you want to convert to (e.g., Megabytes per second - MB/s).</li>
            </ol>
            <p>The converted speed will be displayed instantly. This helps you understand your connection's true performance.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What's the difference between Mbps and MB/s?</AccordionTrigger>
                    <AccordionContent>
                        This is a common point of confusion. **Internet Service Providers (ISPs)** advertise speeds in **megabits per second (Mbps)**. But download speeds in your browser are usually in **megabytes per second (MB/s)**. Since there are 8 bits in 1 byte, to find your download speed in MB/s, divide the Mbps value by 8. For example, a 100 Mbps connection has a max download speed of 12.5 MB/s.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Why is my download speed slower than advertised?</AccordionTrigger>
                    <AccordionContent>
                        Advertised speeds are an "up to" maximum. Real-world speeds can be affected by many factors. This includes network traffic, router quality, and the server you're downloading from.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What are decimal (Mbps) vs. binary (Mibps) prefixes?</AccordionTrigger>
                    <AccordionContent>
                       **Decimal prefixes (kilo, mega)** use powers of 1000. For example, 1 Mbps = 1,000,000 bits per second. This is the standard for data transfer rates. **Binary prefixes (kibi, mebi)** use powers of 1024. For example, 1 Mibps = 1,048,576 bits per second. These are more common for data storage.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    );
}
