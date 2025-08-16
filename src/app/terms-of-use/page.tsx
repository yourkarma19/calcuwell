import { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms of Use | CalcPro",
    description: "The terms of use for CalcPro, your ultimate calculator hub.",
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
                    Welcome to calcpro.online (the "Website"). By using the Website in any way, you are agreeing to comply with these Terms of Use. Should you object to any term or condition of the Terms of Use or any guideline of the Website, your only recourse is to immediately discontinue use of the Website.
                </p>

                <h2>Changes to the Terms of Use</h2>
                <p>
                    We reserve the right, at our sole discretion, to change, modify, or alter the Terms of Use at any time. Such changes shall become effective immediately upon the posting thereof. You must review the Terms of Use on a regular basis to keep yourself apprised of any changes.
                </p>

                <h2>Conduct</h2>
                <p>
                    You agree not to use the Website in any way that is unlawful, harmful, or in violation of these Terms. You agree not to decompile or reverse engineer or otherwise attempt to discover any source code contained in the Website.
                </p>
                
                <h2>Disclaimer of Warranties</h2>
                <p>
                    THE WEBSITE AND ANY INCLUDED SERVICES ARE PROVIDED ON AN "AS IS" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, INCLUDING WITHOUT LIMITATION THE WARRANTIES THAT IT IS FREE OF DEFECTS, ERRORS, VIRUSES, MERCHANTABLE AND THAT IT IS FIT FOR A PARTICULAR PURPOSE OR NON-INFRINGING. YOUR USE OF THE WEBSITE IS AT YOUR OWN RISK. INFORMATION OR CALCULATION RESULTS AT OUR WEBSITE MAY BE OUTDATED OR INCORRECT.
                </p>

                <h2>Limitations of Liability</h2>
                <p>
                    UNDER NO CIRCUMSTANCES SHALL CALCPRO BE LIABLE FOR DIRECT, INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, RESULTING FROM ANY ASPECT OF YOUR USE OF THE WEBSITE.
                </p>

                <h2>General</h2>
                <p>
                    The Terms of Use constitute the entire agreement between you and CalcPro and govern your use of the Website, superseding any prior agreements between you and CalcPro.
                </p>
            </div>
        </main>
    );
}
