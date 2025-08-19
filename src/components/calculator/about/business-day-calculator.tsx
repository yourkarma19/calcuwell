import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutBusinessDayCalculator() {
    return (
        <Card>
          <CardHeader><CardTitle>About Business Days</CardTitle></CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>The **Business Day Calculator** is a specialized tool for anyone who needs to plan around a standard workweek. It allows you to find a future or past date by adding or subtracting a specific number of working days, automatically ignoring weekends (Saturdays and Sundays) to give you a realistic date for business-related tasks.</p>
            <h3>How to Use the Calculator</h3>
            <ol>
              <li>Select the **Start Date** from which you want to calculate.</li>
              <li>Enter the number of **Business Days** you want to add or subtract.</li>
              <li>Click the appropriate button to see the resulting date.</li>
            </ol>
            <p>This is perfect for calculating project deadlines, shipping estimates, and contract timelines.</p>
            <h3>Frequently Asked Questions (FAQs)</h3>
              <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                      <AccordionTrigger>What is the difference between a day and a business day?</AccordionTrigger>
                      <AccordionContent>
                          A regular day is any day of the week, including weekends. A business day, also known as a working day, specifically refers to a typical day of work, which is usually Monday through Friday. This calculator automatically skips Saturdays and Sundays in its calculation.
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                      <AccordionTrigger>Why is this calculation important?</AccordionTrigger>
                      <AccordionContent>
                          This calculation is critical for business operations, especially in logistics, finance, and legal contracts. It helps set accurate expectations for delivery dates, payment schedules, and project deadlines that must fall on official working days to be met.
                      </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-3">
                      <AccordionTrigger>Does this tool account for holidays?</AccordionTrigger>
                      <AccordionContent>
                         No, the calculator does not account for public holidays because they can vary by country, state, and even by industry. To get the most accurate date, you would need to manually add extra days for any public holidays that fall within your calculated period.
                      </AccordionContent>
                  </AccordionItem>
              </Accordion>
          </CardContent>
        </Card>
    )
}
