import "antd/dist/reset.css";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import StoreProvider from "./StoreProvider";
import Head from "next/head";

const SITE_NAME = "Kilo-share";
const SITE_URL = "https://www.kilo-share.com";
const SITE_DESCRIPTION =
  "Service collaboratif pour envoyer ou transporter des colis à moindre coût. Trouvez des annonces ou proposez votre espace inutilisé pour économiser et voyager malin.";
const SITE_KEYWORDS =
  "partage de colis, transport collaboratif, envoi économique, bagages voyageurs, expédition sécurisée, transport colis pas cher";

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <Head>
        <title>{`${SITE_NAME} - Simplifiez le partage de colis et bagages entre voyageurs`}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="keywords" content={SITE_KEYWORDS} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="author" content="Kilo-Share Team" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#ffffff" />

        {/* OpenGraph */}
        <meta property="og:title" content={`${SITE_NAME} - Partage de colis et bagages`} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/logo.png`} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:alt" content="Kilo-share Preview" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${SITE_NAME} - Partage de colis et bagages`} />
        <meta name="twitter:description" content="Facilitez vos envois avec un service sécurisé et économique." />
        <meta name="twitter:image" content={`${SITE_URL}/logo.png`} />
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
