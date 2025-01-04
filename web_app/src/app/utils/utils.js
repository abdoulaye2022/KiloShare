import { Tag } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DateTime } from "luxon";

const now = DateTime.local();

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
      return (
        <Tag style={{ backgroundColor: "red", color: "white" }}>
          {statusName}
        </Tag>
      );
    case 5:
      return (
        <Tag style={{ backgroundColor: "red", color: "white" }}>
          {statusName}
        </Tag>
      );
    default:
      return <Tag>{statusName}</Tag>;
  }
};

export const getDateMessageFr = (dateString, langue) => {
  try {
    // Vérifier que dateString est une chaîne de caractères valide
    if (typeof dateString !== 'string') {
      throw new Error('dateString doit être une chaîne de caractères');
    }

    // Analyser la date en spécifiant le format
    const pastDate = DateTime.fromFormat(dateString, "yyyy-MM-dd HH:mm:ss");

    // Vérifier que la date est valide
    if (!pastDate.isValid) {
      throw new Error('Format de date invalide');
    }

    // Obtenir la date et l'heure actuelles
    const now = DateTime.now();

    // Calculer la différence en minutes
    const diffInMinutes = now.diff(pastDate, "minutes").toObject().minutes;

    // Convertir les minutes en heures et minutes
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = Math.floor(diffInMinutes % 60);

    // Convertir les heures en jours
    const days = Math.floor(hours / 24);

    // Afficher le résultat
    if (diffInMinutes > 0) {
      if (langue === "fr") {
        if (days > 0) {
          return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
        } else if (hours > 0) {
          return `Il y a ${hours} heure${hours > 1 ? 's' : ''} et ${minutes} minute${minutes > 1 ? 's' : ''}`;
        } else {
          return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
        }
      } else if (langue === "en") {
        if (days > 0) {
          return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
          return `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
          return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        }
      }
    } else {
      if (langue === "fr") {
        return 'Cette date est dans le futur';
      } else if (langue === "en") {
        return 'This date is in the future';
      }
    }
  } catch (error) {
    console.error('Erreur dans getDateMessageFr :', error.message);
    return 'Date invalide';
  }
};
