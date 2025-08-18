
import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy | CalcPro",
    description: "Read the privacy policy for CalcPro. Learn how we handle your data when you use our free online calculators.",
    alternates: {
        canonical: "/privacy-policy",
    },
};

export default function PrivacyPolicyPage() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Privacy Policy
                </h1>
            </div>

            <div className="prose dark:prose-invert max-w-none text-lg">
                <p>
                    This page explains how we handle your information when you use our website, calcpro.online (the "Service").
                </p>

                <p>
                    By using our Service, you agree to this policy. We use the information we collect to improve our tools. We will not share your data with anyone except as described here.
                </p>

                <h2>Information We Collect</h2>
                <p>
                    We respect your privacy. Our calculators do not require you to provide any personal information to use them.
                </p>

                <h2>Website Analytics</h2>
                <p>
                    Like most websites, we collect "Log Data" that your browser sends. This may include your device's IP address, browser type, and which pages you visit. This data helps us understand how our Service is being used so we can improve it.
                </p>

                <h2>Cookie Policy</h2>
                <p>
                    We use "cookies" to make our Service better. Cookies are small files stored on your device. You can set your browser to refuse them, but some parts of our site may not work correctly if you do.
                </p>

                <h2>Data Security</h2>
                <p>
                    We work hard to protect your information. However, no method of sharing data over the internet is 100% secure. We use standard security measures, but we cannot guarantee perfect security.
                </p>

                <h2>Links to Other Websites</h2>
                <p>
                    Our website may link to other sites. If you click a third-party link, you will be taken to their website. We do not control those sites, so we suggest you review their privacy policies.
                </p>

                <h2>Policy Updates</h2>
                <p>
                    We may update this policy. Please check this page for the latest version. Changes are effective as soon as they are posted here.
                </p>

                <h2>Contact Us</h2>
                <p>
                    If you have any questions, please contact us at: <a href="mailto:gridguruu@gmail.com" className="text-primary hover:underline">gridguruu@gmail.com</a>.
                </p>
            </div>
        </main>
    );
}
