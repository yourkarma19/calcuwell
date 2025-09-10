
"use client";

import { Delete, Divide, Minus, Plus, X as Times } from "lucide-react";
import { evaluate } from "mathjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import usePersistentState from "@/hooks/use-persistent-state";
import { cn } from "@/lib/utils";

// Factorial function
const factorial = (n: number): number => {
  if (n < 0 || n !== Math.floor(n))
    throw new Error("Factorial is only for non-negative integers.");
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
  const [expression, setExpression] = usePersistentState("sci-expr", "");
  const [displayValue, setDisplayValue] = usePersistentState(
    "sci-display",
    "0",
  );
  const [isResult, setIsResult] = usePersistentState("sci-isResult", false);
  const [isRadians, setIsRadians] = usePersistentState("sci-isRadians", true);

  const handleInput = (value: string) => {
    if (isResult) {
      setExpression(value);
      setDisplayValue(value);
      setIsResult(false);
      return;
    }
    setDisplayValue(
      displayValue === "0" && value !== "." ? value : displayValue + value,
    );
    setExpression((prev) => prev + value);
  };

  const handleOperator = (op: string) => {
    if (isResult) {
      setExpression(displayValue + ` ${op} `);
      setIsResult(false);
    } else {
      setExpression((prev) =>
        /\s[+\-×÷]\s$/.test(prev)
          ? prev.slice(0, -3) + ` ${op} `
          : `${prev} ${op} `,
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
    if (isResult) {
      setExpression(`${func}${displayValue})`);
      setIsResult(false);
    } else {
      setExpression((prev) => prev + func);
    }
    setDisplayValue("0");
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
        .replace(/(\d+\.?\d*)!/g, "factorial($1)")
        .replace(/sin⁻¹/g, "asin")
        .replace(/cos⁻¹/g, "acos")
        .replace(/tan⁻¹/g, "atan")
        .replace(/10\^/g, "10^")
        .replace(/log₂/g, "log2");

      if (!isRadians) {
        finalExpression = finalExpression.replace(
          /(sin|cos|tan)\(([^)]+)\)/g,
          (_match, func, angle) => `${func}(${angle} deg)`,
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
    "h-12 md:h-14 text-sm md:text-base rounded-xl py-2 font-semibold transition-transform duration-100 active:scale-95";
  const functionBtnClasses = "bg-muted/30 hover:shadow-sm shadow-md transition-shadow duration-200";
  const operatorBtnClasses =
    "bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xl";
  const numberBtnClasses = "bg-muted/30 hover:shadow-sm shadow-md transition-shadow duration-200";
  const specialBtnClasses =
  "bg-muted hover:bg-accent text-foreground";


  return (
    <Card className="w-full max-w-lg mx-auto overflow-hidden rounded-2xl border-none bg-transparent shadow-none">
      <CardContent className="p-1">
        {/* Display */}
        <div className="h-28 p-4 bg-muted dark:bg-black/20 rounded-xl flex flex-col justify-end items-end overflow-hidden mb-4">
          <div className="text-xl text-muted-foreground h-1/3 truncate w-full text-right">
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

        {/* Functions Grid */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          {/* Scientific Functions */}
          <Button
            onClick={() => handleFunction("sin(")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            sin
          </Button>
          <Button
            onClick={() => handleFunction("cos(")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            cos
          </Button>
          <Button
            onClick={() => handleFunction("tan(")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            tan
          </Button>
          <Button
            onClick={() => handleFunction("log10(")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            log
          </Button>

          <Button
            onClick={() => handleFunction("asin(")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            sin⁻¹
          </Button>
          <Button
            onClick={() => handleFunction("acos(")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            cos⁻¹
          </Button>
          <Button
            onClick={() => handleFunction("atan(")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            tan⁻¹
          </Button>
          <Button
            onClick={() => handleFunction("log(")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            ln
          </Button>

          <Button
            onClick={() => handleFunction("sqrt(")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            √
          </Button>
          <Button
            onClick={() => handleInput("^2")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            x²
          </Button>
          <Button
            onClick={() => handleInput("^3")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            x³
          </Button>
          <Button
            onClick={() => handleInput("^")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            xʸ
          </Button>

          <Button
            onClick={() => handleInput("π")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            π
          </Button>
          <Button
            onClick={() => handleInput("e")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            e
          </Button>
          <Button
            onClick={() => handleInput("!")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            n!
          </Button>
          <Button
            onClick={() => handleFunction("exp(")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            eˣ
          </Button>

          {/* Controls */}
          <Button
            onClick={() => setIsRadians(!isRadians)}
            className={cn(btnClasses, specialBtnClasses)}
          >
            {isRadians ? "Rad" : "Deg"}
          </Button>
          <Button
            onClick={handleClear}
            className={cn(btnClasses, specialBtnClasses)}
          >
            AC
          </Button>
          <Button
            onClick={handleDelete}
            className={cn(
              btnClasses,
              specialBtnClasses
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
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-4 gap-2">
          {["7", "8", "9"].map((num) => (
            <Button
              key={num}
              onClick={() => handleInput(num)}
              className={cn(btnClasses, numberBtnClasses)}
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleOperator("×")}
            className={cn(btnClasses, operatorBtnClasses)}
          >
            <Times size={20} />
          </Button>

          {["4", "5", "6"].map((num) => (
            <Button
              key={num}
              onClick={() => handleInput(num)}
              className={cn(btnClasses, numberBtnClasses)}
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleOperator("−")}
            className={cn(btnClasses, operatorBtnClasses)}
          >
            <Minus size={20} />
          </Button>

          {["1", "2", "3"].map((num) => (
            <Button
              key={num}
              onClick={() => handleInput(num)}
              className={cn(btnClasses, numberBtnClasses)}
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleOperator("+")}
            className={cn(btnClasses, operatorBtnClasses)}
          >
            <Plus size={20} />
          </Button>

          <Button
            onClick={() => handleInput("0")}
            className={cn(btnClasses, numberBtnClasses)}
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
            onClick={() => handleInput("(")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            (
          </Button>
          <Button
            onClick={() => handleInput(")")}
            className={cn(btnClasses, functionBtnClasses)}
          >
            )
          </Button>

          <Button
            onClick={handleEquals}
            className={cn(btnClasses, operatorBtnClasses, "col-span-4")}
          >
            =
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
