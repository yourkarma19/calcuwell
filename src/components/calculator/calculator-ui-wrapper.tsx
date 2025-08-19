
import React from 'react';
import ExportShareControls from './export-share-controls';

interface CalculatorUIWrapperProps {
  inputCard: React.ReactNode;
  resultsCard: React.ReactNode;
  shareParams: Record<string, string>;
  elementIds: string[];
}

export default function CalculatorUIWrapper({
  inputCard,
  resultsCard,
  shareParams,
  elementIds,
}: CalculatorUIWrapperProps) {
  return (
    <div className="space-y-6">
      {inputCard}
      {resultsCard}
      <ExportShareControls
        elementIds={elementIds}
        shareParams={shareParams}
      />
    </div>
  );
}
