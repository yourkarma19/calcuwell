"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import usePersistentState from "@/hooks/use-persistent-state";
import { formatCurrency } from "@/lib/utils";

export default function PetCareCostCalculator() {
  const [petType, setPetType] = usePersistentState<"dog" | "cat">(
    "pcc-petType",
    "dog",
  );
  const [foodCost, setFoodCost] = usePersistentState("pcc-foodCost", 50);
  const [vetVisits, setVetVisits] = usePersistentState("pcc-vetVisits", 2);
  const [vetCostPerVisit, setVetCostPerVisit] = usePersistentState(
    "pcc-vetCost",
    100,
  );
  const [groomingCost, setGroomingCost] = usePersistentState(
    "pcc-groomingCost",
    200,
  );
  const [miscCost, setMiscCost] = usePersistentState("pcc-miscCost", 20);

  const { yearlyCost, monthlyCost, chartData } = useMemo(() => {
    const annualFood = foodCost * 12;
    const annualVet = vetVisits * vetCostPerVisit;
    const annualMisc = miscCost * 12;

    const yearly = annualFood + annualVet + groomingCost + annualMisc;
    const monthly = yearly / 12;

    const data = [
      { name: "Food", value: annualFood, fill: "hsl(var(--chart-1))" },
      { name: "Veterinary", value: annualVet, fill: "hsl(var(--chart-2))" },
      { name: "Grooming", value: groomingCost, fill: "hsl(var(--chart-3))" },
      { name: "Miscellaneous", value: annualMisc, fill: "hsl(var(--chart-4))" },
    ].filter((item) => item.value > 0);

    return { yearlyCost: yearly, monthlyCost: monthly, chartData: data };
  }, [foodCost, vetVisits, vetCostPerVisit, groomingCost, miscCost]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pet Care Cost Estimator</CardTitle>
          <CardDescription>
            Estimate the yearly and monthly costs of owning a pet. All costs are
            estimates and can vary widely.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Pet Type</Label>
            <RadioGroup
              value={petType}
              onValueChange={(v) => setPetType(v as "dog" | "cat")}
              className="flex items-center space-x-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dog" id="dog" />
                <Label htmlFor="dog">Dog</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cat" id="cat" />
                <Label htmlFor="cat">Cat</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="food">Monthly Food Cost</Label>
            <Input
              id="food"
              type="number"
              value={foodCost}
              onChange={(e) => setFoodCost(Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vet-visits">Annual Vet Visits</Label>
              <Input
                id="vet-visits"
                type="number"
                value={vetVisits}
                onChange={(e) => setVetVisits(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vet-cost">Cost per Visit</Label>
              <Input
                id="vet-cost"
                type="number"
                value={vetCostPerVisit}
                onChange={(e) => setVetCostPerVisit(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="grooming">Annual Grooming Cost</Label>
            <Input
              id="grooming"
              type="number"
              value={groomingCost}
              onChange={(e) => setGroomingCost(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="misc">
              Monthly Miscellaneous (toys, treats, etc.)
            </Label>
            <Input
              id="misc"
              type="number"
              value={miscCost}
              onChange={(e) => setMiscCost(Number(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estimated Costs</CardTitle>
        </CardHeader>
        <CardContent
          className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center"
          aria-live="polite"
        >
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Yearly Cost</p>
            <p className="text-3xl font-bold font-headline text-primary">
              {formatCurrency(yearlyCost)}
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Average Monthly Cost
            </p>
            <p className="text-3xl font-bold font-headline">
              {formatCurrency(monthlyCost)}
            </p>
          </div>
        </CardContent>
      </Card>

      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[25rem]">
            <ChartContainer config={{}} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                    }
                  />
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="50%"
                    outerRadius="80%"
                    strokeWidth={2}
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
