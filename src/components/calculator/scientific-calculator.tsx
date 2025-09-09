
"use client";

import { Delete } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ScientificCalculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [expression, setExpression] = useState("");
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleInput = (value: string) => {
    if (displayValue === "0" || isNewNumber) {
      setDisplayValue(value);
      setIsNewNumber(false);
    } else {
      setDisplayValue(displayValue + value);
    }
  };

  const handleOperator = (operator: string) => {
    setExpression(expression + displayValue + " " + operator + " ");
    setIsNewNumber(true);
  };
  
  const handleClear = () => {
    setDisplayValue("0");
    setExpression("");
    setIsNewNumber(true);
  };

  const handleBackspace = () => {
    setDisplayValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };
  
  const handleEquals = useCallback(() => {
    try {
      const sanitizedExpr = expression.replace(/×/g, "*").replace(/÷/g, "/");
      // This is a placeholder eval and not safe for production
      // eslint-disable-next-line no-eval
      const result = eval(sanitizedExpr + displayValue);
      setDisplayValue(String(result));
      setExpression("");
      setIsNewNumber(true);
    } catch {
      setDisplayValue("Error");
      setExpression("");
      setIsNewNumber(true);
    }
  }, [expression, displayValue]);

  const btnClasses = "h-12 text-md rounded-lg py-2 font-semibold";
  const specialBtnClasses =
    "bg-neutral-300 dark:bg-neutral-700/80 hover:bg-neutral-400/80 dark:hover:bg-neutral-700 text-black dark:text-white";
  const operatorBtnClasses =
    "bg-primary hover:bg-primary/90 text-primary-foreground";
  const numberBtnClasses =
    "bg-neutral-200 dark:bg-neutral-800/80 hover:bg-neutral-300/80 dark:hover:bg-neutral-800 text-black dark:text-white";

  return (
    <Card className="w-full mx-auto overflow-hidden rounded-2xl border-none bg-transparent shadow-none">
      <CardContent className="p-1">
        <div className="h-28 p-4 bg-muted dark:bg-black/20 rounded-xl flex flex-col justify-end items-end overflow-hidden mb-4">
           <div className="text-xl text-muted-foreground h-1/3 truncate w-full text-right">
            {expression}
          </div>
          <div className="h-2/3 w-full flex items-end justify-end">
            <div className="w-full text-right font-mono text-5xl text-foreground">
              {displayValue}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 p-1">
          {/* Row 1 */}
          <Button onClick={() => handleOperator("(")} className={cn(btnClasses, specialBtnClasses)}>(</Button>
          <Button onClick={() => handleOperator(")")} className={cn(btnClasses, specialBtnClasses)}>)</Button>
          <Button onClick={() => handleClear()} className={cn(btnClasses, specialBtnClasses)}>AC</Button>
          <Button onClick={handleBackspace} className={cn(btnClasses, specialBtnClasses)}><Delete/></Button>
          <Button onClick={() => handleOperator("÷")} className={cn(btnClasses, operatorBtnClasses)}>÷</Button>

          {/* Row 2 */}
          <Button onClick={() => handleOperator("√")} className={cn(btnClasses, specialBtnClasses)}>√</Button>
          <Button onClick={() => handleInput("7")} className={cn(btnClasses, numberBtnClasses)}>7</Button>
          <Button onClick={() => handleInput("8")} className={cn(btnClasses, numberBtnClasses)}>8</Button>
          <Button onClick={() => handleInput("9")} className={cn(btnClasses, numberBtnClasses)}>9</Button>
          <Button onClick={() => handleOperator("×")} className={cn(btnClasses, operatorBtnClasses)}>×</Button>

          {/* Row 3 */}
          <Button onClick={() => handleOperator("x²")} className={cn(btnClasses, specialBtnClasses)}>x²</Button>
          <Button onClick={() => handleInput("4")} className={cn(btnClasses, numberBtnClasses)}>4</Button>
          <Button onClick={() => handleInput("5")} className={cn(btnClasses, numberBtnClasses)}>5</Button>
          <Button onClick={() => handleInput("6")} className={cn(btnClasses, numberBtnClasses)}>6</Button>
          <Button onClick={() => handleOperator("-")} className={cn(btnClasses, operatorBtnClasses)}>-</Button>

          {/* Row 4 */}
          <Button onClick={() => handleOperator("xʸ")} className={cn(btnClasses, specialBtnClasses)}>xʸ</Button>
          <Button onClick={() => handleInput("1")} className={cn(btnClasses, numberBtnClasses)}>1</Button>
          <Button onClick={() => handleInput("2")} className={cn(btnClasses, numberBtnClasses)}>2</Button>
          <Button onClick={() => handleInput("3")} className={cn(btnClasses, numberBtnClasses)}>3</Button>
          <Button onClick={() => handleOperator("+")} className={cn(btnClasses, operatorBtnClasses)}>+</Button>

          {/* Row 5 */}
          <Button onClick={() => handleOperator("%")} className={cn(btnClasses, specialBtnClasses)}>%</Button>
          <Button onClick={() => handleInput("0")} className={cn(btnClasses, numberBtnClasses, "col-span-2")}>0</Button>
          <Button onClick={() => handleInput(".")} className={cn(btnClasses, numberBtnClasses)}>.</Button>
          <Button onClick={handleEquals} className={cn(btnClasses, operatorBtnClasses)}>=</Button>

        </div>
      </CardContent>
    </Card>
  );
}
