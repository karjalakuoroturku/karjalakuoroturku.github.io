import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug } from "../../lib/api";
import { SITE_TITLE } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import Container from "../_components/container";
import { ContentPageBody } from "../_components/content-page-body";
import { YhteystiedotPageContent } from "@/interfaces/yhteystiedotPageContent";

const SLUG = "yhteystiedot";

export default async function ContactPage() {
  const page = getContentBySlug(SLUG) as unknown as YhteystiedotPageContent;

  if (!page) {
    return notFound();
  }

  const content = await markdownToHtml(page.content || "");

  return (
    <main>
      <Container>
        <article className="lg:my-32 md:my-16 my-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">{page.title}</h1>
          
          <div className="prose prose-lg max-w-none">
            <ContentPageBody content={content} />
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {page.contacts.map((contact, index) => (
                <div key={index} className="contact-section">
                  <h2 className="text-2xl font-bold mb-4">{contact.title}</h2>
                  <p className="font-bold">{contact.name}</p>
                  <p>{contact.phone}</p>
                </div>
              ))}
            </div>

            {page.mapCoordinates && (
              <div className="mt-16 aspect-video w-full">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=${page.mapCoordinates}`}
                  className="w-full h-full border-0"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
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

  const title = `Yhteystiedot | ${SITE_TITLE}`;

  return {
    title,
    openGraph: {
      title,
    }
  };
}
