"use client";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { LuTrash } from "react-icons/lu";
const File = ({
  name,
  url,
  size,
  createdAt,
  id,
  type,
  userId,
}: {
  name: string;
  url: string;
  size: number;
  createdAt: Date;
  id: string;
  type: string;
  userId: string;
}) => {
  return (
    <div className="flex items-center p-5 bg-[#F2F2F2] dark:bg-[#282828] rounded-[15px] gap-4">
      <div className="flex flex-col">
        <h2 className="text-[20px]">{name}</h2>
        <div className="flex items-center gap-2">
          <h3 className="text-[12px]">
            {size >= 1024 * 1024
              ? `${(size / (1024 * 1024)).toFixed(2)} MB`
              : `${(size / 1024).toFixed(2)} KB`}
          </h3>
          <h3 className="text-[12px]">{new Date(createdAt).toDateString()}</h3>
        </div>
      </div>
      <div className="flex items-center">
        <a href={url} target="_blank">
          <div className="w-[40px] rotate-[135deg] h-[40px] flex items-center justify-center">
            <IoArrowBack size={23} />
          </div>
        </a>
        <div className="w-[40px] h-[40px] cursor-pointer flex items-center justify-center">
          <LuTrash size={20} />
        </div>
      </div>
    </div>
  );
};

export default File;
