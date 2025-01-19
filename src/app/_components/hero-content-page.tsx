import cn from "classnames";
import Image from "next/image";

type Props = {
  title: string;
  coverImage: string;
};

export function HeroContentPage({
  title,
  coverImage,
}: Props) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <div className="sm:mx-0">
          <Image
            src={coverImage}
            alt={`Cover Image for ${title}`}
            className={cn("shadow-sm w-full")}
            width={1300}
            height={630}
          />
        </div>
      </div>
    </section>
  );
}
