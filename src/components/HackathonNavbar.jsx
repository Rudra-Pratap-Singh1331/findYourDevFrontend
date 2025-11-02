import React from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const HackathonNavbar = () => {
  return (
    <div className="w-full flex flex-row items-center justify-around px-6 py-3  gap-2 bg-[#1E1E1E] border-b border-[#2C2C2C] shadow-md">

      <div className="flex items-center gap-2">
        <Link to="/hackathons/createhackathon">
          <button className="px-3 py-1 text-sm rounded-md bg-blue-600 hover:bg-blue-700 transition text-white font-medium">
            + Create Hackathon
          </button>
        </Link>
        <Link to="/hackathons/postedhackathon">
          <button className="px-3 py-1 text-sm rounded-md bg-[#2D2D2D] hover:bg-[#3A3A3A] transition text-gray-200">
            Posted Hackathons
          </button>
        </Link>
        <Link to="/hackathons/joinedhackathons">
          <button className="px-3 py-1 text-sm rounded-md bg-[#2D2D2D] hover:bg-[#3A3A3A] transition text-gray-200">
            Joined Hackathons
          </button>
        </Link>
        <Link to="/hackathons/appliedhackathons">
          <button className="px-3 py-1 text-sm rounded-md bg-[#2D2D2D] hover:bg-[#3A3A3A] transition text-gray-200 ">
            Applied Hackathons
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HackathonNavbar;
