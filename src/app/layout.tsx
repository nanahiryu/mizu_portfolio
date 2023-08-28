import Header from "@/components/header";
import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Amiko } from "next/font/google";

const amiko = Amiko({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mizuki portfolio",
  description: "mizuのportfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={amiko.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
