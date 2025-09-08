"use client";

import React from "react";
import BasicCalculator from "@/components/calculator/basic-calculator";

export function HomeCalculator() {
  return <BasicCalculator />;
}

// Memoize the component to prevent re-renders when other parts of the homepage update.
// This is a performance best practice for complex, stateful components.
export default React.memo(HomeCalculator);
