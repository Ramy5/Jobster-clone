import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../normalize.css";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalLayout, SharedLayout } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  generator: "Next.js",
  applicationName: "Jobster",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "JavaScript", "job", "React.js"],
  authors: [
    { name: "Ramy" },
    { name: "Ramy", url: "https://www.linkedin.com/in/ramy5/" },
  ],
  creator: "Ramy Sabry",
  title: "dashboard",
  description: "dashboard of jobs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
    <GlobalLayout>
      <SharedLayout>
        {children}
        <ToastContainer position="top-center" />
      </SharedLayout>
    </GlobalLayout>
  );
}
