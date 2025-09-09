
"use client";

import { Delete } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function BasicCalculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [expression, setExpression] = useState("");
  const [isNewNumber, setIsNewNumber] = useState(true);
  const [justEvaluated, setJustEvaluated] = useState(false);

  const evaluateExpression = (expr: string): string => {
    try {
      const sanitizedExpr = expr
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/‑/g, "-");
      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${sanitizedExpr}`)();
      if (result === undefined || !isFinite(result)) return "Error";
      return parseFloat(result.toPrecision(15)).toString();
    } catch (e) {
      return "Error";
    }
  };

  const handleOperator = useCallback(
    (op: string) => {
      if (displayValue === "Error") return;

      if (justEvaluated) {
        setExpression(displayValue + " " + op + " ");
        setJustEvaluated(false);
      } else if (isNewNumber) {
        setExpression((prev) => prev.slice(0, -2) + op + " ");
      } else {
        setExpression((prev) => prev + displayValue + " " + op + " ");
      }
      setIsNewNumber(true);
    },
    [displayValue, justEvaluated, isNewNumber],
  );

  const handleEquals = useCallback(() => {
    if (displayValue === "Error" || isNewNumber) return;
    const finalExpression = expression + displayValue;
    const result = evaluateExpression(finalExpression);
    setDisplayValue(result);
    setExpression("");
    setJustEvaluated(true);
  }, [expression, displayValue, isNewNumber]);

  const handleNumber = (num: string) => {
    if (justEvaluated) {
      setDisplayValue(num);
      setJustEvaluated(false);
    } else if (isNewNumber) {
      setDisplayValue(num);
      setIsNewNumber(false);
    } else {
      setDisplayValue((prev) => (prev === "0" ? num : prev + num));
    }
  };

  const handleDecimal = () => {
    if (justEvaluated) {
      setDisplayValue("0.");
      setJustEvaluated(false);
    } else if (!displayValue.includes(".")) {
      setDisplayValue((prev) => prev + ".");
    }
    setIsNewNumber(false);
  };

  const handleBackspace = () => {
    if (justEvaluated) return;
    setDisplayValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const clearAll = () => {
    setDisplayValue("0");
    setExpression("");
    setIsNewNumber(true);
    setJustEvaluated(false);
  };

  const handleInput = useCallback(
    (input: string) => {
      const operators = ["÷", "×", "‑", "+"];
      if (operators.includes(input)) {
        handleOperator(input);
      } else if (/[0-9]/.test(input)) {
        handleNumber(input);
      } else {
        switch (input) {
          case "=":
            handleEquals();
            break;
          case ".":
            handleDecimal();
            break;
          case "AC":
            clearAll();
            break;
          case "⌫":
            handleBackspace();
            break;
          case "+/-":
            if (displayValue !== "0") {
              setDisplayValue((prev) => String(parseFloat(prev) * -1));
            }
            break;
          case "%":
            setDisplayValue((prev) => String(parseFloat(prev) / 100));
            break;
        }
      }
    },
    [handleOperator, handleEquals],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      )
        return;

      let key = event.key;
      if (key === "Enter") key = "=";
      if (key === "Backspace") key = "⌫";
      if (key === "Escape") key = "AC";
      if (key === "/") key = "÷";
      if (key === "*") key = "×";
      if (key === "-") key = "‑";

      const validInputs = "0123456789.+-×÷=⌫AC%+/-";
      if (validInputs.includes(key)) {
        event.preventDefault();
        handleInput(key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleInput]);

  const basicBtnClasses = "h-16 text-xl rounded-xl py-4 font-semibold";
  const specialBtnClasses =
    "bg-neutral-300 dark:bg-neutral-700/80 hover:bg-neutral-400/80 dark:hover:bg-neutral-700 text-black dark:text-white";
  const operatorBtnClasses =
    "bg-primary hover:bg-primary/90 text-primary-foreground";
  const numberBtnClasses =
    "bg-neutral-200 dark:bg-neutral-800/80 hover:bg-neutral-300/80 dark:hover:bg-neutral-800 text-black dark:text-white";

  return (
    <Card className="w-full overflow-hidden shadow-2xl rounded-2xl border-neutral-200 dark:border-neutral-800 bg-background dark:bg-neutral-900/50">
      <CardContent className="p-4">
        <div className="h-28 p-4 bg-muted dark:bg-black/20 rounded-xl flex flex-col justify-end items-end overflow-hidden mb-4">
          <div
            className="text-xl text-muted-foreground h-1/3 truncate w-full text-right"
            aria-label="Expression"
          >
            {expression}
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

        <div className="grid grid-cols-4 gap-3 p-1">
          <Button
            onClick={() => handleInput("AC")}
            className={cn(basicBtnClasses, specialBtnClasses)}
          >
            AC
          </Button>
          <Button
            onClick={() => handleInput("⌫")}
            aria-label="Backspace"
            className={cn(basicBtnClasses, specialBtnClasses)}
          >
            <Delete />
          </Button>
          <Button
            onClick={() => handleInput("%")}
            className={cn(basicBtnClasses, specialBtnClasses)}
          >
            %
          </Button>
          <Button
            onClick={() => handleInput("÷")}
            className={cn(basicBtnClasses, operatorBtnClasses)}
          >
            ÷
          </Button>

          {["7", "8", "9"].map((num) => (
            <Button
              key={num}
              onClick={() => handleInput(num)}
              className={cn(basicBtnClasses, numberBtnClasses)}
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleInput("×")}
            className={cn(basicBtnClasses, operatorBtnClasses)}
          >
            ×
          </Button>

          {["4", "5", "6"].map((num) => (
            <Button
              key={num}
              onClick={() => handleInput(num)}
              className={cn(basicBtnClasses, numberBtnClasses)}
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleInput("‑")}
            className={cn(basicBtnClasses, operatorBtnClasses)}
          >
            -
          </Button>

          {["1", "2", "3"].map((num) => (
            <Button
              key={num}
              onClick={() => handleInput(num)}
              className={cn(basicBtnClasses, numberBtnClasses)}
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleInput("+")}
            className={cn(basicBtnClasses, operatorBtnClasses)}
          >
            +
          </Button>

          <Button
            onClick={() => handleInput("0")}
            className={cn(basicBtnClasses, numberBtnClasses, "col-span-2")}
          >
            0
          </Button>
          <Button
            onClick={() => handleInput(".")}
            className={cn(basicBtnClasses, numberBtnClasses)}
          >
            .
          </Button>
          <Button
            onClick={() => handleInput("=")}
            className={cn(basicBtnClasses, operatorBtnClasses)}
          >
            =
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
