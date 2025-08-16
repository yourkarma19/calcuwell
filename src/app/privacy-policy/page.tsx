import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy | CalcPro",
    description: "Review the official privacy policy for CalcPro. Understand how we collect, use, and protect your data when you use our free online calculator services.",
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
                    CalcPro ("us", "we", or "our") operates the calcpro.online website (the "Service"). This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.
                </p>

                <p>
                    If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.
                </p>

                <h2>Information Collection and Use</h2>
                <p>
                    We take and respect your privacy seriously. For a better experience while using our Service, we may require you to provide us with certain personally identifiable information. The information that we collect will be used to contact or identify you.
                </p>

                <h3>Log Data</h3>
                <p>
                    Whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
                </p>

                <h3>Cookies</h3>
                <p>
                    Cookies are files with a small amount of data that is commonly used as an anonymous unique identifier. Our website uses these "cookies" to collect information and to improve our Service. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.
                </p>

                <h3>Security</h3>
                <p>
                    We value your trust in providing us with your Personal Information. Thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the Internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
                </p>

                <h3>Links to Other Sites</h3>
                <p>
                    Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                </p>

                <h3>Changes to This Privacy Policy</h3>
                <p>
                    We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
                </p>

                <h2>Contact Us</h2>
                <p>
                    For any questions or feedback, please don't hesitate to reach out to us at: <a href="mailto:gridguruu@gmail.com" className="text-primary hover:underline">gridguruu@gmail.com</a>.
                </p>
            </div>
        </main>
    );
}
