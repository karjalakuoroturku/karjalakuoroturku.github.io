import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPerformances, getPerformanceBySlug } from "../../../lib/api";
import { SITE_TITLE } from "../../../lib/constants";
import markdownToHtml from "../../../lib/markdownToHtml";
import Container from "../../_components/container";
import Header from "../../_components/header";
import { PerformanceBody } from "../../_components/performance-body";
import { PerformanceHeader } from "../../_components/performance-header";
import Image from "next/image";

export default async function Performance({ params }: Params) {
  const performance = getPerformanceBySlug(params.slug);

  if (!performance) {
    return notFound();
  }

  const content = await markdownToHtml(performance.content || "");

  return (
    <main>
      <Container>
        <Header />
        <article className="lg:my-32 md:my-16 my-8">
          <div className="relative w-full h-[60vh] mb-8">
            <Image
              src={
                performance.coverImage ||
                "/assets/esiintymiset/oletuskuva.jpg"
              }
              alt={performance.name}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <PerformanceHeader
            name={performance.name}
            type={performance.type}
            location={performance.location}
            coverImage={performance.coverImage}
            date={performance.date}
            endTime={performance.endTime}
          />
          <PerformanceBody content={content} />
          
          <div className="flex justify-center mt-12">
            <a
              href="/liput"
              className="inline-flex items-center px-8 py-4 text-xl font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 transform hover:scale-105"
            >
              Osta liput
            </a>
          </div>
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const performance = getPerformanceBySlug(params.slug);

  if (!performance) {
    return notFound();
  }

  const title = `${performance.name} | ${SITE_TITLE}`;

  return {
    openGraph: {
      title,
      // images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const performances = getAllPerformances();

  return performances.map((performance) => ({
    slug: performance.slug,
  }));
}
