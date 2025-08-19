import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutMatrixCalculator() {
    return (
        <Card>
            <CardHeader><CardTitle>Fundamentals of Matrix Operations</CardTitle></CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
                <p>The **Matrix Calculator** is a tool designed to help you perform basic arithmetic operations on matrices. Matrices are rectangular arrays of numbers that are fundamental in various fields of mathematics, physics, and computer science, especially in areas like linear algebra and computer graphics. This calculator simplifies the process of adding and subtracting 2x2 matrices.</p>
                
                <h3>How to Use the Calculator</h3>
                <ol>
                    <li>Enter the numerical values for each element in **Matrix A** and **Matrix B**.</li>
                    <li>Select the operation you wish to perform (Addition or Subtraction).</li>
                </ol>
                <p>The calculator will instantly display the resulting matrix.</p>

                <h3>Frequently Asked Questions (FAQs)</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is a matrix?</AccordionTrigger>
                        <AccordionContent>
                            A matrix is a rectangular grid of numbers arranged in rows and columns. The dimensions of a matrix are given by its number of rows and columns. For example, a 2x2 matrix has two rows and two columns.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How do you add or subtract matrices?</AccordionTrigger>
                        <AccordionContent>
                            To add or subtract two matrices, they must have the same dimensions. The operation is performed element-wise. This means you add (or subtract) the elements that are in the same position in each matrix. For example, to find the element in the first row and first column of the resulting matrix, you add the elements from the first row and first column of the original two matrices.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What about matrix multiplication?</AccordionTrigger>
                        <AccordionContent>
                           Matrix multiplication is more complex than addition or subtraction. It involves a "dot product" of rows and columns. This calculator does not currently support matrix multiplication, but it is a key operation in linear algebra used for transformations, solving systems of equations, and more.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}

    