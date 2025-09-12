import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculatorClientPage from "@/components/calculator/calculator-client-page";
import { getCalculatorBySlug } from "@/lib/server/calculator-data";
import type { SoftwareApplication, WithContext } from "schema-dts";

type CalculatorPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: CalculatorPageProps): Promise<Metadata> {
  const calculator = await getCalculatorBySlug(params.slug);

  if (!calculator) {
    return {
      title: "Calculator Not Found | CalcPro",
      description: "The calculator you are looking for does not exist.",
    };
  }

  const title =
    calculator.seoTitle ||
    `${calculator.name} Calculator | Free Online Tool | CalcPro`;
  const description =
    calculator.metaDescription ||
    `Use the free ${calculator.name} on CalcPro to solve your problem. ${calculator.description}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/calculators/${calculator.slug}`,
    },
  };
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const calculator = await getCalculatorBySlug(params.slug);
  if (!calculator) {
    notFound();
  }

  const softwareApplicationSchema: WithContext<SoftwareApplication> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: calculator.name,
    description: calculator.metaDescription || calculator.description,
    url: `https://calcpro.online/calculators/${calculator.slug}`,
    applicationCategory: "Utilities",
    offers: {
      "@type": "Offer",
      price: "0",
    },
    operatingSystem: "Any",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <CalculatorClientPage calculator={calculator} />
    </>
  );
}
