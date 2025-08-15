
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const buttonLayout = [
  "AC", "+/-", "%", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "="
];

const scientificButtonLayout = [
    '(', ')', 'mc', 'm+', 'm-', 'mr',
    'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', 'x!',
    '¹/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀',
    'sin', 'cos', 'tan', 'e', 'EE', 'Rad',
    'sinh', 'cosh', 'tanh', 'π', 'Rand', 'deg'
];

export default function ScientificCalculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [memory, setMemory] = useState(0);

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

      // This is a simplified mapping. A real implementation would need a proper parser.
      switch(func) {
          case '(': currentDisplay += '('; break;
          case ')': currentDisplay += ')'; break;
          case 'mc': setMemory(0); break;
          case 'm+': setMemory(prev => prev + parseFloat(displayValue)); break;
          case 'm-': setMemory(prev => prev - parseFloat(displayValue)); break;
          case 'mr': setDisplayValue(memory.toString()); break;
          case 'x²': setDisplayValue(prev => `Math.pow(${prev}, 2)`); break;
          case 'x³': setDisplayValue(prev => `Math.pow(${prev}, 3)`); break;
          case 'xʸ': currentDisplay += '^'; break;
          case 'eˣ': setDisplayValue(prev => `Math.exp(${prev})`); break;
          case '10ˣ': setDisplayValue(prev => `Math.pow(10, ${prev})`); break;
          case 'x!': setDisplayValue(prev => `factorial(${prev})`); break;
          case '¹/x': setDisplayValue(prev => `1 / (${prev})`); break;
          case '²√x': setDisplayValue(prev => `Math.sqrt(${prev})`); break;
          case '³√x': setDisplayValue(prev => `Math.cbrt(${prev})`); break;
          case 'ʸ√x': currentDisplay += '**(1/'; break;
          case 'ln': currentDisplay += 'Math.log('; break;
          case 'log₁₀': currentDisplay += 'Math.log10('; break;
          case 'sin': currentDisplay += 'Math.sin('; break;
          case 'cos': currentDisplay += 'Math.cos('; break;
          case 'tan': currentDisplay += 'Math.tan('; break;
          case 'e': currentDisplay += 'Math.E'; break;
          case 'EE': currentDisplay += '*10**'; break;
          case 'Rad': /* placeholder for unit switching */ break;
          case 'sinh': currentDisplay += 'Math.sinh('; break;
          case 'cosh': currentDisplay += 'Math.cosh('; break;
          case 'tanh': currentDisplay += 'Math.tanh('; break;
          case 'π': currentDisplay += 'Math.PI'; break;
          case 'Rand': setDisplayValue(Math.random().toString()); return;
          case 'deg': /* placeholder for unit switching */ break;
          default: break;
      }
      setDisplayValue(currentDisplay);
  }

    const factorial = (n: number): number => {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    };


  const handleEquals = () => {
    try {
        let evalExpression = displayValue.replace(/\^/g, '**');

        const result = new Function('factorial', 'return ' + evalExpression)(factorial);
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
    if (isOperator(btn) || btn === "=") return "bg-primary/80 hover:bg-primary text-primary-foreground";
    if (["AC", "+/-", "%"].includes(btn)) return "bg-muted hover:bg-muted/80";
    if (btn === "0") return "col-span-2";
    return "bg-secondary hover:bg-secondary/80";
  };
  
  const getScientificButtonClass = () => "bg-muted hover:bg-muted/80 text-xs md:text-sm";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        const key = event.key;
        if (key >= '0' && key <= '9' || key === '.') {
            handleInput(key);
        } else if (isOperator(key)) {
            handleInput(key);
        } else if (key === 'Enter' || key === '=') {
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
      <Card>
        <CardHeader>
          <CardTitle>Scientific Calculator</CardTitle>
          <CardDescription>A versatile calculator for both basic and advanced mathematical functions. Use the tabs to switch between scientific and standard modes. Now with keyboard support!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            value={displayValue} 
            readOnly 
            className="h-20 text-4xl text-right font-mono pr-4 bg-background"
          />
          <Tabs defaultValue="scientific">
              <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="scientific">Sci</TabsTrigger>
                  <TabsTrigger value="basic">Basic</TabsTrigger>
              </TabsList>
              <TabsContent value="scientific" className="mt-4">
                  <div className="grid grid-cols-6 gap-2">
                     {scientificButtonLayout.map((btn) => (
                        <Button
                            key={btn}
                            onClick={() => handleScientificInput(btn)}
                            className={`h-12 text-sm ${getScientificButtonClass()}`}
                            title={btn}
                        >
                            {btn}
                        </Button>
                     ))}
                  </div>
              </TabsContent>
               <TabsContent value="basic" className="mt-4">
                   <div className="grid grid-cols-4 gap-2">
                        {buttonLayout.map((btn) => (
                        <Button
                            key={btn}
                            onClick={() => handleInput(btn)}
                            className={`h-16 text-2xl ${getButtonClass(btn)}`}
                        >
                            {btn}
                        </Button>
                        ))}
                    </div>
               </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
