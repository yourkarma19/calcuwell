
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const buttonLayout = [
  "AC", "+/-", "%", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "="
];

const scientificButtonLayout = [
    { func: '(', tooltip: 'Open Parenthesis' }, { func: ')', tooltip: 'Close Parenthesis' }, { func: 'mc', tooltip: 'Memory Clear' }, { func: 'm+', tooltip: 'Memory Add' }, { func: 'm-', tooltip: 'Memory Subtract' }, { func: 'mr', tooltip: 'Memory Recall' },
    { func: 'x²', tooltip: 'Square' }, { func: 'x³', tooltip: 'Cube' }, { func: 'xʸ', tooltip: 'Power' }, { func: 'eˣ', tooltip: 'e^x' }, { func: '10ˣ', tooltip: '10^x' }, { func: 'x!', tooltip: 'Factorial' },
    { func: '¹/x', tooltip: 'Reciprocal' }, { func: '²√x', tooltip: 'Square Root' }, { func: '³√x', tooltip: 'Cube Root' }, { func: 'ʸ√x', tooltip: 'y-th Root' }, { func: 'ln', tooltip: 'Natural Log' }, { func: 'log₁₀', tooltip: 'Log base 10' },
    { func: 'sin', tooltip: 'Sine' }, { func: 'cos', tooltip: 'Cosine' }, { func: 'tan', tooltip: 'Tangent' }, { func: 'e', tooltip: `Euler's Number` }, { func: 'EE', tooltip: 'Exponent' }, { func: 'Rad', tooltip: 'Switch to Radians' },
    { func: 'sinh', tooltip: 'Hyperbolic Sine' }, { func: 'cosh', tooltip: 'Hyperbolic Cosine' }, { func: 'tanh', tooltip: 'Hyperbolic Tangent' }, { func: 'π', tooltip: 'Pi' }, { func: 'Rand', tooltip: 'Random Number' }, { func: 'deg', tooltip: 'Switch to Degrees' }
];

