import { Event } from "@/types/types";
import { addAndSortByDate } from "@/utils";
import { createContext, useContext, useState } from "react";

type eventContextType = {
  events?: Event[] | null;
  setAllEvents: (events: Event[]) => void;
};

const eventContextDefaultValues: eventContextType = {
  events: null,
  setAllEvents: () => {},
};

const EventContext = createContext<eventContextType>(eventContextDefaultValues);

export function useEvent() {
  return useContext(EventContext);
}

type Props = {
  children: React.ReactNode;
};

export function EventProvider({ children }: Props) {
  const [events, setEvents] = useState<Event[] | null>([]);
  const setAllEvents = (events: Event[]) => {
    const updatedEvents = addAndSortByDate(events);
    setEvents(updatedEvents);
  };

  const value = {
    events,
    setAllEvents,
  };
  return (
    <>
      <EventContext.Provider value={value}>{children}</EventContext.Provider>
    </>
  );
}
