import { Performance } from "@/interfaces/performance";
import { BlogPost } from "@/interfaces/blogPost";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { fromZonedTime } from "date-fns-tz";

// performances
const performancesDirectory = join(process.cwd(), "_performances");

export function getPerformanceSlugs() {
  return fs.readdirSync(performancesDirectory);
}

export function getPerformanceBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(performancesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const [dateTime, tz] = data.date.split(' ', 2);
  const utcDate = fromZonedTime(dateTime, tz);

  return {
    ...data,
    slug: realSlug,
    date: utcDate.toISOString(),
    content,
  } as Performance;
}

export function getAllPerformances(): Performance[] {
  const slugs = getPerformanceSlugs();
  const performances = slugs
    .map((slug) => getPerformanceBySlug(slug))
    // sort performances by date in descending order
    .sort((performance1, performance2) =>
      performance1.date > performance2.date ? -1 : 1
    );
  return performances;
}

// blog posts
const blogDirectory = join(process.cwd(), "_blog");

export function getBlogPostSlugs() {
  return fs.readdirSync(blogDirectory);
}

export function getBlogPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(blogDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const [dateTime, tz] = data.date.split(' ', 2);
  const utcDate = fromZonedTime(dateTime, tz);

  return {
    ...data,
    slug: realSlug,
    date: utcDate.toISOString(),
    content,
  } as BlogPost;
}

export function getAllBlogPosts(): BlogPost[] {
  const slugs = getBlogPostSlugs();
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((post) => !post.preview)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

// content pages
const contentDirectory = join(process.cwd(), "_content");

export function getContentBySlug(slug: string) {
  const realSlug = slug.replace(/\.json$/, "");
  const fullPath = join(contentDirectory, `${realSlug}.json`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const data = JSON.parse(fileContents);

  return { ...data, slug: realSlug };
}
