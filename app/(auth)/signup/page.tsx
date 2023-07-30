import SignupForm from "@/components/SignupForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex flex-col items-center bg-[#875fb6] h-[100vh] pt-20 relative">
      <Link href="/" className="absolute top-30 left-10">
        <ChevronLeft color="white" />
      </Link>
      <SignupForm />
      <p>
        Already a member?{" "}
        <Link href="/signin" className="underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default page;
