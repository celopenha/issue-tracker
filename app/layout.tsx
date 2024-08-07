import "./globals.css";
import NavBar from "./navbar";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <NavBar />
          <main className="p-6">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
