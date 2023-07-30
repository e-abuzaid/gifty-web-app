"use client";

import React, { ReactEventHandler, useState } from "react";
import { Input } from "./ui/Input";
import { Button, buttonVariants } from "./ui/Button";
import { Icons } from "./icons";
import Image from "next/image";
import { signup, uploadImage } from "@/api";
import { MutatingDots } from "react-loader-spinner";
import { SignupForm } from "@/types/types";

type Props = {};

const SignupForm = (props: Props) => {
  const [formData, setFormData] = useState<SignupForm>({
    firstName: "",
    lastName: "",
    picture: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [base64Url, setBase64Url] = useState<string | ArrayBuffer | null>("");
  const [loadingImg, setLoadingImg] = useState(false);
  const [loading, setLoading] = useState(false);

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
      const response = await signup(formData);
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
    <>
      <h1 className="text-3xl font-bold text-white mb-5">Sign Up</h1>

      <form
        className="flex md:flex-row flex-col-reverse items-center md:justify-around md:w-[40%] w-[80%]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <Input
            className="m-2 border-[#22004b]"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            type="text"
          />
          <Input
            className="m-2 border-[#22004b]"
            placeholder="Last Name"
            onChange={handleChange}
            name="lastName"
            type="text"
          />
          <Input
            className="m-2 border-[#22004b]"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            type="email"
          />
          <Input
            className="m-2 border-[#22004b]"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            type="password"
          />
          <Input
            className="margin-3 border-[#22004b]"
            placeholder="Repeat Password"
            name="repeatPassword"
            onChange={handleChange}
            type="password"
          />
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
              "Sign Up"
            )}
          </Button>
          <Button type="button" className="w-60 m-2">
            <Icons.google className="h-4 w-4 mr-2" />
            Sign Up with Google
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
    </>
  );
};

export default SignupForm;
