import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Calculator } from "@/lib/types";
import { icons } from "lucide-react";


interface CalculatorCardProps {
  calculator: Omit<Calculator, 'component'>;
}

export default function CalculatorCard({ calculator }: CalculatorCardProps) {
  const LucideIcon = icons[calculator.iconName as keyof typeof icons] || icons.Calculator;

  return (
    <Link href={`/calculators/${calculator.slug}`} className="block h-full">
      <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <LucideIcon className="w-6 h-6 text-primary" />
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
