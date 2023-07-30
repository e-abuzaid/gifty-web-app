import { getPerson } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Person } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = { id: string };

const Person = ({ id }: Props) => {
  const { user } = useAuth();
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    if (user) {
      const fetchPerson = async () => {
        const result = await getPerson(id, user._id);
        console.log(result);
        setPerson(result);
      };
      fetchPerson();
    }
  }, []);

  if (!person) return null;

  console.log(person);

  return (
    <div className="flex flex-col items-center w-[50px] m-3">
      <Link href={`/person/${person._id}`}>
        {person?.picture ? (
          <Image
            className="w-[50px] h-[50px] hover:w-[55px] duration-100 cursor-pointer rounded-full"
            width={60}
            height={60}
            src={person.picture}
            alt={person.name}
          />
        ) : (
          <h1 className="p-1 w-[50px] hover:bg-gray-200 hover:w-[55px] hover:h-[55px] duration-100 cursor-pointer h-[50px] flex items-center justify-center text-2xl font-semibold bg-gray-300 rounded-full text-[#875fb6]">
            {person.name.charAt(0)}
          </h1>
        )}
      </Link>

      <h2 className="text-white text-md font-bold">{person.name}</h2>
    </div>
  );
};

export default Person;
