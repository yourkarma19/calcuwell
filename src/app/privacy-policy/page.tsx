
import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy | How We Handle Your Data | CalcPro",
    description: "Read the privacy policy for CalcPro. We are committed to protecting your data and privacy when you use our free online calculator tools.",
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
                <h2>Our Commitment</h2>
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

                <h2>Advertising and Cookies</h2>
                <p>
                    We use Google AdSense to serve advertisements on our site. Our advertising partners, including Google, may use cookies to serve ads based on a user's prior visits to our website or other websites.
                </p>
                <ul>
                    <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
                    <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
                    <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ads Settings</a>. Alternatively, you can direct users to opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aboutads.info/choices</a>.</li>
                </ul>
                <p>
                    If you have not opted out of third-party ad serving, the cookies of other third-party vendors or ad networks may also be used to serve ads on your site.
                </p>


                <h2>Links to Other Websites</h2>
                <p>
                    Our website may link to other sites. If you click a third-party link, you will be taken to their website. We do not control those sites, so we suggest you review their privacy policies.
                </p>

                <h2>Policy Updates</h2>
                <p>
                    We may update this policy. Please check this page for the latest version. Changes are effective as soon as they are posted here.
                </p>

                <h2 id="contact">Contact Us</h2>
                <p>
                    If you have any questions, please contact us at: <a href="mailto:gridguruu@gmail.com" className="text-primary hover:underline">gridguruu@gmail.com</a>.
                </p>
            </div>
        </main>
    );
}
