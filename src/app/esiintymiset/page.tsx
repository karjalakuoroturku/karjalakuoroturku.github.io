import { getAllPerformances } from "@/lib/api";
import { SITE_TITLE } from "@/lib/constants";
import { Metadata } from "next";
import Container from "../_components/container";
import { PerformanceCard } from "../_components/performance-card";

export default function PerformancesPage() {
  const allPerformances = getAllPerformances();
  const now = new Date();

  // Split performances into upcoming and past
  const upcomingPerformances = allPerformances
    .filter((performance) => new Date(performance.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastPerformances = allPerformances
    .filter((performance) => new Date(performance.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Most recent past performances first

  return (
    <main>
      <Container>
        <div className="lg:my-32 md:my-16 my-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">
            Esiintymiset 
          </h1>
          
          {upcomingPerformances.length > 0 && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight mb-8">
                Tulevat esiintymiset
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 lg:gap-x-12 gap-y-8 mb-16">
                {upcomingPerformances.map((performance) => (
                  <PerformanceCard key={performance.slug} {...performance} />
                ))}
              </div>
            </>
          )}

          {pastPerformances.length > 0 && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight mb-8">
                Menneet esiintymiset
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 lg:gap-x-12 gap-y-8">
                {pastPerformances.map((performance) => (
                  <PerformanceCard key={performance.slug} {...performance} />
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </main>
  );
}

export function generateMetadata(): Metadata {
  const title = `Esitykset | ${SITE_TITLE}`;

  return {
    title,
    openGraph: {
      title,
    },
  };
}