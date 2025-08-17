
"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Delete, Heart } from "lucide-react";

export default function BasicCalculator() {
  const [expression, setExpression] = useState("");
  const [displayValue, setDisplayValue] = useState("0");
  const [justEvaluated, setJustEvaluated] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);

  const isOperator = (btn: string) => ["/", "*", "-", "+"].includes(btn);

  const handleInput = useCallback((input: string) => {
    if (justEvaluated && !isOperator(input) && input !== '.') {
        setExpression(""); 
        setDisplayValue(input);
        setJustEvaluated(false);
        return;
    }
    
    if (displayValue === "Error" || displayValue === "I ❤️ You") {
        setExpression("");
        setDisplayValue("0");
        setJustEvaluated(false);
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
  }, [displayValue, justEvaluated]);

  const handleOperator = (op: string) => {
    if (displayValue !== "Error") {
        const lastChar = expression.slice(-1);
        if (isOperator(lastChar)) {
            setExpression(prev => prev.slice(0, -1) + op);
        } else {
            setExpression(displayValue + op);
        }
        setDisplayValue("0");
    }
  };

  const handleEquals = () => {
    if (displayValue === '12082007+19112005') {
      setDisplayValue("I ❤️ You");
      setExpression(displayValue);
      setIsCelebrating(true);
      setTimeout(() => setIsCelebrating(false), 6000);
      setJustEvaluated(true);
      return;
    }
    
    try {
        const fullExpression = (expression + displayValue).replace(/[^-()\d/*+.]/g, '');
        // Use Function constructor for safe evaluation
        const result = new Function('return ' + fullExpression)();
        
        if (result === undefined || !isFinite(result)) {
            setExpression(fullExpression);
            setDisplayValue("Error");
        } else {
            setExpression(fullExpression);
            setDisplayValue(result.toString());
        }
    } catch (error) {
        setExpression(displayValue);
        setDisplayValue("Error");
    }
    setJustEvaluated(true);
    setExpression("");
  };
  
  const resetCalculator = () => {
    setExpression("");
    setDisplayValue("0");
    setJustEvaluated(false);
  };
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      const { key } = event;
      
      if (/[0-9.]/.test(key)) {
        handleInput(key);
      } else if (isOperator(key)) {
        handleOperator(key);
      } else if (key === 'Enter' || key === '=') {
        handleInput('=');
      } else if (key === 'Backspace') {
        handleInput('Backspace');
      } else if (key === 'Escape') {
        handleInput('AC');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleInput]);

  const displayFontSize = () => {
    const len = displayValue.length;
    if (len > 16) return 'text-2xl';
    if (len > 12) return 'text-3xl';
    if (len > 8) return 'text-4xl';
    return 'text-5xl';
  };

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card className={cn("max-w-sm mx-auto overflow-hidden relative", isCelebrating && "celebrate")}>
        {isCelebrating && Array.from({ length: 10 }).map((_, i) => (
            <Heart key={i} className="heart" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }} />
        ))}
        <CardHeader>
          <CardTitle>Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="h-28 p-4 bg-background border rounded-md flex flex-col justify-end items-end overflow-hidden">
            <div className="text-xl text-muted-foreground h-1/3 truncate w-full text-right">{expression || " "}</div>
            <div
              aria-label="Calculator display"
              className={cn(
                "h-2/3 w-full text-right font-mono flex items-center justify-end p-0 border-0 bg-transparent",
                displayFontSize(),
                displayValue === "I ❤️ You" && "text-primary"
              )}
            >
              {displayValue}
            </div>
          </div>
          <div className="grid grid-cols-4 grid-rows-5 gap-2">
              <Button onClick={() => handleInput("AC")} variant="outline" className="bg-secondary hover:bg-secondary/80 h-16 text-xl">AC</Button>
              <Button onClick={() => handleInput("+/-")} variant="outline" className="bg-secondary hover:bg-secondary/80 h-16 text-xl">+/-</Button>
              <Button onClick={() => handleInput("%")} variant="outline" className="bg-secondary hover:bg-secondary/80 h-16 text-xl">%</Button>
              <Button onClick={() => handleOperator("/")} variant="default" className="bg-primary/80 hover:bg-primary text-primary-foreground h-16 text-2xl">/</Button>
              
              <Button onClick={() => handleInput("7")} variant="outline" className="h-16 text-2xl">7</Button>
              <Button onClick={() => handleInput("8")} variant="outline" className="h-16 text-2xl">8</Button>
              <Button onClick={() => handleInput("9")} variant="outline" className="h-16 text-2xl">9</Button>
              <Button onClick={() => handleOperator("*")} variant="default" className="bg-primary/80 hover:bg-primary text-primary-foreground h-16 text-2xl">*</Button>

              <Button onClick={() => handleInput("4")} variant="outline" className="h-16 text-2xl">4</Button>
              <Button onClick={() => handleInput("5")} variant="outline" className="h-16 text-2xl">5</Button>
              <Button onClick={() => handleInput("6")} variant="outline" className="h-16 text-2xl">6</Button>
              <Button onClick={() => handleOperator("-")} variant="default" className="bg-primary/80 hover:bg-primary text-primary-foreground h-16 text-2xl">-</Button>

              <Button onClick={() => handleInput("1")} variant="outline" className="h-16 text-2xl">1</Button>
              <Button onClick={() => handleInput("2")} variant="outline" className="h-16 text-2xl">2</Button>
              <Button onClick={() => handleInput("3")} variant="outline" className="h-16 text-2xl">3</Button>
              <Button onClick={() => handleOperator("+")} variant="default" className="bg-primary/80 hover:bg-primary text-primary-foreground h-16 text-2xl">+</Button>

              <Button onClick={() => handleInput("0")} variant="outline" className="h-16 text-2xl col-span-2">0</Button>
              <Button onClick={() => handleInput(".")} variant="outline" className="h-16 text-2xl">.</Button>
              <Button onClick={() => handleInput("=")} variant="default" className="bg-primary hover:bg-primary/90 h-16 text-2xl">=</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
