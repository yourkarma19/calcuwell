
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutVo2MaxCalculator() {
    return (
        <Card>
            <CardHeader>
                <CardTitle as="h2">About VO₂ Max</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>This tool gives you an estimate of your VO₂ max. This is a key measure of your aerobic fitness. It shows how well your body can take in, transport, and use oxygen during intense exercise. A higher VO₂ max usually means better cardiovascular health and greater endurance. It is considered the gold standard for measuring cardiorespiratory fitness.</p>

                <h3>How to Use the VO₂ Max Estimator</h3>
                <p>This calculator uses a non-exercise method (the Uth-Sørensen-Overgaard-Pedersen formula) to estimate your VO₂ max. It's a convenient way to get a general idea of your fitness level without needing lab equipment. Simply enter your age and your resting heart rate. Your resting heart rate is your pulse when you are completely calm and relaxed, ideally measured right after waking up.</p>
                
                <h3>VO₂ Max FAQs</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is VO₂ max?</AccordionTrigger>
                        <AccordionContent>
                            VO₂ max stands for maximal oxygen uptake. It is the maximum amount of oxygen your body can effectively use during one minute of strenuous exercise. It's measured in milliliters of oxygen used per kilogram of body weight per minute (mL/kg/min). Elite endurance athletes are known for having very high VO₂ max values.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How accurate is this estimate?</AccordionTrigger>
                        <AccordionContent>
                           This formula provides a general estimate without needing exercise, making it very accessible. However, it's not as accurate as a clinical stress test done in a lab, which directly measures oxygen consumption. Factors like genetics, specific types of training, and altitude can affect your true VO₂ max. Think of this result as a useful starting point, not a definitive medical value.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How can I improve my VO₂ max?</AccordionTrigger>
                        <AccordionContent>
                          You can significantly improve your VO₂ max with consistent and structured aerobic exercise. High-Intensity Interval Training (HIIT) is particularly effective. This involves short bursts of intense effort (working at 80-90% of your maximum heart rate) followed by brief recovery periods. Long, steady-state cardio sessions, like running or cycling, also contribute to improving your aerobic base and VO₂ max over time.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
