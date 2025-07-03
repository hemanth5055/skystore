"use client";

import { UploadButton } from "@/utlis/uploadthing";
import React from "react";

const Upload = () => {
  return (
    <div className="flex justify-center items-center w-full">
      {/* <div className="px-10 py-2 bg-[#F2F2F2] dark:bg-[#282828] rounded-[10px] cursor-pointer">
        Upload
      </div> */}
      <UploadButton
        endpoint="skystore"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      ></UploadButton>
    </div>
  );
};

export default Upload;
