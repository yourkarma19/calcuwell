
"use client";

import { Delete } from "lucide-react";
import { useState, useCallback, useEffect }from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Helper function to evaluate expressions safely
const safeEval = (expr: string): number | string => {
  try {
    // Replace user-friendly symbols with JS Math functions
    const sanitizedExpr = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/‑/g, "-")
      .replace(/√\((.*?)\)/g, "Math.sqrt($1)")
      .replace(/log\((.*?)\)/g, "Math.log10($1)")
      .replace(/ln\((.*?)\)/g, "Math.log($1)")
      .replace(/sin\((.*?)\)/g, "Math.sin(Math.PI/180*$1)")
      .replace(/cos\((.*?)\)/g, "Math.cos(Math.PI/180*$1)")
      .replace(/tan\((.*?)\)/g, "Math.tan(Math.PI/180*$1)")
      .replace(/π/g, "Math.PI")
      .replace(/e/g, "Math.E");

    // eslint-disable-next-line no-new-func
    const result = new Function(`return ${sanitizedExpr}`)();
    if (result === undefined || !isFinite(result)) return "Error";
    // Return result with a high precision
    return parseFloat(result.toPrecision(15));
  } catch (error) {
    return "Error";
  }
};


// Factorial function
const factorial = (n: number): number => {
  if (n < 0 || n !== Math.floor(n)) return NaN; // Factorial is only for non-negative integers
  if (n === 0) return 1;
  if (n > 170) return Infinity;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};


