"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const bagYields = [
  { weight: "40 lb", yield: "0.30 cu ft (0.011 cu yd)" },
  { weight: "60 lb", yield: "0.45 cu ft (0.017 cu yd)" },
  { weight: "80 lb", yield: "0.60 cu ft (0.022 cu yd)" },
];

export default function AboutConcreteSlabCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">About the Concrete Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <p>
          This calculator helps you estimate the amount of concrete needed for
          your project. It also tells you how many pre-mixed concrete bags to
          buy. This helps you buy the right amount of material without waste.
        </p>
        <h3>How to Use the Concrete Calculator</h3>
        <ol>
          <li>
            Select your **Project Shape** (Slab, Footer, or round Post Hole).
          </li>
          <li>Choose your preferred **Units** of measurement.</li>
          <li>Enter the dimensions for your project.</li>
          <li>Select the **Concrete Bag Weight** you plan to buy.</li>
        </ol>
        <p>
          The calculator will instantly show the total volume of concrete needed
          and the number of bags to buy.
        </p>

        <h3>Concrete Bag Yields</h3>
        <p>
          The amount of concrete a bag gives you depends on its weight. Here are
          some common estimates:
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bag Weight</TableHead>
              <TableHead>Approximate Yield</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bagYields.map((item) => (
              <TableRow key={item.weight}>
                <TableCell>{item.weight}</TableCell>
                <TableCell>{item.yield}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="text-xs text-muted-foreground mt-2">
          Note: Yields can vary by brand. Always check the information on the
          bag.
        </p>
      </CardContent>
    </Card>
  );
}
