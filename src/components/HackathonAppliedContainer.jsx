import axios from "axios";
import React, { useEffect, useState } from "react";
import AppliedHackathonCard from "./AppliedHackathonCard";
import { toast } from "react-toastify";
import HackathonPostCardShimmer from "./HackathonPostCardShimmer";

const HackathonAppliedContainer = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchHackathonPost = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/hackathons/appliedhackathons`,
        { withCredentials: true }
      );
      setPost(res?.data?.data || []);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHackathonPost();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-[#1e1e1e]">
      <div className="max-w-6xl mx-auto space-y-4">
        {post.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">
            you haven't applied to any hackathons
          </p>
        ) : loading ? (
          <HackathonPostCardShimmer />
        ) : (
          post.map((p) => (
            <AppliedHackathonCard key={p._id} data={p} setPost={setPost} />
          ))
        )}
      </div>
    </div>
  );
};

export default HackathonAppliedContainer;
