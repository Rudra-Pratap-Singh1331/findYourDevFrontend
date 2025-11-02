import axios from "axios";
import React, { useEffect, useState } from "react";
import HackathonPostCard from "./HackathonPostCard";
import AppliedHackathonCard from "./AppliedHackathonCard";

const HackathonAppliedContainer = () => {
  const [post, setPost] = useState([]);
  const fetchHackathonPost = async () => {
    try {
      const post = await axios.get(
        "http://localhost:1001/hackathons/appliedhackathons",
        {
          withCredentials: true,
        }
      );
      console.log(post);
      setPost(post?.data?.data);
    } catch (error) {
      console.log(error);
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
          you haven't applied to any hackathons
        </p>
      ) :post?.map((post) => {
          return (
            <AppliedHackathonCard
              key={post?._id}
              data={post}
              setPost={setPost}
            />
          );
        })}
      </div>
    </>
  );
};

export default HackathonAppliedContainer;
