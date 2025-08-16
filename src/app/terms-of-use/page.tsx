
import { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms of Use | CalcPro",
    description: "Read the terms and conditions for using the CalcPro website. By using our free online calculators, you agree to these terms.",
    alternates: {
        canonical: "/terms-of-use",
    },
};

export default function TermsOfUsePage() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Terms of Use
                </h1>
            </div>
            
            <div className="prose dark:prose-invert max-w-none text-lg">
                <h2>Acceptance of Terms</h2>
                <p>
                    Welcome to calcpro.online (the "Website"). By using our Website, you agree to these Terms of Use. If you do not agree with any part of these terms, please do not use the Website.
                </p>

                <h2>Changes to the Terms</h2>
                <p>
                    We may change these terms at any time. When we do, the new terms will be effective immediately. Please review this page regularly to stay updated.
                </p>

                <h2>User Conduct</h2>
                <p>
                    You agree to use our Website for lawful purposes only. You agree not to copy, reverse engineer, or attempt to discover the source code of our Website.
                </p>
                
                <h2>Disclaimer of Warranties</h2>
                <p>
                    Our Website and all its calculators are provided "as is." We make no guarantee that they are free of defects, errors, or viruses. The information and calculation results may sometimes be outdated or incorrect. Your use of the Website is at your own risk.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                    Under no circumstances will CalcPro be liable for any direct or indirect damages that result from your use of the Website.
                </p>

                <h2>General</h2>
                <p>
                    These terms make up the entire agreement between you and CalcPro.
                </p>
            </div>
        </main>
    );
}
