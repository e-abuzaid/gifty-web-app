"use client";

import { getPeople } from "@/api";
import Events from "@/components/Events";
import People from "@/components/People";
import HomeHero from "@/components/homePage/HomeHero";
import ProductsContainer from "@/components/homePage/ProductsContainer";
import { useAuth } from "@/context/AuthContext";
import { usePeople } from "@/context/PeopleContext";
import React, { useEffect } from "react";

type Props = {};

const page = (props: Props) => {
  const { user } = useAuth();
  const { setAll, people } = usePeople();
  if (!user) return null;
  useEffect(() => {
    const fetchPeople = async () => {
      const allPeople = await getPeople(user._id);
      setAll(allPeople);
    };
    fetchPeople();
  }, []);
  return (
    <div className="h-full w-full bg-[#22004b]">
      <HomeHero />
      <Events />
      <People />
      <ProductsContainer />
    </div>
  );
};

export default page;
