import React from "react";

const PostShimmer = () => {
  return (
    <>
      <div className="w-full max-w-2xl mx-auto bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl shadow-md p-5 mt-6 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#2d2d2d] ring-2 ring-blue-500/30" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-[#2d2d2d] rounded" />
            <div className="h-3 w-20 bg-[#2d2d2d] rounded" />
            <div className="h-3 w-24 bg-[#2d2d2d] rounded" />
          </div>
        </div>

      
        <div className="space-y-2 mb-4">
          <div className="h-3 w-full bg-[#2d2d2d] rounded" />
          <div className="h-3 w-5/6 bg-[#2d2d2d] rounded" />
          <div className="h-3 w-4/6 bg-[#2d2d2d] rounded" />
        </div>


        <div className="rounded-md overflow-hidden border border-[#2f2f2f] mb-4 h-64 bg-[#2d2d2d]" />

       
        <div className="flex justify-around items-center border-t border-[#2f2f2f] pt-3">
          <div className="h-4 w-16 bg-[#2d2d2d] rounded" />
          <div className="h-4 w-20 bg-[#2d2d2d] rounded" />
          <div className="h-4 w-16 bg-[#2d2d2d] rounded" />
        </div>

        
        <div className="flex items-center gap-3 mt-4">
          <div className="w-9 h-9 rounded-full bg-[#2d2d2d]" />
          <div className="flex-1 h-8 bg-[#2d2d2d] rounded" />
        </div>
      </div>
    </>
  );
};

export default PostShimmer;
