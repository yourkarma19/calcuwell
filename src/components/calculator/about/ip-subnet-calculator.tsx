import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutIpSubnetCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About IP Subnetting</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The IP Subnet Calculator is a key tool for network administrators and IT students. It simplifies the task of subnetting by instantly providing information about a network segment. This helps in network planning, troubleshooting, and security.</p>

                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter a valid **IP Address** (e.g., 192.168.1.1).</li>
                    <li>Use the slider or input box to set the **CIDR** mask (e.g., /24).</li>
                </ol>
                <p>The tool will automatically calculate and display the Network Address, Broadcast Address, Subnet Mask, and other relevant details.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is an IP Address?</AccordionTrigger>
                        <AccordionContent>
                            An IP address is a unique number given to each device on a computer network. It acts like a street address, identifying a device so it can send and receive data.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is CIDR and a Subnet Mask?</AccordionTrigger>
                        <AccordionContent>
                            A **Subnet Mask** divides an IP address into two parts: one part identifies the network, and the other identifies a specific device. **CIDR** (e.g., /24) is just a shorter way to write the subnet mask.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger>Network vs. Broadcast Address</AccordionTrigger>
                        <AccordionContent>
                            The **Network Address** is the very first address in a subnet; it identifies the network itself. The **Broadcast Address** is the last address; it's used to send messages to all devices on that network at once. Neither can be assigned to a single computer.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>What is a Wildcard Mask?</AccordionTrigger>
                        <AccordionContent>
                           A wildcard mask is like an inverted subnet mask. It is often used in networking equipment to identify a range of IP addresses for applying security or routing rules.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
