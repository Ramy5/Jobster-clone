import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../normalize.css";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalLayout from "@/components/GlobalLayout";
import { SharedLayout } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "All Jobs",
  description: "Show all available jobs",
  icons: {
    icon: "../favicon.ico",
    shortcut: "../favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalLayout>
      <SharedLayout>{children}</SharedLayout>
      <ToastContainer position="top-center" />
    </GlobalLayout>
  );
}
