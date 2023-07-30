"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/gift-white.png";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/Button";
import { useAuth } from "@/context/AuthContext";
import UserAccountNav from "./UserAccountNav";

type Props = {};

const Navbar = (props: Props) => {
  const { user } = useAuth();
  return (
    <nav className="flex justify-between p-7 inset-x-0 h-fit fixed z-10 top-0 w-full bg-gradient-to-b from-purple-800 to-transparent">
      <Link href="/">
        <Image src={Logo} alt="Gift" width={30} height={30} />
      </Link>
      <div>
        {user ? (
          <UserAccountNav user={user} />
        ) : (
          <Link
            href="/signup"
            className={buttonVariants({ variant: "primary" })}
          >
            Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
