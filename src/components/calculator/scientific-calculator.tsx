"use client";

import { Delete, Divide, Minus, Plus, X as Times } from "lucide-react";
import { useState } from "react";
import { evaluate } from "mathjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Factorial function
const factorial = (n: number): number => {
  if (n < 0 || n !== Math.floor(n)) throw new Error("Factorial is only for non-negative integers.");
  if (n > 170) throw new Error("Factorial overflow.");
  if (n === 0) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
};

// Custom functions for mathjs
const customFunctions = {
  factorial,
  log2: (x: number) => Math.log2(x),
};

export default function ScientificCalculator() {
  const [expression, setExpression] = useState("");
  const [displayValue, setDisplayValue] = useState("0");
  const [isResult, setIsResult] = useState(false);
  const [isRadians, setIsRadians] = useState(true);

  const handleInput = (value: string) => {
    if (isResult) {
      setExpression(/[0-9.]/.test(value) ? value : displayValue + value);
      setDisplayValue(/[0-9.]/.test(value) ? value : displayValue + value);
      setIsResult(false);
      return;
    }
    setDisplayValue(displayValue === "0" && value !== "." ? value : displayValue + value);
    setExpression((prev) => prev + value);
  };

  const handleOperator = (op: string) => {
    if (isResult) {
      setExpression(displayValue + ` ${op} `);
      setIsResult(false);
    } else {
      setExpression((prev) =>
        /\s[+\-×÷]\s$/.test(prev) ? prev.slice(0, -3) + ` ${op} ` : `${prev} ${op} `
      );
    }
    setDisplayValue("0");
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

  const handleFunction = (func: string) => {
    setExpression((prev) => prev + func);
    setDisplayValue("0");
    setIsResult(false);
  };

  const handleEquals = () => {
    if (expression === "" || isResult) return;
    try {
      let finalExpression = expression
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .replace(/√/g, "sqrt")
        .replace(/π/g, "pi")
        .replace(/(\d+)!/g, "factorial($1)")
        .replace(/sin⁻¹/g, "asin")
        .replace(/cos⁻¹/g, "acos")
        .replace(/tan⁻¹/g, "atan")
        .replace(/10\^/g, "10^")
        .replace(/log₂/g, "log2");

      if (!isRadians) {
        finalExpression = finalExpression.replace(
          /(sin|cos|tan)\(([^)]+)\)/g,
          (match, func, angle) => `${func}(${angle} deg)`
        );
      }

      const result = evaluate(finalExpression, customFunctions);
      const formattedResult = typeof result === "number" ? parseFloat(result.toPrecision(15)) : result;
      setDisplayValue(String(formattedResult));
      setExpression(String(formattedResult));
      setIsResult(true);
    } catch (error) {
      setDisplayValue("Error");
      setExpression("");
      setIsResult(true);
    }
  };

  const btnClasses = "h-12 md:h-14 text-sm md:text-base rounded-xl py-2 font-semibold transition-transform duration-100 active:scale-95";
  const functionBtnClasses = "bg-neutral-300 dark:bg-neutral-700/80 hover:bg-neutral-400/80 dark:hover:bg-neutral-700 text-black dark:text-white";
  const operatorBtnClasses = "bg-primary hover:bg-primary/90 text-primary-foreground text-xl";
  const numberBtnClasses = "bg-neutral-200 dark:bg-neutral-800/80 hover:bg-neutral-300/80 dark:hover:bg-neutral-800 text-black dark:text-white";

  const scientificButtons = [
    { display: "sin", input: "sin(" }, { display: "cos", input: "cos(" }, { display: "tan", input: "tan(" }, { display: "log", input: "log10(" },
    { display: "ln", input: "log(" }, { display: "sin⁻¹", input: "asin(" }, { display: "cos⁻¹", input: "acos(" }, { display: "tan⁻¹", input: "atan(" },
    { display: "√", input: "sqrt(" }, { display: "x²", input: "^2" }, { display: "x³", input: "^3" }, { display: "xʸ", input: "^" },
    { display: "π", input: "π" }, { display: "e", input: "e" }, { display: "n!", input: "!" }, { display: "eˣ", input: "exp(" }
  ];

  return (
    <Card className="w-full max-w-lg mx-auto overflow-hidden rounded-2xl border-none bg-transparent shadow-none">
      <CardContent className="p-1">
        {/* Display */}
        <div className="h-28 p-4 bg-muted dark:bg-black/20 rounded-xl flex flex-col justify-end items-end overflow-hidden mb-4">
          <div className="text-xl text-muted-foreground h-1/3 truncate w-full text-right" aria-label="Expression">{expression || " "}</div>
          <div className="h-2/3 w-full flex items-end justify-end">
            <div aria-live="polite" className="w-full text-right font-mono text-4xl sm:text-5xl text-foreground">{displayValue}</div>
          </div>
        </div>

        {/* Scientific Functions Grid 4x4 */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          {scientificButtons.map((btn) => (
            <Button key={btn.display} onClick={() => handleFunction(btn.input)} className={cn(btnClasses, functionBtnClasses)}>
              {btn.display}
            </Button>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          <Button onClick={() => setIsRadians(!isRadians)} className={cn(btnClasses, functionBtnClasses)}>{isRadians ? "Rad" : "Deg"}</Button>
          <Button onClick={handleClear} className={cn(btnClasses, "bg-red-500 hover:bg-red-600 text-white")}>AC</Button>
          <Button onClick={handleDelete} className={cn(btnClasses, "bg-yellow-500 hover:bg-yellow-600 text-white")}><Delete /></Button>
        </div>

        {/* Number Pad + Operators */}
        <div className="grid grid-cols-4 gap-2">
          {["7", "8", "9"].map((num) => <Button key={num} onClick={() => handleInput(num)} className={cn(btnClasses, numberBtnClasses)}>{num}</Button>)}
          <Button onClick={() => handleOperator("÷")} className={cn(btnClasses, operatorBtnClasses)}><Divide size={20} /></Button>

          {["4", "5", "6"].map((num) => <Button key={num} onClick={() => handleInput(num)} className={cn(btnClasses, numberBtnClasses)}>{num}</Button>)}
          <Button onClick={() => handleOperator("×")} className={cn(btnClasses, operatorBtnClasses)}><Times size={20} /></Button>

          {["1", "2", "3"].map((num) => <Button key={num} onClick={() => handleInput(num)} className={cn(btnClasses, numberBtnClasses)}>{num}</Button>)}
          <Button onClick={() => handleOperator("−")} className={cn(btnClasses, operatorBtnClasses)}><Minus size={20} /></Button>

          <Button onClick={() => handleInput("0")} className={cn(btnClasses, numberBtnClasses, "col-span-2")}>0</Button>
          <Button onClick={() => handleInput(".")} className={cn(btnClasses, numberBtnClasses)}>.</Button>
          <Button onClick={() => handleOperator("+")} className={cn(btnClasses, operatorBtnClasses)}><Plus size={20} /></Button>

          <Button onClick={handleEquals} className={cn(btnClasses, operatorBtnClasses, "col-span-4 h-12 mt-2")}> = </Button>
        </div>
      </CardContent>
    </Card>
  );
}
