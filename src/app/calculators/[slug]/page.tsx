import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type JSONSchema7 } from "json-schema";
import type { HowTo, WithContext } from "schema-dts";
import CalculatorContent from "@/components/calculator/calculator-content";
import CalculatorLoader from "@/components/calculator/calculator-loader";
import CalculatorWrapper from "@/components/calculator/calculator-wrapper";
import { getCalculatorBySlug } from "@/lib/server/calculator-data";

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
    `${calculator.name} | Free Online Calculator | CalcPro`;
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

  // Basic HowTo schema for calculators
  const howToSchema: WithContext<HowTo> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use the ${calculator.name}`,
    description: calculator.description,
    step: [
      {
        "@type": "HowToStep",
        name: "Enter Inputs",
        text: `Enter your values into the designated fields for the ${calculator.name}.`,
        url: `https://calcpro.online/calculators/${calculator.slug}#${calculator.slug}-inputs`,
      },
      {
        "@type": "HowToStep",
        name: "View Results",
        text: "The calculated results will be displayed automatically.",
        url: `https://calcpro.online/calculators/${calculator.slug}#${calculator.slug}-results`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <CalculatorWrapper
        calculator={calculator}
        sidebar={<CalculatorContent slug={params.slug} />}
      >
        <CalculatorLoader slug={params.slug} calculatorName={calculator.name} />
      </CalculatorWrapper>
    </>
  );
}
