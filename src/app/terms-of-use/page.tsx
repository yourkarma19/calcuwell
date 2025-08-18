
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
                <h2>Using Our Website</h2>
                <p>
                    Welcome to calcpro.online. By using our website, you agree to these terms. If you do not agree with them, please do not use the site.
                </p>

                <h2>Changes to Terms</h2>
                <p>
                    We may update these terms from time to time. When we do, the new terms are effective right away. Please check this page now and then to stay up to date.
                </p>

                <h2>Our Content</h2>
                <p>
                    The results from our calculators are for informational purposes only. They should not be used to make important financial or health decisions without talking to a professional first. Your use of this website is at your own risk.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                    We are not responsible for any damages that may come from your use of this website.
                </p>

                <h2>General Agreement</h2>
                <p>
                    These terms make up the whole agreement between you and CalcPro. If you have any questions, please contact us.
                </p>
            </div>
        </main>
    );
}
