import { auth } from "@/auth";
import Home from "@/components/Home";
import { redirect } from "next/navigation";
import React from "react";

const Mainpage = async () => {
  //add authentication check here
  const session = await auth();
  if (!session) redirect("/signin");
  return <Home></Home>;
};

export default Mainpage;
