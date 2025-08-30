
"use client";

import { useMemo } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/utils";


export default function PetCareCostCalculator() {
  const [petType, setPetType] = usePersistentState<"dog" | "cat">("pcc-petType", "dog");
  const [foodCost, setFoodCost] = usePersistentState("pcc-foodCost", 50);
  const [vetVisits, setVetVisits] = usePersistentState("pcc-vetVisits", 2);
  const [vetCostPerVisit, setVetCostPerVisit] = usePersistentState("pcc-vetCost", 100);
  const [groomingCost, setGroomingCost] = usePersistentState("pcc-groomingCost", 200);
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
    ].filter(item => item.value > 0);

    return { yearlyCost: yearly, monthlyCost: monthly, chartData: data };
  }, [foodCost, vetVisits, vetCostPerVisit, groomingCost, miscCost]);
  

  return (
    <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pet Care Cost Estimator</CardTitle>
            <CardDescription>Estimate the yearly and monthly costs of owning a pet. All costs are estimates and can vary widely.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Pet Type</Label>
              <RadioGroup value={petType} onValueChange={v => setPetType(v as "dog" | "cat")} className="flex items-center space-x-4 pt-2">
                <div className="flex items-center space-x-2"><RadioGroupItem value="dog" id="dog" /><Label htmlFor="dog">Dog</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="cat" id="cat" /><Label htmlFor="cat">Cat</Label></div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="food">Monthly Food Cost</Label>
              <Input id="food" type="number" value={foodCost} onChange={e => setFoodCost(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label htmlFor="vet-visits">Annual Vet Visits</Label><Input id="vet-visits" type="number" value={vetVisits} onChange={e => setVetVisits(Number(e.target.value))} /></div>
              <div className="space-y-2"><Label htmlFor="vet-cost">Cost per Visit</Label><Input id="vet-cost" type="number" value={vetCostPerVisit} onChange={e => setVetCostPerVisit(Number(e.target.value))} /></div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="grooming">Annual Grooming Cost</Label>
              <Input id="grooming" type="number" value={groomingCost} onChange={e => setGroomingCost(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="misc">Monthly Miscellaneous (toys, treats, etc.)</Label>
              <Input id="misc" type="number" value={miscCost} onChange={e => setMiscCost(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle>Estimated Costs</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Yearly Cost</p>
                    <p className="text-3xl font-bold font-headline text-primary">{formatCurrency(yearlyCost)}</p>
                </div>
                 <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Average Monthly Cost</p>
                    <p className="text-3xl font-bold font-headline">{formatCurrency(monthlyCost)}</p>
                </div>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader><CardTitle>The True Cost of Owning a Pet</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Bringing a pet into your life is a joyful experience, but it&apos;s also a significant financial commitment. Our **Pet Care Cost Calculator** helps you estimate the monthly and yearly expenses associated with owning a pet. By planning ahead, you can ensure you&apos;re financially prepared to give your furry friend the best care possible.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Start by selecting your **Pet Type**.</li>
                    <li>Enter your estimated **Monthly Food Cost**.</li>
                    <li>Provide your yearly estimates for **Veterinary Care** (number of visits and average cost) and **Grooming**.</li>
                    <li>Add a monthly amount for **Miscellaneous** costs like toys, treats, and bedding.</li>
                </ol>
                <p>The calculator will instantly display your total estimated yearly and average monthly costs, helping you budget effectively.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What are some hidden costs of pet ownership?</AccordionTrigger>
                        <AccordionContent>
                            Beyond the obvious costs like food, remember to budget for potential emergency vet visits, pet insurance, boarding or pet-sitting fees if you travel, and replacing items like toys, beds, and leashes.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How can I save money on pet care?</AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc pl-5 mt-2">
                                <li>**Buy food in bulk:** Larger bags are often cheaper per kilogram.</li>
                                <li>**Prioritize preventative care:** Regular vet check-ups and vaccinations can prevent more expensive health issues later.</li>
                                <li>**DIY grooming:** Learn to do basic grooming like brushing and nail trimming at home.</li>
                                <li>**Consider pet insurance:** While it&apos;s a monthly cost, it can protect you from large, unexpected vet bills.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Does the cost vary much by breed?</AccordionTrigger>
                        <AccordionContent>
                           Yes, significantly. Larger dog breeds eat more food. Some breeds are prone to specific health issues, which can lead to higher vet bills. Long-haired breeds may require more frequent and expensive grooming. It&apos;s a good idea to research the specific needs of a breed before bringing one home.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    </div>
  );
}
