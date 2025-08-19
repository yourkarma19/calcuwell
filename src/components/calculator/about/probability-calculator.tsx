import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutProbabilityCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About the Probability Calculator</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The **Probability Calculator** provides a simple way to compute the likelihood of different outcomes. Probability is a fundamental concept in mathematics and statistics that helps us quantify uncertainty. This tool allows you to calculate the probability of a single event (and its opposite) or the combined probability of two independent events happening.</p>
                
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Select the **Mode**: choose between "Single Event" or "Two Independent Events".</li>
                    <li>Enter the probability for **Event A** (a number between 0 and 1).</li>
                    <li>If you chose "Two Independent Events", also enter the probability for **Event B**.</li>
                </ol>
                <p>The calculator will instantly display the relevant probabilities, such as the probability of "not A," "A and B," and "A or B."</p>

                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>The Basic Formula for Probability Explained</AccordionTrigger>
                        <AccordionContent>
                            Probability is calculated by dividing the number of desired outcomes by the total number of possible outcomes. For example, the probability of rolling a 4 on a six-sided die is 1 (favorable outcome) divided by 6 (total outcomes), which is 1/6 or approximately 0.167.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What do 'P(A and B)' and 'P(A or B)' mean?</AccordionTrigger>
                        <AccordionContent>
                           <p className="mb-2"><strong>P(A and B)</strong> is the probability that both independent events A and B occur. It's calculated by multiplying their individual probabilities: `P(A) * P(B)`.</p>
                           <p><strong>P(A or B)</strong> is the probability that either event A, event B, or both events occur. It's calculated with the formula: `P(A) + P(B) - P(A and B)`.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Understanding Independent and Dependent Events</AccordionTrigger>
                        <AccordionContent>
                           An **independent event** is one where the outcome is not affected by previous events (e.g., a coin flip). A **dependent event** is one where the outcome is influenced by a previous event (e.g., drawing a card from a deck without replacement). This calculator deals with independent events.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-4">
                        <AccordionTrigger>What is the probability of an impossible event?</AccordionTrigger>
                        <AccordionContent>
                           The probability of an event that can never happen is 0. For example, the probability of rolling a 7 on a standard six-sided die is 0. Conversely, the probability of an event that is certain to happen is 1.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}

    