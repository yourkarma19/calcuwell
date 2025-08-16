
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
                    Welcome to calcpro.online. By using our website, you agree to these simple terms. If you don't agree, please do not use the site.
                </p>

                <h2>Changes to Terms</h2>
                <p>
                    We may update these terms. When we do, the changes are effective right away. Please check this page now and then to stay up to date.
                </p>

                <h2>Disclaimer</h2>
                <p>
                    Our website and calculators are provided "as is." We do not promise they are free of errors. The results from our calculators are for informational purposes only and should not be used for making important financial or health decisions without consulting a professional. Your use of this website is at your own risk.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                    We are not responsible for any damages that may result from your use of this website.
                </p>

                <h2>General</h2>
                <p>
                    These terms make up the whole agreement between you and CalcPro. If you have any questions, please contact us.
                </p>
            </div>
        </main>
    );
}
