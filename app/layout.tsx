import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: "Engineering Experiments",
  description: "This project is a public documentaion of me experimenting with design engineering.",
  
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },

  openGraph: {
    title: "Engineering Experiments",
    description: "This project is a public documentaion of me experimenting with design engineering.",
    images: '/opengraph.png',
    url: "https://engineering-experiments.vercel.app/"
  },

  twitter: {
    card: "summary_large_image",
    title: "Engineering Experiments",
    description: "This project is a public documentaion of me experimenting with design engineering.",
    images: '/opengraph.png',
  }
 
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full flex items-center px-4 md:px-0 mx-auto">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
