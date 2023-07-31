"use client";

import {
  getEvent,
  getPerson,
  updateEvent,
  updatePerson,
  uploadImage,
} from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Event, Person } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Female from "@/assets/female-placeholder.png";
import Male from "@/assets/male-placeholder.png";
import Image from "next/image";
import {
  ChevronLeft,
  Edit2Icon,
  Trash2Icon,
  UploadCloud,
  UploadCloudIcon,
} from "lucide-react";
import Link from "next/link";
import { Input, inputVariants } from "@/components/ui/Input";
import { genders, relationships } from "@/config";
import { Button } from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { usePeople } from "@/context/PeopleContext";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params }: Props) => {
  const { user } = useAuth();
  const { people } = usePeople();
  const [event, setEvent] = useState<Event | null>(null);
  const [eventPeople, setEventPeople] = useState([]);
  const [formData, setFormData] = useState<Event>({
    user: "",
    name: "",
    date: "",
    picture: "",
    people: [],
  });
  const [loadingImg, setLoadingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      const fetchEvent = async () => {
        const result = await getEvent(params.id, user._id);
        console.log(result);
        setEvent(result);
        setFormData({
          _id: result._id,
          user: result.user,
          name: result.name,
          date: result.date,
          picture: result?.picture,
          people: [...result?.people],
        });
      };
      fetchEvent();
    }
  }, []);

  //   useEffect(() => {
  //     const fetchPeople = async () => {
  //       let peopleTemp = [];
  //       if (event && user) {
  //         for (let person of event.people) {
  //           const response = await getPerson(person, user._id);
  //           peopleTemp.push(response);
  //         }
  //         setEventPeople(peopleTemp);
  //       }
  //     };
  //     fetchPeople();
  //   }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingImg(true);
    console.log(loadingImg);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const url = await uploadImage(reader.result);
      setFormData({ ...formData, picture: url });
      setLoadingImg(false);
    };
    if (e.target.files) {
      const file = e.target.files[0];
      reader.readAsDataURL(file);
    }
  };

  const handlePersonAdd = (id: string) => {
    if (formData?.people?.includes(id)) {
      setFormData({
        ...formData,
        people: formData.people?.filter((cur) => cur !== id),
      });
    } else {
      setFormData({ ...formData, people: [...formData.people, id] });
    }
    console.log(formData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!user || !event) throw new Error();
      setFormData({ ...formData, user: user?._id });
      const response = await updateEvent(formData, event._id!);
      if (response._id) {
        console.log(response);
        router.push(`/event/${event._id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!event || !people)
    return (
      <div className="p-20 flex justify-center items-center h-[100vh] w-full">
        <Loader color="#875fb6" height={50} width={50} />
      </div>
    );

  if (loading)
    return (
      <div className="p-20 flex justify-center items-center h-[100vh] w-full">
        <Loader color="#875fb6" height={50} width={50} />
      </div>
    );

  return (
    <form
      className="flex justify-around items-center relative w-full"
      onSubmit={handleSubmit}
    >
      <div className="flex absolute top-40 left-20">
        <Link href={`/person/${params.id}`} className="mr-2">
          <ChevronLeft color="lightgray" />
        </Link>
      </div>
      <div>
        <div className="md:h-[80vh] h-[50vh] overflow-hidden">
          {event.picture && (
            <Image
              src={formData?.picture ? formData.picture : ""}
              alt={event?.name}
              width={1024}
              height={1024}
              className="w-[100vw] md:h-[100vh] h-[50vh]"
            />
          )}
          <div className="bg-[#000]/60 absolute px-10 overflow-hidden top-0 w-full md:h-[80vh] h-[50vh] flex md:flex-row flex-col items-center justify-around border-none">
            <input
              className="border-[#875fb6] md:w-[50%] w-[100%] focus:outline-none border-b pb-2 md:text-8xl text-5xl md:m-0 mt-20 font-semibold h-20 bg-transparent text-white"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              name="name"
              type="text"
            />
            <div className="w-[40%] h-full flex flex-row items-end justify-between p-10">
              <div className="">
                <div className="flex absolute bottom-5 left-5">
                  <label
                    htmlFor="image"
                    className="cursor-pointer absolute bottom-0 left-0 bg-gradient-to-t from-[#33333330] to-transparent p-4 rounded-md"
                  >
                    {loadingImg ? (
                      <Loader color="#ffffff" />
                    ) : (
                      <UploadCloudIcon color="lightgray" />
                    )}
                  </label>
                  <input
                    id="image"
                    className="hidden"
                    type="file"
                    onChange={handlePhotoAdd}
                  />
                </div>
                <input
                  className="border-[#875fb6] max-w-fit font-semibold focus:outline-none border-b md:pb-2 md:text-4xl text-xl h-20 bg-transparent text-white"
                  placeholder="dd/mm/yyyy"
                  value={formData.date}
                  onChange={handleChange}
                  name="date"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-2 flex flex-nowrap overflow-x-scroll scrollbar-hide">
          {people?.map((person) => (
            <div onClick={() => handlePersonAdd(person._id!)}>
              <div className="flex flex-col items-center w-[50px] m-3">
                {person?.picture ? (
                  <Image
                    className={`${
                      formData.people.includes(person._id!) &&
                      "border-4 border-white w-[55px] h-[55px]"
                    } p-1 w-[50px] hover:bg-gray-200 hover:w-[55px] hover:h-[55px] duration-100 cursor-pointer h-[50px] flex items-center justify-center text-2xl font-semibold bg-gray-300 rounded-full text-[#875fb6]`}
                    width={50}
                    height={50}
                    src={person.picture}
                    alt={person.name}
                  />
                ) : (
                  <h1
                    className={`${
                      formData.people.includes(person._id!) &&
                      "border-4 border-white w-[55px] h-[55px]"
                    } p-1 w-[50px] hover:bg-gray-200 hover:w-[55px] hover:h-[55px] duration-100 cursor-pointer h-[50px] flex items-center justify-center text-2xl font-semibold bg-gray-300 rounded-full text-[#875fb6]`}
                  >
                    {person.name.charAt(0)}
                  </h1>
                )}
                <h2 className="text-white text-md font-bold">{person.name}</h2>
              </div>
            </div>
          ))}
        </div>
        <Button className="m-4" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default page;
