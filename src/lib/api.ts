import { Performance } from "@/interfaces/performance";
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

  console.log(data.date);
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

// content pages
const contentDirectory = join(process.cwd(), "_content");

export function getContentBySlug(slug: string) {
  const realSlug = slug.replace(/\.json$/, "");
  const fullPath = join(contentDirectory, `${realSlug}.json`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const data = JSON.parse(fileContents);

  return { ...data, slug: realSlug };
}
