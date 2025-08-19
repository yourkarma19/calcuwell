
import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, Calculator } from 'lucide-react';
import { getCalculatorBySlug } from '@/lib/server/calculator-data';
import CalculatorCard from '@/components/calculator/calculator-card';

export const metadata: Metadata = {
  title: 'CalcPro Blog | Insights & Explanations',
  description: 'Explore articles about math, finance, and health. Get simple explanations for the concepts behind our free online calculators.',
  alternates: {
    canonical: '/blog',
  },
};

// In a real app, you would fetch this list from a CMS
const blogPosts = [
  {
    slug: 'what-is-the-pythagorean-theorem',
    title: 'What is the Pythagorean Theorem?',
    description: 'A simple guide to the a² + b² = c² formula, its history, proof, and real-world applications for students and professionals alike.',
    iconName: 'Triangle',
    category: 'Math'
  },
  // Add future blog posts here
];

export default function BlogIndexPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <div className="text-center mb-12">
        <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          CalcPro Blog
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Deep dives and simple explanations for the concepts behind our calculators.
        </p>
      </div>

      <section aria-labelledby="blog-posts-heading">
        <h2 id="blog-posts-heading" className="sr-only">Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block h-full">
              <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
                <CardHeader>
                    <CardTitle as="h3" className="font-headline group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
