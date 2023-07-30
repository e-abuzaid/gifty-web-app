"use client";

import { getPerson } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Person } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Female from "@/assets/female-placeholder.png";
import Male from "@/assets/male-placeholder.png";
import Image from "next/image";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params }: Props) => {
  const { user } = useAuth();
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    if (user) {
      const fetchPerson = async () => {
        const result = await getPerson(params.id, user._id);
        console.log(result);
        setPerson(result);
      };
      fetchPerson();
    }
  }, []);
  if (!person) return null;
  console.log(person);
  return (
    <div className="md:p-20 p-5 pt-20 flex justify-around items-center relative w-full">
      <div className="">
        <h2 className="text-gray-300 md:text-6xl text-5xl font-bold mb-3">
          <span className="text-sm">name:</span> {person.name}
        </h2>
        <h2 className="text-gray-300 md:text-2xl text-xl font-bold mb-3">
          <span className="text-sm">date of birth:</span> {person.dob}
        </h2>
        <h2 className="text-gray-300 md:text-2xl text-xl font-bold mb-3">
          <span className="text-sm">relationship:</span> {person.relationship}
        </h2>
        <h2 className="text-gray-300 md:text-2xl text-xl font-bold mb-3">
          <span className="text-sm">gender:</span> {person.gender}
        </h2>
        <h2 className="text-gray-300 md:text-2xl text-xl font-bold mb-3">
          <span className="text-sm">occupation: </span>
          {person.occupation}
        </h2>
        {person.interests?.length ? (
          <>
            <h2 className="text-gray-300 md:text-2xl text-xl font-bold mb-3">
              Interested in:
            </h2>
            {person.interests?.map((interest, i) => (
              <p
                key={interest + i}
                className="p-2 bg-gray-300 font-semibold m-1 pr-3 max-w-fit rounded-full"
              >
                {interest}
              </p>
            ))}
          </>
        ) : (
          <h2 className="text-gray-300 text-2xl font-bold mb-3">
            {person.name} currently has no interests
          </h2>
        )}
      </div>
      <div className="flex justify-center md:w-[40%]">
        <div className="flex absolute md:top-40 md:left-20 top-[150px] right-5">
          <Link href={`/person/${params.id}/edit`} className="mr-2">
            <Edit2Icon color="lightgray" />
          </Link>
          <button>
            <Trash2Icon color="lightgray" />
          </button>
        </div>
        <Image
          src={
            person.picture
              ? person.picture
              : person.gender === "Male"
              ? Male
              : Female
          }
          alt="profile"
          className="w-full"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

export default page;
