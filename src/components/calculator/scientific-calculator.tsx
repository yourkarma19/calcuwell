
"use client";

import { Delete, Divide, Minus, Plus, X as Times } from "lucide-react";
import { evaluate, factorial } from "mathjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import usePersistentState from "@/hooks/use-persistent-state";
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

export default function ScientificCalculator() {
  const [currentOperand, setCurrentOperand] = useState<string | null>("0");
  const [previousOperand, setPreviousOperand] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(true);
  const [isRadians, setIsRadians] = usePersistentState("sci-isRadians", true);

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

  const chooseOperation = (op: string) => {
    if (currentOperand == null && previousOperand == null) return;

    if (previousOperand != null) {
      evaluateState();
    }
    
    setOperation(op);
    setPreviousOperand(currentOperand);
    setCurrentOperand(null);
    setOverwrite(true);
  };
  
  const handleFunction = (func: string) => {
    let value = parseFloat(currentOperand || "0");
    if (isNaN(value)) return;

    let result;
    try {
        switch (func) {
            case "sin": result = isRadians ? Math.sin(value) : Math.sin(value * Math.PI / 180); break;
            case "cos": result = isRadians ? Math.cos(value) : Math.cos(value * Math.PI / 180); break;
            case "tan": result = isRadians ? Math.tan(value) : Math.tan(value * Math.PI / 180); break;
            case "sin⁻¹": result = isRadians ? Math.asin(value) : Math.asin(value) * 180 / Math.PI; break;
            case "cos⁻¹": result = isRadians ? Math.acos(value) : Math.acos(value) * 180 / Math.PI; break;
            case "tan⁻¹": result = isRadians ? Math.atan(value) : Math.atan(value) * 180 / Math.PI; break;
            case "ln": result = Math.log(value); break;
            case "log": result = Math.log10(value); break;
            case "√": result = Math.sqrt(value); break;
            case "x²": result = Math.pow(value, 2); break;
            case "x!": result = factorial(value); break;
            case "10^": result = Math.pow(10, value); break;
            case "e": setCurrentOperand(Math.E.toString()); setOverwrite(false); return;
            case "π": setCurrentOperand(Math.PI.toString()); setOverwrite(false); return;
            case "±": result = value * -1; break;
            case "%": result = value / 100; break;
            default: return;
        }

        if (!isFinite(result)) {
            setCurrentOperand("Error");
        } else {
            setCurrentOperand(result.toString());
        }
        setOverwrite(true);
    } catch {
        setCurrentOperand("Error");
        setOverwrite(true);
    }
  };


  const evaluateState = () => {
    if (operation == null || currentOperand == null || previousOperand == null) {
      return;
    }

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    
    let result;
    try {
      result = evaluate(`${prev} ${operation} ${current}`);
    } catch {
      result = "Error";
    }

    setCurrentOperand(result.toString());
    setPreviousOperand(null);
    setOperation(null);
    setOverwrite(true);
  };
  
  const displayExpression = () => {
    if (operation != null && previousOperand != null) {
      return `${formatOperand(previousOperand)} ${operation}`;
    }
    return "";
  }

  const btnClasses =
    "h-12 md:h-14 text-sm md:text-base rounded-xl py-2 font-semibold transition-transform duration-100 active:scale-95";

  return (
    <Card className="w-full max-w-lg mx-auto overflow-hidden rounded-2xl border-none bg-transparent shadow-none">
      <CardContent className="p-1">
        <div className="h-28 p-4 bg-muted dark:bg-black/20 rounded-xl flex flex-col justify-end items-end overflow-hidden mb-4">
          <div className="text-xl text-muted-foreground h-1/3 truncate w-full text-right">
             {displayExpression()}
          </div>
          <div className="h-2/3 w-full flex items-end justify-end">
            <div
              aria-live="polite"
              className="w-full text-right font-mono text-4xl sm:text-5xl text-foreground"
            >
              {formatOperand(currentOperand)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2">
          <Button onClick={() => handleFunction("sin")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>sin</Button>
          <Button onClick={() => handleFunction("cos")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>cos</Button>
          <Button onClick={() => handleFunction("tan")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>tan</Button>
          <Button onClick={() => handleFunction("log")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>log</Button>
          <Button onClick={deleteDigit} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}><Delete /></Button>

          <Button onClick={() => handleFunction("sin⁻¹")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>sin⁻¹</Button>
          <Button onClick={() => handleFunction("cos⁻¹")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>cos⁻¹</Button>
          <Button onClick={() => handleFunction("tan⁻¹")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>tan⁻¹</Button>
          <Button onClick={() => handleFunction("ln")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>ln</Button>
          <Button onClick={clear} variant="ghost" className={cn(btnClasses, "text-destructive hover:bg-destructive/10")}>AC</Button>

          <Button onClick={() => handleFunction("√")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>√</Button>
          <Button onClick={() => handleFunction("x²")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>x²</Button>
          <Button onClick={() => chooseOperation("^")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>xʸ</Button>
          <Button onClick={() => handleFunction("10^")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>10ˣ</Button>
          <Button onClick={() => chooseOperation("/")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}><Divide size={20} /></Button>

          <Button onClick={() => handleFunction("x!")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>x!</Button>
          <Button onClick={() => handleFunction("%")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>%</Button>
          <Button onClick={() => setIsRadians(!isRadians)} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>{isRadians ? "Rad" : "Deg"}</Button>
          <Button onClick={() => addDigit("(")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>(</Button>
          <Button onClick={() => addDigit(")")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>)</Button>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {["7", "8", "9"].map((num) => (<Button key={num} onClick={() => addDigit(num)} variant="ghost" className={cn(btnClasses)}>{num}</Button>))}
           <Button onClick={() => handleFunction("π")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>π</Button>
          <Button onClick={() => chooseOperation("*")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}><Times size={20} /></Button>

          {["4", "5", "6"].map((num) => (<Button key={num} onClick={() => addDigit(num)} variant="ghost" className={cn(btnClasses)}>{num}</Button>))}
           <Button onClick={() => handleFunction("e")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>e</Button>
          <Button onClick={() => chooseOperation("-")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}><Minus size={20} /></Button>
          
          {["1", "2", "3"].map((num) => (<Button key={num} onClick={() => addDigit(num)} variant="ghost" className={cn(btnClasses)}>{num}</Button>))}
           <Button onClick={() => handleFunction("±")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>±</Button>
          <Button onClick={() => chooseOperation("+")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}><Plus size={20} /></Button>

          <Button onClick={() => addDigit("0")} variant="ghost" className={cn(btnClasses, "col-span-2")}>0</Button>
          <Button onClick={() => addDigit(".")} variant="ghost" className={cn(btnClasses)}>.</Button>
          <Button onClick={() => handleFunction("±")} variant="ghost" className={cn(btnClasses, "invisible")}>±</Button>
          <Button onClick={evaluateState} className={cn(btnClasses, "bg-primary text-primary-foreground hover:bg-primary/90")}>=</Button>

        </div>
      </CardContent>
    </Card>
  );
}
