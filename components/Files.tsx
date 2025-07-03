"use client";
import { useFileManager } from "@/Context/FileManagerContext";
import axios from "axios";
import React, { useEffect } from "react";
import File from "./File";

const Files = () => {
  const { setFiles, files } = useFileManager();
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get("/api/get-all-files");
        console.log(res);
        setFiles(res.data.files || []);
      } catch (error) {
        console.error("Failed to fetch files:", error);
      }
    };

    fetchFiles();
  }, []);
  return (
    <div className="w-full flex flex-wrap gap-4 ">
      {files.map((file, index) => {
        return (
          <File
            name={file.name}
            key={index}
            size={file.size}
            url={file.url}
            createdAt={file.createdAt}
            id={file.id}
            type={file.type}
            userId={file.userId}
          ></File>
        );
      })}
    </div>
  );
};

export default Files;
