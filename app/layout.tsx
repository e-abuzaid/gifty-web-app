import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Gifty",
  description: "Get creative ideas for personalized gifts for your loved ones",
};

export default function RootLayout(props: {
  children: React.ReactNode;
  addPersonModal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#22004b]">
        <Providers>
          <Navbar />
          {props.addPersonModal}
          {props.children}
        </Providers>
      </body>
    </html>
  );
}
