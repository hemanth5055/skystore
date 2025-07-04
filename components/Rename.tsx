"use client";

import React, { useState } from "react";

interface RenameProps {
  previousName: string;
  onClose: () => void;
}

const Rename: React.FC<RenameProps> = ({ previousName, onClose }) => {
  const [newName, setNewName] = useState("");

  const handleRename = () => {};

  return (
    <div className="fixed inset-0 bg-white/10  dark:bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#282828] rounded-2xl shadow-xl p-6 w-full max-w-sm max-sm:w-[90%]">
        <h2 className="text-lg font-semibold mb-4 dark:text-gray-200">Rename File</h2>
        <p className="text-sm text-gray-600 dark:text-gray-200 mb-4">
          Previous Name: <span className="font-medium">{previousName}</span>
        </p>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full px-3 py-2 outline-none border-b-1  mb-4"
          placeholder="Enter new name"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md  cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700"
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
