"use client";

import { useState, useMemo } from "react";
import usePersistentState from "@/hooks/use-persistent-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

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
    <>
      <div className="lg:col-span-2 space-y-6">
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
              <div className="flex justify-between items-center">
                <Label htmlFor="wpm">Reading Speed (Words per Minute)</Label>
                <span className="text-lg font-semibold">{wpm} WPM</span>
              </div>
              <Slider
                id="wpm"
                value={[wpm]}
                onValueChange={(v) => setWpm(v[0])}
                min={50}
                max={500}
                step={10}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Estimated Reading Time</p>
              <p className="text-4xl font-bold font-headline text-primary">
                {formatTime(readingTime)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Word Count</p>
              <p className="text-2xl font-semibold">
                {wordCount}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
