import "./globals.css";
import NavBar from "./navbar";
import "./theme-config.css";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Theme appearance="light">
          <NavBar />
          <main className="p-6 max-w-screen-xl">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
