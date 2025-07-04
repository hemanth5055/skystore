"use client";
import { useFileManager } from "@/Context/FileManagerContext";
import React, { useState } from "react";
import { CgRename } from "react-icons/cg";

import { IoArrowBack } from "react-icons/io5";
import {
  LuTrash,
  LuFile,
  LuImage,
  LuVideo,
  LuMusic,
  LuFileText,
} from "react-icons/lu";
import Rename from "./Rename";

const File = ({
  name,
  url,
  size,
  createdAt,
  fileKey,
  type,
}: {
  name: string;
  url: string;
  size: number;
  fileKey: string;
  createdAt: Date;
  type: string;
}) => {
  const { handleDelete } = useFileManager();
  const [isRenameWindowOpen, setRenameWindow] = useState(false);

  const getFileIcon = (type: string) => {
    const iconProps = { size: 24, className: "text-blue-500" };

    if (type.startsWith("image/"))
      return (
        <LuImage {...iconProps} className="text-black dark:text-gray-300" />
      );
    if (type.startsWith("video/"))
      return (
        <LuVideo {...iconProps} className="text-black dark:text-gray-300" />
      );
    if (type.startsWith("audio/"))
      return (
        <LuMusic {...iconProps} className="text-black dark:text-gray-300" />
      );
    if (type.includes("text") || type.includes("document"))
      return (
        <LuFileText {...iconProps} className="text-black dark:text-gray-300" />
      );
    return <LuFile {...iconProps} className="text-black dark:text-gray-300" />;
  };

  const formatFileSize = (size: number) => {
    if (size >= 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    } else if (size >= 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(size / 1024).toFixed(2)} KB`;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="group relative overflow-hidden bg-[#F2F2F2] dark:bg-[#282828] rounded-xl w-full max-w-sm h-25">
      {/* Header with file icon, name and actions */}
      {isRenameWindowOpen ? (
        <Rename
          previousName={name}
          fileKey={fileKey}
          onClose={() => setRenameWindow(false)}
        ></Rename>
      ) : (
        ""
      )}
      <div className="flex items-center justify-between p-4 h-full">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="flex-shrink-0 w-12 h-12  rounded-lg flex items-center justify-center">
            {getFileIcon(type)}
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <h3 className="font-medium text-gray-900 dark:text-white truncate text-base leading-tight">
              {name}
            </h3>
            <div className="flex  items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium">{formatFileSize(size)}</span>
              <span className=" max-sm:hidden">{formatDate(createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-4  transition-opacity duration-200">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-400 transition-colors"
            title="Open file"
          >
            <IoArrowBack size={18} className="rotate-[135deg]" />
          </a>
          {/* rename */}
          <button
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-400 transition-colors cursor-pointer"
            title=" file"
            onClick={() => setRenameWindow(true)}
          >
            <CgRename size={18} />
          </button>
          {/* delete */}
          <button
            onClick={() => handleDelete(fileKey)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-400 transition-colors cursor-pointer"
            title="Delete file"
          >
            <LuTrash size={18} />
          </button>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
    </div>
  );
};

export default File;
