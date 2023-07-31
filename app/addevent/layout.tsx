import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Event",
  description: "Add a new event to your network",
};

const layout = (props: { children: React.ReactNode }) => {
  return <div>{props.children}</div>;
};

export default layout;
