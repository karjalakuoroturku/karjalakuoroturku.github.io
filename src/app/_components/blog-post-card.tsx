import Link from "next/link";
import Image from "next/image";
import DateFormatter from "./date-formatter";

interface Props {
  title: string;
  author?: string;
  coverImage?: string;
  date: string;
  excerpt: string;
  slug: string;
}

export function BlogPostCard(props: Props) {
  const { title, author, coverImage, date, excerpt, slug } = props;

  return (
    <Link
      href={`/blogi/${slug}`}
      className="group flex flex-col overflow-hidden rounded-lg shadow-lg h-full bg-white hover:shadow-xl transition-shadow duration-200"
    >
      {coverImage && (
        <div className="relative h-48 w-full">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <div className="text-gray-600 mb-4">
          <DateFormatter date={date} />
          {author && <span> · {author}</span>}
        </div>
        <p className="text-gray-600 flex-grow">{excerpt}</p>
        <div className="mt-4 text-red-600 font-semibold group-hover:text-red-800">
          Lue lisää →
        </div>
      </div>
    </Link>
  );
}
