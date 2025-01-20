import Link from "next/link";
import DateFormatter from "./date-formatter";
import { parseISO, format } from "date-fns";
import { fi } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";
import Image from "next/image";

interface Props {
  name: string;
  type: string;
  location: string;
  coverImage: string;
  date: Date;
  endTime?: string;
  excerpt: string;
  slug: string;
}

export function PerformanceCard(props: Props) {
  const { name, type, location, coverImage, date, endTime, excerpt, slug } =
    props;

  const timeZone = "Europe/Helsinki";
  const utcDate = parseISO(new Date(date).toISOString());
  const finnishDate = toZonedTime(utcDate, timeZone);

  const startTime = format(finnishDate, "HH.mm");
  const weekday = format(finnishDate, "EEEEEE", { locale: fi });
  const timeString = endTime ? `${startTime} - ${endTime}` : startTime;

  return (
    <Link
      href={`/esiintymiset/${slug}`}
      className="group flex flex-col overflow-hidden rounded-lg shadow-lg h-full bg-white hover:shadow-xl transition-shadow duration-200"
    >
      <div className="relative h-48 w-full">
        <Image
          src={coverImage || "/assets/esiintymiset/oletuskuva.jpg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col flex-grow p-6">
        <div className="text-sm uppercase tracking-wide text-gray-600 mb-2">
          {type}
        </div>
        <h3 className="text-2xl font-semibold mb-2">{name}</h3>
        <div className="text-gray-600 mb-4">
          <div>{location}</div>
          <div>
            {weekday} <DateFormatter date={new Date(date)} />
          </div>
          <div>{timeString}</div>
        </div>
        <p className="text-gray-600 flex-grow">{excerpt}</p>
        <div className="mt-4 text-red-600 font-semibold group-hover:text-red-800">
          Lue lisää →
        </div>
      </div>
    </Link>
  );
}
