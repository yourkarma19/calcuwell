import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutLeanBodyMassCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Lean Body Mass (LBM)</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The Lean Body Mass (LBM) Calculator estimates the total weight of your body minus all the weight from fat mass. LBM is a crucial component of your overall body composition and includes the weight of your bones, muscles, organs, skin, and body water. This calculator uses the Boer formula, a widely recognized estimation method based on weight and height.</p>
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Select your **Gender**.</li>
                    <li>Enter your **Weight** in kilograms (kg).</li>
                    <li>Enter your **Height** in centimeters (cm).</li>
                </ol>
                <p>The calculator will instantly estimate your LBM and provide an estimated body fat percentage derived from it.</p>
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Why is LBM an important health metric?</AccordionTrigger>
                        <AccordionContent>
                            Tracking LBM is often more useful for assessing health and fitness than tracking body weight alone. A standard scale doesn't differentiate between fat loss and muscle loss. By monitoring your LBM, you can better understand if your fitness and diet plan is helping you lose fat while preserving or gaining muscle, which is crucial for a healthy metabolism and overall strength.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How is LBM different from BMI?</AccordionTrigger>
                        <AccordionContent>
                            LBM and BMI (Body Mass Index) measure different aspects of your body. BMI is a simple ratio of your weight to your height and is used as a general screening tool for weight categories. However, BMI can't distinguish between fat and muscle. LBM, on the other hand, specifically focuses on your non-fat mass, providing a clearer picture of your body composition. An athlete might have a high BMI due to muscle mass but a healthy LBM and low body fat percentage.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger>How accurate is this LBM estimate?</AccordionTrigger>
                        <AccordionContent>
                            This calculator uses the Boer formula, which provides a reliable estimate for most people. However, it is still an estimation. Factors like genetics, age, and individual body composition can cause variations. The most accurate methods for measuring body composition, like a DEXA scan, require specialized equipment and are performed in a clinical setting. This tool is best used as a convenient way to track progress over time.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}