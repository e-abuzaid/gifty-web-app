"use client";

import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  user: User;
};

const UserAccountNav = ({ user }: Props) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <div className="relative">
      {user.picture ? (
        <Image
          onClick={() => setToggleMenu((prevToggleMenu) => !prevToggleMenu)}
          className="w-[50px] cursor-pointer h-[50px] rounded-full"
          width={50}
          height={50}
          src={user.picture}
          alt={user.name}
        />
      ) : (
        <h1
          onClick={() => setToggleMenu((prevToggleMenu) => !prevToggleMenu)}
          className="p-1 w-[50px] cursor-pointer h-[50px] flex items-center justify-center text-2xl font-semibold bg-gray-300 rounded-full text-[#875fb6]"
        >
          {user.name.charAt(0)}
        </h1>
      )}
      {toggleMenu && (
        <div className="flex flex-col rounded-lg items-center bg-[#875fb6] w-40 absolute right-0 top-[60px]">
          <Link
            href="/home"
            className="p-2 text-gray-300 border-gray-300 border-b w-full text-center font-semibold hover:rounded-lg hover:bg-[#986fc7] duration-150"
          >
            Home
          </Link>
          <Link
            href={`/${user._id}`}
            className="p-2 text-gray-300 border-gray-300 border-b w-full text-center font-semibold hover:rounded-lg hover:bg-[#986fc7] duration-150"
          >
            Profile
          </Link>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="p-2 text-gray-300  w-full text-center font-semibold hover:rounded-lg hover:bg-[#986fc7] duration-150"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAccountNav;
