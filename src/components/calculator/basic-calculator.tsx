
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const buttonLayout = [
  "AC", "+/-", "%", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "="
];

export default function BasicCalculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [justEvaluated, setJustEvaluated] = useState(false);


  const handleInput = (input: string) => {
    if (["/", "*", "-", "+"].includes(input)) {
      handleOperator(input);
    } else if (input === "=") {
      handleEquals();
    } else if (input === "AC") {
      resetCalculator();
    } else if (input === ".") {
      inputDecimal();
    } else if (input === "+/-") {
      toggleSign();
    } else if (input === "%") {
      inputPercent();
    } else {
      inputDigit(input);
    }
  };

  const inputDigit = (digit: string) => {
    if(justEvaluated) {
      setDisplayValue(digit);
      setJustEvaluated(false);
      return;
    }
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
     if (justEvaluated) {
      setDisplayValue("0.");
      setJustEvaluated(false);
      return;
    }
    if (waitingForSecondOperand) {
      setDisplayValue("0.");
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };
  
  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (displayValue === "Error") {
        resetCalculator();
        return;
    }
    
    if(operator && waitingForSecondOperand) {
        setOperator(nextOperator);
        return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      if (typeof result === "string") {
        setDisplayValue(result);
        setJustEvaluated(true);
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        return;
      }
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
    setJustEvaluated(false);
  };
  
  const performCalculation = () => {
      if(firstOperand === null || operator === null) return parseFloat(displayValue);

      const currentValue = parseFloat(displayValue);
      const calculations: {[key: string]: (a: number, b: number) => number} = {
        "/": (a, b) => {
            if (b === 0) return Infinity;
            return a / b;
        },
        "*": (a, b) => a * b,
        "-": (a, b) => a - b,
        "+": (a, b) => a + b,
      };
      
      const result = calculations[operator](firstOperand, currentValue);
      return isFinite(result) ? result : "Error";
  }

  const handleEquals = () => {
    if(!operator || firstOperand === null || justEvaluated) return;
    const result = performCalculation();
    setDisplayValue(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setJustEvaluated(true);
  };
  
  const toggleSign = () => {
    if(displayValue !== "Error") setDisplayValue(String(parseFloat(displayValue) * -1));
  };
  
  const inputPercent = () => {
       if(displayValue !== "Error") {
            const currentValue = parseFloat(displayValue);
            setDisplayValue(String(currentValue / 100));
       }
  }

  const resetCalculator = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setJustEvaluated(false);
  };
  
  const getButtonClass = (btn: string) => {
    if (["/", "*", "-", "+", "="].includes(btn)) return { variant: "default" as const, className: "bg-primary/80 hover:bg-primary text-primary-foreground"};
    if (["AC", "+/-", "%"].includes(btn)) return { variant: "outline" as const, className: "bg-secondary hover:bg-secondary/80"};
    if (btn === "0") return { variant: "outline" as const, className: "col-span-2"};
    return { variant: "outline" as const, className: ""};
  };

  return (
    <div className="lg:col-span-3 max-w-sm mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Basic Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            aria-label="Calculator display"
            value={displayValue} 
            readOnly 
            className="h-20 text-5xl text-right font-mono pr-4 bg-background"
          />
          <div className="grid grid-cols-4 gap-2">
            {buttonLayout.map((btn) => {
              const { variant, className } = getButtonClass(btn);
              return (
                <Button
                  key={btn}
                  onClick={() => handleInput(btn)}
                  variant={variant}
                  className={`h-16 text-2xl ${className}`}
                >
                  {btn}
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
