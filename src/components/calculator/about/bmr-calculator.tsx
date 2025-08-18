
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AboutBmrCalculator() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>About Basal Metabolic Rate (BMR)</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The BMR Calculator estimates the calories your body burns at rest to perform its most basic functions. Think of it as the energy your body would need if you were to stay in bed all day. Knowing your BMR is the first step in find your total daily calorie needs for weight management.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter your **Age**, **Gender**, **Height** (in cm), and **Weight** (in kg).</li>
                </ol>
                <p>The calculator will instantly estimate your BMR using the Mifflin-St Jeor equation. This is a very accurate formula for most people.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is the difference between BMR and TDEE?</AccordionTrigger>
                    <AccordionContent>
                    BMR is the calories you burn at complete rest. **Total Daily Energy Expenditure (TDEE)** is the total calories you burn in a day. TDEE includes your BMR plus calories burned from activity and digestion. Find your TDEE with our <a href="/calculators/calorie-needs-calculator" className="text-primary underline">Calorie Needs Calculator</a>.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How accurate is the BMR calculation?</AccordionTrigger>
                    <AccordionContent>
                    The Mifflin-St Jeor equation used here is a very accurate estimate for most people. However, it's still an estimate. Individual factors like body composition (muscle vs. fat), genes, and health can change your actual BMR.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How can I use my BMR for weight loss?</AccordionTrigger>
                    <AccordionContent>
                    Your BMR is the baseline. To lose weight, you need to eat fewer calories than your Total Daily Energy Expenditure (TDEE). Knowing your BMR helps you understand the minimum energy your body requires. This ensures you don't create an unhealthy diet.
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