export default function ScientificCalculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [expression, setExpression] = useState("");
  const [isNewNumber, setIsNewNumber] = useState(true);
  const [justEvaluated, setJustEvaluated] = useState(false);


  const handleInput = useCallback((input: string) => {
    const operators = ["÷", "×", "‑", "+"];
    if (operators.includes(input)) {
        handleOperator(input);
    } else if (/[0-9]/.test(input)) {
        handleNumber(input);
    } else if (input === '.') {
        handleDecimal();
    }
     else {
        switch (input) {
            case "=":
                handleEquals();
                break;
            case "AC":
                handleClear();
                break;
            case "⌫":
                handleBackspace();
                break;
            case 'x²':
            case 'x³':
            case '√':
            case '∛':
            case 'log':
            case 'ln':
            case 'sin':
            case 'cos':
            case 'tan':
            case 'n!':
            case '1/x':
            case '%':
            case '+/-':
                handleUnaryOperation(input);
                break;
            case 'π':
            case 'e':
                handleConstant(input);
                break;
            default:
                break;
        }
    }
  }, []);

  const handleNumber = (num: string) => {
    if (justEvaluated) {
      setDisplayValue(num);
      setJustEvaluated(false);
    } else if (isNewNumber) {
      setDisplayValue(num);
      setIsNewNumber(false);
    } else {
      setDisplayValue(prev => prev === '0' ? num : prev + num);
    }
  };


  const handleOperator = (op: string) => {
    if (displayValue === "Error") return;

    if (justEvaluated) {
      setExpression(displayValue + " " + op + " ");
      setJustEvaluated(false);
    } else if (isNewNumber) {
      setExpression(prev => prev.slice(0, -2) + op + " ");
    } else {
      setExpression(prev => prev + displayValue + " " + op + " ");
    }
    setIsNewNumber(true);
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


  const handleEquals = useCallback(() => {
    if (displayValue === "Error" || isNewNumber) return;
    const finalExpression = expression + displayValue;
    const result = safeEval(finalExpression);
    setDisplayValue(String(result));
    setExpression("");
    setJustEvaluated(true);
    setIsNewNumber(true);
  }, [expression, displayValue, isNewNumber]);


  const handleClear = () => {
    setDisplayValue("0");
    setExpression("");
    setIsNewNumber(true);
    setJustEvaluated(false);
  };

  const handleBackspace = () => {
    if (justEvaluated) return;
    setDisplayValue(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  };

  const handleUnaryOperation = (op: string) => {
    if (displayValue === "Error") return;
    const currentVal = parseFloat(displayValue);
    if(isNaN(currentVal)) return;

    let result: number | string | undefined;

    switch (op) {
      case 'x²':
        result = Math.pow(currentVal, 2);
        break;
      case 'x³':
        result = Math.pow(currentVal, 3);
        break;
      case '√':
        result = currentVal >= 0 ? Math.sqrt(currentVal) : 'Error';
        break;
      case '∛':
        result = Math.cbrt(currentVal);
        break;
      case 'log':
        result = currentVal > 0 ? Math.log10(currentVal) : 'Error';
        break;
      case 'ln':
        result = currentVal > 0 ? Math.log(currentVal) : 'Error';
        break;
      case 'sin':
        result = Math.sin(currentVal * Math.PI / 180); // Assuming degrees
        break;
      case 'cos':
        result = Math.cos(currentVal * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(currentVal * Math.PI / 180);
        break;
      case 'n!':
        result = factorial(currentVal);
        break;
      case '1/x':
        result = currentVal !== 0 ? 1 / currentVal : 'Error';
        break;
      case '%':
        result = currentVal / 100;
        break;
      case '+/-':
        result = currentVal * -1;
        break;
      default:
        return;
    }
    setDisplayValue(String(result));
    setIsNewNumber(true);
  };
  
  const handleConstant = (c: 'π' | 'e') => {
    const value = c === 'π' ? Math.PI : Math.E;
    setDisplayValue(String(value));
    setIsNewNumber(false);
    setJustEvaluated(false);
  }

  const btnClasses = "h-12 text-md rounded-lg py-2 font-semibold";
  const specialBtnClasses =
    "bg-neutral-300 dark:bg-neutral-700/80 hover:bg-neutral-400/80 dark:hover:bg-neutral-700 text-black dark:text-white";
  const operatorBtnClasses =
    "bg-primary hover:bg-primary/90 text-primary-foreground";
  const numberBtnClasses =
    "bg-neutral-200 dark:bg-neutral-800/80 hover:bg-neutral-300/80 dark:hover:bg-neutral-800 text-black dark:text-white";

  return (
    <Card className="w-full max-w-lg mx-auto overflow-hidden rounded-2xl border-none bg-transparent shadow-none">
      <CardContent className="p-1">
        <div className="h-28 p-4 bg-muted dark:bg-black/20 rounded-xl flex flex-col justify-end items-end overflow-hidden mb-4">
           <div className="text-xl text-muted-foreground h-1/3 truncate w-full text-right">
            {expression}
          </div>
          <div className="h-2/3 w-full flex items-end justify-end">
            <div className="w-full text-right font-mono text-5xl text-foreground" aria-live="polite">
              {displayValue}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 p-1">
          {/* Row 1 */}
          <Button onClick={() => handleUnaryOperation('sin')} className={cn(btnClasses, specialBtnClasses)}>sin</Button>
          <Button onClick={() => handleUnaryOperation('cos')} className={cn(btnClasses, specialBtnClasses)}>cos</Button>
          <Button onClick={() => handleUnaryOperation('tan')} className={cn(btnClasses, specialBtnClasses)}>tan</Button>
          <Button onClick={() => handleClear()} className={cn(btnClasses, specialBtnClasses)}>C</Button>
          <Button onClick={() => handleInput("⌫")} className={cn(btnClasses, specialBtnClasses)}><Delete/></Button>

          {/* Row 2 */}
          <Button onClick={() => handleUnaryOperation('log')} className={cn(btnClasses, specialBtnClasses)}>log</Button>
          <Button onClick={() => handleUnaryOperation('ln')} className={cn(btnClasses, specialBtnClasses)}>ln</Button>
          <Button onClick={() => handleInput("7")} className={cn(btnClasses, numberBtnClasses)}>7</Button>
          <Button onClick={() => handleInput("8")} className={cn(btnClasses, numberBtnClasses)}>8</Button>
          <Button onClick={() => handleInput("9")} className={cn(btnClasses, numberBtnClasses)}>9</Button>

          {/* Row 3 */}
          <Button onClick={() => handleUnaryOperation('√')} className={cn(btnClasses, specialBtnClasses)}>√</Button>
          <Button onClick={() => handleUnaryOperation('∛')} className={cn(btnClasses, specialBtnClasses)}>∛</Button>
          <Button onClick={() => handleInput("4")} className={cn(btnClasses, numberBtnClasses)}>4</Button>
          <Button onClick={() => handleInput("5")} className={cn(btnClasses, numberBtnClasses)}>5</Button>
          <Button onClick={() => handleInput("6")} className={cn(btnClasses, numberBtnClasses)}>6</Button>

          {/* Row 4 */}
          <Button onClick={() => handleUnaryOperation('x²')} className={cn(btnClasses, specialBtnClasses)}>x²</Button>
          <Button onClick={() => handleUnaryOperation('x³')} className={cn(btnClasses, specialBtnClasses)}>x³</Button>
          <Button onClick={() => handleInput("1")} className={cn(btnClasses, numberBtnClasses)}>1</Button>
          <Button onClick={() => handleInput("2")} className={cn(btnClasses, numberBtnClasses)}>2</Button>
          <Button onClick={() => handleInput("3")} className={cn(btnClasses, numberBtnClasses)}>3</Button>
          
          {/* Row 5 */}
          <Button onClick={() => handleUnaryOperation('n!')} className={cn(btnClasses, specialBtnClasses)}>n!</Button>
          <Button onClick={() => handleConstant('π')} className={cn(btnClasses, specialBtnClasses)}>π</Button>
          <Button onClick={() => handleInput("0")} className={cn(btnClasses, numberBtnClasses, "col-span-2")}>0</Button>
          <Button onClick={() => handleInput(".")} className={cn(btnClasses, numberBtnClasses)}>.</Button>
        
          {/* Operators */}
          <div className="col-start-5 row-start-2 row-span-4 flex flex-col gap-2">
            <Button onClick={() => handleOperator("÷")} className={cn(btnClasses, operatorBtnClasses, "flex-1")}>÷</Button>
            <Button onClick={() => handleOperator("×")} className={cn(btnClasses, operatorBtnClasses, "flex-1")}>×</Button>
            <Button onClick={() => handleOperator("-")} className={cn(btnClasses, operatorBtnClasses, "flex-1")}>-</Button>
            <Button onClick={() => handleOperator("+")} className={cn(btnClasses, operatorBtnClasses, "flex-1")}>+</Button>
            <Button onClick={() => handleEquals()} className={cn(btnClasses, operatorBtnClasses, "flex-1")}>=</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
