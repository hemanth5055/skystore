"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useFileManager } from "@/Context/FileManagerContext";

interface RenameProps {
  previousName: string;
  fileKey: string;
  onClose: () => void;
}

const Rename: React.FC<RenameProps> = ({ previousName, fileKey, onClose }) => {
  const [newName, setNewName] = useState("");
  const { setFiles } = useFileManager();

  const handleRename = () => {
    if (!newName.trim()) {
      toast.error("New name cannot be empty");
      return;
    }
    toast.promise(axios.post(`/api/rename/${fileKey}`, { newName }), {
      loading: "Renaming...",
      success: () => {
        onClose();
        setFiles((prev) =>
          prev.map((file) =>
            file.fileKey === fileKey ? { ...file, name: newName } : file
          )
        );
        return "File renamed successfully";
      },
      error: (err) => err?.response?.data?.message || "Failed to rename file",
    });
  };

  return (
    <div className="fixed inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#282828] rounded-2xl shadow-xl p-6 w-full max-w-sm max-sm:w-[90%]">
        <h2 className="text-lg font-semibold mb-4 dark:text-gray-200">
          Rename File
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-200 mb-4">
          Previous Name: <span className="font-medium">{previousName}</span>
        </p>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full px-3 py-2 outline-none border-b border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white mb-4"
          placeholder="Enter new name"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleRename}
            className="px-4 py-2 rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
          >
            Change Name
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rename;
