import React from "react";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="w-full flex relative justify-between items-center ">
      <h1 className=" text-[40px] font-medium tracking-[-0.055em]">Skystore</h1>
      <div className="w-[45px] h-[45px] rounded-full flex justify-center items-center dark:bg-[#282828]">
            <FiLogOut size={18}></FiLogOut>
      </div>
    </div>
  );
};

export default Navbar;
