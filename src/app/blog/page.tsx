import { BookOpen } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "CalcPro Blog | Insights & Explanations",
  description:
    "Explore articles about math, finance, and health. Get simple explanations for the concepts behind our free online calculators.",
  alternates: {
    canonical: "/blog",
  },
};

// In a real app, you would fetch this list from a CMS
const blogPosts = [
  {
    slug: "what-is-the-pythagorean-theorem",
    title: "What is the Pythagorean Theorem?",
    description:
      "A simple guide to the a² + b² = c² formula, its history, proof, and real-world applications for students and professionals alike.",
    iconName: "Triangle",
    category: "Math",
  },
  {
    slug: "what-is-a-calculator-hide-app",
    title: "What is a Calculator Hide App and How Do They Work?",
    description:
      "Learn about apps that look like calculators but are actually secret vaults for hiding photos, videos, and other apps.",
    iconName: "Shield",
    category: "Tech",
  },
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
          Welcome to the CalcPro Blog, your resource for deep dives and simple
          explanations for the concepts behind our calculators. Our goal is to
          demystify the formulas and ideas that power our tools, making them
          accessible to everyone. Whether you&apos;re a student, a professional,
          or just curious, our articles provide valuable context and real-world
          examples.
        </p>
      </div>

      <section aria-labelledby="blog-posts-heading">
        <h2 id="blog-posts-heading" className="sr-only">
          Blog Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block h-full"
            >
              <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1">
                <CardHeader>
                  <CardTitle
                    as="h2"
                    className="text-2xl font-semibold font-headline group-hover:text-primary transition-colors"
                  >
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
