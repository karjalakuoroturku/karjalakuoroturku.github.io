import { format } from "date-fns";
import { fi } from "date-fns/locale";

type Props = {
  date: string;
};

export default function DateFormatter({ date }: Props) {
  const dateObj = new Date(date);
  
  return <time dateTime={dateObj.toISOString()}>{format(dateObj, "d.M.yyyy", { locale: fi })}</time>;
}
