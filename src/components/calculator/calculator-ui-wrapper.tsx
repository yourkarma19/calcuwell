"use client";
import React from "react";
import ExportShareControls from "./export-share-controls";

interface CalculatorUIWrapperProps {
  inputCard: React.ReactNode;
  resultsCard?: React.ReactNode;
  shareParams: Record<string, string>;
  elementIds: string[];
  calculatorName: string;
}

export default function CalculatorUIWrapper({
  inputCard,
  resultsCard,
  shareParams,
  elementIds,
  calculatorName,
}: CalculatorUIWrapperProps) {
  return (
    <div className="space-y-6">
      {inputCard}
      {resultsCard}
      <ExportShareControls
        elementIds={elementIds}
        shareParams={shareParams}
        calculatorName={calculatorName}
      />
    </div>
  );
}
