"use client";

import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { PeopleProvider } from "@/context/PeopleContext";
import { EventProvider } from "@/context/EventContext";

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
        <EventProvider>
          <PeopleProvider>
            <AuthProvider>
              <Navbar />
              {props.addPersonModal}
              {props.children}
            </AuthProvider>
          </PeopleProvider>
        </EventProvider>
      </body>
    </html>
  );
}
