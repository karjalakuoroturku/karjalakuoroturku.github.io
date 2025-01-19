export type EtusivuPageContent = {
  slug: string;
  title: string;
  header: string;
  subheader: string;
  coverImage: string;
  introText: {
    title: string;
    content: string;
  };
  upcomingPerformancesTitle: string;
  ticketButtonText: string;
  galleryImages: {
    src: string;
    alt: string;
  }[];
  reviews: {
    quote: string;
    author: string;
    title: string;
    year: string;
  }[];
};
