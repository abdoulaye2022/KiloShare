import localFont from "next/font/local";
import 'antd/dist/reset.css';
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import StoreProvider from "./StoreProvider";

// export const metadata = {
//   title: "Kilo-share - Simplifiez le partage de colis et bagages entre voyageurs",
//   description: "Service collaboratif pour envoyer ou transporter des colis à moindre coût. Trouvez des annonces ou proposez votre espace inutilisé pour économiser et voyager malin.",
//   keywords: "partage de colis, transport collaboratif, envoi économique, bagages voyageurs, expédition sécurisée, transport colis pas cher",
//   openGraph: {
//     title: "Kilo-share - Partage de colis et bagages",
//     description: "Service collaboratif pour l'envoi de colis et bagages à moindre coût.",
//     url: "https://www.kilo-share.com",
//     images: [
//       {
//         url: "/logo.png",
//         width: 800,
//         height: 600,
//         alt: "Kilo-share Preview"
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Kilo-share - Partage de colis et bagages",
//     description: "Facilitez vos envois avec un service sécurisé et économique.",
//     image: "/logo.png",
//   },
// };

export default async function RootLayout({ children }) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* Ajout de la balise meta viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#ffffff" />
        <title>Kilo-Share</title>
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AntdRegistry>
            <StoreProvider>
              {children}
            </StoreProvider>
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
