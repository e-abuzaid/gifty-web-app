"use client";

import React, { useState } from "react";
import { Input } from "./ui/Input";
import { Button, buttonVariants } from "./ui/Button";
import { Icons } from "./icons";
import { signin } from "@/api";
import { useAuth } from "@/context/AuthContext";
import Loader from "./ui/Loader";
import { useRouter } from "next/navigation";

type Props = {};

const SigninForm = (props: Props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(formData);
      const response = await signin(formData);
      if (response.result._id) {
        login(response.result, response.token);
        router.push("home");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-white mb-5">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center md:w-[20%]"
      >
        <Input
          onChange={handleChange}
          name="email"
          className="m-2 w-full"
          placeholder="Email"
          type="email"
        />
        <Input
          name="password"
          onChange={handleChange}
          className="m-2 w-full"
          placeholder="Password"
          type="password"
        />
        <Button type="submit" variant="primary" className="w-60 m-2">
          {loading ? <Loader color="#fff" secondaryColor="#ddd" /> : "Sign In"}
        </Button>
        <Button type="button" className="w-60 m-2">
          <Icons.google className="h-4 w-4 mr-2" />
          Sign In with Google
        </Button>
      </form>
    </>
  );
};

export default SigninForm;
