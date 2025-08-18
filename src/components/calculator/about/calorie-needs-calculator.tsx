
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function AboutCalorieNeedsCalculator() {
    return (
        <div className="prose dark:prose-invert max-w-none">
            <p>The Daily Calorie Needs calculator estimates how many calories you should eat per day to maintain your current weight. It uses the Mifflin-St Jeor equation, a widely accepted formula.</p>
            <h3>How to Use This Tool</h3>
            <p>To find your daily calorie needs, enter your age, gender, height, weight, and activity level. The calculator will then show an estimate of the calories you need to consume to keep your weight stable.</p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What are maintenance calories?</AccordionTrigger>
              <AccordionContent>
                Maintenance calories are the calories you need to eat each day to maintain your current weight. This calculator estimates that value. It first finds your Basal Metabolic Rate (BMR) and then multiplies it by an activity level factor.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is BMR?</AccordionTrigger>
              <AccordionContent>
                Your Basal Metabolic Rate (BMR) is the number of calories your body needs to perform its most basic functions while at rest, like breathing. You can calculate your BMR with our <a href="/calculators/bmr-calculator" className="text-primary underline">BMR Calculator</a>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I use this for weight loss or gain?</AccordionTrigger>
              <AccordionContent>
                This result is for weight maintenance. To lose weight, you need to eat fewer calories (a caloric deficit). To gain weight or muscle, you need to eat more (a caloric surplus). For specific advice, talk to a healthcare or nutrition professional.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
    )
}
