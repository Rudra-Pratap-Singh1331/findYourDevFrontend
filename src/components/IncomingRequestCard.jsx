import React, { useEffect, useState } from "react";
import { Github, Linkedin, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { AVATAR_DEFAULT_URL } from "../constant/constant";

const IncomingRequestCard = ({ setViewReq, hackathonId }) => {
  const [user, setUser] = useState([]);

  const handleOnViewRequest = async (hackathonId) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/hackathons/incomingrequest/${hackathonId}`,
        { withCredentials: true }
      );
      setUser(res?.data?.data);
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const handleRequest = async (requestValue, _id) => {
    try {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/hackathons/reviewrequest/${requestValue}`,
        { _id },
        { withCredentials: true }
      );
      toast.success(res?.data?.message);
      setUser((prev) => prev.filter((i) => i._id !== _id));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const onClose = () => setViewReq(false);

  useEffect(() => {
    handleOnViewRequest(hackathonId);
  }, [hackathonId]);

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl shadow-md p-4 sm:p-6 mt-6 transition-all duration-300 hover:border-[#3a3a3a]">
 
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
      >
        <X className="w-5 h-5" />
      </button>

      <h2 className="text-xl font-semibold text-white mb-5 text-center sm:text-left">
        Incoming Requests
      </h2>

      {user.length === 0 ? (
        <p className="text-gray-400 text-sm text-center">
          No incoming requests yet.
        </p>
      ) : (
        <div className="space-y-5">
          {user.map((req, index) => {
            const usr = req?.userId;

            return (
              <div
                key={index}
                className="bg-[#252526] border border-[#2d2d2d] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
         
                <div className="flex items-center gap-4">
                  <img
                    src={usr?.photoUrl || AVATAR_DEFAULT_URL}
                    alt={usr?.fullName}
                    className="w-14 h-14 rounded-full object-cover border border-[#3a3a3a]"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-white break-words">
                      {usr?.fullName}
                    </h2>
                    <p className="text-sm text-gray-400 break-words">
                      {usr?.designation}
                    </p>
                  </div>
                </div>

      
                {(usr?.github || usr?.linkedin) && (
                  <div className="flex flex-wrap gap-4 sm:justify-center">
                    {usr.github && (
                      <a
                        href={usr.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-300 hover:text-white"
                      >
                        <Github className="w-4 h-4 text-[#c586c0]" />
                        <span className="text-sm">GitHub</span>
                      </a>
                    )}
                    {usr.linkedin && (
                      <a
                        href={usr.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-300 hover:text-white"
                      >
                        <Linkedin className="w-4 h-4 text-[#007acc]" />
                        <span className="text-sm">LinkedIn</span>
                      </a>
                    )}
                  </div>
                )}


                {usr?.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                    {usr.techStack.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 bg-[#1e1e1e] text-gray-300 rounded-full border border-[#333]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

        
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end mt-4 sm:mt-0">
                  <button
                    className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition"
                    onClick={() => handleRequest("Accepted", req?._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition"
                    onClick={() => handleRequest("Rejected", req?._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IncomingRequestCard;
