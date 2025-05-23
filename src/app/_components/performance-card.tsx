import Link from "next/link";
import DateFormatter from "./date-formatter";
import { format } from "date-fns";
import { fi } from "date-fns/locale";
import Image from "next/image";
import { toZonedTime } from "date-fns-tz";
interface Props {
  name: string;
  type: string;
  location: string;
  coverImage: string;
  date: string;
  endTime?: string;
  excerpt: string;
  slug: string;
}

export function PerformanceCard(props: Props) {
  const { name, type, location, coverImage, date, endTime, excerpt, slug } =
    props;

  // Since this is rendered on the server, we need to explicitly convert the
  // date to the timezone it is to be displayed in
  const dateObj = toZonedTime(date, "Europe/Helsinki");

  const startTime = format(dateObj, "HH.mm");
  const weekday = format(dateObj, "EEEEEE", { locale: fi });
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
            {weekday} <DateFormatter date={date} />
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
