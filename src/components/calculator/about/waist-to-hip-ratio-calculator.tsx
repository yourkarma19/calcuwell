import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const whrCategories = {
    male: [
      { range: "< 0.90", risk: "Low Risk" },
      { range: "0.90 - 1.0", risk: "Moderate Risk" },
      { range: "> 1.0", risk: "High Risk" },
    ],
    female: [
      { range: "< 0.80", risk: "Low Risk" },
      { range: "0.80 - 0.85", risk: "Moderate Risk" },
      { range: "> 0.85", risk: "High Risk" },
    ],
};


export default function AboutWaistToHipRatioCalculator() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>About the Waist-to-Hip Ratio</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>The Waist-to-Hip Ratio (WHR) is a simple measurement used to check for fat distribution. It can give you a general idea of your risk for certain health problems. This calculator quickly finds your WHR and tells you what risk category you fall into based on guidelines from the World Health Organization (WHO).</p>
                    <h3>How to Use It</h3>
                    <p>Select your gender, then enter your waist and hip measurements in centimeters. To measure correctly:</p>
                    <ul>
                        <li>**Waist:** Measure at the narrowest point, usually just above your belly button.</li>
                        <li>**Hip:** Measure at the widest part of your buttocks.</li>
                    </ul>
                    <h3>Frequently Asked Questions</h3>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Why is WHR important?</AccordionTrigger>
                            <AccordionContent>
                                WHR is a simple way to see where you store body fat. People who store more fat around their waist (an "apple" shape) may have a higher risk of health issues like heart disease and type 2 diabetes than those who store fat in their hips and thighs (a "pear" shape).
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is WHR better than BMI?</AccordionTrigger>
                            <AccordionContent>
                                WHR and BMI (Body Mass Index) measure different things. BMI is a general measure of weight relative to height, while WHR tells you about body shape and fat distribution. Both can be useful, but WHR can sometimes give a better idea of cardiovascular risk than BMI alone.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>What do the risk categories mean?</AccordionTrigger>
                            <AccordionContent>
                               The risk categories (Low, Moderate, High) tell you your general level of risk for developing certain health conditions. If you are in the moderate or high-risk category, it may be a good idea to talk to a doctor about steps you can take to improve your health.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>WHR Health Risk Categories (WHO)</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold mb-2">Men</h3>
                         <Table>
                            <TableHeader><TableRow><TableHead>Risk</TableHead><TableHead>Ratio</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {whrCategories.male.map((item) => (
                                    <TableRow key={item.risk}><TableCell>{item.risk}</TableCell><TableCell>{item.range}</TableCell></TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Women</h3>
                         <Table>
                            <TableHeader><TableRow><TableHead>Risk</TableHead><TableHead>Ratio</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {whrCategories.female.map((item) => (
                                    <TableRow key={item.risk}><TableCell>{item.risk}</TableCell><TableCell>{item.range}</TableCell></TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
