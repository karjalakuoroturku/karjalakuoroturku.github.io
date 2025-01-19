import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPerformances, getPerformanceBySlug } from "../../../lib/api";
import { SITE_TITLE } from "../../../lib/constants";
import markdownToHtml from "../../../lib/markdownToHtml";
import Container from "../../_components/container";
import Header from "../../_components/header";
import { PerformanceBody } from "../../_components/performance-body";
import { PerformanceHeader } from "../../_components/performance-header";

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
          <PerformanceHeader
            name={performance.name}
            type={performance.type}
            location={performance.location}
            coverImage={performance.coverImage}
            date={performance.date}
            endTime={performance.endTime}
          />
          <PerformanceBody content={content} />
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
    }
  };
}

export async function generateStaticParams() {
  const performances = getAllPerformances();

  return performances.map((performance) => ({
    slug: performance.slug,
  }));
}
