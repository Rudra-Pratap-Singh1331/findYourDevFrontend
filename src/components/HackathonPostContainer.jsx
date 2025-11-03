import axios from "axios";
import React, { useEffect, useState } from "react";
import HackathonPostCard from "./HackathonPostCard";
import { toast } from "react-toastify";

const HackathonPostContainer = () => {
  const [post, setPost] = useState([]);
  const fetchHackathonPost = async () => {
    try {
      const post = await axios.get(
        `${import.meta.env.VITE_API_URL}/hackathons/`,
        {
          withCredentials: true,
        }
      );
      setPost(post?.data?.hackathonList);
    } catch (error) {
      toast.error("Something went Wrong!")
    }
  };

  useEffect(() => {
    fetchHackathonPost();
  }, []);
  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 relative">
        {post.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">
            
            No hackathon applications yet😊
          </p>
        ) : (
          post?.map((post) => {
            return (
              <HackathonPostCard
                post={post}
                hackathonType={"allhackathons"}
                setPost={setPost}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default HackathonPostContainer;
