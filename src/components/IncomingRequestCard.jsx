import React, { useEffect, useState } from "react";
import { Github, Linkedin, X } from "lucide-react";

import axios from "axios";
import { toast } from "react-toastify";
const IncomingRequestCard = ({ setViewReq, hackathonId }) => {
  const [user, setUser] = useState([]);
  const handleOnViewRequest = async (hackathonId) => {
    try {
      const res = await axios.get(
        `http://localhost:1001/hackathons/incomingrequest/${hackathonId}`,
        { withCredentials: true }
      );
      console.log(res);
      setUser(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequest = async (requestValue, _id) => {
    try {
      const res = await axios.patch(
        `http://localhost:1001/hackathons/reviewrequest/${requestValue}`,
        { _id },
        { withCredentials: true }
      );
      toast.success(res?.data?.message);
      setUser((prev) => {
        return prev.filter((i) => i._id != _id);
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const onClose = () => {
    setViewReq(false);
  };

  useEffect(() => {
    handleOnViewRequest(hackathonId);
  }, []);
  return (
    // <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
    <div className="w-full max-w-2xl mx-auto bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl shadow-md p-5 mt-6 transition-all duration-300 hover:shadow-[0_0_12px_#007acc55] hover:border-[#3a3a3a]">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-19 right-32 text-gray-400 hover:text-white transition-all duration-200"
      >
        <X className="w-5 h-5" />
      </button>

      <h2 className="text-xl font-semibold text-white mb-5">
        Incoming Requests
      </h2>

      {/* Conditional Rendering */}
      {user.length === 0 ? (
        <p className="text-gray-400 text-sm text-center">
          No incoming requests yet.
        </p>
      ) : (
        <div className="space-y-5">
          {user?.map((req, index) => {
            const user = req?.userId;

            return (
              <div
                key={index}
                className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl p-5 shadow-md "
              >
                {/* Avatar + Name + Designation */}
                <div className="flex items-center gap-4">
                  <img
                    src={user?.photoUrl}
                    alt={user?.fullName}
                    className="w-14 h-14 rounded-full object-cover border border-[#3a3a3a]"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {user?.fullName}
                    </h2>
                    <p className="text-sm text-gray-400">{user?.designation}</p>
                  </div>
                </div>

                {/* Social Links */}
                {(user?.github || user?.linkedin) && (
                  <div className="flex gap-4 mt-3">
                    {user?.github && (
                      <a
                        href={user.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        <Github className="w-4 h-4 text-[#c586c0]" />
                        <span className="text-sm">GitHub</span>
                      </a>
                    )}
                    {user?.linkedin && (
                      <a
                        href={user.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        <Linkedin className="w-4 h-4 text-[#007acc]" />
                        <span className="text-sm">LinkedIn</span>
                      </a>
                    )}
                  </div>
                )}

                {/* Tech Stack */}
                {user?.techStack?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm text-gray-400 mb-2">Skills:</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.techStack.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 bg-[#252526] text-gray-300 rounded-full border border-[#333]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-5">
                  <button
                    className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-all duration-200"
                    onClick={() => {
                      handleRequest("Accepted", req?._id);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-all duration-200"
                    onClick={() => {
                      handleRequest("Rejected", req?._id);
                    }}
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
    // </div>
  );
};

export default IncomingRequestCard;
