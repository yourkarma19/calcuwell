import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const commonFractions = [
    { fraction: "1/2", percentage: "50%" },
    { fraction: "1/3", percentage: "33.33%" },
    { fraction: "1/4", percentage: "25%" },
    { fraction: "1/5", percentage: "20%" },
    { fraction: "1/8", percentage: "12.5%" },
    { fraction: "3/4", percentage: "75%" },
];

export default function AboutFractionToPercentageCalculator() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader><CardTitle>Converting Fractions to Percentages</CardTitle></CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>This calculator provides a simple way to convert any fraction into its equivalent percentage. This is a fundamental math skill useful in various contexts, from interpreting statistics to understanding discounts. The concept is straightforward: a percentage is simply a fraction with a denominator of 100.</p>
                    <h3>How to Use the Calculator</h3>
                    <ol>
                        <li>Enter the **Numerator** (the top number of the fraction).</li>
                        <li>Enter the **Denominator** (the bottom number of the fraction).</li>
                        <li>The calculator will instantly show the result as a percentage.</li>
                    </ol>
                    <h3>The Formula</h3>
                    <p>The conversion is done using a simple formula:</p>
                    <p className="font-mono bg-muted p-2 rounded-md text-center">Percentage = (Numerator / Denominator) × 100</p>
                    <p>First, the fraction is converted into a decimal by dividing the numerator by the denominator. Then, this decimal is multiplied by 100 to express it as a percentage.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Common Fraction to Percentage Conversions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fraction</TableHead>
                                <TableHead>Percentage</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {commonFractions.map((item) => (
                                <TableRow key={item.fraction}>
                                    <TableCell>{item.fraction}</TableCell>
                                    <TableCell>{item.percentage}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
