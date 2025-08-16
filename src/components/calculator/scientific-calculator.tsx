
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const buttonLayout = [
  "AC", "+/-", "%", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "="
];

const getScientificButtonLayout = (isInverse: boolean) => [
    { func: '(', tooltip: 'Open Parenthesis' }, { func: ')', tooltip: 'Close Parenthesis' }, { func: 'mc', tooltip: 'Memory Clear' }, { func: 'm+', tooltip: 'Memory Add' }, { func: 'm-', tooltip: 'Memory Subtract' }, { func: 'mr', tooltip: 'Memory Recall' },
    { func: '2nd', tooltip: 'Inverse Functions', active: isInverse },
    isInverse ? { func: 'x³', tooltip: 'Cube' } : { func: 'x²', tooltip: 'Square' },
    { func: 'xʸ', tooltip: 'Power' },
    isInverse ? { func: 'ln', tooltip: 'Natural Log' } : { func: 'eˣ', tooltip: 'e^x' },
    { func: '10ˣ', tooltip: '10^x' },
    { func: 'x!', tooltip: 'Factorial' },
    { func: '¹/x', tooltip: 'Reciprocal' },
    isInverse ? { func: '³√x', tooltip: 'Cube Root' } : { func: '²√x', tooltip: 'Square Root' },
    { func: 'ʸ√x', tooltip: 'y-th Root' },
    isInverse ? { func: 'log₂', tooltip: 'Log base 2' } : { func: 'log₁₀', tooltip: 'Log base 10' },
    { func: 'e', tooltip: `Euler's Number` },
    { func: 'EE', tooltip: 'Exponent' },
    isInverse ? { func: 'sin⁻¹', tooltip: 'Arcsine' } : { func: 'sin', tooltip: 'Sine' },
    isInverse ? { func: 'cos⁻¹', tooltip: 'Arccosine' } : { func: 'cos', tooltip: 'Cosine' },
    isInverse ? { func: 'tan⁻¹', tooltip: 'Arctangent' } : { func: 'tan', tooltip: 'Tangent' },
    isInverse ? { func: 'sinh⁻¹', tooltip: 'Hyperbolic Arcsine' } : { func: 'sinh', tooltip: 'Hyperbolic Sine' },
    isInverse ? { func: 'cosh⁻¹', tooltip: 'Hyperbolic Arccosine' } : { func: 'cosh', tooltip: 'Hyperbolic Cosine' },
    isInverse ? { func: 'tanh⁻¹', tooltip: 'Hyperbolic Arctangent' } : { func: 'tanh', tooltip: 'Hyperbolic Tangent' },
    { func: 'π', tooltip: 'Pi' },
    { func: 'Rand', tooltip: 'Random Number' },
];

