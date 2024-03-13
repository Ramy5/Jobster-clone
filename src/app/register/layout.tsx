import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../normalize.css";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalLayout from "@/components/GlobalLayout";
import SharedLayout from "@/components/sharedLayout/SharedLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Register",
  description: "Register to create an account",
  icons: {
    icon: "favicon.ico",
    shortcut: "favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalLayout>
          {children}
          <ToastContainer position="top-center" />
        </GlobalLayout>
      </body>
    </html>
  );
}
