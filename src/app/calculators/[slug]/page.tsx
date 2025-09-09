
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { HowTo, WithContext } from "schema-dts";
import { useState } from "react";
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

export default function CalculatorPage({ params }: CalculatorPageProps) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const [aboutProps, setAboutProps] = useState({});

  return (
    <CalculatorLoader slug={params.slug} setAboutProps={setAboutProps} />
  );
}
