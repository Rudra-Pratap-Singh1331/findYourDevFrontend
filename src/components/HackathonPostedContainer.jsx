import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import HackathonPostCard from "./HackathonPostCard";
import IncomingRequestCard from "./IncomingRequestCard";
const HackathonPostedContainer = () => {
  const [post, setPost] = useState([]);
  const [hackathonId, setHackathonId] = useState([null]);
  const [viewReq, setViewReq] = useState(false);
  const fetchHackathonPost = async () => {
    try {
      const post = await axios.get(
        "http://localhost:1001/hackathons/myhackathon",
        {
          withCredentials: true,
        }
      );
      setPost(post?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHackathonPost();
  }, []);
  return (
    <div className="flex-1 overflow-y-auto p-6 relative">
      {viewReq ? (
        <IncomingRequestCard
          setViewReq={setViewReq}
          hackathonId={hackathonId}
        />
      ) : (
          post.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">
            
            you haven't posted yet. Be the one😊
          </p>):
        post?.map((post) => {
          return (
            <HackathonPostCard
              post={post}
              hackathonType={"posted"}
              viewReq={viewReq}
              setViewReq={setViewReq}
              setHackathonId={setHackathonId}
              setPost={setPost}
            />
          );
        })
      )}
    </div>
  );
};

export default HackathonPostedContainer;
