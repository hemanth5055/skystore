"use client";

import { useFileManager } from "@/Context/FileManagerContext";
import { UploadButton } from "@/utlis/uploadthing";
import React from "react";
import toast from "react-hot-toast";

const Upload = () => {
  const { setFiles, setSpaceUsed } = useFileManager();
  return (
    <div className="flex justify-center items-center w-full">
      {/* <div className="px-10 py-2 bg-[#F2F2F2] dark:bg-[#282828] rounded-[10px] cursor-pointer">
        Upload
      </div> */}
      <UploadButton
        endpoint="skystore"
        onClientUploadComplete={(res) => {
          const uploaded = res[0].serverData;
          toast.success("File uploaded successfully");
          setFiles((prev) => [uploaded, ...prev]);
          setSpaceUsed((prev) => {
            if (uploaded.type.startsWith("image/")) {
              return { ...prev, imageSize: prev.imageSize + uploaded.size };
            } else if (uploaded.type.startsWith("video/")) {
              return { ...prev, videoSize: prev.videoSize + uploaded.size };
            } else if (uploaded.type === "application/pdf") {
              return { ...prev, pdfSize: prev.pdfSize + uploaded.size };
            }
            return prev; // for other file types
          });
        }}
        onUploadError={(error: Error) => {
          toast.error(`ERROR! ${error.message}`);
        }}
      ></UploadButton>
    </div>
  );
};

export default Upload;
