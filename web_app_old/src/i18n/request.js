import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Récupère la valeur du cookie de langue
  const langueCookie = cookies().get("langue")?.value;
  
  // Définit la langue par défaut sur 'fr' si aucun cookie n'est trouvé
  const locale = langueCookie || "fr";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
