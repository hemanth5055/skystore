"use client";

import { useFileManager } from "@/Context/FileManagerContext";
import React, { useEffect, useState } from "react";
import axios from "axios";

const MAX_STORAGE = 100 * 1024 * 1024; // 100MB

const Space = () => {
  const { spaceUsed, setSpaceUsed } = useFileManager();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const res = await axios.get("/api/get-space-used");
        setSpaceUsed({
          imageSize: res.data.imageSize || 0,
          videoSize: res.data.videoSize || 0,
          pdfSize: res.data.pdfSize || 0,
        });
      } catch (error) {
        console.error("Failed to fetch file sizes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSizes();
  }, [setSpaceUsed]);

  const imagePercent = spaceUsed.imageSize / MAX_STORAGE;
  const videoPercent = spaceUsed.videoSize / MAX_STORAGE;
  const pdfPercent = spaceUsed.pdfSize / MAX_STORAGE;
  const totalPercent = imagePercent + videoPercent + pdfPercent;

  return (
    <div className="flex flex-col">
      {/* progress-bar */}
      <div className="flex items-center gap-4">
        <div className="w-[450px] relative my-2 bg-[#F2F2F2] dark:bg-[#282828] h-[15px] rounded-full overflow-hidden">
          <div className="absolute flex items-center h-full left-0 top-0">
            {/* images */}
            <div
              className="bg-[#ECBD7C] h-[15px] relative"
              style={{ width: `${imagePercent * 450}px` }}
            />
            {/* videos */}
            <div
              className="bg-[#A0C9DC] h-full"
              style={{ width: `${videoPercent * 450}px` }}
            />
            {/* pdfs */}
            <div
              className="bg-[#DCA0A0] h-full"
              style={{ width: `${pdfPercent * 450}px` }}
            />
          </div>
        </div>
        {loading ? (
          <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        ) : (
          <h2 className="min-w-[50px] font-semibold">
            {Math.min(totalPercent * 100, 100).toFixed(0)}%
          </h2>
        )}
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
