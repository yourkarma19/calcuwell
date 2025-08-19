import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutRetirementCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>About Retirement Planning</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The **Retirement Calculator** is a crucial financial planning tool that helps you estimate whether you are on track to meet your long-term savings goals. By inputting your current age, savings, contributions, and expected returns, you can get a clear projection of your financial future. This allows you to make informed decisions today to ensure a comfortable and secure retirement tomorrow.</p>

                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter your **Current Age** and your desired **Retirement Age**.</li>
                    <li>Input your **Current Savings** and the **Monthly Contribution** you plan to make.</li>
                    <li>Adjust the estimated **Annual Interest Rate** your investments might earn.</li>
                    <li>Set your **Desired Annual Retirement Income** and your **Life Expectancy**.</li>
                </ol>
                <p>The calculator will instantly show your projected savings, your savings goal, and whether you are on track to meet it.</p>
                
                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Why is it important to start saving early?</AccordionTrigger>
                        <AccordionContent>
                            Starting early is the most powerful factor in retirement saving because of compound interest. The longer your money is invested, the more time it has to grow, with your earnings generating their own earnings. Even small, regular contributions can grow into a large sum over several decades.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What is the 4% Rule?</AccordionTrigger>
                        <AccordionContent>
                            The 4% rule is a guideline for retirees that suggests you can safely withdraw 4% of your savings in your first year of retirement and then adjust that amount for inflation for every subsequent year without running out of money for 30 years. This calculator uses it to estimate your savings goal by multiplying your desired annual income by 25.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What is a "shortfall?"</AccordionTrigger>
                        <AccordionContent>
                           A shortfall is the gap between your estimated savings at retirement and your required savings goal. If this calculator shows a shortfall, it means your current plan is not projected to be enough to fund your desired retirement income. You may need to increase your monthly contributions, work longer, or adjust your retirement income goal.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-4">
                        <AccordionTrigger>What is a realistic interest rate to assume?</AccordionTrigger>
                        <AccordionContent>
                           A realistic long-term interest rate depends on your investment strategy. A conservative portfolio might earn 4-5%, while a more aggressive, stock-heavy portfolio has historically returned 7-10% annually on average, though with higher risk. It's often wise to use a more conservative estimate for planning.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    )
}
