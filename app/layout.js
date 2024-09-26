import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { Lexend_Deca } from "next/font/google";

export const lexend_deca = Lexend_Deca({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Song List",
  description: "A collection of songs for students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lexend_deca.className}>
        <Header />
        <div className="h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
