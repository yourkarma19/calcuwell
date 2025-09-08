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
        <CardTitle>About the Calculator</CardTitle>
        <CardDescription>
          This versatile calculator includes both basic arithmetic and advanced
          scientific functions to suit all your needs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Use the tabs to switch between the basic and scientific modes. The
          scientific mode includes trigonometric functions, logarithms, and
          more.
        </p>
      </CardContent>
    </Card>
  );
}
