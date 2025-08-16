
"use client";

import { useState } from "react";
import { Lightbulb, Loader2 } from "lucide-react";
import { explainCalculatorFormula } from "@/ai/flows/explain-calculator-formula";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface FormulaExplainerProps {
  calculatorName: string;
  formula: string;
}

export default function FormulaExplainer({
  calculatorName,
  formula,
}: FormulaExplainerProps) {
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleExplain = async () => {
    setIsLoading(true);
    setExplanation("");
    try {
      const result = await explainCalculatorFormula({ calculatorName, formula });
      setExplanation(result.explanation);
    } catch (error) {
      console.error("Failed to get explanation:", error);
      toast({
        title: "Error",
        description: "Could not fetch the explanation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formula</CardTitle>
        <CardDescription>
          Get a simple explanation of the formula used in this calculator.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-mono bg-muted p-3 rounded-md mb-4 break-words">
          {formula}
        </p>
        <Button onClick={handleExplain} disabled={isLoading || formula === "No formula available."} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Lightbulb className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Thinking..." : "Explain Formula"}
        </Button>
        {explanation && (
          <div className="mt-4 text-sm prose prose-sm dark:prose-invert max-w-none">
            <h3 className="font-semibold">Explanation:</h3>
            <p>{explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
