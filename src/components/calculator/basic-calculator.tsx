
"use client";

import { Delete } from "lucide-react";
import { evaluate } from "mathjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand: string | null) {
  if (operand == null) return "";
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(parseInt(integer));
  return `${INTEGER_FORMATTER.format(parseInt(integer))}.${decimal}`;
}

export default function BasicCalculator() {
  const [currentOperand, setCurrentOperand] = useState<string | null>("0");
  const [previousOperand, setPreviousOperand] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(true);

  const clear = () => {
    setCurrentOperand("0");
    setPreviousOperand(null);
    setOperation(null);
    setOverwrite(true);
  };

  const deleteDigit = () => {
    if (overwrite) {
      clear();
      return;
    }
    if (currentOperand == null || currentOperand.length === 1) {
      setCurrentOperand("0");
      setOverwrite(true);
      return;
    }
    setCurrentOperand(currentOperand.slice(0, -1));
  };

  const addDigit = (digit: string) => {
    if (digit === "." && currentOperand?.includes(".")) return;

    if (overwrite) {
      setCurrentOperand(digit);
      setOverwrite(false);
      return;
    }
    if (digit === "0" && currentOperand === "0") return;

    setCurrentOperand((prev) => (prev || "") + digit);
  };
  
  const evaluateCalculation = () => {
    if (operation == null || currentOperand == null || previousOperand == null) {
        return null;
    }
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return null;
    
    try {
        const result = evaluate(`${prev} ${operation} ${current}`);
        return result.toString();
    } catch {
        return "Error";
    }
  };

  const chooseOperation = (op: string) => {
      if (currentOperand == null && previousOperand == null) return;

      if (currentOperand == null) {
          setOperation(op);
          return;
      }

      if (previousOperand == null) {
          setOperation(op);
          setPreviousOperand(currentOperand);
          setCurrentOperand(null);
          return;
      }

      const result = evaluateCalculation();
      setPreviousOperand(result);
      setCurrentOperand(null);
      setOperation(op);
  };

  const evaluateState = () => {
      const result = evaluateCalculation();
      if (result == null) return;
      
      setCurrentOperand(result);
      setPreviousOperand(null);
      setOperation(null);
      setOverwrite(true);
  };
  
  const handlePercent = () => {
    if (currentOperand == null) return;
    const value = parseFloat(currentOperand) / 100;
    setCurrentOperand(value.toString());
  };
  
  const displayExpression = () => {
    if (operation != null && previousOperand != null) {
      return `${formatOperand(previousOperand)} ${operation}`;
    }
    return "";
  }

  const basicBtnClasses =
    "h-16 text-xl rounded-xl py-4 font-semibold transition-transform active:scale-95";

  return (
    <Card className="w-full mx-auto overflow-hidden rounded-2xl border-none bg-transparent shadow-none">
      <CardContent className="p-1">
        <div className="h-28 p-4 bg-muted dark:bg-black/20 rounded-xl flex flex-col justify-end items-end overflow-hidden mb-4">
           <div className="text-xl text-muted-foreground h-1/3 truncate w-full text-right">
            {displayExpression()}
          </div>
          <div
            aria-live="polite"
            className="w-full text-right font-mono text-5xl text-foreground"
          >
            {formatOperand(currentOperand)}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 p-1">
          <Button
            onClick={clear}
            variant="ghost"
            className={cn(
              basicBtnClasses,
              "text-destructive hover:bg-destructive/10",
            )}
          >
            AC
          </Button>
          <Button
            onClick={deleteDigit}
            aria-label="Backspace"
            variant="ghost"
            className={cn(basicBtnClasses, "text-primary hover:bg-primary/10")}
          >
            <Delete />
          </Button>
          <Button
            onClick={handlePercent}
            variant="ghost"
            className={cn(basicBtnClasses, "text-primary hover:bg-primary/10")}
          >
            %
          </Button>
          <Button
            onClick={() => chooseOperation("/")}
            variant="ghost"
            className={cn(basicBtnClasses, "text-primary hover:bg-primary/10")}
          >
            ÷
          </Button>

          {["7", "8", "9"].map((num) => (
            <Button
              key={num}
              onClick={() => addDigit(num)}
              variant="ghost"
              className={cn(basicBtnClasses)}
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => chooseOperation("*")}
            variant="ghost"
            className={cn(basicBtnClasses, "text-primary hover:bg-primary/10")}
          >
            ×
          </Button>

          {["4", "5", "6"].map((num) => (
            <Button
              key={num}
              onClick={() => addDigit(num)}
              variant="ghost"
              className={cn(basicBtnClasses)}
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => chooseOperation("-")}
            variant="ghost"
            className={cn(basicBtnClasses, "text-primary hover:bg-primary/10")}
          >
            -
          </Button>

          {["1", "2", "3"].map((num) => (
            <Button
              key={num}
              onClick={() => addDigit(num)}
              variant="ghost"
              className={cn(basicBtnClasses)}
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => chooseOperation("+")}
            variant="ghost"
            className={cn(basicBtnClasses, "text-primary hover:bg-primary/10")}
          >
            +
          </Button>

          <Button
            onClick={() => addDigit("0")}
            variant="ghost"
            className={cn(basicBtnClasses, "col-span-2")}
          >
            0
          </Button>
          <Button
            onClick={() => addDigit(".")}
            variant="ghost"
            className={cn(basicBtnClasses)}
          >
            .
          </Button>
          <Button
            onClick={evaluateState}
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
