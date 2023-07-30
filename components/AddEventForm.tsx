"use client";

import React, { ReactEventHandler, useState } from "react";
import Image from "next/image";
import { createEvent, createPerson, signup, uploadImage } from "@/api";
import { MutatingDots } from "react-loader-spinner";
import { Event } from "@/types/types";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Input, inputVariants } from "@/components/ui/Input";
import { genders, relationships } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { usePeople } from "@/context/PeopleContext";
import Person from "./Person";

type Props = {};

const AddEventForm = (props: Props) => {
  const [formData, setFormData] = useState<Event>({
    user: "",
    name: "",
    date: "",
    picture: "",
    people: [],
  });
  const [loadingImg, setLoadingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventPeople, setEventPeople] = useState([]);
  const { people } = usePeople();

  const { user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!user) throw new Error();
      setFormData({ ...formData, user: user._id });
      if (!formData.picture) {
        setFormData({
          ...formData,
          user: user._id,
          picture:
            "https://res.cloudinary.com/hz3gmuqw6/image/upload/c_fill,f_auto,q_60,w_750/v1/goldenapron/636d99989fdc2",
        });
      }
      const response = await createEvent(formData);
      if (response._id) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(people);

  if (!people) return null;

  return (
    <form
      className="flex md:flex-row flex-col-reverse items-center md:justify-around md:w-[40%] w-[80%]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <Input
          className="m-2 border-[#22004b]"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          type="text"
        />
        <Input
          className="m-2 border-[#22004b]"
          placeholder="Date"
          onChange={handleChange}
          name="date"
          type="text"
        />
        <div className="pt-2 flex flex-nowrap overflow-x-scroll scrollbar-hide">
          {people?.map((person) => (
            <div onClick={() => handlePersonAdd(person._id!)}>
              <div className="flex flex-col items-center w-[50px] m-3">
                {person?.picture ? (
                  <Image
                    className="w-[50px] cursor-pointer h-[50px] rounded-full"
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
        <Button variant="primary" type="submit" className="w-60 m-2">
          {loading ? (
            <MutatingDots
              color="#22004b"
              secondaryColor="#22004b"
              height="100"
              width="100"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              visible={true}
            />
          ) : (
            "Add"
          )}
        </Button>
      </div>
      <div className="flex justify-center items-center m-3 md:w-[40%] w-[80%] rounded-md bg-gradient-to-b from-[#22004b]/60 to-transparent h-full">
        {loadingImg ? (
          <MutatingDots
            color="#22004b"
            secondaryColor="#22004b"
            height="100"
            width="100"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            visible={true}
          />
        ) : formData.picture ? (
          <Image
            src={formData.picture}
            className="w-full"
            alt="preview"
            width={200}
            height={200}
          />
        ) : (
          <>
            <label
              htmlFor="image"
              className={`${buttonVariants({
                variant: "primary",
              })} cursor-pointer my-2`}
            >
              Upload Picture
            </label>
            <input
              id="image"
              className="hidden"
              type="file"
              onChange={handlePhotoAdd}
            />
          </>
        )}
      </div>
    </form>
  );
};

export default AddEventForm;
