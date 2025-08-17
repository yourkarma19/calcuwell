
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const ipToLong = (ip: string): number => {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
};

const longToIp = (long: number): string => {
  return [ (long >>> 24), (long >> 16) & 255, (long >> 8) & 255, long & 255 ].join('.');
};

export default function IpSubnetCalculator() {
  const [ipAddress, setIpAddress] = useState("192.168.1.1");
  const [cidr, setCidr] = useState(24);

  const subnetInfo = useMemo(() => {
    try {
      if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(ipAddress)) throw new Error("Invalid IP Address Format");

      const ipLong = ipToLong(ipAddress);
      const mask = -1 << (32 - cidr);
      
      const networkAddress = ipLong & mask;
      const broadcastAddress = networkAddress | (~mask >>> 0);
      const firstHost = networkAddress + 1;
      const lastHost = broadcastAddress - 1;
      const totalHosts = Math.pow(2, 32 - cidr);
      const usableHosts = totalHosts > 2 ? totalHosts - 2 : 0;

      return {
        networkAddress: longToIp(networkAddress),
        broadcastAddress: longToIp(broadcastAddress),
        subnetMask: longToIp(mask),
        firstHost: usableHosts > 0 ? longToIp(firstHost) : "N/A",
        lastHost: usableHosts > 0 ? longToIp(lastHost) : "N/A",
        totalHosts: totalHosts.toLocaleString(),
        usableHosts: usableHosts.toLocaleString(),
        wildcardMask: longToIp(~mask),
        error: null
      };
    } catch (e: any) {
      return { error: e.message || "Invalid IP Address or CIDR" };
    }
  }, [ipAddress, cidr]);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>IP Subnet Calculator</CardTitle>
          <CardDescription>Calculate subnet details from an IP address and CIDR mask. This tool helps in network planning and understanding IP address allocation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ip-address">IP Address</Label>
              <Input id="ip-address" value={ipAddress} onChange={e => setIpAddress(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cidr">CIDR</Label>
              <div className="flex items-center gap-4">
                <Slider id="cidr" value={[cidr]} onValueChange={v => setCidr(v[0])} min={0} max={32} step={1} />
                <Input type="number" value={cidr} onChange={e => setCidr(Number(e.target.value))} className="w-24" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {subnetInfo.error ? (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{subnetInfo.error}</AlertDescription>
        </Alert>
      ) : (
        <Card>
          <CardHeader><CardTitle>Subnet Details</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow><TableCell>Network Address</TableCell><TableCell className="font-mono text-right">{subnetInfo.networkAddress}</TableCell></TableRow>
                <TableRow><TableCell>Broadcast Address</TableCell><TableCell className="font-mono text-right">{subnetInfo.broadcastAddress}</TableCell></TableRow>
                <TableRow><TableCell>Subnet Mask</TableCell><TableCell className="font-mono text-right">{subnetInfo.subnetMask}</TableCell></TableRow>
                <TableRow><TableCell>Wildcard Mask</TableCell><TableCell className="font-mono text-right">{subnetInfo.wildcardMask}</TableCell></TableRow>
                <TableRow><TableCell>First Usable Host</TableCell><TableCell className="font-mono text-right">{subnetInfo.firstHost}</TableCell></TableRow>
                <TableRow><TableCell>Last Usable Host</TableCell><TableCell className="font-mono text-right">{subnetInfo.lastHost}</TableCell></TableRow>
                <TableRow><TableCell>Total Hosts</TableCell><TableCell className="font-mono text-right">{subnetInfo.totalHosts}</TableCell></TableRow>
                <TableRow><TableCell>Usable Hosts</TableCell><TableCell className="font-mono text-right">{subnetInfo.usableHosts}</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>About IP Subnetting</CardTitle></CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
            <p>The **IP Subnet Calculator** is an essential utility for network administrators, IT students, and anyone involved in computer networking. It simplifies the complex task of subnetting by instantly providing all the critical information about a network segment based on an IP address and a CIDR mask. This helps in efficient network planning, troubleshooting, and security management.</p>

            <h3>How to Use the Calculator</h3>
            <ol>
                <li>Enter a valid **IP Address** (e.g., 192.168.1.1).</li>
                <li>Use the slider or input box to set the **CIDR** mask (e.g., /24).</li>
            </ol>
            <p>The tool will automatically calculate and display the Network Address, Broadcast Address, Subnet Mask, range of usable host IPs, and other relevant details.</p>
            
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is an IP Address?</AccordionTrigger>
                    <AccordionContent>
                        An IP (Internet Protocol) address is a unique numerical label assigned to each device connected to a computer network. It serves two main functions: identifying the device on the network and providing its location, much like a street address for a house.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is CIDR Notation and a Subnet Mask?</AccordionTrigger>
                    <AccordionContent>
                        A **Subnet Mask** is used to divide an IP address into two parts: the network address and the host address. **CIDR (Classless Inter-Domain Routing) notation** is a compact way to represent this mask. The number after the slash (e.g., /24) indicates how many bits of the IP address are used for the network portion. A /24 means the first 24 bits are the network address, leaving 8 bits for host addresses.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-3">
                    <AccordionTrigger>Network Address vs. Broadcast Address</AccordionTrigger>
                    <AccordionContent>
                        The **Network Address** is the very first address in a subnet and is used to identify the network itself. The **Broadcast Address** is the very last address in a subnet and is used to send data to all devices on that network simultaneously. Neither of these can be assigned to an individual device, which is why the number of "usable" hosts is always two less than the total.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>What is a Wildcard Mask?</AccordionTrigger>
                    <AccordionContent>
                       A wildcard mask is an inverted subnet mask. It is often used in networking access control lists (ACLs) to identify a range of IP addresses. It tells the router which bits of the IP address to pay attention to.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
