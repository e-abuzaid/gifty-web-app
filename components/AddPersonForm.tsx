"use client";

import React, { ReactEventHandler, useState } from "react";
import Image from "next/image";
import { createPerson, signup, uploadImage } from "@/api";
import { MutatingDots } from "react-loader-spinner";
import { Person } from "@/types/types";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Input, inputVariants } from "@/components/ui/Input";
import { genders, relationships } from "@/config";
import { useAuth } from "@/context/AuthContext";

type Props = {};

const AddPersonForm = (props: Props) => {
  const [formData, setFormData] = useState<Person>({
    user: "",
    name: "",
    dob: "",
    gender: "Male",
    relationship: "Sibling",
    anniversary: "",
    picture: "",
    occupation: "",
    interests: [],
  });
  const [loadingImg, setLoadingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [interest, setInterest] = useState("");

  const { user } = useAuth();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!user) throw new Error();
      setFormData({ ...formData, user: user?._id });
      const response = await createPerson(formData);
      if (response._id) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
          placeholder="Date of Birth"
          onChange={handleChange}
          name="dob"
          type="text"
        />
        <Input
          className="m-2 border-[#22004b]"
          placeholder="Occupation"
          name="occupation"
          onChange={handleChange}
          type="text"
        />
        <select
          className={inputVariants()}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          {genders.map((gender) => (
            <option className="bg-[#875fb6] p-10">{gender}</option>
          ))}
        </select>
        <select
          className={inputVariants()}
          onChange={(e) =>
            setFormData({ ...formData, relationship: e.target.value })
          }
        >
          {relationships.map((rel) => (
            <option className="bg-[#875fb6] p-10">{rel}</option>
          ))}
        </select>
        {formData.relationship === "Partner" && (
          <Input
            className="m-2 border-[#22004b]"
            placeholder="Anniversary"
            name="anniversary"
            onChange={handleChange}
            type="text"
          />
        )}
        <div className="flex justify-between my-[5px]">
          <Input
            className="m-2 border-[#22004b]"
            placeholder="Add an interest"
            name="interest"
            onChange={(e) => setInterest(e.target.value)}
            type="text"
          />
          <Button
            variant="primary"
            onClick={() => {
              setFormData({
                ...formData,
                interests: [...formData?.interests, interest],
              });
              setInterest("");
            }}
          >
            Add Interest
          </Button>
        </div>
        <div className="flex flex-wrap w-[80%]">
          {formData.interests &&
            formData.interests.map((interest) => (
              <p className="p-2 bg-gray-300 m-1 pr-3 rounded-full">
                {interest}{" "}
                <span
                  className="cursor-pointer font-semibold"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      interests: formData.interests?.filter(
                        (cur) => cur !== interest
                      ),
                    })
                  }
                >
                  x
                </span>
              </p>
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

export default AddPersonForm;
