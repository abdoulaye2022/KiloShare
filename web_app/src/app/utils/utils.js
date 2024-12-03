import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const convertToMySQLFormat = (dateStr) => {
  const formattedDate = dayjs.utc(dateStr).local().format("YYYY-MM-DD");
  return formattedDate;
};
