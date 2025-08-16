
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About CalcPro: Our Mission and Story",
    description: "Discover the story behind CalcPro. Learn about our mission to provide fast, comprehensive, and completely free online calculators for finance, health, math, and everyday use.",
    alternates: {
        canonical: "/about",
    },
};

export default function AboutPage() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    About CalcPro
                </h1>
            </div>

            <div className="prose dark:prose-invert max-w-none text-lg">
                <p>
                    CalcPro is all about giving you fast, comprehensive, and free online calculators. We are a team of tech enthusiasts who love building quality tools for everyone to use.
                </p>

                <p>
                    We have over 100 calculators for finance, health, math, and more, with new ones always on the way. Our goal is to be the only site you need for quick calculations. We believe the internet should be free, so all our tools are available without any cost or sign-up.
                </p>
                
                <h2>Our Calculators & Accuracy</h2>
                <p>
                    We build each calculator carefully and test it thoroughly. If you ever find an error, please let us know. Your feedback is important to us. While most of our calculators work worldwide, some are made for specific regions.
                </p>
                
                 <p>
                    Most of our calculators are based on standard formulas you'd find in textbooks, like the BMI or mortgage calculators. For topics where formulas might differ, we try to show results from all popular methods. Calculators just for fun are based on our own formulas. All financial and health tools have been checked by professionals for accuracy.
                </p>

                <h2>Contact Us</h2>
                <p>
                    For any questions, feedback, or support, please don't hesitate to reach out to us at: <a href="mailto:gridguruu@gmail.com" className="text-primary hover:underline">gridguruu@gmail.com</a>. We appreciate your input!
                </p>
            </div>
        </main>
    );
}
