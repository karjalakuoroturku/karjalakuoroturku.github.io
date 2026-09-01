export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author?: string;
  coverImage?: string;
  excerpt: string;
  content: string;
  preview?: boolean;
};
