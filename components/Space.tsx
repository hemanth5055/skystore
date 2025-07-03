import React from "react";

const Space = () => {
  return (
    <div className="flex flex-col">
      {/* progress-bar */}
      <div className="flex items-center gap-4">
        <div className="w-[450px] relative my-2 bg-[#F2F2F2] dark:bg-[#282828] h-[15px] rounded-full">
          <div className="absolute flex items-center">
            {/* images */}
            <div className="w-[100px] relative bg-[#ECBD7C] h-[15px] rounded-l-full"></div>
            {/* videos */}
            <div className="w-[50px] relative bg-[#A0C9DC] h-[15px] "></div>
            {/* pdfs */}
            <div className="w-[50px] relative bg-[#DCA0A0] h-[15px] rounded-r-full"></div>
          </div>
        </div>
        <h2>68%</h2>
      </div>
      {/* legend */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-[20px] h-[20px] rounded-full bg-[#ECBD7C]"></div>
          <h2>Images</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[20px] h-[20px] rounded-full bg-[#A0C9DC]"></div>
          <h2>Videos</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[20px] h-[20px] rounded-full bg-[#DCA0A0]"></div>
          <h2>Pdfs</h2>
        </div>
      </div>
    </div>
  );
};

export default Space;
