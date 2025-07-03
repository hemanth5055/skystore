import { FileManagerProvider } from "@/Context/FileManagerContext";
import React from "react";
import Space from "./Space";

import Upload from "./Upload";
import File from "./File";

const Home = () => {
  return (
    <FileManagerProvider>
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between items-center mb-7">
          <Space></Space>
          <Upload></Upload>
        </div>
        {/* files */}
        <div className="w-full flex flex-wrap gap-4 ">
          {/* items */}
          <File></File>
        </div>
      </div>
    </FileManagerProvider>
  );
};

export default Home;
