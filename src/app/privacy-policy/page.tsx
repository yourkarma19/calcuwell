import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy | CalcuWell",
    description: "The privacy policy for CalcuWell, your ultimate calculator hub.",
};

export default function PrivacyPolicyPage() {
    return (
        <main className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Privacy Policy
                </h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    This page is under construction. Please check back later.
                </p>
            </div>
        </main>
    );
}
