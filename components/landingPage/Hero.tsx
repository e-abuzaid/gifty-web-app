import React from "react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="flex flex-col justify-center md:w-[30%] w-full md:h-[100vh] md:m-0 my-20">
      <h1 className="text-white text-8xl font-extrabold md:text-start text-center mb-5">
        Gifty
      </h1>
      <p className="text-white text-lg md:text-start text-center font-semibold">
        Get creative AI-powered ideas for personalized gifts for your loved ones
      </p>
    </div>
  );
};

export default Hero;
