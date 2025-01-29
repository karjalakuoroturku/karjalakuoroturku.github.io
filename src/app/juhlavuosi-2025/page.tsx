import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getContentBySlug } from "../../lib/api";
import { SITE_TITLE } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import Container from "../_components/container";
import { ContentPageBody } from "../_components/content-page-body";
import { JuhlavuosiPageContent } from "@/interfaces/juhlavuosiPageContent";

const SLUG = "juhlavuosi-2025";

export default async function AnniversaryPage() {
  const page = getContentBySlug(SLUG) as unknown as JuhlavuosiPageContent;

  if (!page) {
    return notFound();
  }

  const content = await markdownToHtml(page.content || "");

  return (
    <main>
      <Container>
        <article className="lg:my-32 md:my-16 my-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">
            {page.title}
          </h1>

          <div className="prose prose-lg max-w-none mb-16">
            <ContentPageBody content={content} />
          </div>

          {page.sponsors?.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight mb-8">
                Yhteistyökumppanit
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {page.sponsors.map((sponsor, index) => (
                  <a
                    key={index}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="relative w-full aspect-square mb-4">
                      <Image
                        src={sponsor.logo}
                        alt={`${sponsor.name} logo`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    </div>
                    <h3 className="text-center font-medium group-hover:text-red-600 transition-colors">
                      {sponsor.name}
                    </h3>
                  </a>
                ))}
              </div>
            </div>
          )}
        </article>
      </Container>
    </main>
  );
}

export function generateMetadata(): Metadata {
  const page = getContentBySlug(SLUG);

  if (!page) {
    return notFound();
  }

  const title = `${page.title} | ${SITE_TITLE}`;

  return {
    title,
    openGraph: {
      title,
    },
  };
} 
