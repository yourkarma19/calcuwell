"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    'sin', 'cos', 'tan', '(',
    'ln', 'log', '√', ')',
    'π', 'e', 'x²', '^',
];


export default function ScientificCalculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [expression, setExpression] = useState("");

  const handleInput = (input: string) => {
    if (input === "=") {
      handleEquals();
    } else if (input === "AC") {
      resetCalculator();
    } else if (input === "+/-") {
        setDisplayValue(prev => (parseFloat(prev) * -1).toString());
    } else if (input === "%") {
        setDisplayValue(prev => (parseFloat(prev) / 100).toString());
    }
     else {
      if(displayValue === "0" && !isOperator(input) && input !== '.'){
        setDisplayValue(input);
      } else {
        setDisplayValue(prev => prev + input);
      }
    }
  };
  
  const handleScientificInput = (func: string) => {
      let currentDisplay = displayValue === "0" ? "" : displayValue;

      switch(func) {
          case 'sin': currentDisplay += 'sin('; break;
          case 'cos': currentDisplay += 'cos('; break;
          case 'tan': currentDisplay += 'tan('; break;
          case 'ln': currentDisplay += 'log('; break;
          case 'log': currentDisplay += 'log10('; break;
          case '√': currentDisplay += 'sqrt('; break;
          case 'x²': currentDisplay += '^2'; break;
          case '^': currentDisplay += '^'; break;
          case 'π': currentDisplay += 'pi'; break;
          case 'e': currentDisplay += 'e'; break;
          case '(': currentDisplay += '('; break;
          case ')': currentDisplay += ')'; break;
      }
      setDisplayValue(currentDisplay);
  }

  const handleEquals = () => {
    try {
        let evalExpression = displayValue
                                .replace(/\^/g, '**')
                                .replace(/sin/g, 'Math.sin')
                                .replace(/cos/g, 'Math.cos')
                                .replace(/tan/g, 'Math.tan')
                                .replace(/log/g, 'Math.log')
                                .replace(/log10/g, 'Math.log10')
                                .replace(/sqrt/g, 'Math.sqrt')
                                .replace(/pi/g, 'Math.PI')
                                .replace(/e/g, 'Math.E');

        const result = new Function('return ' + evalExpression)();
        setDisplayValue(result.toString());
    } catch (error) {
        setDisplayValue("Error");
    }
  };

  const resetCalculator = () => {
    setDisplayValue("0");
    setExpression("");
  };

  const isOperator = (btn: string) => ["/", "*", "-", "+"].includes(btn);

  const getButtonClass = (btn: string) => {
    if (isOperator(btn) || btn === "=") return "bg-primary/80 hover:bg-primary text-primary-foreground";
    if (["AC", "+/-", "%"].includes(btn)) return "bg-muted hover:bg-muted/80";
    if (btn === "0") return "col-span-2";
    return "bg-secondary hover:bg-secondary/80";
  };
  
  const getScientificButtonClass = () => "bg-muted hover:bg-muted/80";

  return (
    <div className="lg:col-span-3 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Scientific Calculator</CardTitle>
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
                  <div className="grid grid-cols-4 gap-2">
                     {scientificButtonLayout.map((btn) => (
                        <Button
                            key={btn}
                            onClick={() => handleScientificInput(btn)}
                            className={`h-16 text-xl ${getScientificButtonClass()}`}
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
