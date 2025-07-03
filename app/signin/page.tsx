import { auth } from "@/auth";
import SignInButton from "@/components/SignInButton";
import { redirect } from "next/navigation";
import React from "react";

const Signin = async () => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className="w-full flex justify-center items-center flex-col gap-5 px-6">
      <SignInButton />
    </div>
  );
};

export default Signin;
