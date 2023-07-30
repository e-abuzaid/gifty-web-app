"use client";

import { useEvent } from "@/context/EventContext";
import React from "react";
import Event from "./Event";
import Link from "next/link";

type Props = {};

const Events = (props: Props) => {
  const { events } = useEvent();

  if (!events?.length) return null;
  return (
    <div className="p-4">
      <h1 className="md:text-5xl text-3xl font-bold text-white">
        Upcoming Events
      </h1>
      <div className="p-4 pt-6 flex items-center flex-nowrap overflow-x-scroll scrollbar-hide">
        <Link href="/addevent">
          <h1 className="p-1 mt-3 w-[50px] text-center hover:bg-gray-200 hover:w-[55px] hover:h-[55px] duration-100 cursor-pointer h-[50px] flex items-center justify-center text-2xl font-extrabold bg-gray-300 rounded-full text-[#875fb6]">
            +
          </h1>
        </Link>
        {events.map((event) => (
          <Event key={event._id} id={event._id!} />
        ))}
      </div>
    </div>
  );
};

export default Events;
