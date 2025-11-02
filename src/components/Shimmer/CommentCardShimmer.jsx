import React from "react";

const CommentCardShimmer = () => {
  return (
    <div className="flex gap-3 animate-pulse">

      <div className="w-10 h-10 bg-gray-700 rounded-full flex-shrink-0"></div>

  
      <div className="bg-[#252526] border border-[#2f2f2f] rounded-lg px-4 py-3 flex-1 flex flex-col gap-2">

        <div className="h-5 bg-gray-600 rounded w-1/2"></div>

 
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
};

export default CommentCardShimmer;
