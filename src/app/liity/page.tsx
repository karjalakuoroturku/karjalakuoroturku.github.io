import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug } from "../../lib/api";
import { SITE_TITLE } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import Container from "../_components/container";
import { ContentPageBody } from "../_components/content-page-body";
import { LiityPageContent } from "@/interfaces/liityPageContent";

const SLUG = "liity";

export default async function ContentPage() {
  const page = getContentBySlug(SLUG) as unknown as LiityPageContent;

  if (!page) {
    return notFound();
  }

  const content = await markdownToHtml(page.content || "");
  
  // Process all testimonial quotes
  const processedTestimonials = await Promise.all(
    page.testimonials.map(async (testimonial) => ({
      ...testimonial,
      quote: await markdownToHtml(testimonial.quote)
    }))
  );

  return (
    <main>
      <Container>
        <article className="lg:my-32 md:my-16 my-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">{page.title}</h1>
          
          <div className="prose prose-lg max-w-none">
            <ContentPageBody content={content} />
            
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-8">{page.testimonialsSectionTitle}</h2>
              <div className="space-y-8">
                {processedTestimonials.map((testimonial, index) => (
                  <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic">
                    <ContentPageBody content={testimonial.quote} />
                    <footer className="mt-2 font-medium not-italic">
                      - {testimonial.author}, {testimonial.role}
                    </footer>
                  </blockquote>
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
    openGraph: {
      title,
      // images: [post.ogImage.url],
    }
  };
}
