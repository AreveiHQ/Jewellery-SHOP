import localFont from "next/font/local";

import "../styles/globals.css";
import ClientLayout from "./ClientLayout";

// Define custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata for your application
export const metadata = {
  title: "Jenii - Jewelry App",
  description: "Generated by create next app",
};

// Layout component (Server Component)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout> {/* Client logic here */}
      </body>
    </html>
  );
}
