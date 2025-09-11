
"use client";

import { Delete } from "lucide-react";
import { evaluate } from "mathjs";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ScientificCalculator() {
  const [expression, setExpression] = useState("0");
  const [result, setResult] = useState("");
  const [isRadians, setIsRadians] = useState(true);

  useEffect(() => {
    const savedMode = localStorage.getItem("sci-isRadians");
    if (savedMode !== null) {
      setIsRadians(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sci-isRadians", JSON.stringify(isRadians));
  }, [isRadians]);

  const handleInput = (value: string) => {
    if (result) {
      if ("+-*/^".includes(value)) {
        setExpression(result + value);
      } else {
        setExpression(value);
      }
      setResult("");
      return;
    }

    if (expression === "0" && "123456789(".includes(value)) {
      setExpression(value);
    } else {
      setExpression((prev) => prev + value);
    }
    setResult("");
  };

  const handleFunction = (func: string) => {
    const currentExpression = expression === "0" ? "" : expression;
    setExpression(`${currentExpression}${func}(`);
    setResult("");
  };

  const handleConstant = (constStr: string) => {
    if (result) {
      setExpression(constStr);
      setResult("");
      return;
    }
    if (expression === "0") {
      setExpression(constStr);
    } else {
      handleInput(constStr);
    }
  };

  const clear = () => {
    setExpression("0");
    setResult("");
  };

  const deleteDigit = () => {
    setResult("");
    if (expression.length === 1) {
      setExpression("0");
    } else {
      setExpression(expression.slice(0, -1));
    }
  };

  const calculateResult = () => {
    if (expression === "Error" || expression === "") return;
    try {
      const sanitizedExpression = expression
        .replace(/log/g, "log10")
        .replace(/ln/g, "log")
        .replace(/π/g, "pi")
        .replace(/n!/g, "factorial");

      const scope = {
        sin: (x: number) => isRadians ? Math.sin(x) : Math.sin((x * Math.PI) / 180),
        cos: (x: number) => isRadians ? Math.cos(x) : Math.cos((x * Math.PI) / 180),
        tan: (x: number) => isRadians ? Math.tan(x) : Math.tan((x * Math.PI) / 180),
        asin: (x: number) => isRadians ? Math.asin(x) : Math.asin(x) * (180 / Math.PI),
        acos: (x: number) => isRadians ? Math.acos(x) : Math.acos(x) * (180 / Math.PI),
        atan: (x: number) => isRadians ? Math.atan(x) : Math.atan(x) * (180 / Math.PI),
      };

      const evalResult = evaluate(sanitizedExpression, scope);

      if (typeof evalResult !== "number" || !isFinite(evalResult)) {
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
            {expression}
          </div>
          <div className="h-2/3 w-full flex items-end justify-end">
            <div
              className="w-full text-right font-mono text-4xl sm:text-5xl text-foreground"
              aria-live="polite"
            >
              {result}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {/* Row 1 */}
          <Button onClick={() => handleFunction("sin")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>sin</Button>
          <Button onClick={() => handleFunction("cos")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>cos</Button>
          <Button onClick={() => handleFunction("tan")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>tan</Button>
          <Button onClick={() => handleFunction("log")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>log</Button>
          <Button onClick={() => handleFunction("ln")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>ln</Button>

          {/* Row 2 */}
          <Button onClick={() => handleFunction("asin")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>sin⁻¹</Button>
          <Button onClick={() => handleFunction("acos")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>cos⁻¹</Button>
          <Button onClick={() => handleFunction("atan")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>tan⁻¹</Button>
          <Button onClick={() => handleInput("sqrt(")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>√</Button>
          <Button onClick={() => handleInput("^2")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>x²</Button>

          {/* Row 3 */}
          <Button onClick={() => handleInput("^3")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>x³</Button>
          <Button onClick={() => handleInput("^")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>xʸ</Button>
          <Button onClick={() => handleConstant("π")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>π</Button>
          <Button onClick={() => handleConstant("e")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>e</Button>
          <Button onClick={() => handleFunction("!")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>n!</Button>
          
          {/* Row 4 */}
          <Button onClick={() => handleInput("e^")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>eˣ</Button>
          <Button onClick={() => setIsRadians(!isRadians)} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>{isRadians ? "Rad" : "Deg"}</Button>
          <Button onClick={clear} variant="ghost" className={cn(btnClasses, "text-destructive hover:bg-destructive/10")}>AC</Button>
          <Button onClick={() => handleInput("(")} variant="ghost" className={cn(btnClasses)}>(</Button>
          <Button onClick={() => handleInput(")")} variant="ghost" className={cn(btnClasses)}>)</Button>
          
          {/* Row 5 */}
          <Button onClick={() => handleInput("7")} variant="ghost" className={cn(btnClasses)}>7</Button>
          <Button onClick={() => handleInput("8")} variant="ghost" className={cn(btnClasses)}>8</Button>
          <Button onClick={() => handleInput("9")} variant="ghost" className={cn(btnClasses)}>9</Button>
          <Button onClick={() => handleInput("/")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>÷</Button>
          <Button onClick={deleteDigit} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}><Delete /></Button>

          {/* Row 6 */}
          <Button onClick={() => handleInput("4")} variant="ghost" className={cn(btnClasses)}>4</Button>
          <Button onClick={() => handleInput("5")} variant="ghost" className={cn(btnClasses)}>5</Button>
          <Button onClick={() => handleInput("6")} variant="ghost" className={cn(btnClasses)}>6</Button>
          <Button onClick={() => handleInput("*")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>×</Button>
          <Button onClick={() => handleInput("-")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10")}>-</Button>

          {/* Row 7 */}
          <Button onClick={() => handleInput("1")} variant="ghost" className={cn(btnClasses)}>1</Button>
          <Button onClick={() => handleInput("2")} variant="ghost" className={cn(btnClasses)}>2</Button>
          <Button onClick={() => handleInput("3")} variant="ghost" className={cn(btnClasses)}>3</Button>
          <Button onClick={() => handleInput("+")} variant="ghost" className={cn(btnClasses, "text-primary hover:bg-primary/10 row-span-2 h-auto")}>+</Button>
          <Button onClick={calculateResult} className={cn(btnClasses, "bg-primary text-primary-foreground hover:bg-primary/90 row-span-2 h-auto")}>=</Button>

          {/* Row 8 */}
          <Button onClick={() => handleInput("0")} variant="ghost" className={cn(btnClasses, "col-span-2")}>0</Button>
          <Button onClick={() => handleInput(".")} variant="ghost" className={cn(btnClasses)}>.</Button>
        </div>
      </CardContent>
    </Card>
  );
}
