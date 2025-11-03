import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DevShimmer from "../components/Shimmer/DevShimmer";
import DevsCard from "./DevsCard";
import { useSelector } from "react-redux";
import ChatWindow from "./ChatWindow";

const Devs = () => {
  const navigate = useNavigate();
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(false);
  const chat = useSelector((store) => store.chat);

  const fetchDevs = async () => {
    try {
      setLoading(true);
      const devs = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/feed`,
        {
          withCredentials: true,
        }
      );
      setFeed(devs?.data?.UsersToBeShowOnTheFeed);
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 401) {
        toast.error("Unauthorized!");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevs();
  }, []);

  return (
    <div className="flex-1 flex flex-col px-3 sm:px-6 py-4 bg-[#1e1e1e] min-h-screen">
      {chat ? (
        <ChatWindow chat={chat} />
      ) : (
        <>
          <h2 className="text-lg sm:text-xl font-bold mb-5 text-[#569cd6] text-center sm:text-left">
            Developers
          </h2>

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">
              {loading
                ? Array(6)
                    .fill(0)
                    .map((_, i) => <DevShimmer key={i} />)
                : feed?.map((p) => <DevsCard key={p._id} p={p} />)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Devs;
