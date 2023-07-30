"use client";

import { getEvents, getPerson } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { useEvent } from "@/context/EventContext";
import { Person } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { buttonVariants } from "../ui/Button";

type Props = {};

const HomeHero = (props: Props) => {
  const { user } = useAuth();
  const { events, setAllEvents } = useEvent();
  const [person, setPerson] = useState<Person | null>(null);
  const [title, setTitle] = useState("");
  useEffect(() => {
    const fetchEvents = async () => {
      if (user) {
        const currentEvents = await getEvents(user._id);
        setAllEvents(currentEvents);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchPerson = async () => {
      if (events?.length && user) {
        const response = await getPerson(events[0].people[0], user._id);
        setPerson(response);
      }
    };
    fetchPerson();
  }, [events]);

  useEffect(() => {
    if (events?.length && person) {
      switch (events[0].name) {
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
          setTitle(events[0].name);
          break;
      }
    }
  }, [events, person]);

  if (!events) return null;
  console.log(events);
  return (
    <div className="md:h-[80vh] h-[50vh] overflow-hidden">
      {events[0]?.picture && (
        <Image
          src={events[0]?.picture ? events[0].picture : ""}
          alt={events[0]?.name}
          width={1024}
          height={1024}
          className="w-full md:h-[100vh] h-[50vh] "
        />
      )}
      <div className="bg-[#000]/60 absolute overflow-hidden top-0 w-full md:h-[80vh] h-[50vh] flex items-center justify-around border-none">
        <div className="pl-4">
          <h1 className="text-white md:text-8xl mb-20 text-5xl font-bold">
            Hello, <br /> {user?.name.slice(0, user?.name.indexOf(" "))}
          </h1>
          <Link
            href={`/event/${events[0]?._id}`}
            className={`${buttonVariants()} text-center p-2`}
          >
            Explore what you can buy
          </Link>
        </div>
        {events?.length ? (
          <div className="w-[50%] h-full flex flex-row items-end justify-between p-10">
            <div className="">
              <h2 className=" md:text-3xl text-md font-semibold text-gray-400">
                {events[0].timeRemainingInText}
              </h2>
              <h2 className="text-white md:text-6xl text-3xl font-semibold">
                {title}
              </h2>
            </div>
          </div>
        ) : (
          <h2 className="text-gray-300 m-5">
            It seems like you don't have any upcoming events,{" "}
            <Link href="/addperson" className="underline text-gray-200">
              Start adding people to your network
            </Link>
          </h2>
        )}
      </div>
    </div>
  );
};

export default HomeHero;
