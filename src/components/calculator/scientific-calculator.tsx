
"use client";

import { Delete, Divide, Minus, Plus, X as Times } from "lucide-react";
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

// Register custom functions with mathjs
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
      if (/[0-9.]/.test(value) || value === "π" || value === "e") {
        setExpression(value);
        setDisplayValue(value);
      } else {
        setExpression(displayValue + value);
        setDisplayValue(displayValue + value);
      }
      setIsResult(false);
      return;
    }
    // Don't append if the current display is 0 and the new value is not a decimal point
    const newDisplay =
      displayValue === "0" && value !== "." ? value : displayValue + value;
    setDisplayValue(newDisplay);
    setExpression((prev) => prev + value);
  };

  const handleOperator = (op: string) => {
    // If there's already a result, use it as the start of the new expression
    if (isResult) {
      setExpression(displayValue + ` ${op} `);
      setIsResult(false);
    } else {
      setExpression((prev) => {
        // Prevent adding multiple operators in a row
        if (/\s[+\-×÷]\s$/.test(prev)) {
          return prev.slice(0, -3) + ` ${op} `;
        }
        return `${prev} ${op} `;
      });
    }
    setDisplayValue("0"); // Reset display for the next number
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
          (match, func, angle) => `${func}(${angle} deg)`,
        );
      }

      const result = evaluate(finalExpression, customFunctions);
      const formattedResult =
        typeof result === "number"
          ? parseFloat(result.toPrecision(15))
          : result;
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
    "h-10 text-sm md:text-base rounded-lg py-2 font-semibold transition-transform duration-100 active:scale-95";
  const functionBtnClasses =
    "bg-neutral-300 dark:bg-neutral-700/80 hover:bg-neutral-400/80 dark:hover:bg-neutral-700 text-black dark:text-white";
  const operatorBtnClasses =
    "bg-primary hover:bg-primary/90 text-primary-foreground text-xl";
  const numberBtnClasses =
    "bg-neutral-200 dark:bg-neutral-800/80 hover:bg-neutral-300/80 dark:hover:bg-neutral-800 text-black dark:text-white";

  const scientificButtons = [
    { display: "sin", input: "sin(" },
    { display: "cos", input: "cos(" },
    { display: "tan", input: "tan(" },
    { display: "log", input: "log10(" },
    { display: "ln", input: "log(" },
    { display: "sin⁻¹", input: "asin(" },
    { display: "cos⁻¹", input: "acos(" },
    { display: "tan⁻¹", input: "atan(" },
    { display: "log₂", input: "log2(" },
    { display: "eˣ", input: "e^" },
    { display: "√", input: "sqrt(" },
    { display: "x²", input: "^2" },
    { display: "x³", input: "^3" },
    { display: "xʸ", input: "^" },
    { display: "1/x", input: "1/" },
    { display: "(", input: "(" },
    { display: ")", input: ")" },
    { display: "π", input: "π" },
    { display: "e", input: "e" },
    { display: "n!", input: "!" },
  ];

  return (
    <Card className="w-full max-w-xl mx-auto overflow-hidden rounded-2xl border-none bg-transparent shadow-none">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Scientific Functions Panel */}
          <div className="grid grid-cols-5 gap-2">
            {scientificButtons.map((btn) => (
              <Button
                key={btn.display}
                onClick={() => handleFunction(btn.input)}
                className={cn(btnClasses, functionBtnClasses)}
              >
                {btn.display}
              </Button>
            ))}
          </div>

          {/* Keypad Panel */}
          <div className="grid grid-cols-4 gap-2">
            <Button
              onClick={() => setIsRadians(!isRadians)}
              className={cn(btnClasses, functionBtnClasses)}
            >
              {isRadians ? "Rad" : "Deg"}
            </Button>
            <Button
              onClick={handleClear}
              className={cn(
                btnClasses,
                operatorBtnClasses,
                "bg-red-500 hover:bg-red-600",
              )}
            >
              AC
            </Button>
            <Button
              onClick={handleDelete}
              className={cn(
                btnClasses,
                operatorBtnClasses,
                "bg-yellow-500 hover:bg-yellow-600",
              )}
            >
              <Delete />
            </Button>
            <Button
              onClick={() => handleOperator("÷")}
              className={cn(btnClasses, operatorBtnClasses)}
            >
              <Divide size={20} />
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
              <Times size={20} />
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
              onClick={() => handleOperator("−")}
              className={cn(btnClasses, operatorBtnClasses)}
            >
              <Minus size={20} />
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
              <Plus size={20} />
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
