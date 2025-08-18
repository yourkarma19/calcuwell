"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const units = {
  bit: 1,
  byte: 8,
  kilobyte: 8 * 1024,
  megabyte: 8 * 1024 * 1024,
  gigabyte: 8 * 1024 * 1024 * 1024,
  terabyte: 8 * 1024 * 1024 * 1024 * 1024,
};
type Unit = keyof typeof units;

const timeUnits = {
    second: 1,
    minute: 60,
    hour: 3600,
};
type TimeUnit = keyof typeof timeUnits;

export default function FileSizeCalculator() {
  const [duration, setDuration] = usePersistentState("file-size-duration", 60);
  const [durationUnit, setDurationUnit] = usePersistentState<TimeUnit>('file-size-duration-unit', 'minute');
  const [bitrate, setBitrate] = usePersistentState("file-size-bitrate", 128);
  const [bitrateUnit, setBitrateUnit] = usePersistentState('file-size-bitrate-unit', 'kilobit');

  const fileSize = useMemo(() => {
    const totalSeconds = duration * timeUnits[durationUnit];
    const bitsPerSecond = bitrate * (units[bitrateUnit as Unit] / 8) * 1000;
    const totalBits = totalSeconds * bitsPerSecond;
    const totalBytes = totalBits / 8;
    
    if (totalBytes < 1024) return `${totalBytes.toFixed(2)} Bytes`;
    if (totalBytes < 1024 ** 2) return `${(totalBytes / 1024).toFixed(2)} KB`;
    if (totalBytes < 1024 ** 3) return `${(totalBytes / (1024 ** 2)).toFixed(2)} MB`;
    if (totalBytes < 1024 ** 4) return `${(totalBytes / (1024 ** 3)).toFixed(2)} GB`;
    return `${(totalBytes / (1024 ** 4)).toFixed(2)} TB`;

  }, [duration, durationUnit, bitrate, bitrateUnit]);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>File Size Calculator</CardTitle>
            <CardDescription>Estimate file size based on duration and bitrate.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label>Duration Unit</Label>
                    <Select value={durationUnit} onValueChange={v => setDurationUnit(v as TimeUnit)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {Object.keys(timeUnits).map(u => <SelectItem key={u} value={u} className="capitalize">{u}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="bitrate">Bitrate</Label>
                    <Input id="bitrate" type="number" value={bitrate} onChange={e => setBitrate(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label>Bitrate Unit</Label>
                     <Select value={bitrateUnit} onValueChange={v => setBitrateUnit(v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                           <SelectItem value="bit">bit/s</SelectItem>
                           <SelectItem value="kilobit">kbit/s</SelectItem>
                           <SelectItem value="megabit">mbit/s</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>About File Size & Bitrate</CardTitle></CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>This tool helps you estimate the size of a digital file. This is useful for video or audio files. You can find the size based on its length (duration) and quality (bitrate). This helps you plan for storage space or data usage.</p>
            <h3>How to Use It</h3>
            <ol>
              <li>Enter the **Duration** of the file (e.g., 3 minutes).</li>
              <li>Enter the **Bitrate** of the file (e.g., 128 kbit/s).</li>
            </ol>
            <p>The estimated file size will be shown automatically.</p>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is bitrate?</AccordionTrigger>
                <AccordionContent>
                  Bitrate is the amount of data used to represent one second of audio or video. A higher bitrate usually means better quality and a larger file size. It is often measured in kilobits per second (kbit/s).
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader><CardTitle>Estimated File Size</CardTitle></CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold font-headline text-primary">{fileSize}</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
