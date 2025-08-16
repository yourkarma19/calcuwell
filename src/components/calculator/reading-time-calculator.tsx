
"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const formatTime = (minutes: number) => {
  if (minutes < 1) {
    return `${Math.round(minutes * 60)} seconds`;
  }
  const mins = Math.floor(minutes);
  const secs = Math.round((minutes - mins) * 60);
  let result = `${mins} min`;
  if (secs > 0) {
    result += ` ${secs} sec`;
  }
  return result;
};

export default function ReadingTimeCalculator() {
  const [text, setText] = usePersistentState("reading-time-text", "The quick brown fox jumps over the lazy dog. This is some sample text to estimate the reading time. The average adult reading speed is around 200 to 250 words per minute. You can adjust the slider below to match your personal reading speed for a more accurate estimate.");
  const [wpm, setWpm] = usePersistentState("reading-time-wpm", 200);

  const { wordCount, readingTime } = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const count = words.length;
    if (count === 0 || wpm <= 0) {
      return { wordCount: 0, readingTime: 0 };
    }
    const time = count / wpm;
    return { wordCount: count, readingTime: time };
  }, [text, wpm]);

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reading Time Estimator</CardTitle>
          <CardDescription>Paste your text and set your reading speed to estimate how long it will take to read.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text-input">Paste your text here</Label>
            <Textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              placeholder="Enter or paste text..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wpm">Reading Speed (Words per Minute)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="wpm"
                value={[wpm]}
                onValueChange={(v) => setWpm(v[0])}
                min={50}
                max={500}
                step={10}
              />
              <Input type="number" value={wpm} onChange={e => setWpm(Number(e.target.value))} className="w-24" step="10" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Estimated Reading Time</p>
            <p className="text-4xl font-bold font-headline text-primary">
              {formatTime(readingTime)}
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Word Count</p>
            <p className="text-2xl font-semibold">
              {wordCount}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>About Reading Speed</CardTitle></CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is the average reading speed?</AccordionTrigger>
                    <AccordionContent>
                        The average adult reads at about 200-250 words per minute (WPM). For technical material, the speed may be slower, around 50-75 WPM. This calculator defaults to 200 WPM, but you can adjust it to your personal speed.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How is reading time calculated?</AccordionTrigger>
                    <AccordionContent>
                        The calculation is straightforward: `Reading Time = Total Word Count / Words Per Minute`. This provides an estimate of how many minutes it will take to read the text.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How can I test my own reading speed?</AccordionTrigger>
                    <AccordionContent>
                       You can test your speed by setting a timer for one minute, reading a passage of text, and then counting the number of words you read in that minute. Do this a few times with different texts to find your average WPM.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
