
"use client";

import { Delete } from "lucide-react";
import { useState } from "react";
import { evaluate } from "mathjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Factorial function for use with mathjs evaluate
const factorial = (n: number): number => {
  if (n < 0 || n !== Math.floor(n)) {
    throw new Error("Factorial is only defined for non-negative integers.");
  }
  if (n > 170) throw new Error("Factorial of n > 170 results in overflow.");
  if (n === 0) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

// Register the factorial function with mathjs
const customFunctions = {
  factorial,
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
      return;
    }
    setExpression((prev) => prev + value);
    setDisplayValue((prev) => (prev === "0" ? value : prev + value));
  };

  const handleFunction = (func: string) => {
    // For functions that wrap the current number
    if (["sqrt(", "log(", "ln(", "sin(", "cos(", "tan("].includes(func)) {
      if (isResult) {
        setExpression(func + displayValue + ")");
        setDisplayValue(func + displayValue + ")");
        setIsResult(false);
      } else {
        setExpression((prev) => prev + func);
        setDisplayValue((prev) => prev + func);
      }
    } else if (func === "x^2") {
      setExpression((prev) => `(${prev})^2`);
      setDisplayValue((prev) => `(${prev})^2`);
    } else if (func === "x^3") {
      setExpression((prev) => `(${prev})^3`);
      setDisplayValue((prev) => `(${prev})^3`);
    } else if (func === "1/x") {
      setExpression((prev) => `1/(${prev})`);
      setDisplayValue((prev) => `1/(${prev})`);
    } else if (func === "n!") {
      setExpression((prev) => `factorial(${prev})`);
      setDisplayValue((prev) => `(${prev})!`);
    } else if (func === "π" || func === "e") {
      handleInput(func);
    } else {
      setExpression((prev) => prev + func);
      setDisplayValue((prev) => prev + func);
    }
    setIsResult(false);
  };

  const handleOperator = (op: string) => {
    if (expression.endsWith(" ") || expression === "") return;
    setExpression((prev) => `${prev} ${op} `);
    setDisplayValue("0"); // Ready for next number
    setIsResult(false);
  };

  const handleClear = () => {
    setExpression("");
    setDisplayValue("0");
    setIsResult(false);
  };

  const handleDelete = () => {
    if (isResult) return;
    if (expression.endsWith(" ")) {
      setExpression((prev) => prev.slice(0, -3));
    } else {
      setExpression((prev) => prev.slice(0, -1));
    }
    setDisplayValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const handleEquals = () => {
    if (expression === "" || isResult) return;
    try {
      const finalExpression = expression
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/‑/g, "-")
        .replace(/√\(/g, "sqrt(")
        .replace(/π/g, "pi")
        .replace(/(\d+)!/g, "factorial($1)");

      const result = evaluate(finalExpression, customFunctions);
      const formattedResult =
        typeof result === "number" ? parseFloat(result.toPrecision(15)) : result;
      setDisplayValue(String(formattedResult));
      setExpression(String(formattedResult));
      setIsResult(true);
    } catch (error) {
      setDisplayValue("Error");
      setExpression("");
      setIsResult(true);
    }
  };

  const btnClasses =
    "h-12 text-sm md:text-base rounded-lg py-2 font-semibold transition-transform duration-100 active:scale-95";
  const specialBtnClasses =
    "bg-neutral-300 dark:bg-neutral-700/80 hover:bg-neutral-400/80 dark:hover:bg-neutral-700 text-black dark:text-white";
  const operatorBtnClasses =
    "bg-primary hover:bg-primary/90 text-primary-foreground text-xl";
  const numberBtnClasses =
    "bg-neutral-200 dark:bg-neutral-800/80 hover:bg-neutral-300/80 dark:hover:bg-neutral-800 text-black dark:text-white";

  return (
    <Card className="w-full max-w-lg mx-auto overflow-hidden rounded-2xl border-none bg-transparent shadow-none">
      <CardContent className="p-1">
        <div className="h-28 p-4 bg-muted dark:bg-black/20 rounded-xl flex flex-col justify-end items-end overflow-hidden mb-4">
          <div
            className="text-xl text-muted-foreground h-1/3 truncate w-full text-right"
            aria-label="Expression"
          >
            {expression || " "}
          </div>
          <div className="h-2/3 w-full flex items-end justify-end">
            <div
              aria-live="polite"
              className="w-full text-right font-mono text-4xl sm:text-5xl text-foreground"
            >
              {displayValue}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
          {/* Scientific Functions Panel */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-3 gap-2">
            <Button
              onClick={() => handleFunction("sin(")}
              className={cn(btnClasses, specialBtnClasses)}
            >
              sin
            </Button>
            <Button
              onClick={() => handleFunction("cos(")}
              className={cn(btnClasses, specialBtnClasses)}
            >
              cos
            </Button>
            <Button
              onClick={() => handleFunction("tan(")}
              className={cn(btnClasses, specialBtnClasses)}
            >
              tan
            </Button>
            <Button
              onClick={() => handleFunction("log(")}
              className={cn(btnClasses, specialBtnClasses)}
            >
              log
            </Button>
            <Button
              onClick={() => handleFunction("ln(")}
              className={cn(btnClasses, specialBtnClasses)}
            >
              ln
            </Button>
            <Button
              onClick={() => handleFunction("√(")}
              className={cn(btnClasses, specialBtnClasses)}
            >
              √
            </Button>
            <Button
              onClick={() => handleFunction("x^2")}
              className={cn(btnClasses, specialBtnClasses)}
            >
              x²
            </Button>
             <Button
              onClick={() => handleFunction("x^3")}
              className={cn(btnClasses, specialBtnClasses)}
            >
              x³
            </Button>
            <Button
              onClick={() => handleFunction("^")}
              className={cn(btnClasses, specialBtnClasses)}
            >
              xʸ
            </Button>
            <Button
              onClick={() => handleFunction("π")}
              className={cn(btnClasses, specialBtnClasses)}
            >
              π
            </Button>
            <Button
              onClick={() => handleFunction("e")}
              className={cn(btnClasses, specialBtnClasses)}
            >
              e
            </Button>
            <Button
              onClick={() => handleFunction("n!")}
              className={cn(btnClasses, specialBtnClasses)}
            >
              n!
            </Button>
            <Button
              onClick={() => handleFunction("(")}
              className={cn(btnClasses, specialBtnClasses)}
            >
              (
            </Button>
            <Button
              onClick={() => handleFunction(")")}
              className={cn(btnClasses, specialBtnClasses)}
            >
              )
            </Button>
             <Button
              onClick={() => handleFunction("1/x")}
              className={cn(btnClasses, specialBtnClasses)}
            >
              1/x
            </Button>
          </div>

          {/* Keypad Panel */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-4 gap-2">
            <Button
              onClick={handleClear}
              className={cn(btnClasses, operatorBtnClasses, "col-span-2")}
            >
              AC
            </Button>
            <Button onClick={handleDelete} className={cn(btnClasses, operatorBtnClasses)}>
              <Delete />
            </Button>
            <Button
              onClick={() => handleOperator("÷")}
              className={cn(btnClasses, operatorBtnClasses)}
            >
              ÷
            </Button>

            <Button
              onClick={() => handleInput("7")}
              className={cn(btnClasses, numberBtnClasses)}
            >
              7
            </Button>
            <Button
              onClick={() => handleInput("8")}
              className={cn(btnClasses, numberBtnClasses)}
            >
              8
            </Button>
            <Button
              onClick={() => handleInput("9")}
              className={cn(btnClasses, numberBtnClasses)}
            >
              9
            </Button>
            <Button
              onClick={() => handleOperator("×")}
              className={cn(btnClasses, operatorBtnClasses)}
            >
              ×
            </Button>

            <Button
              onClick={() => handleInput("4")}
              className={cn(btnClasses, numberBtnClasses)}
            >
              4
            </Button>
            <Button
              onClick={() => handleInput("5")}
              className={cn(btnClasses, numberBtnClasses)}
            >
              5
            </Button>
            <Button
              onClick={() => handleInput("6")}
              className={cn(btnClasses, numberBtnClasses)}
            >
              6
            </Button>
            <Button
              onClick={() => handleOperator("‑")}
              className={cn(btnClasses, operatorBtnClasses)}
            >
              -
            </Button>

            <Button
              onClick={() => handleInput("1")}
              className={cn(btnClasses, numberBtnClasses)}
            >
              1
            </Button>
            <Button
              onClick={() => handleInput("2")}
              className={cn(btnClasses, numberBtnClasses)}
            >
              2
            </Button>
            <Button
              onClick={() => handleInput("3")}
              className={cn(btnClasses, numberBtnClasses)}
            >
              3
            </Button>
            <Button
              onClick={() => handleOperator("+")}
              className={cn(btnClasses, operatorBtnClasses)}
            >
              +
            </Button>

            <Button
              onClick={() => handleInput("0")}
              className={cn(btnClasses, numberBtnClasses, "col-span-2")}
            >
              0
            </Button>
            <Button
              onClick={() => handleInput(".")}
              className={cn(btnClasses, numberBtnClasses)}
            >
              .
            </Button>
            <Button
              onClick={handleEquals}
              className={cn(btnClasses, operatorBtnClasses)}
            >
              =
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
