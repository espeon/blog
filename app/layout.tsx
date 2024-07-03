import "./globals.css";
import { IBM_Plex_Mono, Figtree } from "next/font/google";
import { Providers } from "./providers";
import Footer from "./components/footer";

const mono = IBM_Plex_Mono({
  weight: "300",
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
          <div className="dark:bg-black bg-slate-200 dark:text-slate-300 text-black transition-all h-screen overflow-x-hidden flex justify-center">
            <div className="flex flex-col w-screen max-w-prose px-2">
              <div className="max-w-prose flex-1">
                {children}
              </div>
              <div className="w-full">
                <Footer />
              </div>
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
