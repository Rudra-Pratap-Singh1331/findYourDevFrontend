import React from "react";
import { Calendar, Users, Cpu } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const HackathonPostCard = ({
  post,
  hackathonType,
  setViewReq,
  setPost,
  setHackathonId,
}) => {
  const handleOnRequestToJoin = async (hackathonId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/hackathons/makerequest`,
        {
          hackathonId,
        },
        { withCredentials: true }
      );

      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleClose = async (id) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/hackathons/closehackathon`,
        {
          _id: id,
        },
        {
          withCredentials: true,
        }
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
    <div className="w-full max-w-2xl mx-auto bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl shadow-md p-5 mt-6 transition-all duration-300 hover:shadow-[0_0_12px_#007acc55] hover:border-[#3a3a3a]">
   

      <div className="flex items-center mb-4">
        <img
          src={
            post.ownerId.photoUrl ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt={post.ownerId.fullName}
          className="w-10 h-10 rounded-full object-cover border border-[#3a3a3a]"
        />
        <div className="ml-3">
          <h3 className="text-white font-medium text-sm">
            {post.ownerId.fullName}
          </h3>
          <p className="text-gray-400 text-xs">
            {post.ownerId.designation || "Hackathon Organizer"}
          </p>
        </div>
      </div>
      {post.hackathonPostImage && (
        <div className="relative mb-4">
          <img
            src={post.hackathonPostImage}
            alt={post.hackathonTitle}
            className="w-full h-44 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="p-1 space-y-3">
        <h2 className="text-xl font-semibold text-white">
          {post.hackathonTitle}
        </h2>
        <p className="text-sm text-gray-400 line-clamp-3">
          {post.hackathonDescription}
        </p>

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Cpu className="w-4 h-4 text-[#007acc]" />
          <span>{post.hackathonType}</span>
        </div>

        <div className="flex justify-between items-center text-gray-300 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-[#569cd6]" />
            <span className="mr-0.5 text-red-400">Deadline</span>
            <span>
              {new Date(post.hackathonDeadline).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-[#c586c0]" />
            <span>
              {post.currentTeamMember}/{post.teamRequired}
            </span>
          </div>
        </div>

        <button
          className="w-full mt-4 py-2 rounded-md bg-[#007acc] hover:bg-[#1f8ad1] text-white font-medium transition-all duration-300"
          onClick={
            hackathonType === "posted"
              ? () => {
                  setViewReq(true);
                  setHackathonId(post?._id);
                }
              : () => {
                  handleOnRequestToJoin(post?._id);
                }
          }
        >
          {hackathonType === "posted" ? `View Requests` : `Request to Join`}
        </button>
        {hackathonType === "posted" ? (
          <button
            className="w-full mt-4 py-2 rounded-md bg-[#d3431f] hover:bg-red-300 text-white font-medium transition-all duration-300"
            onClick={() => {
              handleClose(post?._id);
            }}
          >
            Close Application
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default HackathonPostCard;
