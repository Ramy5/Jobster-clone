import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./normalize.css";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalLayout from "@/components/GlobalLayout";
import SharedLayout from "@/components/sharedLayout/SharedLayout";

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
  title: "Jobster",
  description: "Post a job or view any job",
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
    <html lang="en">
      <body className={inter.className}>
        <GlobalLayout>
          <SharedLayout>{children}</SharedLayout>
          <ToastContainer position="top-center" />
        </GlobalLayout>
      </body>
    </html>
  );
}
