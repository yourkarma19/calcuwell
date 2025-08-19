import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPetCareCostCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>The True Cost of Owning a Pet</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>Bringing a pet into your life is a joyful experience, but it's also a significant financial commitment. Our **Pet Care Cost Calculator** helps you estimate the monthly and yearly expenses associated with owning a pet. By planning ahead, you can ensure you're financially prepared to give your furry friend the best care possible.</p>
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
                                <li>**Consider pet insurance:** While it's a monthly cost, it can protect you from large, unexpected vet bills.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Does the cost vary much by breed?</AccordionTrigger>
                        <AccordionContent>
                           Yes, significantly. Larger dog breeds eat more food. Some breeds are prone to specific health issues, which can lead to higher vet bills. Long-haired breeds may require more frequent and expensive grooming. It's a good idea to research the specific needs of a breed before bringing one home.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}

    