import React from "react";
import { Calendar, Users, Clock, AlertCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
const AppliedHackathonCard = ({ data, setPost }) => {
  const hack = data?.hackathonId;
  const owner = hack?.ownerId;
  const formattedDate = new Date(hack?.hackathonDeadline).toLocaleDateString();
  const postedDate = new Date(data.createdAt).toLocaleDateString();
  const handleCancelRequest = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:1001/hackathons/cancelrequest/${id}`
      );
      toast.success(res?.data?.message);
      setPost((prev) => {
        return prev.filter((p) => p._id != id);
      });
    } catch (error) {
    
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
       
        <div className="w-full max-w-2xl mx-auto bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl shadow-md p-5 mt-6 transition-all duration-300 hover:shadow-lg hover:border-[#3a3a3a]">
 
          <div className="flex items-center gap-3 mb-4">
            <img
              src={owner?.photoUrl}
              alt={owner?.fullName}
              className="w-10 h-10 rounded-full border border-[#3a3a3a]"
            />
            <div>
              <h3 className="text-white font-semibold">{owner?.fullName}</h3>
              <p className="text-gray-400 text-sm">{owner?.designation}</p>
            </div>
          </div>
   
          {hack?.hackathonPostImage && (
            <img
              src={hack.hackathonPostImage}
              alt={hack.hackathonTitle}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
    
          <h2 className="text-xl font-bold text-white mb-2">
            {hack?.hackathonTitle}
          </h2>
          <p className="text-gray-400 text-sm mb-3">
            {hack?.hackathonDescription}
          </p>
    
          <div className="flex flex-wrap items-center gap-3 mb-4 text-gray-300 text-sm">
            <div className="flex items-center gap-1">
              <AlertCircle size={16} className="text-blue-400" />
              <span>{hack?.hackathonType}</span>
            </div>

            <div className="flex items-center gap-1">
              <Calendar size={16} className="text-red-400" />
              <span>
                <span className="text-red-400 font-medium">Deadline</span>{" "}
                {formattedDate}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Users size={16} className="text-purple-400" />
              <span>
                Team: {hack.currentTeamMember}/{hack?.teamRequired}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Clock size={16} className="text-gray-400" />
              <span>Posted: {postedDate}</span>
            </div>
          </div>
  
          <div className="mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
          <button
            className="w-full bg-red-500 hover:bg-red-300 text-white font-medium py-2 rounded-lg transition-all duration-300"
            onClick={() => {
              handleCancelRequest(data?._id);
            }}
          >
            Cancel Request
          </button>
          
        </div>
    
    </>
  );
};

export default AppliedHackathonCard;
