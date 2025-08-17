
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Delete } from "lucide-react";

const buttonLayout = [
  "AC", "+/-", "%", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "="
];

export default function BasicCalculator() {
  const [expression, setExpression] = useState("");
  const [displayValue, setDisplayValue] = useState("0");
  const [justEvaluated, setJustEvaluated] = useState(false);

  const isOperator = (btn: string) => ["/", "*", "-", "+"].includes(btn);

  const handleInput = (input: string) => {
    if (justEvaluated && !isOperator(input) && input !== '.') {
        setExpression(""); 
        setDisplayValue(input);
        setJustEvaluated(false);
        return;
    }
    
    if (displayValue === "Error") {
        resetCalculator();
        if(!isOperator(input)) setDisplayValue(input);
        return;
    }
    
    setJustEvaluated(false);

    if (isOperator(input)) {
        handleOperator(input);
    } else if (input === "=") {
      handleEquals();
    } else if (input === "AC") {
      resetCalculator();
    } else if (input === "+/-") {
        setDisplayValue(prev => (parseFloat(prev) * -1).toString());
    } else if (input === "%") {
        setDisplayValue(prev => (parseFloat(prev) / 100).toString());
    } else if (input === 'Backspace') {
        setDisplayValue(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else {
      if(displayValue === "0" && input !== '.'){
        setDisplayValue(input);
      } else {
        setDisplayValue(prev => prev + input);
      }
    }
  };

  const handleOperator = (op: string) => {
    if (displayValue !== "Error") {
        const lastChar = displayValue.slice(-1);
        if (isOperator(lastChar)) {
            setDisplayValue(prev => prev.slice(0, -1) + op);
        } else {
            setDisplayValue(prev => prev + op);
        }
    }
  };

  const handleEquals = () => {
    try {
        const currentExpression = displayValue;
        // Use Function constructor for safe evaluation
        const result = new Function('return ' + currentExpression.replace(/[^-()\d/*+.]/g, ''))();
        
        if (result === undefined || !isFinite(result)) {
            setExpression(currentExpression);
            setDisplayValue("Error");
        } else {
            setExpression(currentExpression);
            setDisplayValue(result.toString());
        }
    } catch (error) {
        setExpression(displayValue);
        setDisplayValue("Error");
    }
    setJustEvaluated(true);
  };
  
  const resetCalculator = () => {
    setExpression("");
    setDisplayValue("0");
    setJustEvaluated(false);
  };
  
  const getButtonClass = (btn: string) => {
    if (["/", "*", "-", "+"].includes(btn)) return { variant: "default" as const, className: "bg-primary/80 hover:bg-primary text-primary-foreground"};
    if (["AC", "+/-", "%"].includes(btn)) return { variant: "outline" as const, className: "bg-secondary hover:bg-secondary/80"};
    if (btn === "0") return { variant: "outline" as const, className: "col-span-2"};
    if (btn === "=") return { variant: "default" as const, className: "bg-primary hover:bg-primary/90 row-span-2" };
    if (btn === 'Backspace') return { variant: "outline" as const, className: "" };
    return { variant: "outline" as const, className: ""};
  };

  const displayFontSize = () => {
    const len = displayValue.length;
    if (len > 16) return 'text-2xl';
    if (len > 12) return 'text-3xl';
    if (len > 8) return 'text-4xl';
    return 'text-5xl';
  };

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="h-28 p-4 bg-background border rounded-md flex flex-col justify-end items-end">
            <div className="text-xl text-muted-foreground h-1/3 truncate w-full text-right">{expression || " "}</div>
            <div
              aria-label="Calculator display"
              className={cn(
                "h-2/3 text-right font-mono p-0 border-0 bg-transparent w-full",
                displayFontSize()
              )}
            >
              {displayValue}
            </div>
          </div>
          <div className="grid grid-cols-4 grid-rows-5 gap-2">
            {buttonLayout.map(btn => {
                const {variant, className} = getButtonClass(btn);
                return (
                    <Button 
                        key={btn}
                        onClick={() => handleInput(btn)}
                        variant={variant}
                        className={cn("h-16 text-2xl", className)}
                    >
                        {btn === 'Backspace' ? <Delete /> : btn}
                    </Button>
                )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
