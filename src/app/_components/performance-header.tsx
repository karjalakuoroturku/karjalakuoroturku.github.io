import CoverImage from "./performance-cover-image";
import DateFormatter from "./date-formatter";
import { format } from "date-fns";
import { fi } from "date-fns/locale";

type Props = {
  name: string;
  type: string;
  location: string;
  coverImage: string;
  date: string;
  endTime?: string;
};

export function PerformanceHeader({
  name,
  type,
  location,
  coverImage,
  date,
  endTime,
}: Props) {
  const dateObj = new Date(date);

  const startTime = format(dateObj, "HH.mm");
  const weekday = format(dateObj, "EEEEEE", { locale: fi });
  const timeString = endTime ? `${startTime} - ${endTime}` : startTime;

  return (
    <>
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-4">
          {name}
        </h1>
        <h2 className="text-2xl md:text-3xl text-gray-600 mb-6">{type}</h2>
        <div className="flex flex-col gap-2 text-lg">
          <div className="font-medium">
            {weekday} <DateFormatter date={date} />
            <div className="mt-1">klo {timeString}</div>
          </div>
          <div className="text-gray-600">{location}</div>
        </div>
      </div>

      {coverImage && (
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={name} src={coverImage} />
        </div>
      )}
    </>
  );
}
