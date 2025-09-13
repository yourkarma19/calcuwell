"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutFileSizeCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About File Size & Bitrate</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <p>
          This tool helps you estimate the size of a digital file, like a video
          or audio file. It bases the estimate on its length (duration) and
          quality (bitrate). This allows you to plan for storage space or data
          usage when downloading or creating media.
        </p>
        <h3>How to Use the File Size Calculator</h3>
        <ol>
          <li>Enter the **Duration** of the file (e.g., 3 minutes).</li>
          <li>Enter the **Bitrate** of the file (e.g., 128 kbit/s).</li>
        </ol>
        <p>The estimated file size will be shown automatically.</p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is bitrate?</AccordionTrigger>
            <AccordionContent>
              Bitrate is the amount of data used to represent one second of
              audio or video. A higher bitrate generally results in better
              quality and a larger file size. It&apos;s often measured in
              kilobits per second (kbit/s).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How is file size calculated?</AccordionTrigger>
            <AccordionContent>
              The formula is simple: `File Size = Bitrate × Duration`. The key
              is to make sure the units are consistent. This calculator handles
              the unit conversions for you.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
