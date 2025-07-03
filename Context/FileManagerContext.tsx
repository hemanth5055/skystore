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
  spaceUsed: number;
  setSpaceUsed: Dispatch<SetStateAction<number>>;
};

const FileManagerContext = createContext<FileManagerContextType>({
  files: [],
  setFiles: () => {},
  spaceUsed: 0,
  setSpaceUsed: () => {},
});

export function FileManagerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [files, setFiles] = useState<any[]>([]);
  const [spaceUsed, setSpaceUsed] = useState<number>(0);

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