export default function ScientificCalculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [memory, setMemory] = useState(0);
  const [isRadians, setIsRadians] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [justEvaluated, setJustEvaluated] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const isOperator = (btn: string) => ["/", "*", "-", "+"].includes(btn);

  const handleInput = (input: string) => {
    if (displayValue === "Error") {
        resetCalculator();
        if(!isOperator(input)) setDisplayValue(input);
        return;
    }

    if (justEvaluated && !isOperator(input) && input !== '.') {
        setDisplayValue(input);
        setJustEvaluated(false);
        return;
    }
    
    if (justEvaluated && (isOperator(input) || input === '.')) {
      setJustEvaluated(false);
    }

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
    } else {
      if(displayValue === "0" && input !== '.'){
        setDisplayValue(input);
      } else {
        setDisplayValue(prev => prev + input);
      }
    }
    setJustEvaluated(false);
  };
  
  const handleOperator = (op: string) => {
    if (displayValue !== "Error") {
      const lastChar = displayValue.slice(-1);
      if(isOperator(lastChar)) {
        setDisplayValue(prev => prev.slice(0, -1) + op);
      } else {
        setDisplayValue(prev => prev + op);
      }
      setJustEvaluated(false);
    }
  }

  const handleBackspace = () => {
    setDisplayValue(prev => (prev.length > 1 && prev !== "Error") ? prev.slice(0, -1) : "0");
    setJustEvaluated(false);
  };
  
  const handleScientificInput = (func: string) => {
      if (displayValue === "Error" && func !== 'AC') {
        resetCalculator();
        return;
      }
      let currentDisplay = (displayValue === "0" || displayValue === "Error" || justEvaluated) ? "" : displayValue;
      setJustEvaluated(false);

      const angleToRad = (angle: number) => isRadians ? angle : angle * (Math.PI / 180);
      const value = parseFloat(displayValue);

      try {
        switch(func) {
            case '(': currentDisplay += '('; break;
            case ')': currentDisplay += ')'; break;
            case 'mc': setMemory(0); return;
            case 'm+': setMemory(prev => prev + value); return;
            case 'm-': setMemory(prev => prev - value); return;
            case 'mr': setDisplayValue(memory.toString()); return;
            case 'x²': setDisplayValue(Math.pow(value, 2).toString()); setJustEvaluated(true); return;
            case 'x³': setDisplayValue(Math.pow(value, 3).toString()); setJustEvaluated(true); return;
            case 'xʸ': currentDisplay += '**'; break;
            case 'eˣ': setDisplayValue(Math.exp(value).toString()); setJustEvaluated(true); return;
            case '10ˣ': setDisplayValue(Math.pow(10, value).toString()); setJustEvaluated(true); return;
            case 'x!': setDisplayValue(factorial(value).toString()); setJustEvaluated(true); return;
            case '¹/x': setDisplayValue((1 / value).toString()); setJustEvaluated(true); return;
            case '²√x': if(value < 0) throw new Error(); setDisplayValue(Math.sqrt(value).toString()); setJustEvaluated(true); return;
            case '³√x': setDisplayValue(Math.cbrt(value).toString()); setJustEvaluated(true); return;
            case 'ʸ√x': currentDisplay += '**(1/'; break;
            case 'ln': if(value <= 0) throw new Error(); setDisplayValue(Math.log(value).toString()); setJustEvaluated(true); return;
            case 'log₁₀': if(value <= 0) throw new Error(); setDisplayValue(Math.log10(value).toString()); setJustEvaluated(true); return;
            case 'sin': setDisplayValue(Math.sin(angleToRad(value)).toString()); setJustEvaluated(true); return;
            case 'cos': setDisplayValue(Math.cos(angleToRad(value)).toString()); setJustEvaluated(true); return;
            case 'tan': if(isRadians ? (value / Math.PI - 0.5) % 1 === 0 : (value / 90 - 1) % 2 === 0) throw new Error(); setDisplayValue(Math.tan(angleToRad(value)).toString()); setJustEvaluated(true); return;
            case 'e': currentDisplay += Math.E.toString(); break;
            case 'EE': currentDisplay += 'e'; break;
            case 'Rad': setIsRadians(true); return;
            case 'deg': setIsRadians(false); return;
            case 'sinh': setDisplayValue(Math.sinh(value).toString()); setJustEvaluated(true); return;
            case 'cosh': setDisplayValue(Math.cosh(value).toString()); setJustEvaluated(true); return;
            case 'tanh': setDisplayValue(Math.tanh(value).toString()); setJustEvaluated(true); return;
            case 'π': currentDisplay += Math.PI.toString(); break;
            case 'Rand':
                if (isClient) {
                    setDisplayValue(Math.random().toString());
                    setJustEvaluated(true);
                }
                return;
            default: break;
        }
        setDisplayValue(currentDisplay);
      } catch {
        setDisplayValue("Error");
      }
  }

    const factorial = (n: number): number => {
        if (n < 0 || !Number.isInteger(n)) return NaN;
        if (n === 0 || n === 1) return 1;
        if (n > 170) return Infinity;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    };


  const handleEquals = () => {
    try {
        const result = new Function('return ' + displayValue.replace(/\^/g, '**'))();
        if (isNaN(result) || !isFinite(result)) {
          setDisplayValue("Error");
        } else {
          setDisplayValue(result.toString());
        }
        setJustEvaluated(true);
    } catch (error) {
        setDisplayValue("Error");
    }
  };

  const resetCalculator = () => {
    setDisplayValue("0");
    setJustEvaluated(false);
  };

  const getButtonClass = (btn: string) => {
    if (isOperator(btn) || btn === "=") return { variant: "default" as const, className: "bg-primary/80 hover:bg-primary text-primary-foreground"};
    if (["AC", "+/-", "%"].includes(btn)) return { variant: "outline" as const, className: "bg-secondary hover:bg-secondary/80"};
    if (btn === "0") return { variant: "outline" as const, className: "col-span-2"};
    return { variant: "outline" as const, className: ""};
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        const key = event.key;
        if ((key >= '0' && key <= '9') || key === '.') {
            handleInput(key);
        } else if (isOperator(key)) {
            handleInput(key);
        } else if (key === 'Enter' || key === '=') {
            event.preventDefault(); // prevent form submission
            handleEquals();
        } else if (key === 'Backspace') {
            handleBackspace();
        } else if (key === 'Escape' || key.toLowerCase() === 'c') {
            resetCalculator();
        } else if (key === '(' || key === ')') {
            handleScientificInput(key);
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, [displayValue, isRadians]); // Re-add listener if state changes

  return (
    <div className="lg:col-span-3 max-w-md mx-auto">
       <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle>Scientific Calculator</CardTitle>
          <CardDescription>A versatile calculator for both basic and advanced mathematical functions. Use the tabs to switch between scientific and standard modes. Now with keyboard support!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            value={displayValue} 
            readOnly 
            aria-label="Calculator display"
            className="h-20 text-4xl text-right font-mono pr-4 bg-background"
          />
          <Tabs defaultValue="scientific">
              <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="scientific">Sci</TabsTrigger>
                  <TabsTrigger value="basic">Basic</TabsTrigger>
              </TabsList>
              <TabsContent value="scientific" className="mt-4">
                  <div className="grid grid-cols-6 gap-2">
                     {scientificButtonLayout.map(({func, tooltip}) => (
                        <Tooltip key={func}>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => handleScientificInput(func)}
                                    className="h-12 text-sm"
                                    variant="outline"
                                >
                                    {func}
                                </Button>
                            </TooltipTrigger>
                             <TooltipContent>
                                <p>{tooltip}</p>
                            </TooltipContent>
                        </Tooltip>
                     ))}
                  </div>
              </TabsContent>
               <TabsContent value="basic" className="mt-4">
                   <div className="grid grid-cols-4 gap-2">
                        {buttonLayout.map((btn) => {
                            const { variant, className } = getButtonClass(btn);
                            return (
                                <Button
                                    key={btn}
                                    onClick={() => handleInput(btn)}
                                    className={`h-16 text-2xl ${className}`}
                                    variant={variant}
                                >
                                    {btn}
                                </Button>
                            );
                        })}
                    </div>
               </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      </TooltipProvider>
    </div>
  );
}
