
"use client";

import { Delete } from "lucide-react";
import { useCallback } from "react";
import { evaluate } from "mathjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import usePersistentState from "@/hooks/use-persistent-state";
import { cn } from "@/lib/utils";

export default function BasicCalculator() {
  const [displayValue, setDisplayValue] = usePersistentState(
    "basic-display",
    "0",
  );
  const [expression, setExpression] = usePersistentState("basic-expr", "");
  const [justEvaluated, setJustEvaluated] = usePersistentState(
    "basic-justEval",
    false,
  );

  const isOperator = (char: string) => ["+", "−", "×", "÷"].includes(char);

  const evaluateExpression = (expr: string): string => {
    try {
      const sanitizedExpr = expr
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-");
      const result = evaluate(sanitizedExpr);
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
        setExpression(displayValue + " " + op);
        setJustEvaluated(false);
      } else {
        // If last char of expression is an operator, replace it.
        if (isOperator(expression.trim().slice(-1))) {
          setExpression((prev) => prev.trim().slice(0, -1) + op);
        } else {
          setExpression((prev) => (prev ? `${prev} ${displayValue} ${op}` : `${displayValue} ${op}`));
        }
      }
      setDisplayValue("0");
    },
    [displayValue, expression, justEvaluated, setExpression, setJustEvaluated, setDisplayValue],
  );

  const handleEquals = useCallback(() => {
    if (displayValue === "Error" || !expression) return;
    
    // Prevent evaluating if the last thing was an operator
    if (isOperator(expression.trim().slice(-1))) return;

    const finalExpression = expression + " " + displayValue;
    const result = evaluateExpression(finalExpression);
    setDisplayValue(result);
    setExpression("");
    setJustEvaluated(true);
  }, [displayValue, expression, setDisplayValue, setExpression, setJustEvaluated]);

  const handleNumber = useCallback((num: string) => {
    if (justEvaluated) {
      setDisplayValue(num);
      setJustEvaluated(false);
      return;
    }
    
    setDisplayValue((prev) => (prev === "0" ? num : prev + num));
  }, [justEvaluated, setDisplayValue, setJustEvaluated]);
  
  const handleDecimal = useCallback(() => {
    if (justEvaluated) {
      setDisplayValue("0.");
      setJustEvaluated(false);
      return;
    }
    
    if (!displayValue.includes(".")) {
      setDisplayValue((prev) => prev + ".");
    }
  }, [displayValue, justEvaluated, setDisplayValue, setJustEvaluated]);

  const handleBackspace = useCallback(() => {
    if (justEvaluated) return;
    setDisplayValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  }, [justEvaluated, setDisplayValue]);

  const clearAll = useCallback(() => {
    setDisplayValue("0");
    setExpression("");
    setJustEvaluated(false);
  }, [setDisplayValue, setExpression, setJustEvaluated]);

  const handleInput = useCallback(
    (input: string) => {
      const operators = ["÷", "×", "−", "+"];
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
            setJustEvaluated(true);
            break;
        }
      }
    },
    [handleOperator, handleNumber, handleEquals, handleDecimal, clearAll, handleBackspace, displayValue, setDisplayValue, setJustEvaluated],
  );

  const basicBtnClasses = "h-16 text-xl rounded-xl py-4 font-semibold transition-transform active:scale-95";
  
  return (
    <Card className="w-full mx-auto overflow-hidden rounded-2xl border-none bg-transparent shadow-none">
      <CardContent className="p-1">
        <div className="h-28 p-4 bg-muted dark:bg-black/20 rounded-xl flex flex-col justify-end items-end overflow-hidden mb-4">
          <div className="text-xl text-muted-foreground h-1/3 truncate w-full text-right">
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
            variant="ghost"
            className={cn(basicBtnClasses, "text-destructive hover:bg-destructive/10")}
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
            className={cn(basicBtnClasses, "bg-primary text-primary-foreground hover:bg-primary/90")}
          >
            =
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
