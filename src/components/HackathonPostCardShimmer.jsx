import React from "react";

const HackathonPostCardShimmer = () => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl shadow-md p-5 mt-6 animate-pulse">
      {/* Header Section */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-[#2d2d2d]" />
        <div className="ml-3 space-y-2">
          <div className="w-24 h-3 bg-[#2d2d2d] rounded" />
          <div className="w-16 h-2 bg-[#2d2d2d] rounded" />
        </div>
      </div>

      {/* Image Placeholder */}
      <div className="w-full h-44 bg-[#2d2d2d] rounded-lg mb-4" />

      {/* Content */}
      <div className="space-y-3">
        <div className="w-3/4 h-4 bg-[#2d2d2d] rounded" />
        <div className="w-full h-3 bg-[#2d2d2d] rounded" />
        <div className="w-5/6 h-3 bg-[#2d2d2d] rounded" />

        <div className="flex items-center justify-between text-gray-400 text-sm mt-3">
          <div className="w-1/3 h-3 bg-[#2d2d2d] rounded" />
          <div className="w-1/4 h-3 bg-[#2d2d2d] rounded" />
        </div>

        {/* Buttons */}
        <div className="w-full h-9 bg-[#2d2d2d] rounded-md mt-4" />
        <div className="w-full h-9 bg-[#2d2d2d] rounded-md mt-3" />
      </div>
    </div>
  );
};

export default HackathonPostCardShimmer;
