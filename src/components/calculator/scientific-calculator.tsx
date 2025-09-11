
"use client";

import { Delete, Divide, Minus, Plus, X as Times } from "lucide-react";
import { evaluate, factorial } from "mathjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import usePersistentState from "@/hooks/use-persistent-state";
import { cn } from "@/lib/utils";

export default function ScientificCalculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [expression, setExpression] = useState("");
  const [isRadians, setIsRadians] = usePersistentState("sci-isRadians", true);
  const [justEvaluated, setJustEvaluated] = useState(false);

  const handleClear = () => {
    setDisplayValue("0");
    setExpression("");
    setJustEvaluated(false);
  };

  const handleInput = (value: string) => {
    if (justEvaluated) {
      setExpression(value);
      setDisplayValue(value);
      setJustEvaluated(false);
    } else {
      setExpression((prev) => prev + value);
      setDisplayValue((prev) => (prev === "0" && value !== "." ? value : prev + value));
    }
  };

  const handleOperator = (op: string) => {
    setJustEvaluated(false);
    setExpression((prev) => {
      // Avoid chaining operators like '++' or '+*'
      const lastChar = prev.trim().slice(-1);
      if (['+', '−', '×', '÷', '^'].includes(lastChar)) {
        return prev.slice(0, -1) + op;
      }
      return `${prev} ${op} `;
    });
     // Reset display for next number
    setDisplayValue("0");
  };

  const handleFunction = (func: string) => {
    try {
        let currentVal = parseFloat(displayValue);
        if (isNaN(currentVal)) return;

        let result;
        switch (func) {
            case "sin": result = isRadians ? Math.sin(currentVal) : Math.sin(currentVal * Math.PI / 180); break;
            case "cos": result = isRadians ? Math.cos(currentVal) : Math.cos(currentVal * Math.PI / 180); break;
            case "tan": result = isRadians ? Math.tan(currentVal) : Math.tan(currentVal * Math.PI / 180); break;
            case "sin⁻¹": result = isRadians ? Math.asin(currentVal) : Math.asin(currentVal) * 180 / Math.PI; break;
            case "cos⁻¹": result = isRadians ? Math.cos(currentVal) : Math.cos(currentVal) * 180 / Math.PI; break;
            case "tan⁻¹": result = isRadians ? Math.atan(currentVal) : Math.atan(currentVal) * 180 / Math.PI; break;
            case "ln": result = Math.log(currentVal); break;
            case "log": result = Math.log10(currentVal); break;
            case "√": result = Math.sqrt(currentVal); break;
            case "x²": result = Math.pow(currentVal, 2); break;
            case "x!": result = factorial(currentVal); break;
            case "10^": result = Math.pow(10, currentVal); break;
            case "EE": result = currentVal * Math.E; break;
            case "π": result = Math.PI; break;
            case "e": result = Math.E; break;
            default: result = currentVal;
        }

        if (!isFinite(result)) {
            setDisplayValue("Error");
            setExpression("Error");
        } else {
            const resultStr = result.toString();
            setDisplayValue(resultStr);
            setExpression(resultStr);
            setJustEvaluated(true);
        }
    } catch {
        setDisplayValue("Error");
        setExpression("Error");
    }
  };
  
  const handleEquals = () => {
    try {
        let finalExpression = expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-");
            
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

  const handleDelete = () => {
    if (justEvaluated || displayValue === "Error") {
      handleClear();
      return;
    }
    setDisplayValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    setExpression((prev) => (prev.length > 1 ? prev.slice(0, -1) : ""));
  };
  
  const handleNumberClick = (num: string) => {
    if (justEvaluated) {
      setDisplayValue(num);
      setExpression(num);
      setJustEvaluated(false);
    } else {
       setDisplayValue((prev) => (prev === "0" ? num : prev + num));
       setExpression((prev) => prev + num);
    }
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
            onClick={() => handleFunction("sin⁻¹")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            sin⁻¹
          </Button>
          <Button
            onClick={() => handleFunction("cos⁻¹")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            cos⁻¹
          </Button>
          <Button
            onClick={() => handleFunction("tan⁻¹")}
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
            onClick={() => handleFunction("√")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            √
          </Button>
          <Button
            onClick={() => handleFunction("x²")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            x²
          </Button>
          <Button
            onClick={() => handleOperator("^")}
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
            onClick={() => handleFunction("x!")}
            variant="ghost"
            className={cn(btnClasses, "text-primary hover:bg-primary/10")}
          >
            x!
          </Button>
          <Button
            onClick={() => handleFunction("EE")}
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
              onClick={() => handleNumberClick(num)}
              variant="ghost"
              className={cn(btnClasses)}
            >
              {num}
            </Button>
          ))}
           <Button
            onClick={() => handleFunction("π")}
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
              onClick={() => handleNumberClick(num)}
              variant="ghost"
              className={cn(btnClasses)}
            >
              {num}
            </Button>
          ))}
           <Button
            onClick={() => handleFunction("e")}
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
          
          <div className="col-span-3 grid grid-cols-3 gap-2">
            {["1", "2", "3"].map((num) => (
              <Button
                key={num}
                onClick={() => handleNumberClick(num)}
                variant="ghost"
                className={cn(btnClasses)}
              >
                {num}
              </Button>
            ))}
          </div>

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
              onClick={() => handleNumberClick("0")}
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
