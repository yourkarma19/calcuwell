
"use client";

import { Delete, Heart } from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const getScientificButtonLayout = (isInverse: boolean) => [
  { func: "(", tooltip: "Open Parenthesis" },
  { func: ")", tooltip: "Close Parenthesis" },
  { func: "mc", tooltip: "Memory Clear" },
  { func: "m+", tooltip: "Memory Add" },
  { func: "m-", tooltip: "Memory Subtract" },
  { func: "mr", tooltip: "Memory Recall" },
  { func: "2nd", tooltip: "Inverse Functions", active: isInverse },
  isInverse
    ? { func: "x³", tooltip: "Cube" }
    : { func: "x²", tooltip: "Square" },
  { func: "xʸ", tooltip: "Power" },
  isInverse
    ? { func: "ln", tooltip: "Natural Log" }
    : { func: "eˣ", tooltip: "e^x" },
  { func: "10ˣ", tooltip: "10^x" },
  { func: "x!", tooltip: "Factorial" },
  { func: "¹/x", tooltip: "Reciprocal" },
  isInverse
    ? { func: "³√x", tooltip: "Cube Root" }
    : { func: "²√x", tooltip: "Square Root" },
  { func: "ʸ√x", tooltip: "y-th Root" },
  isInverse
    ? { func: "log₂", tooltip: "Log base 2" }
    : { func: "log₁₀", tooltip: "Log base 10" },
  { func: "e", tooltip: `Euler's Number` },
  { func: "EE", tooltip: "Exponent" },
  isInverse
    ? { func: "sin⁻¹", tooltip: "Arcsine" }
    : { func: "sin", tooltip: "Sine" },
  isInverse
    ? { func: "cos⁻¹", tooltip: "Arccosine" }
    : { func: "cos", tooltip: "Cosine" },
  isInverse
    ? { func: "tan⁻¹", tooltip: "Arctangent" }
    : { func: "tan", tooltip: "Tangent" },
  isInverse
    ? { func: "sinh⁻¹", tooltip: "Hyperbolic Arcsine" }
    : { func: "sinh", tooltip: "Hyperbolic Sine" },
  isInverse
    ? { func: "cosh⁻¹", tooltip: "Hyperbolic Arccosine" }
    : { func: "cosh", tooltip: "Hyperbolic Cosine" },
  isInverse
    ? { func: "tanh⁻¹", tooltip: "Hyperbolic Arctangent" }
    : { func: "tanh", tooltip: "Hyperbolic Tangent" },
  { func: "π", tooltip: "Pi" },
  { func: "Rand", tooltip: "Random Number" },
];

