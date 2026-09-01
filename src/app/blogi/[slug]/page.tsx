import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/api";
import { SITE_TITLE } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "../../_components/container";
import { BlogPostBody } from "../../_components/blog-post-body";
import { BlogPostHeader } from "../../_components/blog-post-header";

export default async function BlogPost({ params }: Params) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Container>
        <article className="lg:my-32 md:my-16 my-8">
          <BlogPostHeader
            title={post.title}
            author={post.author}
            coverImage={post.coverImage}
            date={post.date}
          />
          <BlogPostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | ${SITE_TITLE}`;

  return {
    openGraph: {
      title,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
