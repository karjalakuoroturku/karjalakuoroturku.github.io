export type LiityPageContent = {
  slug: string;
  title: string;
  content: string;
  testimonialsSectionTitle: string;
  testimonials: {
    quote: string;
    author: string;
    role: string;
  }[];
};
