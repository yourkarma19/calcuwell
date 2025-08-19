
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
                <p>The BMR Calculator estimates the number of calories your body burns at complete rest to perform its most basic, life-sustaining functions. Think of it as the energy your body would need if you were to stay in bed all day. Knowing your BMR is the crucial first step in determining your Total Daily Energy Expenditure (TDEE), which is essential for effective weight management.</p>
                
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter your **Age**, **Gender**, **Height** (in cm), and **Weight** (in kg).</li>
                </ol>
                <p>The calculator will instantly estimate your BMR using the Mifflin-St Jeor equation, which is widely regarded as one of the most accurate formulas for most people.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is the difference between BMR and TDEE?</AccordionTrigger>
                    <AccordionContent>
                        BMR is the calories you burn at complete rest. **Total Daily Energy Expenditure (TDEE)** is the total calories you burn in a 24-hour period, including all activities. TDEE is calculated by multiplying your BMR by an activity factor. Find your TDEE with our <a href="/calculators/calorie-needs-calculator" className="text-primary underline">Calorie Needs Calculator</a>.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>How accurate is the BMR calculation?</AccordionTrigger>
                    <AccordionContent>
                    The Mifflin-St Jeor equation used here provides a very accurate estimate for the majority of the population. However, it is still an estimate. Individual factors such as body composition (muscle vs. fat ratio), genetics, and specific health conditions can cause your actual BMR to vary.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How can I use my BMR for weight loss?</AccordionTrigger>
                    <AccordionContent>
                        Your BMR is your metabolic baseline. To lose weight, you must consume fewer calories than your TDEE (creating a caloric deficit). Knowing your BMR helps you understand the minimum energy your body requires, ensuring you create a healthy and sustainable diet plan without cutting calories too drastically.
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
