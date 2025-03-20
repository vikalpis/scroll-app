import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./component/Providers";
import Header from "./component/Header";
import { NotificationProvider } from "./component/Notification";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ImageKit Next.js Integration",
  description: "Demo of ImageKit integration with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationProvider>
        <Providers>
          <Header />
          <main className=" container mx-auto px-4 py-8">{children}</main>
        </Providers>
        </NotificationProvider>
      </body>
    </html>
  );
}