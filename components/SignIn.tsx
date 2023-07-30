"use client";

import SigninForm from "@/components/SigninForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import SignupForm from "./SignupForm";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type Props = {};

const SignIn = (props: Props) => {
  const [isSignIn, setIsSignIn] = useState(true);

  const { user } = useAuth();
  const router = useRouter();

  if (user) router.push("/home");

  return (
    <div className="flex flex-col items-center bg-gradient-to-t from-[#875fb650] to-transparent md:w-[50%] w-[90%] h-[80vh] pt-20 relative">
      {isSignIn ? (
        <>
          <SigninForm />
          <p className="text-gray-200">
            New user?{" "}
            <span
              onClick={() => setIsSignIn(false)}
              className="underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </>
      ) : (
        <>
          <SignupForm />
          <p className="text-gray-200">
            Already have an account?{" "}
            <span
              onClick={() => setIsSignIn(true)}
              className="underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default SignIn;
