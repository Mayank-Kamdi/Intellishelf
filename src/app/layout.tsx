import type { Metadata } from "next";
import { Space_Grotesk, Inter, Playfair_Display } from "next/font/google";
import MusicPlayer from "@/components/music/MusicPlayer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "IntelliShelf | Every Shelf Holds a Story",
  description: "Experience the future of digital libraries. Interact with books naturally using AI voice search, semantic filters, and immersive 3D bookshelf visuals.",
  keywords: ["IntelliShelf", "3D Library", "AI Assistant", "Smart Reservation", "Overdue Dashboard", "Reading Analytics"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-screen w-full flex flex-col bg-[#DFD0B8]">
        <MusicPlayer />
        {children}
      </body>
    </html>
  );
}
