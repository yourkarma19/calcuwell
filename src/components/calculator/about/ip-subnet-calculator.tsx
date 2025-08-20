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
                            An IP (Internet Protocol) address is a unique number given to each device connected to a computer network. It identifies the device and provides its location, much like a street address.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is CIDR Notation and a Subnet Mask?</AccordionTrigger>
                        <AccordionContent>
                            A **Subnet Mask** divides an IP address into two parts: the network address and the host address. **CIDR notation** is a short way to represent this mask. The number after the slash (e.g., /24) shows how many bits of the IP address are for the network part.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger>Network Address vs. Broadcast Address</AccordionTrigger>
                        <AccordionContent>
                            The **Network Address** is the first address in a subnet and identifies the network itself. The **Broadcast Address** is the last address in a subnet and sends data to all devices on that network. Neither can be assigned to a single device. This is why "usable" hosts are always two less than the total.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>What is a Wildcard Mask?</AccordionTrigger>
                        <AccordionContent>
                           A wildcard mask is a reverse subnet mask. It is often used in network access control lists (ACLs) to identify a range of IP addresses.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
