"use client";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type FileManagerContextType = {
  files: any[];
  setFiles: Dispatch<SetStateAction<any[]>>;
  spaceUsed: { imageSize: number; videoSize: number; pdfSize: number };
  setSpaceUsed: Dispatch<
    SetStateAction<{ imageSize: number; videoSize: number; pdfSize: number }>
  >;
};

const FileManagerContext = createContext<FileManagerContextType>({
  files: [],
  setFiles: () => {},
  spaceUsed: { imageSize: 0, videoSize: 0, pdfSize: 0 },
  setSpaceUsed: () => {},
});

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

  return (
    <FileManagerContext.Provider
      value={{ files, setFiles, spaceUsed, setSpaceUsed }}
    >
      {children}
    </FileManagerContext.Provider>
  );
}

export function useFileManager() {
  return useContext(FileManagerContext);
}
