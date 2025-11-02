import axios from "axios";
import React, { useEffect, useState } from "react";
import { Users, User2, MessageSquare } from "lucide-react";
import { FALLBACK_IMAGE } from "../constant/constant";
import GroupedChat from "./GroupedChat";
import { toast } from "react-toastify";
const JoinedHackathons = () => {
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState({ open: false, chatId: null });

  const fetchJoinedHackathons = async () => {
    try {
      setLoading(true);
      const hackathons = await axios.get(
        "http://localhost:1001/hackathons/joinedhackathons",
        {
          withCredentials: true,
        }
      );
      setHackathon(hackathons?.data?.data);

    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoinedHackathons();
  }, []);

  return (
    <>
      {chat.open ? (
        <GroupedChat setChat={setChat} chat={chat} />
      ) : loading ? (
        <p className="text-center text-gray-400">
          Loading joined hackathons...
        </p>
      ) : (
        <div className="min-h-screen bg-[#1e1e1e] text-white px-6 py-10">
          <h1 className="text-3xl font-bold mb-6 text-[#007acc]">
            Joined Hackathons
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathon?.length > 0 ? (
              hackathon.map((item) => (
                <div
                  key={item._id}
                  className="cursor-pointer bg-[#252526] rounded-xl border border-[#2d2d2d] shadow-md hover:shadow-[0_0_10px_#007acc55] transition-all duration-300"
                >
                  <img
                    src={item.hackathonId.hackathonPostImage || FALLBACK_IMAGE}
                    alt={item.hackathonId.hackathonTitle}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />

                  <div className="p-4 space-y-2">
                    <h2 className="text-lg font-semibold text-white mb-2">
                      {item.hackathonId.hackathonTitle}
                    </h2>

                    <div className="flex items-center text-gray-400 text-sm gap-2">
                      <User2 className="w-4 h-4 text-[#007acc]" />
                      <p>
                        <strong>Owner:</strong>{" "}
                        {item.hackathonId.ownerId?.fullName || "Unknown"}
                      </p>
                    </div>

                    <div className="flex items-center text-gray-400 text-sm gap-2">
                      <Users className="w-4 h-4 text-[#007acc]" />
                      <p>
                        <strong>Members:</strong>{" "}
                        {item.hackathonId.currentTeamMember}/
                        {item.hackathonId.teamRequired}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setChat({ open: true, chatId: item.hackathonId._id });
                      }}
                      className="mt-3 flex items-center gap-2 bg-[#007acc] hover:bg-[#0062a3] text-white px-4 py-2 rounded-lg transition-all duration-200"
                    >
                      <MessageSquare className="w-4 h-4" />
                      View Chat
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center col-span-3">
                No joined hackathons found.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default JoinedHackathons;
