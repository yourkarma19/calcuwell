
"use client";

import { Delete } from "lucide-react";
import { useState } from "react";
import { evaluate } from "mathjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Factorial function
const factorial = (n: number): number => {
  if (n < 0 || n !== Math.floor(n)) return NaN; // Factorial is only for non-negative integers
  if (n > 170) return Infinity; // Prevent overflow
  if (n === 0) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

export default function ScientificCalculator() {
  const [expression, setExpression] = useState("");
  const [displayValue, setDisplayValue] = useState("0");
  const [isResult, setIsResult] = useState(false);

  const handleInput = (value: string) => {
    if (isResult) {
      setExpression(value);
      setDisplayValue(value);
      setIsResult(false);
    } else {
      setExpression((prev) => prev + value);
      setDisplayValue((prev) => (prev === "0" ? value : prev + value));
    }
  };

  const handleFunction = (func: string) => {
    if (isResult) {
      setExpression(func);
      setDisplayValue(func);
      setIsResult(false);
    } else {
      setExpression((prev) => prev + func);
      setDisplayValue((prev) => prev + func);
    }
  };

  const handleOperator = (op: string) => {
    if (expression.endsWith(" ") || expression === "") return;
    setExpression((prev) => `${prev} ${op} `);
    setDisplayValue("0");
    setIsResult(false);
  };

  const handleClear = () => {
    setExpression("");
    setDisplayValue("0");
    setIsResult(false);
  };

  const handleDelete = () => {
    if (isResult) return;
    setExpression((prev) => prev.slice(0, -1));
    setDisplayValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const handleEquals = () => {
    if (expression === "" || isResult) return;
    try {
      // Replace custom symbols with mathjs compatible ones
      let finalExpression = expression
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/‑/g, "-")
        .replace(/√\(/g, "sqrt(")
        .replace(/log\(/g, "log10(")
        .replace(/ln\(/g, "log(")
        .replace(/(\d+)!/g, (_, n) => `factorial(${n})`)
        .replace(/π/g, "(pi)")
        .replace(/e/g, "(e)");
      
      // Handle x^y
      finalExpression = finalExpression.replace(/\^/g, "**");

      const result = evaluate(finalExpression);
      setDisplayValue(String(result));
      setExpression(String(result));
      setIsResult(true);
    } catch (error) {
      setDisplayValue("Error");
      setExpression("");
      setIsResult(true);
    }
  };

  const scientificButtons = [
    "sin(", "cos(", "tan(", 
    "log(", "ln(", 
    "√(", "x²", "x³",
    "π", "e", "n!",
    "(", ")", "^", "1/x",
  ];

  const btnClasses = "h-12 text-md rounded-lg py-2 font-semibold";
  const specialBtnClasses = "bg-neutral-300 dark:bg-neutral-700/80 hover:bg-neutral-400/80 dark:hover:bg-neutral-700 text-black dark:text-white";
  const operatorBtnClasses = "bg-primary hover:bg-primary/90 text-primary-foreground text-xl";
  const numberBtnClasses = "bg-neutral-200 dark:bg-neutral-800/80 hover:bg-neutral-300/80 dark:hover:bg-neutral-800 text-black dark:text-white";
  
  return (
    <Card className="w-full max-w-lg mx-auto overflow-hidden rounded-2xl border-none bg-transparent shadow-none">
      <CardContent className="p-1">
        <div className="h-28 p-4 bg-muted dark:bg-black/20 rounded-xl flex flex-col justify-end items-end overflow-hidden mb-4">
          <div className="text-xl text-muted-foreground h-1/3 truncate w-full text-right" aria-label="Expression">
            {expression || " "}
          </div>
          <div className="h-2/3 w-full flex items-end justify-end">
            <div
              aria-live="polite"
              className="w-full text-right font-mono text-5xl text-foreground"
            >
              {displayValue}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {/* Scientific Functions Panel */}
          <div className="col-span-3 grid grid-cols-3 gap-2">
             {scientificButtons.map((btn) => (
              <Button key={btn} onClick={() => handleFunction(btn)} className={cn(btnClasses, specialBtnClasses)}>
                {btn}
              </Button>
            ))}
          </div>

          {/* Keypad Panel */}
          <div className="col-span-3 grid grid-cols-4 gap-2">
            <Button onClick={handleClear} className={cn(btnClasses, operatorBtnClasses, "col-span-2")}>AC</Button>
            <Button onClick={handleDelete} className={cn(btnClasses, operatorBtnClasses)}><Delete /></Button>
            <Button onClick={() => handleOperator("÷")} className={cn(btnClasses, operatorBtnClasses)}>÷</Button>
            
            <Button onClick={() => handleInput("7")} className={cn(btnClasses, numberBtnClasses)}>7</Button>
            <Button onClick={() => handleInput("8")} className={cn(btnClasses, numberBtnClasses)}>8</Button>
            <Button onClick={() => handleInput("9")} className={cn(btnClasses, numberBtnClasses)}>9</Button>
            <Button onClick={() => handleOperator("×")} className={cn(btnClasses, operatorBtnClasses)}>×</Button>
            
            <Button onClick={() => handleInput("4")} className={cn(btnClasses, numberBtnClasses)}>4</Button>
            <Button onClick={() => handleInput("5")} className={cn(btnClasses, numberBtnClasses)}>5</Button>
            <Button onClick={() => handleInput("6")} className={cn(btnClasses, numberBtnClasses)}>6</Button>
            <Button onClick={() => handleOperator("‑")} className={cn(btnClasses, operatorBtnClasses)}>-</Button>
            
            <Button onClick={() => handleInput("1")} className={cn(btnClasses, numberBtnClasses)}>1</Button>
            <Button onClick={() => handleInput("2")} className={cn(btnClasses, numberBtnClasses)}>2</Button>
            <Button onClick={() => handleInput("3")} className={cn(btnClasses, numberBtnClasses)}>3</Button>
            <Button onClick={() => handleOperator("+")} className={cn(btnClasses, operatorBtnClasses)}>+</Button>

            <Button onClick={() => handleInput("0")} className={cn(btnClasses, numberBtnClasses, "col-span-2")}>0</Button>
            <Button onClick={() => handleInput(".")} className={cn(btnClasses, numberBtnClasses)}>.</Button>
            <Button onClick={handleEquals} className={cn(btnClasses, operatorBtnClasses)}>=</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
