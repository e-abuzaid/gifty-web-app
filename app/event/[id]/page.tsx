"use client";

import { getEvent, getPerson } from "@/api";
import PersonGifts from "@/components/PersonGifts";
import { Button } from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { useAuth } from "@/context/AuthContext";
import { Event, Person } from "@/types/types";
import { calculateTimeRemaining } from "@/utils";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params }: Props) => {
  const { user } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [title, setTitle] = useState("");
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    if (user) {
      const fetchEvent = async () => {
        const result = await getEvent(params.id, user._id);
        console.log(result);
        setEvent(result);
      };
      fetchEvent();
    }
  }, []);

  useEffect(() => {
    if (event) {
      const time = calculateTimeRemaining(event.date);
      const timeRemainingInText = `Coming in ${
        time > 30
          ? `${Math.floor(time / 30)} ${
              Math.floor(time / 30) > 1 ? "months" : "month"
            } & ${time % 30} ${time % 30 > 1 ? "days" : "day"}`
          : `${time} ${time > 1 ? "days" : "day"}`
      }`;

      setTimeRemaining(timeRemainingInText);
    }
  }, [event]);

  useEffect(() => {
    const fetchPeople = async () => {
      let peopleTemp = [];
      if (event && user) {
        for (let person of event.people) {
          const response = await getPerson(person, user._id);
          peopleTemp.push(response);
        }
        setPeople(peopleTemp);
        console.log(people);
      }
    };
    fetchPeople();
  }, [event]);

  useEffect(() => {
    if (event && people) {
      switch (event.name) {
        case "Anniversary":
          setTitle(`Anniversary with ${people[0].name}`);
          break;
        case "Valentine's":
          setTitle(`Valentine's with ${people[0].name}`);
          break;
        case "Birthday":
          setTitle(`${people[0].name}'s Birthday`);
          break;
        default:
          setTitle(event.name);
          break;
      }
    }
  }, [event, people]);

  if (!event || !people)
    return (
      <div className="p-20 flex justify-center items-center h-[100vh] w-full">
        <Loader color="#875fb6" height={50} width={50} />
      </div>
    );
  console.log(event);
  console.log(people);

  return (
    <div>
      <div className="md:h-[80vh] h-[50vh] overflow-hidden">
        {event.picture && (
          <Image
            src={event?.picture ? event.picture : ""}
            alt={event?.name}
            width={1024}
            height={1024}
            className="w-full md:h-[100vh] h-[50vh]"
          />
        )}
        <div className="bg-[#000]/60 absolute md:p-10 p-4 overflow-hidden top-0 w-full md:h-[80vh] h-[50vh] flex md:flex-row flex-col items-center md:justify-around justify-center border-none">
          <h1 className="text-white md:text-8xl text-5xl md:m-0 mt-10 font-bold">
            {title}
          </h1>
          <div className="md:w-[50%] h-full flex flex-row items-end justify-between p-10">
            <div className="">
              <div className="flex absolute bottom-5 left-5">
                <Link href={`/event/${params.id}/edit`} className="mr-2">
                  <Edit2Icon color="lightgray" />
                </Link>
                <button>
                  <Trash2Icon color="lightgray" />
                </button>
              </div>
              <h2 className="text-gray-400 md:text-6xl text-2xl w-full font-semibold">
                {timeRemaining}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-2 flex flex-nowrap overflow-x-scroll scrollbar-hide p-4">
        {people.map((person) => (
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
        ))}
      </div>
      <div>
        {people.map((person) => (
          <PersonGifts person={person} event={event} />
        ))}
      </div>
    </div>
  );
};

export default page;
