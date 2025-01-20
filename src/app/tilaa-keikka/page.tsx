import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug } from "../../lib/api";
import { SITE_TITLE } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import Container from "../_components/container";
import { ContentPageBody } from "../_components/content-page-body";
import { TilaaKeikkaPageContent } from "@/interfaces/tilaaKeikkaPageContent";

const SLUG = "tilaa-keikka";

export default async function BookingPage() {
  const page = getContentBySlug(SLUG) as unknown as TilaaKeikkaPageContent;

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

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 mb-12">
              <h2 className="text-3xl font-bold mb-6">Ota yhteyttä</h2>
              <p className="mb-6">
                Lähetä tarjouspyyntö sähköpostitse osoitteeseen:{' '}
                <a 
                  href={`mailto:${page.email}`}
                  className="text-red-600 hover:text-red-700"
                >
                  {page.email}
                </a>
              </p>

              <div className="space-y-4">
                <p>Kerrothan viestissäsi seuraavat tiedot:</p>
                <ul className="list-disc pl-5 space-y-2">
                  {page.requiredInfo.map((item, index) => (
                    <li key={index}>{item.text}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Hyvä tietää</h2>
              <ul className="list-disc pl-5 space-y-2">
                {page.goodToKnow.map((item, index) => (
                  <li key={index}>{item.text}</li>
                ))}
              </ul>
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
