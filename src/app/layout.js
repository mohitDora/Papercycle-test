import Navbar from "@/app/@components/shared/Navbar";
import Footer from "@/app/@components/shared/Footer";
import Layout from "@/app/@components/shared/Layout";
import Head from "next/head";

import "./globals.css";

export const metadata = {
  title: "Papercycle.in | Odisha's 1st and leading digital recycling platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <link rel="shortcut icon" type="image/png" href="./icon.png" />
        </Head>
      <body>
        <Layout>         
          <Navbar />
          <div className="px-8  md:max-w-screen-xl m-auto">{children}</div>
          <Footer />        
        </Layout>
      </body>
    </html>
  );
}