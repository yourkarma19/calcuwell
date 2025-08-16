
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
                    CalcPro gives you fast, easy-to-use, and free online calculators. We are a small team of tech lovers who enjoy making great tools for everyone.
                </p>

                <p>
                    We have calculators for finance, health, math, and more. Our goal is to be the only website you need for quick math. We think the internet should be open, so our tools are always free to use without needing to sign up.
                </p>
                
                <h2>Our Calculators & Accuracy</h2>
                <p>
                    We build each calculator with care and test it to make sure it's right. If you see something that's not working, please let us know. Your feedback helps us make things better.
                </p>
                
                 <p>
                    Our tools are based on common formulas you find in textbooks. For some topics, we show results from different methods. All of our financial and health tools have been double-checked by professionals.
                </p>

                <h2>Contact Us</h2>
                <p>
                    If you have questions or feedback, please email us at <a href="mailto:gridguruu@gmail.com" className="text-primary hover:underline">gridguruu@gmail.com</a>. We would love to hear from you!
                </p>
            </div>
        </main>
    );
}