export default function BasicCalculator() {
  const [expression, setExpression] = useState("");
  const [displayValue, setDisplayValue] = useState("0");
  const [isNewNumber, setIsNewNumber] = useState(true);
  const [justEvaluated, setJustEvaluated] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [memory, setMemory] = useState(0);
  const [isRadians, setIsRadians] = useState(false);
  const [isInverse, setIsInverse] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [randomValue, setRandomValue] = useState(0);

  useEffect(() => {
    // Generate random number only on the client to avoid hydration issues
    setRandomValue(Math.random());
  }, []);

  const scientificButtons = useMemo(
    () => getScientificButtonLayout(isInverse),
    [isInverse],
  );

  const factorial = (n: number): number => {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    if (n > 170) return Infinity;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const resetCalculator = useCallback(() => {
    setExpression("");
    setDisplayValue("0");
    setIsNewNumber(true);
    setJustEvaluated(false);
  }, []);

  const handleOperator = useCallback(
    (op: string) => {
      if (justEvaluated) {
        setExpression(displayValue + op);
        setJustEvaluated(false);
      } else if (isNewNumber) {
        // If the last thing typed was an operator, replace it
        setExpression((prev) => prev.slice(0, -1) + op);
      } else {
        const newExpression = expression + displayValue;
        const result = evaluateExpression(newExpression);
        setDisplayValue(result);
        setExpression(result + op);
      }
      setIsNewNumber(true);
    },
    [displayValue, expression, justEvaluated],
  );

  const evaluateExpression = (expr: string): string => {
    try {
      if (!expr) return "0";
      // Replace custom operators for evaluation
      const sanitizedExpr = expr.replace(/‑/g, "-");

      // Super basic safe evaluation. Avoids `eval`.
      // For a real app, use a proper parsing library like `mathjs`.
      if (/[^0-9+\-*/.() ]/g.test(sanitizedExpr)) {
        return "Error";
      }

      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${sanitizedExpr}`)();

      if (result === undefined || !isFinite(result)) {
        return "Error";
      }
      // Format to a reasonable precision
      return parseFloat(result.toPrecision(15)).toString();
    } catch {
      return "Error";
    }
  };

  const handleEquals = useCallback(() => {
    const fullExpression = (expression + displayValue).replace(/‑/g, "-");

    if (fullExpression === "12082007+19112005") {
      setDisplayValue("I ❤️ You");
      setExpression("");
      setIsCelebrating(true);
      setTimeout(() => setIsCelebrating(false), 6000);
      setJustEvaluated(true);
      return;
    }

    const result = evaluateExpression(fullExpression);
    setDisplayValue(result);
    setExpression("");
    setIsNewNumber(true);
    setJustEvaluated(true);
  }, [expression, displayValue]);

  const handleInput = useCallback(
    (input: string) => {
      if (displayValue === "I ❤️ You") {
        resetCalculator();
        return;
      }
      if (displayValue === "Error") {
        resetCalculator();
        if (input === "AC") return;
      }

      const operators = ["/", "*", "-", "+"];
      if (operators.includes(input)) {
        handleOperator(input);
        return;
      }

      switch (input) {
        case "AC":
          resetCalculator();
          break;
        case "=":
          handleEquals();
          break;
        case ".":
          if (justEvaluated) {
            setDisplayValue("0.");
            setJustEvaluated(false);
          } else if (!displayValue.includes(".")) {
            setDisplayValue((prev) => prev + ".");
          }
          setIsNewNumber(false);
          break;
        case "Backspace":
          if (justEvaluated) {
            resetCalculator();
          } else {
            setDisplayValue((prev) =>
              prev.length > 1 ? prev.slice(0, -1) : "0",
            );
          }
          break;
        case "+/-":
          setDisplayValue((prev) => (parseFloat(prev) * -1).toString());
          break;
        case "%":
          setDisplayValue((prev) => (parseFloat(prev) / 100).toString());
          break;
        default: // Digit input
          if (isNewNumber) {
            setDisplayValue(input);
            setIsNewNumber(false);
          } else {
            setDisplayValue((prev) =>
              prev === "0" ? input : prev + input,
            );
          }
          setJustEvaluated(false);
          break;
      }
    },
    [
      displayValue,
      isNewNumber,
      justEvaluated,
      resetCalculator,
      handleOperator,
      handleEquals,
    ],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      const { key } = event;
      const operators = ["/", "*", "-", "+"];

      if (/[0-9.]/.test(key)) handleInput(key);
      else if (operators.includes(key)) handleInput(key);
      else if (key === "Enter" || key === "=") handleInput("=");
      else if (key === "Backspace") handleInput("Backspace");
      else if (key === "Escape") handleInput("AC");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleInput]);

  const handleScientificInput = (func: string) => {
    if (displayValue === "Error" && func !== "AC") return;

    const value = parseFloat(displayValue);
    const angleToRad = (angle: number) =>
      isRadians ? angle : angle * (Math.PI / 180);
    const radToAngle = (rad: number) =>
      isRadians ? rad : rad * (180 / Math.PI);

    try {
      let result;
      switch (func) {
        case "2nd":
          setIsInverse(!isInverse);
          return;
        case "x²":
          result = Math.pow(value, 2);
          break;
        case "x³":
          result = Math.pow(value, 3);
          break;
        case "eˣ":
          result = Math.exp(value);
          break;
        case "10ˣ":
          result = Math.pow(10, value);
          break;
        case "x!":
          result = factorial(value);
          break;
        case "¹/x":
          result = 1 / value;
          break;
        case "²√x":
          if (value < 0) throw new Error("Invalid input");
          result = Math.sqrt(value);
          break;
        case "³√x":
          result = Math.cbrt(value);
          break;
        case "ln":
          if (value <= 0) throw new Error("Invalid input");
          result = Math.log(value);
          break;
        case "log₁₀":
          if (value <= 0) throw new Error("Invalid input");
          result = Math.log10(value);
          break;
        case "log₂":
          if (value <= 0) throw new Error("Invalid input");
          result = Math.log2(value);
          break;
        case "sin":
          result = Math.sin(angleToRad(value));
          break;
        case "cos":
          result = Math.cos(angleToRad(value));
          break;
        case "tan":
          if (
            isRadians
              ? (value / Math.PI - 0.5) % 1 === 0
              : (value / 90 - 1) % 2 === 0
          )
            throw new Error("Invalid input");
          result = Math.tan(angleToRad(value));
          break;
        case "sin⁻¹":
          if (value < -1 || value > 1)
            throw new Error("Input must be between -1 and 1");
          result = radToAngle(Math.asin(value));
          break;
        case "cos⁻¹":
          if (value < -1 || value > 1)
            throw new Error("Input must be between -1 and 1");
          result = radToAngle(Math.acos(value));
          break;
        case "tan⁻¹":
          result = radToAngle(Math.atan(value));
          break;
        case "e":
          result = Math.E;
          break;
        case "π":
          result = Math.PI;
          break;
        case "Rand":
          result = randomValue;
          break;
        case "mc":
          setMemory(0);
          return;
        case "m+":
          setMemory((prev) => prev + value);
          return;
        case "m-":
          setMemory((prev) => prev - value);
          return;
        case "mr":
          setDisplayValue(memory.toString());
          return;
        case "Rad":
          setIsRadians(true);
          return;
        case "deg":
          setIsRadians(false);
          return;
        default:
          setDisplayValue(func);
          return;
      }
      if (result !== undefined && isFinite(result)) {
        setDisplayValue(result.toString());
      } else {
        setDisplayValue("Error");
      }
    } catch (e) {
      setDisplayValue("Error");
    }
    setIsNewNumber(true);
  };

  const renderDisplay = () => (
    <div
      className="h-28 p-4 bg-muted/50 dark:bg-neutral-800 border-b border-border/10 rounded-t-xl flex flex-col justify-end items-end overflow-hidden"
      aria-label="Calculator display"
    >
      <div className="text-xl text-muted-foreground h-1/3 truncate w-full text-right">
        {expression}
      </div>
      <div className="h-2/3 w-full flex items-end justify-end">
        <div
          aria-live="polite"
          className={cn(
            "w-full text-right font-mono text-5xl",
            displayValue === "I ❤️ You" && "text-pink-500",
          )}
        >
          {displayValue}
        </div>
      </div>
    </div>
  );

  const renderBasicButtons = () => (
    <div className="grid grid-cols-4 gap-3 p-4">
      <Button
        onClick={() => handleInput("AC")}
        variant="outline"
        className="bg-accent/80 hover:bg-accent/90 text-accent-foreground h-16 text-xl rounded-xl"
      >
        AC
      </Button>
      <div className="flex items-center justify-center">
        <Button
          onClick={() => handleInput("Backspace")}
          aria-label="Backspace"
          variant="outline"
          size="icon"
          className="bg-accent/80 hover:bg-accent/90 text-accent-foreground h-16 w-16 text-xl rounded-xl"
        >
          <Delete />
        </Button>
      </div>
      <Button
        onClick={() => handleInput("%")}
        variant="outline"
        className="bg-accent/80 hover:bg-accent/90 text-accent-foreground h-16 text-xl rounded-xl"
      >
        %
      </Button>
      <Button
        onClick={() => handleInput("/")}
        variant="default"
        className="bg-primary/90 hover:bg-primary text-primary-foreground h-16 text-2xl rounded-xl"
      >
        ÷
      </Button>
      <Button
        onClick={() => handleInput("7")}
        variant="outline"
        className="h-16 text-2xl rounded-xl"
      >
        7
      </Button>
      <Button
        onClick={() => handleInput("8")}
        variant="outline"
        className="h-16 text-2xl rounded-xl"
      >
        8
      </Button>
      <Button
        onClick={() => handleInput("9")}
        variant="outline"
        className="h-16 text-2xl rounded-xl"
      >
        9
      </Button>
      <Button
        onClick={() => handleInput("*")}
        variant="default"
        className="bg-primary/90 hover:bg-primary text-primary-foreground h-16 text-2xl rounded-xl"
      >
        ×
      </Button>
      <Button
        onClick={() => handleInput("4")}
        variant="outline"
        className="h-16 text-2xl rounded-xl"
      >
        4
      </Button>
      <Button
        onClick={() => handleInput("5")}
        variant="outline"
        className="h-16 text-2xl rounded-xl"
      >
        5
      </Button>
      <Button
        onClick={() => handleInput("6")}
        variant="outline"
        className="h-16 text-2xl rounded-xl"
      >
        6
      </Button>
      <Button
        onClick={() => handleInput("-")}
        variant="default"
        className="bg-primary/90 hover:bg-primary text-primary-foreground h-16 text-2xl rounded-xl"
      >
        -
      </Button>
      <Button
        onClick={() => handleInput("1")}
        variant="outline"
        className="h-16 text-2xl rounded-xl"
      >
        1
      </Button>
      <Button
        onClick={() => handleInput("2")}
        variant="outline"
        className="h-16 text-2xl rounded-xl"
      >
        2
      </Button>
      <Button
        onClick={() => handleInput("3")}
        variant="outline"
        className="h-16 text-2xl rounded-xl"
      >
        3
      </Button>
      <Button
        onClick={() => handleInput("+")}
        variant="default"
        className="bg-primary/90 hover:bg-primary text-primary-foreground h-16 text-2xl rounded-xl"
      >
        +
      </Button>
      <Button
        onClick={() => handleInput("0")}
        variant="outline"
        className="h-16 text-2xl col-span-2 rounded-xl"
      >
        0
      </Button>
      <Button
        onClick={() => handleInput(".")}
        variant="outline"
        className="h-16 text-2xl rounded-xl"
      >
        .
      </Button>
      <Button
        onClick={() => handleInput("=")}
        variant="default"
        className="bg-primary hover:bg-primary/90 h-16 text-2xl rounded-xl"
      >
        =
      </Button>
    </div>
  );

  const renderScientificButtons = () => (
    <div className="grid grid-cols-6 gap-2 p-4">
      {scientificButtons
        .concat(
          isRadians
            ? { func: "deg", tooltip: "Switch to Degrees" }
            : { func: "Rad", tooltip: "Switch to Radians" },
        )
        .map(({ func, tooltip, active }) => (
          <Tooltip key={func}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => handleScientificInput(func)}
                className={cn(
                  "h-12 text-sm",
                  active &&
                    "bg-primary/80 text-primary-foreground hover:bg-primary",
                )}
              >
                {func}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
    </div>
  );

  return (
    <Card className="max-w-md mx-auto overflow-hidden relative shadow-2xl rounded-2xl border border-border/10 bg-muted/20 dark:bg-neutral-900">
      {isCelebrating && (
        <div className="celebrate absolute inset-0 pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <Heart
              key={i}
              className="heart absolute"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      )}

      <CardContent className="p-1">
        <Tabs
          defaultValue="basic"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="sci">Scientific</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-2">
            {renderDisplay()}
            {renderBasicButtons()}
          </TabsContent>

          <TabsContent value="sci" className="mt-2">
            {renderDisplay()}
            <TooltipProvider>
              {renderScientificButtons()}
            </TooltipProvider>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
