import { Tag } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const convertToMySQLFormat = (dateStr) => {
  const formattedDate = dayjs.utc(dateStr).local().format("YYYY-MM-DD");
  return formattedDate;
};

export const convertFromMySQLFormat = (mysqlDateStr) => {
  return dayjs(mysqlDateStr); // Convertit la date MySQL en un objet dayjs
};


export const getStatusTag = (statusId, statusName) => {
  switch (statusId) {
    case 1:
      return <Tag color="warning">{statusName}</Tag>;
    case 2:
      return <Tag color="green">{statusName}</Tag>;
    case 3:
      return <Tag color="red">{statusName}</Tag>;
    case 4:
      return <Tag style={{ backgroundColor: "red", color: "white" }}>{statusName}</Tag>;
    case 5:
      return <Tag style={{ backgroundColor: "red", color: "white" }}>{statusName}</Tag>;
    default:
      return <Tag>{statusName}</Tag>;
  }
};