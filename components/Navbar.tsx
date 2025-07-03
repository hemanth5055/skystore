import { auth, signOut } from "@/auth";
import React from "react";
import { FiLogOut } from "react-icons/fi";

const Navbar = async () => {
  const session = await auth();
  if (!session) {
    return (
      <div className="w-full flex relative justify-between items-center ">
        <h1 className=" text-[40px] font-medium tracking-[-0.055em]">
          Skystore
        </h1>
      </div>
    );
  }
  return (
    <div className="w-full flex relative justify-between items-center ">
      <h1 className=" text-[40px] font-medium tracking-[-0.055em]">Skystore</h1>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/signin" });
        }}
      >
        <button
          className="w-[45px] h-[45px] cursor-pointer rounded-full flex justify-center items-center dark:bg-[#282828]"
          type="submit"
        >
          <FiLogOut size={18}></FiLogOut>
        </button>
      </form>
    </div>
  );
};

export default Navbar;
