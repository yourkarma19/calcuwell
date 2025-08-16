
import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy | CalcPro",
    description: "Review the official privacy policy for CalcPro. Understand how we collect, use, and protect your data when you use our free online calculator services.",
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
                    CalcPro ("us", "we", or "our") runs the calcpro.online website (the "Service"). This page explains how we collect, use, and protect your information when you use our Service.
                </p>

                <p>
                    By using our Service, you agree to this policy. We use the information we collect to provide and improve our tools. We will not share your information with anyone except as described here.
                </p>

                <h2>Information We Collect</h2>
                <p>
                    We respect your privacy. To improve your experience, we may ask for certain information. However, our main calculators do not require you to provide personally identifiable information.
                </p>

                <h2>Log Data</h2>
                <p>
                    When you visit our site, we collect "Log Data" that your browser sends us. This may include your computer's IP address, browser type, the pages you visit, and the time and date of your visit. This information helps us understand how our Service is used.
                </p>

                <h2>Cookies</h2>
                <p>
                    Our website uses "cookies," which are small files stored on your computer, to help improve our Service. You can choose to accept or refuse these cookies. If you refuse them, some parts of our Service may not work as intended.
                </p>

                <h2>Security</h2>
                <p>
                    We work hard to protect your information. However, no method of transmission over the internet or electronic storage is 100% secure. While we use standard methods to protect your data, we cannot guarantee its absolute security.
                </p>

                <h2>Links to Other Sites</h2>
                <p>
                    Our Service may link to other websites. If you click on a third-party link, you will be taken to their site. Please note that we do not operate these external sites. We recommend you review their privacy policies, as we have no control over their content or practices.
                </p>

                <h2>Changes to This Policy</h2>
                <p>
                    We may update our Privacy Policy from time to time. We encourage you to review this page periodically for any changes. Any changes are effective immediately after they are posted here.
                </p>

                <h2>Contact Us</h2>
                <p>
                    If you have any questions, feel free to contact us at: <a href="mailto:gridguruu@gmail.com" className="text-primary hover:underline">gridguruu@gmail.com</a>.
                </p>
            </div>
        </main>
    );
}
