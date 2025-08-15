
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInput = (input: string) => {
    if (input === "=") {
      handleEquals();
    } else if (input === "AC") {
      resetCalculator();
    } else if (input === "+/-") {
        setDisplayValue(prev => (parseFloat(prev) * -1).toString());
    } else if (input === "%") {
        setDisplayValue(prev => (parseFloat(prev) / 100).toString());
    } else {
      if(displayValue === "0" && !isOperator(input) && input !== '.'){
        setDisplayValue(input);
      } else if (displayValue === "Error") {
        setDisplayValue(input);
      } else {
        setDisplayValue(prev => prev + input);
      }
    }
  };

  const handleBackspace = () => {
    setDisplayValue(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
  };
  
  const handleScientificInput = (func: string) => {
      let currentDisplay = displayValue === "0" || displayValue === "Error" ? "" : displayValue;

      const angleToRad = (angle: number) => isRadians ? angle : angle * (Math.PI / 180);
      const radToAngle = (rad: number) => isRadians ? rad : rad * (180 / Math.PI);

      try {
        switch(func) {
            case '(': currentDisplay += '('; break;
            case ')': currentDisplay += ')'; break;
            case 'mc': setMemory(0); return;
            case 'm+': setMemory(prev => prev + parseFloat(displayValue)); return;
            case 'm-': setMemory(prev => prev - parseFloat(displayValue)); return;
            case 'mr': setDisplayValue(memory.toString()); return;
            case 'x²': setDisplayValue(prev => Math.pow(parseFloat(prev), 2).toString()); return;
            case 'x³': setDisplayValue(prev => Math.pow(parseFloat(prev), 3).toString()); return;
            case 'xʸ': currentDisplay += '**'; break;
            case 'eˣ': setDisplayValue(prev => Math.exp(parseFloat(prev)).toString()); return;
            case '10ˣ': setDisplayValue(prev => Math.pow(10, parseFloat(prev)).toString()); return;
            case 'x!': setDisplayValue(prev => factorial(parseInt(prev)).toString()); return;
            case '¹/x': setDisplayValue(prev => (1 / parseFloat(prev)).toString()); return;
            case '²√x': setDisplayValue(prev => Math.sqrt(parseFloat(prev)).toString()); return;
            case '³√x': setDisplayValue(prev => Math.cbrt(parseFloat(prev)).toString()); return;
            case 'ʸ√x': currentDisplay += '**(1/'; break;
            case 'ln': setDisplayValue(prev => Math.log(parseFloat(prev)).toString()); return;
            case 'log₁₀': setDisplayValue(prev => Math.log10(parseFloat(prev)).toString()); return;
            case 'sin': setDisplayValue(prev => Math.sin(angleToRad(parseFloat(prev))).toString()); return;
            case 'cos': setDisplayValue(prev => Math.cos(angleToRad(parseFloat(prev))).toString()); return;
            case 'tan': setDisplayValue(prev => Math.tan(angleToRad(parseFloat(prev))).toString()); return;
            case 'e': currentDisplay += Math.E.toString(); break;
            case 'EE': currentDisplay += 'e'; break;
            case 'Rad': setIsRadians(true); return;
            case 'deg': setIsRadians(false); return;
            case 'sinh': setDisplayValue(prev => Math.sinh(parseFloat(prev)).toString()); return;
            case 'cosh': setDisplayValue(prev => Math.cosh(parseFloat(prev)).toString()); return;
            case 'tanh': setDisplayValue(prev => Math.tanh(parseFloat(prev)).toString()); return;
            case 'π': currentDisplay += Math.PI.toString(); break;
            case 'Rand': if (isClient) setDisplayValue(Math.random().toString()); return;
            default: break;
        }
        setDisplayValue(currentDisplay);
      } catch {
        setDisplayValue("Error");
      }
  }

    const factorial = (n: number): number => {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    };


  const handleEquals = () => {
    try {
        const result = new Function('return ' + displayValue)();
        setDisplayValue(result.toString());
    } catch (error) {
        setDisplayValue("Error");
    }
  };

  const resetCalculator = () => {
    setDisplayValue("0");
  };

  const isOperator = (btn: string) => ["/", "*", "-", "+"].includes(btn);

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
        } else if (key === 'Escape') {
            resetCalculator();
        } else if (key === '(' || key === ')') {
            handleScientificInput(key);
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, [displayValue]); // Re-add listener if displayValue changes, to use its latest state

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
