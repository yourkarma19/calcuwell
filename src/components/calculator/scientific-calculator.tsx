
"use client";

import { Delete } from "lucide-react";
import { evaluate } from "mathjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ScientificCalculator() {
  const [expression, setExpression] = useState("0");
  const [result, setResult] = useState("");

  const handleInput = (value: string) => {
    if (result) {
      setExpression(value);
      setResult("");
      return;
    }
    if (expression === "0" && "123456789(".includes(value)) {
        setExpression(value);
    } else {
        setExpression(prev => prev + value);
    }
  };
  
  const handleFunction = (func: string) => {
     handleInput(`${func}(`);
  }

  const clear = () => {
    setExpression("0");
    setResult("");
  };

  const deleteDigit = () => {
    if (expression.length === 1) {
      setExpression("0");
    } else {
      setExpression(expression.slice(0, -1));
    }
    setResult("");
  };

  const calculateResult = () => {
    try {
      const evalResult = evaluate(expression);
      if (typeof evalResult !== 'number' || !isFinite(evalResult)) {
        setResult("Error");
      } else {
        setResult(evalResult.toString());
      }
    } catch (error) {
      setResult("Error");
    }
  };

  const btnClasses =
    "h-12 md:h-14 text-sm md:text-base rounded-xl py-2 font-semibold transition-transform duration-100 active:scale-95";

  return (
    <Card className="w-full max-w-lg mx-auto overflow-hidden rounded-2xl border-none bg-transparent shadow-none">
      <CardContent className="p-1">
        <div className="h-28 p-4 bg-muted dark:bg-black/20 rounded-xl flex flex-col justify-end items-end overflow-hidden mb-4">
          <div className="text-xl text-muted-foreground h-1/3 truncate w-full text-right">
            {result ? expression : ""}
          </div>
          <div className="h-2/3 w-full flex items-end justify-end">
            <div className="w-full text-right font-mono text-4xl sm:text-5xl text-foreground">
              {result || expression}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
            <Button onClick={() => handleFunction("sin")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>sin</Button>
            <Button onClick={() => handleFunction("cos")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>cos</Button>
            <Button onClick={() => handleInput("(")} variant="ghost" className={cn(btnClasses)}> ( </Button>
            <Button onClick={() => handleInput(")")} variant="ghost" className={cn(btnClasses)}> ) </Button>
            <Button onClick={deleteDigit} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}><Delete /></Button>
            
            <Button onClick={() => handleInput("7")} variant="ghost" className={cn(btnClasses)}>7</Button>
            <Button onClick={() => handleInput("8")} variant="ghost" className={cn(btnClasses)}>8</Button>
            <Button onClick={() => handleInput("9")} variant="ghost" className={cn(btnClasses)}>9</Button>
            <Button onClick={() => handleInput("/")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>÷</Button>
            <Button onClick={clear} variant="ghost" className={cn(btnClasses, "text-destructive hover:bg-destructive/10")}>AC</Button>

            <Button onClick={() => handleInput("4")} variant="ghost" className={cn(btnClasses)}>4</Button>
            <Button onClick={() => handleInput("5")} variant="ghost" className={cn(btnClasses)}>5</Button>
            <Button onClick={() => handleInput("6")} variant="ghost" className={cn(btnClasses)}>6</Button>
            <Button onClick={() => handleInput("*")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>×</Button>
            <Button onClick={() => handleInput("-")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>-</Button>

            <Button onClick={() => handleInput("1")} variant="ghost" className={cn(btnClasses)}>1</Button>
            <Button onClick={() => handleInput("2")} variant="ghost" className={cn(btnClasses)}>2</Button>
            <Button onClick={() => handleInput("3")} variant="ghost" className={cn(btnClasses)}>3</Button>
            <Button onClick={() => handleInput("+")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>+</Button>
            <Button onClick={calculateResult} className={cn(btnClasses, "bg-primary text-primary-foreground hover:bg-primary/90 row-span-2 h-auto")}>=</Button>
            
            <Button onClick={() => handleInput("0")} variant="ghost" className={cn(btnClasses, "col-span-2")}>0</Button>
            <Button onClick={() => handleInput(".")} variant="ghost" className={cn(btnClasses)}>.</Button>
            <Button onClick={() => handleInput("^")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>^</Button>
        </div>
      </CardContent>
    </Card>
  );
}
