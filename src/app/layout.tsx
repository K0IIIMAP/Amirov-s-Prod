import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { IndicatorProvider } from "./contexts/indicator-context-provider";

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={` antialiased relative overflow-x-hidden 
        `}
      >
        <IndicatorProvider>
          <SessionProvider>
            <div className=" max-w-[1200px] m-auto  ">
              <Header />

              {children}
            </div>
            <Toaster />
          </SessionProvider>
        </IndicatorProvider>
      </body>
    </html>
  );
}
