import Link from "next/link";
import DateFormatter from "./date-formatter";
import { parseISO, format } from 'date-fns';
import { fi } from 'date-fns/locale';
import { toZonedTime } from 'date-fns-tz';

type Props = {
  name: string;
  type: string;
  location: string;
  coverImage: string;
  date: Date;
  endTime?: string;
  excerpt: string;
  slug: string;
};

export function PerformanceCard(props: Props) {
  const {
    name,
    type,
    location,
    coverImage,
    date,
    endTime,
    excerpt,
    slug,
  } = props;

  const timeZone = 'Europe/Helsinki';
  const utcDate = parseISO(new Date(date).toISOString());
  const finnishDate = toZonedTime(utcDate, timeZone);
  
  const startTime = format(finnishDate, 'HH.mm');
  const weekday = format(finnishDate, 'EEEEEE', { locale: fi });
  const timeString = endTime ? `${startTime} - ${endTime}` : startTime;

  return (
    <Link
      as={`/esiintymiset/${slug}`}
      href="/esiintymiset/[slug]"
      className="block bg-gray-50/95 backdrop-blur-sm rounded-lg p-6 hover:bg-gray-100/95 transition-colors duration-200 border border-gray-200 shadow-lg"
    >
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <div className="text-sm uppercase tracking-wider text-gray-600 mb-2">
            {type}
          </div>
          <h3 className="text-3xl font-bold leading-snug text-gray-900">
            {name}
          </h3>
        </div>

        <div className="space-y-5 flex-grow">
          <div className="flex flex-col space-y-2">
            <div className="font-medium text-xl text-gray-900">
              {weekday} <DateFormatter date={date} />
            </div>
            <div className="text-lg text-gray-700">klo {timeString}</div>
            <div className="text-gray-600">{location}</div>
          </div>

          {excerpt && (
            <p className="text-gray-600 leading-relaxed border-t border-gray-200 pt-5">
              {excerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
} 