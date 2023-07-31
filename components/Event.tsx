import { getEvent, getPerson } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Event, Person } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "./ui/Loader";

type Props = {
  id: string;
};

const Event = ({ id }: Props) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [person, setPerson] = useState<Person | null>(null);
  const [title, setTitle] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      const fetchEvent = async () => {
        const result = await getEvent(id, user._id);
        setEvent(result);
      };
      fetchEvent();
    }
  }, []);

  useEffect(() => {
    const fetchPerson = async () => {
      if (event && user) {
        const response = await getPerson(event.people[0], user._id);
        setPerson(response);
      }
    };
    fetchPerson();
  }, [event]);

  useEffect(() => {
    if (event && person) {
      switch (event.name) {
        case "Anniversary":
          setTitle(`Anniversary with ${person.name}`);
          break;
        case "Valentine's":
          setTitle(`Valentine's with ${person.name}`);
          break;
        case "Birthday":
          setTitle(`${person.name}'s Birthday`);
          break;
        default:
          setTitle(event.name);
          break;
      }
    }
  }, [event, person]);

  if (!user || !event || !title)
    return (
      <div className="p-20 flex justify-center items-center h-[300px] md:min-w-[300px] min-w-[200px]">
        <Loader color="#875fb6" height={50} width={50} />
      </div>
    );
  return (
    <Link
      href={`/event/${event._id}`}
      className="relative cursor-pointer md:min-w-[300px] min-w-[200px] mx-4"
    >
      <Image
        src={event.picture!}
        alt={event.name}
        width={200}
        height={200}
        className="w-full h-[300px]"
      />
      <div className="bg-[#000]/60 hover:bg-[#000]/40 duration-100  absolute flex flex-col top-0 w-full h-[300px] items-center justify-around border-none">
        <h2 className="text-white text-center text-3xl font-bold">{title}</h2>
        <h2 className="text-white text-xl font-semibold">{event.date}</h2>
      </div>
    </Link>
  );
};

export default Event;
