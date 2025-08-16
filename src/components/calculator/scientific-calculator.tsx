
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
    { func: 'sinh', tooltip: 'Hyperbolic Sine' }, { func: 'cosh', tooltip: 'Hyperbolic Cosine' }, { func: 'tanh', tooltip: 'Hyperbolic Tangent' }, { func: 'π', tooltip: 'Pi' }, { func: 'Rand', tooltip: 'Random Number' }, { func: 'deg', tooltip: 'Switch to Degrees' },
    { func: 'sin⁻¹', tooltip: 'Arcsine' }, { func: 'cos⁻¹', tooltip: 'Arccosine' }, { func: 'tan⁻¹', tooltip: 'Arctangent' }
];

export default function ScientificCalculator() {
  const [expression, setExpression] = useState("");
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
      if(justEvaluated || (displayValue === "0" && input !== '.')){
        setDisplayValue(input);
        setJustEvaluated(false);
      } else {
        setDisplayValue(prev => prev + input);
      }
    }
  };
  
  const handleOperator = (op: string) => {
    setJustEvaluated(false);
    if (displayValue !== "Error") {
      const lastChar = displayValue.slice(-1);
      if(isOperator(lastChar)) {
        setDisplayValue(prev => prev.slice(0, -1) + op);
      } else {
        setDisplayValue(prev => prev + op);
      }
    }
  }

  const handleBackspace = () => {
    setDisplayValue(prev => (prev.length > 1 && prev !== "Error") ? prev.slice(0, -1) : "0");
  };
  
  const handleScientificInput = (func: string) => {
      setJustEvaluated(false);
      if (displayValue === "Error" && func !== 'AC') {
        resetCalculator();
        return;
      }
      let currentDisplay = (displayValue === "0" || displayValue === "Error") ? "" : displayValue;

      const angleToRad = (angle: number) => isRadians ? angle : angle * (Math.PI / 180);
      const radToAngle = (rad: number) => isRadians ? rad : rad * (180 / Math.PI);
      const value = parseFloat(displayValue);

      try {
        switch(func) {
            case '(': currentDisplay += '('; break;
            case ')': currentDisplay += ')'; break;
            case 'mc': setMemory(0); return;
            case 'm+': setMemory(prev => prev + value); return;
            case 'm-': setMemory(prev => prev - value); return;
            case 'mr': setDisplayValue(memory.toString()); return;
            case 'x²': handleEquals(Math.pow(value, 2).toString()); return;
            case 'x³': handleEquals(Math.pow(value, 3).toString()); return;
            case 'xʸ': currentDisplay += '**'; break;
            case 'eˣ': handleEquals(Math.exp(value).toString()); return;
            case '10ˣ': handleEquals(Math.pow(10, value).toString()); return;
            case 'x!': handleEquals(factorial(value).toString()); return;
            case '¹/x': handleEquals((1 / value).toString()); return;
            case '²√x': if(value < 0) throw new Error(); handleEquals(Math.sqrt(value).toString()); return;
            case '³√x': handleEquals(Math.cbrt(value).toString()); return;
            case 'ʸ√x': currentDisplay += '**(1/'; break;
            case 'ln': if(value <= 0) throw new Error(); handleEquals(Math.log(value).toString()); return;
            case 'log₁₀': if(value <= 0) throw new Error(); handleEquals(Math.log10(value).toString()); return;
            case 'sin': handleEquals(Math.sin(angleToRad(value)).toString()); return;
            case 'cos': handleEquals(Math.cos(angleToRad(value)).toString()); return;
            case 'tan': if (isRadians ? (value / Math.PI - 0.5) % 1 === 0 : (value / 90 - 1) % 2 === 0) throw new Error("Invalid input for tan"); handleEquals(Math.tan(angleToRad(value)).toString()); return;
            case 'sin⁻¹': if(value < -1 || value > 1) throw new Error(); handleEquals(radToAngle(Math.asin(value)).toString()); return;
            case 'cos⁻¹': if(value < -1 || value > 1) throw new Error(); handleEquals(radToAngle(Math.acos(value)).toString()); return;
            case 'tan⁻¹': handleEquals(radToAngle(Math.atan(value)).toString()); return;
            case 'e': currentDisplay += Math.E.toString(); break;
            case 'EE': currentDisplay += 'e'; break;
            case 'Rad': setIsRadians(true); return;
            case 'deg': setIsRadians(false); return;
            case 'sinh': handleEquals(Math.sinh(value).toString()); return;
            case 'cosh': handleEquals(Math.cosh(value).toString()); return;
            case 'tanh': handleEquals(Math.tanh(value).toString()); return;
            case 'π': currentDisplay += Math.PI.toString(); break;
            case 'Rand':
                if (isClient) {
                    setDisplayValue(Math.random().toString());
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


  const handleEquals = (precomputedResult?: string) => {
    try {
        const result = precomputedResult !== undefined ? parseFloat(precomputedResult) : new Function('return ' + displayValue.replace(/\^/g, '**'))();
        
        if (result === undefined || isNaN(result) || !isFinite(result)) {
            setExpression(displayValue);
            setDisplayValue("Error");
        } else {
            setExpression(displayValue);
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
  }, [displayValue, isRadians, justEvaluated]); // Re-add listener if state changes

  return (
    <div className="lg:col-span-3 max-w-md mx-auto">
       <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle>Scientific Calculator</CardTitle>
          <CardDescription>A versatile calculator for both basic and advanced mathematical functions. Use the tabs to switch between scientific and standard modes. Now with keyboard support!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-20 p-4 bg-background border rounded-md flex flex-col justify-end items-end">
            <div data-testid="expression-display" className="text-sm text-muted-foreground h-1/3 truncate">{expression}</div>
            <div 
              data-testid="main-display"
              aria-label="Calculator display"
              className="text-4xl font-mono h-2/3"
            >
              {displayValue}
            </div>
          </div>
          <Tabs defaultValue="scientific">
              <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="scientific">Sci</TabsTrigger>
                  <TabsTrigger value="basic">Basic</TabsTrigger>
              </TabsList>
              <TabsContent value="scientific" className="mt-4">
                  <div className="grid grid-cols-6 gap-2">
                     {scientificButtonLayout
                        .filter(btn => isRadians ? btn.func !== 'Rad' : btn.func !== 'deg')
                        .map(({func, tooltip}) => (
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
