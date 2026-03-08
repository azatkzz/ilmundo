import type { Metadata } from "next";
import { DM_Serif_Display, Instrument_Serif, Sora } from "next/font/google";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sora = Sora({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ilmundo — Knowledge Without Borders",
  description:
    "Premium education consultancy empowering Malaysian students to thrive academically and holistically. Rooted in Malaysian values, shaped by a global perspective.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSerifDisplay.variable} ${instrumentSerif.variable} ${sora.variable}`}>
        {children}
      </body>
    </html>
  );
}