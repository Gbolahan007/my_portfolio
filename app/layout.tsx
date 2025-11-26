import type { Metadata } from "next";
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SplashScreen from "./ui/SplashScreen";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gbolahandev.vercel.app/"),

  title: {
    default: "Lawal Omogbolahan — Frontend Developer & React",
    template: "%s | Lawal Omogbolahan",
  },

  description:
    "I am a passionate Frontend Developer specializing in React, Next.js, and modern UI engineering. I build fast, responsive, accessible, and SEO-optimized websites with exceptional user experience.",

  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer Portfolio",
    "JavaScript Developer",
    "Freelance Web Developer",
    "UI Engineer",
    "Tailwind CSS",
    "React",
    "Next.js",
    "Lawal Omogbolahan",
  ],

  authors: [
    { name: "Lawal Omogbolahan", url: "https://gbolahandev.vercel.app/" },
  ],

  creator: "Lawal Omogbolahan",
  publisher: "Lawal Omogbolahan",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gbolahandev.vercel.app/",
    siteName: "Lawal Omogbolahan Portfolio",
    title: "Lawal Omogbolahan — Frontend Developer & React",
    description:
      "Modern, responsive, and high-performance websites built with React and Next.js. View my projects, skills, and experience.",
    images: [
      {
        url: "/fav.jpg",
        width: 1200,
        height: 630,
        alt: "Lawal Omogbolahan — Portfolio Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Lawal Omogbolahan — Frontend Developer",
    description:
      "Explore my portfolio showcasing modern React, Next.js, and frontend engineering projects.",
    images: ["/fav.jpg"],
    creator: "https://wa.me/2348161554055",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://gbolahandev.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },

      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SplashScreen />
        <div className={`${bebas.className}`}>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
