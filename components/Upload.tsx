"use client";

import { useFileManager } from "@/Context/FileManagerContext";
import { UploadButton } from "@/utlis/uploadthing";
import React from "react";
import toast from "react-hot-toast";

const Upload = () => {
  const { setFiles, setSpaceUsed } = useFileManager();

  return (
    <div className="flex justify-center items-center w-full">
      <UploadButton
        className="mt-4 ut-button:bg-blue-500 ut-button:ut-uploading:bg-gray-500/50 ut-button:outline-none"
        endpoint="skystore"
        onClientUploadComplete={(res) => {
          const uploaded = res?.[0]?.serverData;
          if (!uploaded) {
            toast.error("Upload failed. Try again.");
            return;
          }

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
            return prev;
          });
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message || "Upload error");
        }}
        content={{
          allowedContent() {
            return "Max size 32MB";
          },
        }}
      />
    </div>
  );
};

export default Upload;
