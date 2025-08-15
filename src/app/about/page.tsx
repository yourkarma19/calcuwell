import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { Info, Target, TestTube } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us | CalcuWell",
    description: "Learn more about CalcuWell's mission to provide fast, free, and comprehensive online calculators.",
};

export default function AboutPage() {
    return (
        <main className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    About CalcuWell
                </h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Our mission is to provide fast, comprehensive, and convenient free online calculators in a plethora of areas.
                </p>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Target className="text-primary"/> Our Goal
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                        <p>Our goal is to become the one-stop, go-to site for people who need to make quick calculations. Currently, we have around 200 calculators to help you "do the math" quickly in areas such as finance, fitness, health, math, and others, and we are still developing more.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Info className="text-primary"/> Free Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                         <p>We believe the internet should be a source of free information. Therefore, all of our tools and services are completely free, with no registration required. We strive to make our calculators accessible to everyone, everywhere.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <TestTube className="text-primary"/> Rigorous Testing
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                         <p>We coded and developed each calculator individually and put each one through strict, comprehensive testing. However, please inform us if you notice even the slightest error – your input is extremely valuable to us. While most calculators on CalcuWell are designed to be universally applicable, some may be for specific regions.</p>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
