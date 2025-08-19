import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutSquareRootCubeRootCalculator() {
    return (
        <Card>
          <CardHeader><CardTitle>About the Root Calculator</CardTitle></CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>The **Square & Cube Root Calculator** is a simple tool for performing two fundamental mathematical operations. It helps you quickly find the square root and cube root of any number, which is useful in a wide range of applications, from basic algebra to complex engineering problems. This calculator handles both positive and negative inputs, correctly identifying real and imaginary roots.</p>
            
            <h3>How to Use the Calculator</h3>
            <p>Simply enter a number into the input field. The calculator will instantly compute and display both the square root and the cube root of the number.</p>
            
            <h3>Frequently Asked Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is a square root?</AccordionTrigger>
                <AccordionContent>
                  A square root of a number is a value that, when multiplied by itself, gives the original number. For example, the square root of 9 is 3, because 3 × 3 = 9. The symbol for square root is √.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What is a cube root?</AccordionTrigger>
                <AccordionContent>
                  A cube root of a number is a value that, when multiplied by itself three times, gives the original number. For example, the cube root of 27 is 3, because 3 × 3 × 3 = 27. The symbol is ∛.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What about the root of a negative number?</AccordionTrigger>
                <AccordionContent>
                  You can find the real cube root of a negative number. For example, the cube root of -8 is -2, because (-2) × (-2) × (-2) = -8. However, you cannot find a real square root for a negative number. The square root of a negative number is an "imaginary number," which this calculator indicates with the symbol 'i'.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What is a "perfect square"?</AccordionTrigger>
                <AccordionContent>
                  A perfect square is an integer that is the square of another integer. For example, 4, 9, and 16 are perfect squares because they are 2², 3², and 4², respectively. Their square roots are whole numbers.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
    )
}

    