import React from "react";
import { AVATAR_DEFAULT_URL } from "../constant/constant";
import axios from "axios";
import { toast } from "react-toastify";

const DevsCard = ({ p }) => {
  const handleReqType = async (typeofReq, id) => {
    try {
      const res = await axios.post(
        `http://localhost:1001/connection/request/send/${typeofReq}/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-[#252526] border border-[#333] rounded-xl shadow-md p-5 flex flex-col items-center text-center transition-all hover:shadow-lg hover:border-[#3a3a3a]">

      <img
        src={p.photoUrl || AVATAR_DEFAULT_URL}
        alt="Profile"
        className="rounded-full w-28 h-28 sm:w-32 sm:h-32 object-cover border-4 border-[#569cd6] mb-4"
      />


      <h2 className="text-[#569cd6] font-semibold text-lg break-words mb-2">
        {p.fullName}
      </h2>

      <div className="w-full text-[#d4d4d4] text-sm space-y-1">
        <p>
          <strong>Designation:</strong>{" "}
          <span className="break-words">
            {p.designation || "Not available"}
          </span>
        </p>
        <p>
          <strong>Age:</strong> {p.age || "Not available"}
        </p>
        <p className="break-words">
          <strong>Tech Stack:</strong>{" "}
          {p.techStack?.length > 0 ? p.techStack.join(", ") : "Not available"}
        </p>
      </div>


      <div className="flex flex-col sm:flex-row justify-center w-full gap-3 mt-5">
        <button
          className="flex-1 px-4 py-2 bg-[#007ACC] text-white rounded-md hover:bg-[#569cd6] transition"
          onClick={() => handleReqType("Interested", p._id)}
        >
          Connect
        </button>
        <button
          className="flex-1 px-4 py-2 bg-[#3C3C3C] text-[#d4d4d4] rounded-md hover:bg-[#2d2d30] transition"
          onClick={() => handleReqType("Ignored", p._id)}
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default DevsCard;
