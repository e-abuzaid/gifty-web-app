import AddEventForm from "@/components/AddEventForm";
import AddPersonForm from "@/components/AddPersonForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex flex-col items-center bg-[#875fb6] h-[100vh] pt-20 relative">
      <Link href="/" className="absolute top-[130px] md:left-10 left-2">
        <ChevronLeft color="white" />
      </Link>
      <h1 className="text-3xl font-bold text-white mb-5">Add an event</h1>
      <AddEventForm />
    </div>
  );
};

export default page;
