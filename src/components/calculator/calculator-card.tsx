"use client";
import Link from "next/link";
import { IconWrapper } from "@/components/IconWrapper";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Calculator } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CalculatorCardProps {
  calculator: Omit<Calculator, "component">;
}

export default function CalculatorCard({ calculator }: CalculatorCardProps) {
  return (
    <Link
      href={`/calculators/${calculator.slug}`}
      className={cn(
        "block h-full rounded-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <IconWrapper
                iconName={calculator.iconName}
                className="w-6 h-6 text-primary"
              />
            </div>
            <div className="flex-1">
              <CardTitle className="font-headline group-hover:text-primary transition-colors">
                {calculator.name}
              </CardTitle>
              <CardDescription>{calculator.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
