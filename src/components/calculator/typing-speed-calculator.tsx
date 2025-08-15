"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. This sentence contains all the letters of the alphabet.",
  "Technology has revolutionized the way we live and work, creating new opportunities and challenges.",
  "In the heart of the bustling city, a small park offered a quiet refuge from the urban chaos.",
  "The sun dipped below the horizon, painting the sky in brilliant shades of orange, pink, and purple.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
];

export default function TypingSpeedCalculator() {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isTestActive = startTime !== null && endTime === null;
  const isTestFinished = endTime !== null;

  const wpm = useMemo(() => {
    if (!startTime || !endTime) return 0;
    const durationInMinutes = (endTime - startTime) / 60000;
    const wordsTyped = text.split(" ").length;
    return Math.round(wordsTyped / durationInMinutes - 2 * errors);
  }, [startTime, endTime, text, errors]);
  
  const accuracy = useMemo(() => {
      if(!isTestFinished) return 100;
      const totalChars = text.length;
      return Math.max(0, ((totalChars - errors) / totalChars) * 100);
  }, [isTestFinished, text, errors])

  const startTest = () => {
    const newText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(newText);
    setUserInput("");
    setStartTime(Date.now());
    setEndTime(null);
    setErrors(0);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (isTestActive && userInput === text) {
      setEndTime(Date.now());
    }
  }, [isTestActive, userInput, text]);
  
  const handleUserInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if(isTestFinished) return;
      if(startTime === null) setStartTime(Date.now());

      const value = e.target.value;
      let currentErrors = 0;
      for(let i=0; i<value.length; i++){
          if(value[i] !== text[i]){
              currentErrors++;
          }
      }
      setErrors(currentErrors);
      setUserInput(value);
  }

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Typing Speed (WPM) Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Card className="p-4 bg-muted font-mono text-lg">
            {text.split("").map((char, index) => {
              let color = "text-muted-foreground";
              if (index < userInput.length) {
                color = char === userInput[index] ? "text-primary" : "text-destructive";
              }
              return <span key={index} className={cn(color)}>{char}</span>;
            })}
          </Card>
          <Textarea
            ref={inputRef}
            value={userInput}
            onChange={handleUserInputChange}
            placeholder="Start typing the text above..."
            rows={5}
            disabled={!isTestActive && text !== ""}
            className="font-mono text-lg"
          />
          <div className="flex justify-center">
            <Button onClick={startTest} size="lg">
              {isTestActive ? "Restart Test" : "Start Typing Test"}
            </Button>
          </div>
        </CardContent>
      </Card>
      {isTestFinished && (
        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Speed (WPM)</p>
              <p className="text-4xl font-bold font-headline text-primary">{wpm}</p>
            </div>
             <div>
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="text-4xl font-bold font-headline">{accuracy.toFixed(1)}%</p>
            </div>
             <div>
              <p className="text-sm text-muted-foreground">Errors</p>
              <p className="text-4xl font-bold font-headline">{errors}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
