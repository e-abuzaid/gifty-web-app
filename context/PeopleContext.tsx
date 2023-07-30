import { Person } from "@/types/types";
import { createContext, useContext, useState } from "react";

type peopleContextType = {
  people?: Person[] | null;
  setAll: (people: Person[]) => void;
};

const peopleContextDefaultValues: peopleContextType = {
  people: null,
  setAll: () => {},
};

const PeopleContext = createContext<peopleContextType>(
  peopleContextDefaultValues
);

export function usePeople() {
  return useContext(PeopleContext);
}

type Props = {
  children: React.ReactNode;
};

export function PeopleProvider({ children }: Props) {
  const [people, setPeople] = useState<Person[] | null>([]);
  const setAll = (people: Person[]) => {
    setPeople(people);
  };

  const value = {
    people,
    setAll,
  };
  return (
    <>
      <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
    </>
  );
}
