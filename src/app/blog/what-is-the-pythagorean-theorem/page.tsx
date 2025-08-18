
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Triangle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'What is the Pythagorean Theorem? | CalcPro',
  description: 'An in-depth explanation of the Pythagorean theorem, its history, proof, and real-world applications. Learn how a² + b² = c² works.',
  alternates: {
    canonical: '/blog/what-is-the-pythagorean-theorem',
  },
};

export default function PythagoreanTheoremBlogPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12">
      <article className="prose dark:prose-invert max-w-none">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
            What is the Pythagorean Theorem?
          </h1>
          <p className="text-lg text-muted-foreground">
            Understanding one of the most famous formulas in mathematics.
          </p>
        </div>

        <p>
          The Pythagorean theorem is a fundamental principle in Euclidean geometry that describes the relationship between the three sides of a right-angled triangle. It's a cornerstone of mathematics that has been studied for thousands of years and has countless applications in science, engineering, and everyday life.
        </p>

        <Card className="my-8">
            <CardContent className="p-6 text-center">
                 <p className="text-2xl font-bold font-headline text-primary">a² + b² = c²</p>
            </CardContent>
        </Card>
        
        <h2>The Formula Explained</h2>
        <p>
          The theorem states that in a right-angled triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the other two sides (legs).
        </p>

        <div className="my-6 flex justify-center">
            <Image 
                src="https://placehold.co/400x300.png"
                alt="Diagram of a right-angled triangle showing sides a, b, and hypotenuse c"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
                data-ai-hint="triangle diagram"
                priority={false}
            />
        </div>

        <ul>
          <li><strong>a and b</strong> are the lengths of the two legs of the triangle.</li>
          <li><strong>c</strong> is the length of the hypotenuse, which is always the longest side.</li>
        </ul>
        <p>
          This simple formula allows you to find the length of a missing side if you know the lengths of the other two. For instance, if you know the lengths of `a` and `b`, you can find `c` by calculating `√(a² + b²)`.
        </p>
        <p>
            Need to solve a triangle problem quickly? Try our <Link href="/calculators/pythagorean-theorem-calculator" className="text-primary hover:underline">Pythagorean Theorem Calculator</Link>.
        </p>
        
        <h2>A Simple Example</h2>
        <p>
          Imagine a right triangle with legs of length 3 units and 4 units. To find the length of the hypotenuse (c):
        </p>
        <ol>
            <li>Square the lengths of the legs: 3² = 9 and 4² = 16.</li>
            <li>Add the squares together: 9 + 16 = 25.</li>
            <li>Find the square root of the sum: √25 = 5.</li>
        </ol>
        <p>
            So, the length of the hypotenuse is 5 units. This is a classic example known as a "3-4-5 triangle," which is a Pythagorean triple.
        </p>

        <h2>Real-World Applications</h2>
        <p>
          The Pythagorean theorem is not just for math class. It's used in many real-world scenarios:
        </p>
        <ul>
          <li><strong>Construction & Architecture:</strong> Ensuring that the corners of buildings are perfectly square.</li>
          <li><strong>Navigation:</strong> Calculating the shortest distance between two points on a map (as the crow flies).</li>
          <li><strong>Design:</strong> Determining the diagonal size of a TV screen or monitor.</li>
        </ul>
      </article>
    </main>
  );
}
