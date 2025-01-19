import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug } from "../../lib/api";
import { SITE_TITLE } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import Container from "../_components/container";
import { ContentPageBody } from "../_components/content-page-body";
import { LiputPageContent } from "@/interfaces/liputPageContent";

const SLUG = "liput";

export default async function TicketsPage() {
  const page = getContentBySlug(SLUG) as unknown as LiputPageContent;

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

          <div className="prose prose-lg max-w-none">
            <ContentPageBody content={content} />

            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-8">Lipunmyyjät</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {page.ticketSellers.map((seller, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
                  >
                    <h3 className="text-xl font-bold mb-4">{seller.name}</h3>
                    <div className="space-y-2 text-gray-600">
                      <p>
                        <span className="font-medium">Puhelin: </span>
                        <a
                          href={`tel:${seller.phone}`}
                          className="hover:text-red-500"
                        >
                          {seller.phone}
                        </a>
                      </p>
                      <p>
                        <span className="font-medium">Sähköposti: </span>
                        <a
                          href={`mailto:${seller.email}`}
                          className="hover:text-red-500"
                        >
                          {seller.email}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
