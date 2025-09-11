
"use client";

import { Delete, Divide, Minus, Plus, X as Times } from "lucide-react";
import { evaluate } from "mathjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import usePersistentState from "@/hooks/use-persistent-state";
import { cn } from "@/lib/utils";

const factorial = (n: number): number => {
  if (n < 0 || !Number.isInteger(n))
    throw new Error("Factorial is only for non-negative integers.");
  if (n > 170) throw new Error("Factorial overflow.");
  if (n === 0) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
};

const customFunctions = {
  factorial,
};

export default function ScientificCalculator() {
  const [expression, setExpression] = usePersistentState("sci-expr", "");
  const [displayValue, setDisplayValue] = usePersistentState(
    "sci-display",
    "0",
  );
  const [isRadians, setIsRadians] = usePersistentState("sci-isRadians", true);
  const [justEvaluated, setJustEvaluated] = usePersistentState(
    "sci-justEval",
    false,
  );

  const evaluateExpression = (expr: string): string => {
    try {
      let finalExpression = expr
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .replace(/√/g, "sqrt")
        .replace(/π/g, "pi")
        .replace(/(\d+\.?\d*)!/g, "factorial($1)")
        .replace(/sin⁻¹/g, "asin")
        .replace(/cos⁻¹/g, "acos")
        .replace(/tan⁻¹/g, "atan")
        .replace(/10\^x/g, "10^")
        .replace(/log₂/g, "log2")
        .replace(/E/g, "e");

      if (!isRadians) {
        finalExpression = finalExpression.replace(
          /(sin|cos|tan)\(([^)]+)\)/g,
          (_match, func, angle) => `${func}(${angle} deg)`,
        );
      }

      const result = evaluate(finalExpression, customFunctions);

      if (result === undefined || !isFinite(result)) return "Error";
      return parseFloat(result.toPrecision(15)).toString();
    } catch (e) {
      return "Error";
    }
  };

  const handleClear = () => {
    setDisplayValue("0");
    setExpression("");
    setJustEvaluated(false);
  };

  const handleInput = (value: string) => {
    if (displayValue === "Error") {
      handleClear();
      return;
    }

    if (justEvaluated) {
      setExpression(value);
      setDisplayValue(value);
      setJustEvaluated(false);
      return;
    }

    setExpression((prev) => prev + value);
    if (
      displayValue === "0" ||
      ["+", "-", "×", "÷"].some((op) => expression.endsWith(` ${op} `))
    ) {
      setDisplayValue(value);
    } else {
      setDisplayValue((prev) => prev + value);
    }
  };

  const handleOperator = (op: string) => {
    if (displayValue === "Error") return;

    setExpression((prev) => `${prev} ${op} `);
    setDisplayValue("0");
    setJustEvaluated(false);
  };

  const handleFunction = (func: string) => {
    if (displayValue === "Error") return;

    if (justEvaluated) {
      setExpression(`${func}(${displayValue})`);
      setJustEvaluated(false);
    } else {
      setExpression((prev) => `${prev}${func}(`);
    }
    setDisplayValue("0");
  };

  const handleEquals = () => {
    if (displayValue === "Error" || expression === "") return;

    const result = evaluateExpression(expression);
    setDisplayValue(result);
    setExpression(result);
    setJustEvaluated(true);
  };

  const handleDelete = () => {
    if (justEvaluated) {
      handleClear();
      return;
    }
    setExpression((prev) => prev.slice(0, -1));
    setDisplayValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const btnClasses =
    "h-12 md:h-14 text-sm md:text-base rounded-xl py-2 font-semibold transition-transform duration-100 active:scale-95";

  return (
    <Card className="w-full max-w-lg mx-auto overflow-hidden rounded-2xl border-none bg-transparent shadow-none">
      <CardContent className="p-1">
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

        <div className="grid grid-cols-5 gap-2 mb-2">
          <Button
            onClick={() => handleFunction("sin")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            sin
          </Button>
          <Button
            onClick={() => handleFunction("cos")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            cos
          </Button>
          <Button
            onClick={() => handleFunction("tan")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            tan
          </Button>
          <Button
            onClick={() => handleFunction("log")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            log
          </Button>
          <Button
            onClick={handleDelete}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            <Delete />
          </Button>

          <Button
            onClick={() => handleFunction("asin")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            sin⁻¹
          </Button>
          <Button
            onClick={() => handleFunction("acos")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            cos⁻¹
          </Button>
          <Button
            onClick={() => handleFunction("atan")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            tan⁻¹
          </Button>
          <Button
            onClick={() => handleFunction("ln")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            ln
          </Button>
          <Button
            onClick={handleClear}
            variant="ghost"
            className={cn(
              btnClasses,
              "text-destructive hover:bg-destructive/10",
            )}
          >
            AC
          </Button>

          <Button
            onClick={() => handleFunction("sqrt")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            √
          </Button>
          <Button
            onClick={() => handleInput("^2")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            x²
          </Button>
          <Button
            onClick={() => handleInput("^")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            xʸ
          </Button>
          <Button
            onClick={() => handleFunction("10^")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            10ˣ
          </Button>
          <Button
            onClick={() => handleOperator("÷")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            <Divide size={20} />
          </Button>

          <Button
            onClick={() => handleInput("!")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            x!
          </Button>
          <Button
            onClick={() => handleInput("E")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            EE
          </Button>
          <Button
            onClick={() => setIsRadians(!isRadians)}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            {isRadians ? "Rad" : "Deg"}
          </Button>
          <Button
            onClick={() => handleInput("(")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            (
          </Button>
          <Button
            onClick={() => handleInput(")")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            )
          </Button>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {["7", "8", "9"].map((num) => (
            <Button
              key={num}
              onClick={() => handleInput(num)}
              variant="ghost"
              className={cn(btnClasses)}
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleInput("π")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            π
          </Button>
          <Button
            onClick={() => handleOperator("×")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            <Times size={20} />
          </Button>

          {["4", "5", "6"].map((num) => (
            <Button
              key={num}
              onClick={() => handleInput(num)}
              variant="ghost"
              className={cn(btnClasses)}
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleInput("e")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            e
          </Button>
          <Button
            onClick={() => handleOperator("−")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            <Minus size={20} />
          </Button>

          {["1", "2", "3"].map((num) => (
            <Button
              key={num}
              onClick={() => handleInput(num)}
              variant="ghost"
              className={cn(btnClasses)}
            >
              {num}
            </Button>
          ))}
          <div className="col-span-2 flex gap-2">
            <Button
              onClick={() => handleOperator("+")}
              variant="ghost"
              className={cn(btnClasses, "flex-1 text-primary hover:bg-primary/10")}
            >
              <Plus size={20} />
            </Button>
          </div>
          <div className="col-span-3 flex gap-2">
            <Button
              onClick={() => handleInput("0")}
              variant="ghost"
              className={cn(btnClasses, "flex-1")}
            >
              0
            </Button>
            <Button
              onClick={() => handleInput(".")}
              variant="ghost"
              className={cn(btnClasses, "flex-1")}
            >
              .
            </Button>
          </div>
          <div className="col-span-2">
            <Button
              onClick={handleEquals}
              className={cn(
                btnClasses,
                "w-full bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            >
              =
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
