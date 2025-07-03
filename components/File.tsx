"use client";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { LuTrash } from "react-icons/lu";
const File = () => {
  return (
    <div className="flex items-center p-5 bg-[#F2F2F2] dark:bg-[#282828] rounded-[15px] gap-4">
      <div className="flex flex-col">
        <h2 className="text-[20px]">ProfilePic.jpeg</h2>
        <div className="flex items-center gap-2">
          <h3 className="text-[12px]">12Mb</h3>
          <h3 className="text-[12px]">June 14 2025</h3>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[40px] cursor-pointer rotate-[135deg] h-[40px] flex items-center justify-center">
          <IoArrowBack size={23} />
        </div>
        <div className="w-[40px] h-[40px] cursor-pointer flex items-center justify-center">
          <LuTrash size={20} />
        </div>
      </div>
    </div>
  );
};

export default File;
