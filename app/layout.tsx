import "./globals.css";
import { IBM_Plex_Mono, Figtree } from "next/font/google";
import { Providers } from "./providers";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Conditional } from "@/components/shader/conditional";
import { Suspense } from "react";
import Gradient from "@/components/shader/gradient-importer";

const mono = IBM_Plex_Mono({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});
const poly = Figtree({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-figtree",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${poly.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <div className="dark:text-neutral-200 text-black transition-all h-screen overflow-x-hidden flex justify-center">
            <div
              className={`fixed left-0 top-0 w-screen h-screen bg-pink-100 dark:bg-neutral-900 transition-opacity duration-1000 -z-30`}
            />
            <Conditional
              paths={["/", "/projects", "/guestbook", "/uses"]}
              defaultComponent={<></>}
            >
              <Suspense>
                <Gradient />
              </Suspense>
            </Conditional>
            <div className="px-4 py-5 mx-2 mb-8 sm:px-6 max-w-full max-h-full md:max-w-screen-xl">
              <Conditional
                paths={["/", "/projects"]}
                defaultComponent={
                  <div className="max-w-prose w-screen pt-10 transition-all duration-1000"></div>
                }
              >
                <div className="pt-12 md:pt-10 lg:pt-20 xl:pt-32 2xl:pt-40 transition-all duration-1000" />
              </Conditional>
              <Header />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  title: "natalie's website",
  // good description for seo
  description: " ",
};
