"use client";
import { useFileManager } from "@/Context/FileManagerContext";
import axios from "axios";
import React, { useEffect } from "react";
import File from "./File";

const Files = () => {
  const { setFiles, files } = useFileManager();
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get("/api/get-all-files");
        setFiles(res.data.files || []);
      } catch (error) {
        console.error("Failed to fetch files:", error);
      }
      setLoading(false);
    };

    fetchFiles();
  }, []);
  return (
    <div className="w-full flex flex-wrap gap-4 ">
      {loading && (
        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />

      )}
      {!loading && files.length === 0 && (
        <div className="w-full flex justify-center items-center">
          <h2 className="text-red-500">No files found</h2>
        </div>
      )}
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
