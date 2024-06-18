import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whether Dashboard",
  description: "Real-time weather data dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className }>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
            {children}
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
