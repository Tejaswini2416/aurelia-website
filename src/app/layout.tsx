import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/site-shell";
import { StoreProvider } from "@/components/store-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AURELIA Fine Jewelry | Made to be lived in",
    template: "%s | AURELIA Fine Jewelry",
  },
  description:
    "Thoughtfully made fine jewelry for all the moments that become everything. Discover considered rings, necklaces, earrings, and more.",
  applicationName: "AURELIA Fine Jewelry",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body>
        <StoreProvider><SiteShell>{children}</SiteShell></StoreProvider>
      </body>
    </html>
  );
}
