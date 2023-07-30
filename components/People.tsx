import { usePeople } from "@/context/PeopleContext";
import React from "react";
import Person from "./Person";
import Link from "next/link";

type Props = {};

const People = (props: Props) => {
  const { people } = usePeople();
  console.log(people);

  if (!people) return null;
  return (
    <div className="p-4">
      <h1 className="md:text-5xl text-3xl font-bold text-white">
        People you care about
      </h1>
      <div className="pt-2 flex flex-nowrap overflow-x-scroll scrollbar-hide">
        <Link href="/addperson">
          <h1 className="p-1 mt-3 w-[50px] text-center hover:bg-gray-200 hover:w-[55px] hover:h-[55px] duration-100 cursor-pointer h-[50px] flex items-center justify-center text-2xl font-extrabold bg-gray-300 rounded-full text-[#875fb6]">
            +
          </h1>
        </Link>
        {people?.map((person) => (
          <Person id={person._id!} />
        ))}
      </div>
    </div>
  );
};

export default People;
