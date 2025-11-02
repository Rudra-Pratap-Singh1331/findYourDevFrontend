import React from "react";
import { Calendar, Users, Clock, AlertCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const AppliedHackathonCard = ({ data, setPost }) => {
  const hack = data?.hackathonId;
  const owner = hack?.ownerId;
  const formattedDate = hack?.hackathonDeadline
    ? new Date(hack?.hackathonDeadline).toLocaleDateString()
    : "N/A";
  const postedDate = data?.createdAt
    ? new Date(data.createdAt).toLocaleDateString()
    : "";

  const handleCancelRequest = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:1001/hackathons/cancelrequest/${id}`
      );
      toast.success(res?.data?.message);
      setPost((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to cancel");
    }
  };

  return (
    <div className="w-full bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl shadow-md p-4 sm:p-5 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-start gap-3">
        <img
          src={owner?.photoUrl}
          alt={owner?.fullName}
          className="w-12 h-12 rounded-full border border-[#3a3a3a] object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <div className="truncate">
              <h3 className="text-white text-lg font-semibold truncate">
                {owner?.fullName}
              </h3>
              <p className="text-gray-400 text-sm truncate">
                {owner?.designation}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                data.status === "Pending"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : data.status === "Approved"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {data.status}
            </span>
          </div>

          {hack?.hackathonPostImage && (
            <img
              src={hack.hackathonPostImage}
              alt={hack.hackathonTitle}
              className="w-full h-44 sm:h-48 object-cover rounded-lg mt-3"
            />
          )}

          <h2 className="text-md sm:text-xl font-bold text-white mt-3 line-clamp-2">
            {hack?.hackathonTitle}
          </h2>
          <p className="text-gray-400 text-sm mt-2 line-clamp-3">
            {hack?.hackathonDescription}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-gray-300 text-sm">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <AlertCircle size={16} />
              <span>{hack?.hackathonType}</span>
            </div>

            <div className="flex items-center gap-1 whitespace-nowrap">
              <Calendar size={16} />
              <span className="text-red-400 font-medium">Deadline</span>
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-1 whitespace-nowrap">
              <Users size={16} />
              <span>
                Team: {hack?.currentTeamMember}/{hack?.teamRequired}
              </span>
            </div>

            <div className="flex items-center gap-1 whitespace-nowrap">
              <Clock size={16} />
              <span>Posted: {postedDate}</span>
            </div>
          </div>

          <button
            className="w-full mt-4 bg-red-600 hover:bg-red-500 text-white py-2 rounded-md transition"
            onClick={() => handleCancelRequest(data?._id)}
          >
            Cancel Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppliedHackathonCard;
