import localFont from "next/font/local";
import "antd/dist/reset.css";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import StoreProvider from "./StoreProvider";
import Head from "next/head";

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <Head>
        <title>
          Kilo-share - Simplifiez le partage de colis et bagages entre voyageurs
        </title>
        <meta
          name="description"
          content="Service collaboratif pour envoyer ou transporter des colis à moindre coût. Trouvez des annonces ou proposez votre espace inutilisé pour économiser et voyager malin."
        />
        <meta
          name="keywords"
          content="partage de colis, transport collaboratif, envoi économique, bagages voyageurs, expédition sécurisée, transport colis pas cher"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="author" content="Kilo-Share Team" />
        <meta name="robots" content="index, follow" />

        {/* OpenGraph */}
        <meta
          property="og:title"
          content="Kilo-share - Partage de colis et bagages"
        />
        <meta
          property="og:description"
          content="Service collaboratif pour l'envoi de colis et bagages à moindre coût."
        />
        <meta property="og:url" content="https://www.kilo-share.com" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:alt" content="Kilo-share Preview" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Kilo-share - Partage de colis et bagages"
        />
        <meta
          name="twitter:description"
          content="Facilitez vos envois avec un service sécurisé et économique."
        />
        <meta name="twitter:image" content="/logo.png" />
      </Head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AntdRegistry>
            <StoreProvider>{children}</StoreProvider>
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
