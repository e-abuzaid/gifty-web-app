import SignIn from "@/components/SignIn";
import Hero from "@/components/landingPage/Hero";
import Ribbon from "@/assets/ribbon.png";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex md:flex-row flex-col items-center md:h-screen justify-around md:p-24 px-2 pt-5 relative">
      <Image
        src={Ribbon}
        alt="ribbon"
        className="absolute w-[300px] left-0 top-0 opacity-20"
      />
      <Image
        src={Ribbon}
        alt="ribbon"
        className="absolute w-[300px] right-0 bottom-0 opacity-20"
      />
      <Hero />
      <SignIn />
    </main>
  );
}
