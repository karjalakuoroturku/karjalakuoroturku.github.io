import Image from "next/image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  author?: string;
  coverImage?: string;
  date: string;
};

export function BlogPostHeader({ title, author, coverImage, date }: Props) {
  return (
    <>
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-4">
          {title}
        </h1>
        <div className="text-lg text-gray-600">
          <DateFormatter date={date} />
          {author && <span> · {author}</span>}
        </div>
      </div>

      {coverImage && (
        <div className="mb-8 md:mb-16 sm:mx-0">
          <Image
            src={coverImage}
            alt={title}
            className="shadow-sm w-full"
            width={1300}
            height={630}
          />
        </div>
      )}
    </>
  );
}
