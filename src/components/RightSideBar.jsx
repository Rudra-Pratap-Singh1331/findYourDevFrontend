import React, { useState } from "react";


const RightSideBar = ({ requests }) => {

  const [activeTab, setActiveTab] = useState("incoming");
 

  return (
    <div className="w-1/6 min-w-[180px] bg-[#252526] flex flex-col border-l border-[#333] shadow-md">
      {/* Tabs */}
      <div
        role="tablist"
        className="tabs tabs-bordered p-4 border-b border-[#333]"
      >
        <button
          role="tab"
          className={`tab px-3 py-1 rounded-md transition font-medium ${
            activeTab === "incoming"
              ? "bg-[#2d2d30] text-[#9CDCFE]"
              : "text-[#d4d4d4] hover:bg-[#2d2d30] hover:text-[#9CDCFE]"
          }`}
          onClick={() => setActiveTab("incoming")}
        >
          Incoming
        </button>
        <button
          role="tab"
          className={`tab px-3 py-1 rounded-md transition font-medium ${
            activeTab === "outgoing"
              ? "bg-[#2d2d30] text-[#9CDCFE]"
              : "text-[#d4d4d4] hover:bg-[#2d2d30] hover:text-[#9CDCFE]"
          }`}
          onClick={() => setActiveTab("outgoing")}
        >
          Outgoing
        </button>
      </div>

      {/* Requests */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {requests[activeTab].map((req, i) => (
          <div
            key={i}
            className="p-2 rounded-md bg-[#1E1E1E] border border-[#333] text-[#E5E5E5] shadow-sm hover:bg-[#2d2d30] transition"
          >
            {req}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSideBar;
