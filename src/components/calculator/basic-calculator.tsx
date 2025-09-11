"use client";

import { Delete } from "lucide-react";
import { evaluate } from "mathjs";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function BasicCalculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const calculate = (
    operand1: number,
    operand2: number,
    op: string,
  ): number => {
    switch (op) {
      case "+":
        return operand1 + operand2;
      case "−":
        return operand1 - operand2;
      case "×":
        return operand1 * operand2;
      case "÷":
        return operand1 / operand2;
      default:
        return operand2;
    }
  };

  const handleNumber = useCallback(
    (num: string) => {
      if (waitingForSecondOperand) {
        setDisplayValue(num);
        setWaitingForSecondOperand(false);
      } else {
        setDisplayValue(displayValue === "0" ? num : displayValue + num);
      }
    },
    [displayValue, waitingForSecondOperand],
  );

  const handleOperator = useCallback(
    (nextOperator: string) => {
      const inputValue = parseFloat(displayValue);

      if (firstOperand === null) {
        setFirstOperand(inputValue);
      } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        setDisplayValue(String(result));
        setFirstOperand(result);
      }

      setWaitingForSecondOperand(true);
      setOperator(nextOperator);
    },
    [displayValue, firstOperand, operator],
  );

  const handleEquals = useCallback(() => {
    const inputValue = parseFloat(displayValue);
    if (operator && firstOperand !== null) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(true);
    }
  }, [displayValue, firstOperand, operator]);

  const handleDecimal = useCallback(() => {
    if (waitingForSecondOperand) {
      setDisplayValue("0.");
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  }, [displayValue, waitingForSecondOperand]);

  const handleClear = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleBackspace = () => {
    if (waitingForSecondOperand) return;
    setDisplayValue(displayValue.length > 1 ? displayValue.slice(0, -1) : "0");
  };

  const handleToggleSign = () => {
    setDisplayValue((prev) => String(parseFloat(prev) * -1));
  };

  const handlePercent = () => {
    setDisplayValue((prev) => String(parseFloat(prev) / 100));
  };

  const handleInput = useCallback(
    (value: string) => {
      if (["+", "−", "×", "÷"].includes(value)) {
        handleOperator(value);
      } else if (value === "=") {
        handleEquals();
      } else if (value === ".") {
        handleDecimal();
      } else if (value === "AC") {
        handleClear();
      } else if (value === "⌫") {
        handleBackspace();
      } else if (value === "+/-") {
        handleToggleSign();
      } else if (value === "%") {
        handlePercent();
      } else {
        handleNumber(value);
      }
    },
    [
      handleNumber,
      handleOperator,
      handleEquals,
      handleDecimal,
      handleClear,
      handleBackspace,
      handleToggleSign,
      handlePercent,
    ],
  );

  const basicBtnClasses =
    "h-16 text-xl rounded-xl py-4 font-semibold transition-transform active:scale-95";

  return (
    <Card className="w-full mx-auto overflow-hidden rounded-2xl border-none bg-transparent shadow-none">
      <CardContent className="p-1">
        <div className="h-28 p-4 bg-muted dark:bg-black/20 rounded-xl flex flex-col justify-end items-end overflow-hidden mb-4">
          <div
            aria-live="polite"
            className="w-full text-right font-mono text-5xl text-foreground"
          >
            {displayValue}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 p-1">
          <Button
            onClick={() => handleInput("AC")}
            variant="ghost"
            className={cn(
              basicBtnClasses,
              "text-destructive hover:bg-destructive/10",
            )}
          >
            AC
          </Button>
          <Button
            onClick={() => handleInput("⌫")}
            aria-label="Backspace"
            variant="ghost"
            className={cn(basicBtnClasses, "text-primary hover:bg-primary/10")}
          >
            <Delete />
          </Button>
          <Button
            onClick={() => handleInput("%")}
            variant="ghost"
            className={cn(basicBtnClasses, "text-primary hover:bg-primary/10")}
          >
            %
          </Button>
          <Button
            onClick={() => handleInput("÷")}
            variant="ghost"
            className={cn(basicBtnClasses, "text-primary hover:bg-primary/10")}
          >
            ÷
          </Button>

          {["7", "8", "9"].map((num) => (
            <Button
              key={num}
              onClick={() => handleInput(num)}
              variant="ghost"
              className={cn(basicBtnClasses)}
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleInput("×")}
            variant="ghost"
            className={cn(basicBtnClasses, "text-primary hover:bg-primary/10")}
          >
            ×
          </Button>

          {["4", "5", "6"].map((num) => (
            <Button
              key={num}
              onClick={() => handleInput(num)}
              variant="ghost"
              className={cn(basicBtnClasses)}
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleInput("−")}
            variant="ghost"
            className={cn(basicBtnClasses, "text-primary hover:bg-primary/10")}
          >
            -
          </Button>

          {["1", "2", "3"].map((num) => (
            <Button
              key={num}
              onClick={() => handleInput(num)}
              variant="ghost"
              className={cn(basicBtnClasses)}
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleInput("+")}
            variant="ghost"
            className={cn(basicBtnClasses, "text-primary hover:bg-primary/10")}
          >
            +
          </Button>

          <Button
            onClick={() => handleInput("0")}
            variant="ghost"
            className={cn(basicBtnClasses, "col-span-2")}
          >
            0
          </Button>
          <Button
            onClick={() => handleInput(".")}
            variant="ghost"
            className={cn(basicBtnClasses)}
          >
            .
          </Button>
          <Button
            onClick={handleEquals}
            className={cn(
              basicBtnClasses,
              "bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            =
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