export default function ScientificCalculator() {
  const [expression, setExpression] = useState("");
  const [displayValue, setDisplayValue] = useState("0");
  const [memory, setMemory] = useState(0);
  const [isRadians, setIsRadians] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [justEvaluated, setJustEvaluated] = useState(false);
  const [isInverse, setIsInverse] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
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
      setJustEvaluated(false);
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
    if (justEvaluated) {
      resetCalculator();
      return;
    }
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
            case '2nd': setIsInverse(prev => !prev); return;
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
            case '²√x': if(value < 0) throw new Error("Invalid input for square root"); handleEquals(Math.sqrt(value).toString()); return;
            case '³√x': handleEquals(Math.cbrt(value).toString()); return;
            case 'ʸ√x': currentDisplay += '**(1/'; break;
            case 'ln': if(value <= 0) throw new Error("Invalid input for natural log"); handleEquals(Math.log(value).toString()); return;
            case 'log₁₀': if(value <= 0) throw new Error("Invalid input for log base 10"); handleEquals(Math.log10(value).toString()); return;
            case 'log₂': if(value <= 0) throw new Error("Invalid input for log base 2"); handleEquals(Math.log2(value).toString()); return;
            case 'sin': handleEquals(Math.sin(angleToRad(value)).toString()); return;
            case 'cos': handleEquals(Math.cos(angleToRad(value)).toString()); return;
            case 'tan': if (isRadians ? (value / Math.PI - 0.5) % 1 === 0 : (value / 90 - 1) % 2 === 0) throw new Error("Invalid input for tan"); handleEquals(Math.tan(angleToRad(value)).toString()); return;
            case 'sin⁻¹': if(value < -1 || value > 1) throw new Error("Input for arcsin must be between -1 and 1"); handleEquals(radToAngle(Math.asin(value)).toString()); return;
            case 'cos⁻¹': if(value < -1 || value > 1) throw new Error("Input for arccos must be between -1 and 1"); handleEquals(radToAngle(Math.acos(value)).toString()); return;
            case 'tan⁻¹': handleEquals(radToAngle(Math.atan(value)).toString()); return;
            case 'e': currentDisplay += Math.E.toString(); break;
            case 'EE': currentDisplay += 'e'; break;
            case 'Rad': setIsRadians(true); return;
            case 'deg': setIsRadians(false); return;
            case 'sinh': handleEquals(Math.sinh(value).toString()); return;
            case 'cosh': handleEquals(Math.cosh(value).toString()); return;
            case 'tanh': handleEquals(Math.tanh(value).toString()); return;
            case 'sinh⁻¹': handleEquals(Math.asinh(value).toString()); return;
            case 'cosh⁻¹': if(value < 1) throw new Error("Input for arccosh must be >= 1"); handleEquals(Math.acosh(value).toString()); return;
            case 'tanh⁻¹': if(value <= -1 || value >= 1) throw new Error("Input for arctanh must be between -1 and 1"); handleEquals(Math.atanh(value).toString()); return;
            case 'π': setDisplayValue(Math.PI.toString()); return;
            case 'Rand':
                if (isClient) {
                    setDisplayValue(Math.random().toString());
                }
                return;
            default: break;
        }
        setDisplayValue(currentDisplay);
      } catch (e: any) {
        setDisplayValue("Error");
        setExpression(e.message || "Invalid operation");
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
        const currentExpression = displayValue;
        const result = precomputedResult !== undefined ? parseFloat(precomputedResult) : new Function('return ' + displayValue.replace(/\^/g, '**'))();
        
        if (result === undefined || isNaN(result) || !isFinite(result)) {
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
        } else if (isOperator(key) || key === '^') {
            handleOperator(key === '^' ? '**' : key);
        } else if (key === 'Enter' || key === '=') {
            event.preventDefault(); // prevent form submission
            handleEquals();
        } else if (key === 'Backspace') {
            handleBackspace();
        } else if (key.toLowerCase() === 'c' || key === 'Escape') {
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

  const scientificButtons = getScientificButtonLayout(isInverse);

  return (
    <div className="lg:col-span-3 max-w-2xl mx-auto space-y-6">
       <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle>Scientific Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-28 p-4 bg-background border rounded-md flex flex-col justify-end items-end">
            <div data-testid="expression-display" className="text-xl text-muted-foreground h-1/3 truncate w-full text-right">{expression}</div>
            <div 
              data-testid="main-display"
              aria-label="Calculator display"
              className="text-6xl font-mono h-2/3 w-full text-right"
            >
              {displayValue}
            </div>
          </div>
          <Tabs defaultValue="scientific" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="scientific">Sci</TabsTrigger>
                  <TabsTrigger value="basic">Basic</TabsTrigger>
              </TabsList>
              <TabsContent value="scientific" className="mt-4">
                  <div className="grid grid-cols-6 gap-2">
                     {scientificButtons
                        .concat(isRadians ? {func: 'deg', tooltip: 'Switch to Degrees'} : {func: 'Rad', tooltip: 'Switch to Radians'})
                        .map(({func, tooltip, active}) => (
                        <Tooltip key={func}>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => handleScientificInput(func)}
                                    className={cn("h-12 text-sm", active && "bg-primary/20")}
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

      <Card>
        <CardHeader>
            <CardTitle>About the Scientific Calculator</CardTitle>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What Do the Buttons Mean?</AccordionTrigger>
                    <AccordionContent>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>sin, cos, tan:</strong> Trigonometric functions for calculating ratios of a right triangle's sides.</li>
                            <li><strong>sin⁻¹, cos⁻¹, tan⁻¹:</strong> Inverse trigonometric functions (or arc functions).</li>
                            <li><strong>log, ln:</strong> Logarithm base 10 and natural logarithm.</li>
                            <li><strong>e:</strong> Euler's number, the base of the natural logarithm.</li>
                            <li><strong>x!:</strong> Factorial, the product of all positive integers up to x.</li>
                            <li><strong>√:</strong> Square root.</li>
                            <li><strong>xʸ:</strong> Power function, raises x to the power of y.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How to Calculate Trigonometric Functions</AccordionTrigger>
                    <AccordionContent>
                        First, select your desired angle mode: Degrees (Deg) or Radians (Rad). Then, enter the angle and press the trigonometric function button (e.g., sin, cos, tan). For example, to find the sine of 30 degrees, ensure you are in 'Deg' mode, type '30', and then press 'sin'.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What is the difference between DEG, RAD, and GRAD modes?</AccordionTrigger>
                    <AccordionContent>
                        These are three different units for measuring angles.
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li><strong>Degrees (DEG):</strong> The most common unit, where a full circle is 360°.</li>
                            <li><strong>Radians (RAD):</strong> The standard mathematical unit, where a full circle is 2π radians. This is used in many areas of mathematics and physics.</li>
                            <li><strong>Gradians (GRAD):</strong> A less common unit where a full circle is 400 gradians.</li>
                        </ul>
                        Ensure you are in the correct mode for your calculation to get the right result.
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                    <AccordionTrigger>Practical Applications</AccordionTrigger>
                    <AccordionContent>
                        Scientific calculators are essential in many fields. Engineers use them for designing structures, physicists for modeling phenomena, and students for solving complex math problems in trigonometry, calculus, and algebra. They are a fundamental tool for anyone working with science, technology, engineering, and mathematics (STEM).
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
