
"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function AboutBasicCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Calculator</CardTitle>
        <CardDescription>
          This calculator includes both basic math and advanced scientific
          functions to suit all your needs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Use the tabs to switch between the "Basic" and "Scientific" modes.
          The scientific mode lets you work with trigonometric functions,
          logarithms, and more.
        </p>
      </CardContent>
    </Card>
  );
}
