
import { Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PlaceholderCalculator({ setFormula }: { setFormula?: (formula: string) => void; }) {
  return (
    <Card className="col-span-1 lg:col-span-3">
        <CardContent className="flex flex-col items-center justify-center h-64 text-center">
            <Wrench className="w-16 h-16 text-primary mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold font-headline">Loading Calculator...</h2>
            <p className="text-muted-foreground">Please wait a moment.</p>
        </CardContent>
    </Card>
  );
}
