"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const SignInButton = () => {
  const handleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleSignIn}
      className="flex items-center gap-4 relative top-[300px] max-sm:top-[300px] bg-[#F5F5F5] dark:bg-[#171717] p-2 px-6 cursor-pointer rounded-[13px]"
    >
      <div className="w-[35px] h-[35px] flex justify-center items-center">
        <FcGoogle size={24}></FcGoogle>
      </div>
      <h1 className="font-mont dark:text-[#7f7f7f] text-[20px] leading-[50px] font-medium tracking-[-0.055em]">
        Sign-in with Google.
      </h1>
    </button>
  );
};

export default SignInButton;
