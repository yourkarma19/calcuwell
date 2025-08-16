
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

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
    const grossWpm = Math.round(wordsTyped / durationInMinutes);
    return Math.max(0, grossWpm);
  }, [startTime, endTime, text]);
  
  const accuracy = useMemo(() => {
      if(!isTestFinished && !isTestActive) return 100;
      const totalChars = text.length;
      if(totalChars === 0) return 100;
      return Math.max(0, ((userInput.length - errors) / userInput.length) * 100);
  }, [isTestActive, isTestFinished, userInput, errors])

  const startTest = () => {
    const newText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(newText);
    setUserInput("");
    setStartTime(null);
    setEndTime(null);
    setErrors(0);
    inputRef.current?.focus();
  };

  useEffect(() => {
      startTest();
  }, [])

  useEffect(() => {
    if (isTestActive && userInput.length >= text.length) {
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
          <CardDescription>Test your typing speed in words per minute (WPM). Type the sample text in the box below to start the test.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Card className="p-4 bg-muted font-mono text-lg relative">
            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={startTest}>
                <RefreshCw className="w-4 h-4"/>
            </Button>
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
            disabled={isTestFinished}
            className="font-mono text-lg"
          />
          <div className="flex justify-center">
            <Button onClick={startTest} size="lg">
              Restart Test
            </Button>
          </div>
        </CardContent>
      </Card>
      {(isTestActive || isTestFinished) && (
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
       <Card>
        <CardHeader><CardTitle>About Typing Speed</CardTitle></CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How is WPM (Words Per Minute) Calculated?</AccordionTrigger>
                    <AccordionContent>
                        WPM is calculated by taking the number of words typed correctly and dividing it by the time taken in minutes. For standardization, a "word" is often considered to be five characters long, including spaces.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What is a good typing speed?</AccordionTrigger>
                    <AccordionContent>
                        The average typing speed is around 40 WPM. A speed of 60 WPM or higher is considered good for most professional roles. Professional typists and transcriptionists often type at speeds over 100 WPM.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How can I improve my typing speed?</AccordionTrigger>
                    <AccordionContent>
                       The key to improving typing speed is consistent practice. Focus on accuracy first, then speed. Proper hand positioning (touch typing) is crucial. Avoid looking at the keyboard and use all ten fingers. Regular practice sessions, even short ones, will build muscle memory and increase your speed over time.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
