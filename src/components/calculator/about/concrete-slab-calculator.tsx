import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const bagYields = [
  { weight: "40 lb", yield: "0.30 cu ft (0.011 cu yd)" },
  { weight: "60 lb", yield: "0.45 cu ft (0.017 cu yd)" },
  { weight: "80 lb", yield: "0.60 cu ft (0.022 cu yd)" },
];

export default function AboutConcreteSlabCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Concrete Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>This calculator helps you estimate the volume of concrete needed for your project and how many pre-mixed concrete bags to buy. It's an essential tool for any DIY or professional construction project, ensuring you purchase the right amount of material without waste.</p>
                <h3>How to Use It</h3>
                <ol>
                    <li>Select your **Project Shape** (Slab, Footer, or round Post Hole).</li>
                    <li>Choose your preferred **Units** of measurement.</li>
                    <li>Enter the dimensions for your project.</li>
                    <li>Select the **Concrete Bag Weight** you plan to purchase.</li>
                </ol>
                <p>The calculator will instantly provide the total volume of concrete needed (in cubic yards) and the number of bags to buy.</p>
                
                <h3>Concrete Bag Yields</h3>
                <p>The amount of concrete a bag yields depends on its weight. Here are some common estimates:</p>
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
                <p className="text-xs text-muted-foreground mt-2">Note: Yields can vary slightly by manufacturer. Always check the information on the bag.</p>
            </CardContent>
        </Card>
    );
}
  
