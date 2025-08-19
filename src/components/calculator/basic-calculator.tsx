
"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Delete, Heart } from "lucide-react";

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

export default function BasicCalculator() {
  const [expression, setExpression] = useState("");
  const [displayValue, setDisplayValue] = useState("0");
  const [justEvaluated, setJustEvaluated] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [memory, setMemory] = useState(0);
  const [isRadians, setIsRadians] = useState(false);
  const [isInverse, setIsInverse] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const scientificButtons = getScientificButtonLayout(isInverse);

  const isOperator = (btn: string) => ["/", "*", "-", "+"].includes(btn);
  
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
  
  const resetCalculator = useCallback(() => {
    setExpression("");
    setDisplayValue("0");
    setJustEvaluated(false);
  }, []);

  const handleInput = useCallback((input: string) => {
    if (input === "AC") {
      resetCalculator();
      return;
    }

    if (displayValue === "Error" || displayValue === "I ❤️ You") {
        if(input === "AC") {
          resetCalculator();
        }
        return;
    }
    
    if (justEvaluated && !isOperator(input) && input !== '.') {
        setExpression(""); 
        setDisplayValue(input);
        setJustEvaluated(false);
        return;
    }

    if (isOperator(input)) {
        handleOperator(input);
    } else if (input === "=") {
      handleEquals();
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
    
    if(input !== "=") setJustEvaluated(false);
  }, [displayValue, justEvaluated, resetCalculator]);

  const handleOperator = (op: string) => {
    if (displayValue !== "Error") {
      const currentVal = parseFloat(displayValue);
      if (justEvaluated) {
          setExpression(displayValue + op);
      } else {
          setExpression(prev => prev + displayValue + op);
      }
      setDisplayValue("0");
      setJustEvaluated(false);
    }
  };

  const handleEquals = () => {
    if (justEvaluated) return;
    let fullExpression = (expression + displayValue).replace(/‑/g, "-");
    if (fullExpression === '12082007+19112005') {
      setDisplayValue("I ❤️ You");
      setExpression("");
      setIsCelebrating(true);
      setTimeout(() => setIsCelebrating(false), 6000);
      setJustEvaluated(true);
      return;
    }
    
    try {
        const safeExpression = fullExpression.replace(/[^-()\d/*+.]/g, '');
        // Use Function constructor for safe evaluation
        const result = new Function('return ' + safeExpression)();
        
        if (result === undefined || !isFinite(result)) {
            setExpression(safeExpression);
            setDisplayValue("Error");
        } else {
            setExpression("");
            setDisplayValue(result.toString());
        }
    } catch (error) {
        setExpression(displayValue);
        setDisplayValue("Error");
    }
    setJustEvaluated(true);
  };
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }
      const { key } = event;
      
      if (/[0-9.]/.test(key)) handleInput(key);
      else if (isOperator(key)) handleOperator(key);
      else if (key === 'Enter' || key === '=') handleInput('=');
      else if (key === 'Backspace') handleInput('Backspace');
      else if (key === 'Escape') handleInput('AC');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleInput, handleOperator]);
  
    const handleScientificInput = (func: string) => {
    if (displayValue === "Error" && func !== 'AC') return;
    
    let currentDisplay = (displayValue === "0" || displayValue === "Error") ? "" : displayValue;
    const value = parseFloat(displayValue);
    const angleToRad = (angle: number) => isRadians ? angle : angle * (Math.PI / 180);
    const radToAngle = (rad: number) => isRadians ? rad : rad * (180 / Math.PI);

    try {
      let result;
      switch(func) {
        case '2nd': setIsInverse(!isInverse); return;
        case 'x²': result = Math.pow(value, 2); break;
        case 'x³': result = Math.pow(value, 3); break;
        case 'eˣ': result = Math.exp(value); break;
        case '10ˣ': result = Math.pow(10, value); break;
        case 'x!': result = factorial(value); break;
        case '¹/x': result = 1 / value; break;
        case '²√x': if (value < 0) throw new Error("Invalid input"); result = Math.sqrt(value); break;
        case '³√x': result = Math.cbrt(value); break;
        case 'ln': if (value <= 0) throw new Error("Invalid input"); result = Math.log(value); break;
        case 'log₁₀': if (value <= 0) throw new Error("Invalid input"); result = Math.log10(value); break;
        case 'log₂': if (value <= 0) throw new Error("Invalid input"); result = Math.log2(value); break;
        case 'sin': result = Math.sin(angleToRad(value)); break;
        case 'cos': result = Math.cos(angleToRad(value)); break;
        case 'tan': if (isRadians ? (value / Math.PI - 0.5) % 1 === 0 : (value / 90 - 1) % 2 === 0) throw new Error("Invalid input"); result = Math.tan(angleToRad(value)); break;
        case 'sin⁻¹': if(value < -1 || value > 1) throw new Error("Input must be between -1 and 1"); result = radToAngle(Math.asin(value)); break;
        case 'cos⁻¹': if(value < -1 || value > 1) throw new Error("Input must be between -1 and 1"); result = radToAngle(Math.acos(value)); break;
        case 'tan⁻¹': result = radToAngle(Math.atan(value)); break;
        case 'e': result = Math.E; break;
        case 'π': result = Math.PI; break;
        case 'Rand': result = typeof window !== 'undefined' ? Math.random() : 0.5; break;
        case 'mc': setMemory(0); return;
        case 'm+': setMemory(prev => prev + value); return;
        case 'm-': setMemory(prev => prev - value); return;
        case 'mr': setDisplayValue(memory.toString()); return;
        case 'Rad': setIsRadians(true); return;
        case 'deg': setIsRadians(false); return;
        default: setDisplayValue(currentDisplay + func); return;
      }
      if (result !== undefined && isFinite(result)) {
        setDisplayValue(result.toString());
      } else {
        setDisplayValue("Error");
      }
    } catch(e) {
      setDisplayValue("Error");
    }
  }

  const renderDisplay = () => (
    <div className="h-28 p-4 bg-background border rounded-md flex flex-col justify-end items-end overflow-hidden">
        <div className="text-xl text-muted-foreground h-1/3 truncate w-full text-right">{expression || (activeTab === 'sci' ? 'Scientific Mode' : ' ')}</div>
        <div className="h-2/3 w-full flex items-end justify-end">
            <div
                aria-label="Calculator display"
                className={cn(
                    "w-full text-right font-mono fluid-display-font", 
                    displayValue === "I ❤️ You" && "text-pink-500"
                )}
            >
                {displayValue}
            </div>
        </div>
    </div>
  );

  const renderBasicButtons = () => (
    <div className="grid grid-cols-4 grid-rows-5 gap-2 mt-4">
        <Button onClick={() => handleInput("AC")} variant="outline" className="bg-secondary hover:bg-secondary/80 h-16 text-xl">AC</Button>
        <Button onClick={() => handleInput("Backspace")} variant="outline" className="bg-secondary hover:bg-secondary/80 h-16 text-xl"><Delete /></Button>
        <Button onClick={() => handleInput("%")} variant="outline" className="bg-secondary hover:bg-secondary/80 h-16 text-xl">%</Button>
        <Button onClick={() => handleOperator("/")} variant="default" className="bg-primary/80 hover:bg-primary text-primary-foreground h-16 text-2xl">÷</Button>
        <Button onClick={() => handleInput("7")} variant="outline" className="h-16 text-2xl">7</Button>
        <Button onClick={() => handleInput("8")} variant="outline" className="h-16 text-2xl">8</Button>
        <Button onClick={() => handleInput("9")} variant="outline" className="h-16 text-2xl">9</Button>
        <Button onClick={() => handleOperator("*")} variant="default" className="bg-primary/80 hover:bg-primary text-primary-foreground h-16 text-2xl">×</Button>
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
  );

  const renderScientificButtons = () => (
      <div className="grid grid-cols-6 gap-2 mt-4">
          {scientificButtons
              .concat(isRadians ? {func: 'deg', tooltip: 'Switch to Degrees'} : {func: 'Rad', tooltip: 'Switch to Radians'})
              .map(({func, tooltip, active}) => (
              <Tooltip key={func}>
                  <TooltipTrigger asChild>
                      <Button
                          variant="outline"
                          onClick={() => handleScientificInput(func)}
                          className={cn("h-12 text-sm", active && "bg-primary/80 text-primary-foreground hover:bg-primary")}
                      >
                          {func}
                      </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>{tooltip}</p></TooltipContent>
              </Tooltip>
          ))}
      </div>
  );

  return (
    <div className="lg:col-span-3 space-y-6">
    <TooltipProvider>
      <Card className="max-w-sm mx-auto overflow-hidden relative">
        {isCelebrating && (
          <div className="celebrate absolute inset-0 pointer-events-none">
            {Array.from({ length: 10 }).map((_, i) => (
              <Heart key={i} className="heart absolute" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }} />
            ))}
          </div>
        )}
        <CardHeader>
          <CardTitle>Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="sci">Sci</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="mt-4">
                {renderDisplay()}
                {renderBasicButtons()}
            </TabsContent>

            <TabsContent value="sci" className="mt-4">
                {renderDisplay()}
                {renderScientificButtons()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </TooltipProvider>
    </div>
  );
}
