export type LiputPageContent = {
  slug: string;
  title: string;
  content: string;
  ticketSellers: {
    name: string;
    phone: string;
    email: string;
  }[];
};
