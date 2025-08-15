import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | CalcPro",
    description: "Learn more about CalcPro's mission to provide fast, free, and comprehensive online calculators.",
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
                    CalcPro's sole focus is to provide fast, comprehensive, convenient, and free online calculators in a plethora of areas. We are a group of IT professionals enthusiastic about creating quality free tools and content on the Internet.
                </p>

                <p>
                    Currently, we have around 100 calculators to help you "do the math" quickly in areas such as finance, fitness & health, math, and others, and we are still developing more. Our goal is to become the one-stop, go-to site for people who need to make quick calculations. Additionally, we believe the internet should be a source of free information. Therefore, all of our tools and services are completely free, with no registration required.
                </p>

                <p>
                    We have coded and developed each calculator individually and put each one through strict, comprehensive testing. However, please inform us if you notice even the slightest error – your input is extremely valuable to us. While most calculators on CalcPro are designed to be universally applicable for worldwide usage, some might be for specific regions.
                </p>
                
                 <p>
                    More than 90% of the calculators are based on well-known formulas or equations from textbooks, such as the mortgage calculator, BMI calculator, etc. If formulas are controversial, we aim to provide the results of all popular formulas. Calculators meant for amusement are based on internal formulas. The results of financial and health calculators were reviewed by professionals for accuracy.
                </p>
            </div>
        </main>
    );
}
