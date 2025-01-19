import Container from "@/app/_components/container";
import { HeroContentPage } from "@/app/_components/hero-content-page";
import { getContentBySlug, getAllPerformances } from "../lib/api";
import { PerformanceCard } from "./_components/performance-card";
import { Gallery } from "./_components/gallery";
import { Reviews } from "./_components/reviews";
import { EtusivuPageContent } from "@/interfaces/etusivuPageContent";
import { ContentPageBody } from "./_components/content-page-body";
import markdownToHtml from "@/lib/markdownToHtml";

export default async function Index() {
  const allPerformances = getAllPerformances();
  const page = getContentBySlug("etusivu") as unknown as EtusivuPageContent;

  const upcomingPerformances = allPerformances
    .filter((performance) => new Date(performance.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 2);

  const introTextContent = await markdownToHtml(page.introText.content || "");

  return (
    <main>
      <Container>
        <section className="flex-col flex items-center md:items-start mt-16 mb-16 md:mb-12">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight">
            {page.header}
          </h1>
          <h4 className="text-center md:text-lg text-sm mt-5 italic">
            {page.subheader}
          </h4>
        </section>
      </Container>
      <div className="w-full">
        <HeroContentPage title={page.title} coverImage={page.coverImage} />
      </div>
      <Container>
        <section className="py-12">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">
              {page.introText.title}
            </h2>
            <ContentPageBody content={introTextContent} />
          </div>
        </section>
        {upcomingPerformances.length > 0 && (
          <section className="my-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">
              {page.upcomingPerformancesTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 lg:gap-x-8 gap-y-8">
              {upcomingPerformances.map((performance) => (
                <PerformanceCard key={performance.slug} {...performance} />
              ))}
            </div>
          </section>
        )}
        <div className="flex justify-center my-24">
          <a
            href="/liput"
            className="inline-flex items-center px-8 py-4 text-xl font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 transform hover:scale-105"
          >
            {page.ticketButtonText}
          </a>
        </div>
      </Container>

      <Gallery images={page.galleryImages} />

      <Container>
        <Reviews reviews={page.reviews} />
      </Container>
    </main>
  );
}
