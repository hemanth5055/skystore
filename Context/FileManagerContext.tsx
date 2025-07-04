"use client";

import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// Context type definition
type FileManagerContextType = {
  files: any[];
  setFiles: Dispatch<SetStateAction<any[]>>;
  spaceUsed: { imageSize: number; videoSize: number; pdfSize: number };
  setSpaceUsed: Dispatch<
    SetStateAction<{ imageSize: number; videoSize: number; pdfSize: number }>
  >;
  handleDelete: (fileKey: string) => Promise<void>;
};

// Initial context placeholder
const FileManagerContext = createContext<FileManagerContextType>({
  files: [],
  setFiles: () => {},
  spaceUsed: { imageSize: 0, videoSize: 0, pdfSize: 0 },
  setSpaceUsed: () => {},
  handleDelete: async () => {},
});

// Provider component
export function FileManagerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [files, setFiles] = useState<any[]>([]);
  const [spaceUsed, setSpaceUsed] = useState({
    imageSize: 0,
    videoSize: 0,
    pdfSize: 0,
  });

  const handleDelete = async (fileKey: string) => {
    try {
      const res = await axios.delete(`/api/delete-file/${fileKey}`); // Assuming this is your route
      if (res.data?.success) {
        console.log("File deleted successfully");
        setFiles((prev) => prev.filter((file) => file.fileKey !== fileKey));
      } else {
        console.log("Failed to delete");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <FileManagerContext.Provider
      value={{ files, setFiles, spaceUsed, setSpaceUsed, handleDelete }}
    >
      {children}
    </FileManagerContext.Provider>
  );
}

// Hook to use the context
export function useFileManager() {
  return useContext(FileManagerContext);
}
