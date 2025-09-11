
"use client";

import { Delete } from "lucide-react";
import { evaluate } from "mathjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function BasicCalculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [expression, setExpression] = useState("");
  const [justEvaluated, setJustEvaluated] = useState(false);

  const handleClear = () => {
    setDisplayValue("0");
    setExpression("");
    setJustEvaluated(false);
  };

  const handleBackspace = () => {
    if (justEvaluated) {
      handleClear();
      return;
    }
    setDisplayValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    setExpression((prev) => (prev.length > 1 ? prev.slice(0, -1) : ""));
  };

  const handleNumber = (num: string) => {
    if (justEvaluated) {
      setDisplayValue(num);
      setExpression(num);
      setJustEvaluated(false);
    } else {
      setDisplayValue((prev) => (prev === "0" ? num : prev + num));
      setExpression((prev) => prev + num);
    }
  };

  const handleDecimal = () => {
    if (justEvaluated) {
      setDisplayValue("0.");
      setExpression("0.");
      setJustEvaluated(false);
      return;
    }
    if (!displayValue.includes(".")) {
      setDisplayValue((prev) => prev + ".");
      setExpression((prev) => prev + ".");
    }
  };

  const handleOperator = (op: string) => {
    setJustEvaluated(false);
    setExpression((prev) => {
      const lastChar = prev.trim().slice(-1);
      if (['+', '−', '×', '÷'].includes(lastChar)) {
        return prev.slice(0, -1) + op;
      }
      return `${prev} ${op} `;
    });
    // Reset display for next number
    setDisplayValue("0");
  };

  const handleEquals = () => {
    if (!expression || justEvaluated) return;
    try {
      const finalExpression = expression.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
      const result = evaluate(finalExpression);
      const resultStr = parseFloat(result.toPrecision(15)).toString();
      setDisplayValue(resultStr);
      setExpression(resultStr);
      setJustEvaluated(true);
    } catch (e) {
      setDisplayValue("Error");
      setExpression("Error");
    }
  };

  const handlePercent = () => {
    if (displayValue !== "0") {
      const percentValue = parseFloat(displayValue) / 100;
      setDisplayValue(percentValue.toString());
      // This is tricky in a simple expression builder.
      // We'll just apply it to the last number.
      setExpression((prev) => {
        const parts = prev.split(" ");
        parts[parts.length - 1] = percentValue.toString();
        return parts.join(" ");
      });
    }
  };
  
  const basicBtnClasses =
    "h-16 text-xl rounded-xl py-4 font-semibold transition-transform active:scale-95";

  return (
    <Card className="w-full mx-auto overflow-hidden rounded-2xl border-none bg-transparent shadow-none">
      <CardContent className="p-1">
        <div className="h-28 p-4 bg-muted dark:bg-black/20 rounded-xl flex flex-col justify-end items-end overflow-hidden mb-4">
           <div className="text-xl text-muted-foreground h-1/3 truncate w-full text-right">
            {expression || " "}
          </div>
          <div
            aria-live="polite"
            className="w-full text-right font-mono text-5xl text-foreground"
          >
            {displayValue}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 p-1">
          <Button
            onClick={handleClear}
            variant="ghost"
            className={cn(
              basicBtnClasses,
              "text-destructive hover:bg-destructive/10",
            )}
          >
            AC
          </Button>
          <Button
            onClick={handleBackspace}
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
            onClick={() => handleOperator("÷")}
            variant="ghost"
            className={cn(basicBtnClasses, "text-primary hover:bg-primary/10")}
          >
            ÷
          </Button>

          {["7", "8", "9"].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumber(num)}
              variant="ghost"
              className={cn(basicBtnClasses)}
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleOperator("×")}
            variant="ghost"
            className={cn(basicBtnClasses, "text-primary hover:bg-primary/10")}
          >
            ×
          </Button>

          {["4", "5", "6"].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumber(num)}
              variant="ghost"
              className={cn(basicBtnClasses)}
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleOperator("−")}
            variant="ghost"
            className={cn(basicBtnClasses, "text-primary hover:bg-primary/10")}
          >
            -
          </Button>

          {["1", "2", "3"].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumber(num)}
              variant="ghost"
              className={cn(basicBtnClasses)}
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleOperator("+")}
            variant="ghost"
            className={cn(basicBtnClasses, "text-primary hover:bg-primary/10")}
          >
            +
          </Button>

          <Button
            onClick={() => handleNumber("0")}
            variant="ghost"
            className={cn(basicBtnClasses, "col-span-2")}
          >
            0
          </Button>
          <Button
            onClick={handleDecimal}
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
