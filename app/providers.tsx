"use client";

import { AuthProvider } from "@/context/AuthContext";
import { PeopleProvider } from "@/context/PeopleContext";
import { EventProvider } from "@/context/EventContext";

export function Providers(props: { children: React.ReactNode }) {
  return (
    <EventProvider>
      <PeopleProvider>
        <AuthProvider>{props.children}</AuthProvider>
      </PeopleProvider>
    </EventProvider>
  );
}
