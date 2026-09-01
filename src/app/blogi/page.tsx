import { getAllBlogPosts } from "@/lib/api";
import { SITE_TITLE } from "@/lib/constants";
import { Metadata } from "next";
import Container from "../_components/container";
import { BlogPostCard } from "../_components/blog-post-card";

export default function BlogPage() {
  const allBlogPosts = getAllBlogPosts();

  return (
    <main>
      <Container>
        <div className="lg:my-32 md:my-16 my-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-12">
            Blogi
          </h1>

          {allBlogPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 lg:gap-x-12 gap-y-8">
              {allBlogPosts.map((post) => (
                <BlogPostCard key={post.slug} {...post} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}

export function generateMetadata(): Metadata {
  const title = `Blogi | ${SITE_TITLE}`;

  return {
    title,
    openGraph: {
      title,
    },
  };
}
