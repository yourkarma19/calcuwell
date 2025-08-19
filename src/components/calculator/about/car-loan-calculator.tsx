import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutCarLoanCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle as="h2">Car Loan Fundamentals</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
            <p>Our **Car Loan Calculator** is an essential tool for anyone planning to finance a vehicle. It helps you understand the true cost of a car loan by calculating your Equated Monthly Installment (EMI) and showing a full breakdown of the principal versus interest paid. By using this tool, you can budget effectively, compare different loan offers, and make a financially sound decision before stepping into the dealership.</p>
            
            <h2>How to Use the Calculator</h2>
            <ol>
              <li>Enter the total **Car Price** (the on-road price).</li>
              <li>Input your **Down Payment** and the **Trade-in Value** of your old vehicle, if any. These amounts reduce the total loan you need.</li>
              <li>Adjust the **Interest Rate** and **Loan Tenure** (in years) to match the loan offer you have received.</li>
            </ol>
            <p>The calculator will instantly display your monthly payment and show how the total cost is divided between the loan amount and the interest you'll pay over time.</p>
            
            <h2>Frequently Asked Questions (FAQs)</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is an EMI?</AccordionTrigger>
                <AccordionContent>
                  An Equated Monthly Installment (EMI) is the fixed payment amount a borrower makes to a lender each month. It includes both the principal amount and the interest on the loan, ensuring the loan is fully paid off over the specified tenure.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How is the total cost of the car calculated?</AccordionTrigger>
                <AccordionContent>
                  The total cost of the car includes the principal loan amount, all the interest paid over the loan's life, and any initial down payment or trade-in value you provided. It's the complete out-of-pocket expense for the vehicle.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How can I lower my car loan EMI?</AccordionTrigger>
                <AccordionContent>
                   You can lower your EMI by making a larger down payment, which reduces the principal loan amount. Choosing a longer loan tenure will also lower the monthly payment, but be aware that this usually means you will pay more in total interest over the life of the loan. Shopping around for the best interest rate is also crucial.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                  <AccordionTrigger>What other costs should I consider?</AccordionTrigger>
                  <AccordionContent>
                      Beyond the loan, remember to budget for ongoing car ownership costs such as insurance, fuel, regular maintenance, and potential repairs. These are not included in the loan calculation but are a significant part of the total cost of owning a car.
                  </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
    )
}
