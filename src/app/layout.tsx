import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/toaster";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "To do App",
  description: "Todo app with prisma,T3 stack ",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
          <Toaster />
          <TRPCReactProvider>
            <SidebarProvider>
              <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
          </TRPCReactProvider>
      </body>
    </html>
  );
}
