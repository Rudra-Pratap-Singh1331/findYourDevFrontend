import axios from "axios";
import React, { useEffect, useState } from "react";
import AppliedHackathonCard from "./AppliedHackathonCard";
import { toast } from "react-toastify";

const HackathonAppliedContainer = () => {
  const [post, setPost] = useState([]);

  const fetchHackathonPost = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1001/hackathons/appliedhackathons",
        { withCredentials: true }
      );
      setPost(res?.data?.data || []);
    } catch (error) {
      toast.error("Something went wrong!");
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
