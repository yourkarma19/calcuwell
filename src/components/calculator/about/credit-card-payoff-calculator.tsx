import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutCreditCardPayoffCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About the Credit Card Payoff Calculator</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <p>
          The Credit Card Payoff Calculator helps you understand how long it
          will take to pay off your credit card balance based on your current
          monthly payment. It also reveals the total amount of interest you will
          pay, highlighting the true cost of carrying debt. This tool is
          essential for creating a debt-reduction strategy.
        </p>
        <h3>How to Use the Calculator</h3>
        <ol>
          <li>Enter your current **Card Balance**.</li>
          <li>Input your card&apos;s annual interest rate (**APR**).</li>
          <li>Enter your planned **Monthly Payment**.</li>
        </ol>
        <p>
          The calculator will instantly show you how many months it will take to
          be debt-free and the total interest you will have paid.
        </p>
        <h3>Frequently Asked Questions (FAQs)</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Why does it take so long to pay off credit card debt?
            </AccordionTrigger>
            <AccordionContent>
              Credit card interest is compounded, meaning you pay interest on
              your interest. Because APRs are typically high, making only the
              minimum payment can result in a very long payoff period and a
              large amount of total interest paid.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What happens if my payment is too low?
            </AccordionTrigger>
            <AccordionContent>
              If your monthly payment is less than or equal to the interest that
              accrues each month, you will never pay off the debt. The
              calculator will show an error in this case, indicating you need to
              increase your payment.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How can I pay off my debt faster?
            </AccordionTrigger>
            <AccordionContent>
              The most effective way is to pay more than the minimum payment
              each month. Even small extra payments can significantly reduce the
              time and total interest. You can also look into balance transfer
              cards with a 0% introductory APR or debt consolidation loans to
              lower your interest rate.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
