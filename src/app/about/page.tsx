
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About CalcPro | Our Mission & Story",
    description: "Learn about CalcPro and our mission to provide fast, free, and easy-to-use online calculators for math, finance, health, and more.",
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
                <h2>Our Mission</h2>
                <p>
                    CalcPro gives you fast, easy-to-use, and free online calculators. We are a small team of tech lovers who enjoy making great tools for everyone.
                </p>

                <p>
                    We have calculators for finance, health, math, and more. Our goal is to be the only website you need for quick math. We believe the internet should be open, so our tools are always free to use without needing to sign up.
                </p>
                
                <h2 id="commitment">Our Commitment to Accuracy</h2>
                <p>
                    We build each calculator with care and test it to make sure it is right. If you see something that is not working, please let us know. Your feedback helps us make our tools better for everyone.
                </p>
                
                 <p>
                    Our calculators are based on standard formulas found in textbooks. For some topics, we show results from different methods. All of our financial and health tools have been double-checked by professionals to ensure they are reliable.
                </p>

                <h2 id="contact">Get in Touch</h2>
                <p>
                    If you have questions or feedback, please email us at <a href="mailto:gridguruu@gmail.com" className="text-primary hover:underline">gridguruu@gmail.com</a>. We would love to hear from you!
                </p>
            </div>
        </main>
    );
}
