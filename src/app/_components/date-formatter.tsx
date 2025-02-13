import { parseISO, format } from "date-fns";
import { fi } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

type Props = {
  date: Date;
};

export default function DateFormatter({ date }: Props) {
  const timeZone = "Europe/Helsinki";
  const utcDate = parseISO(new Date(date).toISOString());
  const finnishDate = toZonedTime(utcDate, timeZone);
  
  return <time dateTime={date.toISOString()}>{format(finnishDate, "d.M.yyyy", { locale: fi })}</time>;
}
