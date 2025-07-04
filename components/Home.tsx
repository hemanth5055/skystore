import { FileManagerProvider } from "@/Context/FileManagerContext";
import React from "react";
import Space from "./Space";

import Upload from "./Upload";
import Files from "./Files";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <FileManagerProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between items-center mb-7">
          <Space></Space>
          <Upload></Upload>
        </div>
        {/* files */}
        <Files></Files>
      </div>
    </FileManagerProvider>
  );
};

export default Home;
