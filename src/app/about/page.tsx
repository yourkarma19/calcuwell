
import { Metadata } from "next";
import Image from "next/image";
import type { Organization, Person, WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "About CalcPro | Our Mission & Story",
  description:
    "Learn about CalcPro, our mission to provide the best free online calculators for math, finance, and health, and our commitment to accuracy and user privacy.",
  alternates: {
    canonical: "/about",
  },
};

const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CalcPro",
  url: "https://calcpro.online",
  logo: "https://calcpro.online/icon.png",
  contactPoint: {
    "@type": "ContactPoint",
    email: "gridguruu@gmail.com",
    contactType: "Customer Support",
  },
};

const personSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alex Doe",
  jobTitle: "Founder",
  description:
    "With a background in software development and a passion for making complex financial and health topics accessible, Alex created CalcPro to empower users to make informed decisions.",
  url: "https://calcpro.online/about",
  image: "https://picsum.photos/seed/founder/150/150",
  worksFor: {
    "@type": "Organization",
    name: "CalcPro",
  },
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          About CalcPro
        </h1>
      </div>

      <div className="prose dark:prose-invert max-w-none text-lg">
        <h2>Our Mission</h2>
        <p>
          CalcPro was created to provide fast, easy-to-use, and free online
          calculators. We are a small team of tech lovers who enjoy making great
          tools for everyone. Our goal is to be the only website you need for
          quick math, with a wide range of calculators for finance, health,
          math, and more. We believe the internet should be open, so our tools
          are always free to use without needing to sign up.
        </p>

        <div className="my-12 p-8 bg-muted rounded-xl text-center">
          <Image
            src="https://picsum.photos/seed/founder/150/150"
            alt="Founder of CalcPro"
            width={150}
            height={150}
            className="rounded-full mx-auto mb-4 shadow-lg"
            data-ai-hint="professional headshot"
          />
          <h3 className="text-2xl font-bold font-headline text-primary mt-0">
            Meet the Founder
          </h3>
          <p className="font-semibold text-xl">Alex Doe</p>
          <p className="mt-2 text-base max-w-2xl mx-auto">
            With a background in software development and a passion for making
            complex financial and health topics accessible, Alex created CalcPro
            to empower users to make informed decisions. Alex believes that
            everyone should have access to high-quality, easy-to-use, tools to
            navigate the numbers in their daily lives.
          </p>
        </div>

        <h2 id="commitment">Our Commitment to Accuracy</h2>
        <p>
          We build each calculator with care and test it to make sure it is
          right. While we strive for accuracy, our tools are for informational
          purposes only and should not be used for making critical financial or
          health decisions without consulting a professional first. If you see
          something that is not working as expected, please let us know. Your
          feedback helps us make our tools better for everyone.
        </p>

        <p>
          Our calculators are based on standard, well-established formulas. For
          some topics, we show results from different methods to provide a
          comprehensive view. All of our financial and health tools have been
          developed with care to ensure they are reliable for general
          estimation.
        </p>

        <h2 id="contact">Get in Touch</h2>
        <p>
          If you have questions, feedback, or have found an error, please email
          us at{" "}
          <a
            href="mailto:gridguruu@gmail.com"
            className="text-primary hover:underline"
          >
            gridguruu@gmail.com
          </a>
          . We would love to hear from you!
        </p>
      </div>
    </main>
  );
}
