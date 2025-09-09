
"use client";

import { Delete } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ScientificCalculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [expression, setExpression] = useState("");
  // This state is needed to manage the logic for the scientific calculator
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleInput = (value: string) => {
    // Placeholder function for scientific calculator logic
    if (displayValue === "0" || isNewNumber) {
      setDisplayValue(value);
      setIsNewNumber(false);
    } else {
      setDisplayValue(displayValue + value);
    }
  };

  const handleOperator = (operator: string) => {
    setExpression(expression + displayValue + " " + operator + " ");
    setIsNewNumber(true);
  };
  
  const handleClear = () => {
    setDisplayValue("0");
    setExpression("");
    setIsNewNumber(true);
  };

  const handleBackspace = () => {
    setDisplayValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };
  
  const handleEquals = useCallback(() => {
    // Placeholder for evaluation logic
    try {
      const sanitizedExpr = expression.replace(/×/g, "*").replace(/÷/g, "/");
      const result = eval(sanitizedExpr + displayValue);
      setDisplayValue(String(result));
      setExpression("");
      setIsNewNumber(true);
    } catch {
      setDisplayValue("Error");
      setExpression("");
      setIsNewNumber(true);
    }
  }, [expression, displayValue]);

  const basicBtnClasses = "h-12 text-md rounded-lg py-2 font-semibold";
  const specialBtnClasses =
    "bg-neutral-300 dark:bg-neutral-700/80 hover:bg-neutral-400/80 dark:hover:bg-neutral-700 text-black dark:text-white";
  const operatorBtnClasses =
    "bg-primary hover:bg-primary/90 text-primary-foreground";
  const numberBtnClasses =
    "bg-neutral-200 dark:bg-neutral-800/80 hover:bg-neutral-300/80 dark:hover:bg-neutral-800 text-black dark:text-white";


  return (
    <Card className="w-full mx-auto overflow-hidden rounded-2xl border-none bg-transparent shadow-none">
      <CardContent className="p-1">
        <div className="h-28 p-4 bg-muted dark:bg-black/20 rounded-xl flex flex-col justify-end items-end overflow-hidden mb-4">
           <div className="text-xl text-muted-foreground h-1/3 truncate w-full text-right">
            {expression}
          </div>
          <div className="h-2/3 w-full flex items-end justify-end">
            <div className="w-full text-right font-mono text-5xl text-foreground">
              {displayValue}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 p-1">
          {/* Scientific buttons */}
          {["sin", "cos", "tan", "log", "ln"].map((op) => (
            <Button key={op} onClick={() => handleOperator(op)} className={cn(basicBtnClasses, specialBtnClasses)}>
              {op}
            </Button>
          ))}
          {["(", ")", "√", "x²", "xʸ"].map((op) => (
            <Button key={op} onClick={() => handleOperator(op)} className={cn(basicBtnClasses, specialBtnClasses)}>
              {op}
            </Button>
          ))}
          
          {/* Basic buttons adapted for 5-column layout */}
          <Button onClick={handleClear} className={cn(basicBtnClasses, specialBtnClasses, "col-span-2")}>AC</Button>
          <Button onClick={handleBackspace} className={cn(basicBtnClasses, specialBtnClasses)}><Delete/></Button>
          <Button onClick={() => handleOperator("÷")} className={cn(basicBtnClasses, operatorBtnClasses)}>÷</Button>
          
          {["7", "8", "9"].map((num) => (
            <Button key={num} onClick={() => handleInput(num)} className={cn(basicBtnClasses, numberBtnClasses)}>
              {num}
            </Button>
          ))}
          <Button onClick={() => handleOperator("×")} className={cn(basicBtnClasses, operatorBtnClasses)}>×</Button>

          {["4", "5", "6"].map((num) => (
            <Button key={num} onClick={() => handleInput(num)} className={cn(basicBtnClasses, numberBtnClasses)}>
              {num}
            </Button>
          ))}
          <Button onClick={() => handleOperator("-")} className={cn(basicBtnClasses, operatorBtnClasses)}>-</Button>

          {["1", "2", "3"].map((num) => (
            <Button key={num} onClick={() => handleInput(num)} className={cn(basicBtnClasses, numberBtnClasses)}>
              {num}
            </Button>
          ))}
          <Button onClick={() => handleOperator("+")} className={cn(basicBtnClasses, operatorBtnClasses)}>+</Button>

          <Button onClick={() => handleInput("0")} className={cn(basicBtnClasses, numberBtnClasses, "col-span-2")}>0</Button>
          <Button onClick={() => handleInput(".")} className={cn(basicBtnClasses, numberBtnClasses)}>.</Button>
          <Button onClick={handleEquals} className={cn(basicBtnClasses, operatorBtnClasses)}>=</Button>
        </div>
      </CardContent>
    </Card>
  );
}
