import { useState } from "react";
import { useSelector } from "react-redux";
import ChatWindow from "./ChatWindow";
import PostCard from "./PostCard";
import useFetchPost from "../hooks/useFetchPost";
import PostShimmer from "./Shimmer/PostShimmer";
import CommentSection from "./CommentSection";

const MainComponent = () => {
  const chat = useSelector((store) => store.chat);
  const { post, isloading } = useFetchPost();
  const [showCommentBox, setShowCommentBoxStatus] = useState({
    showCommentBoxStatus: false,
    postId: "",
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 relative">
      {showCommentBox.showCommentBoxStatus ? (
        <CommentSection
          setShowCommentBoxStatus={setShowCommentBoxStatus}
          showCommentBox={showCommentBox}
        />
      ) : null}
      {chat ? (
        <ChatWindow chat={chat} />
      ) : isloading ? (
        Array(12)
          .fill(0)
          .map((_, i) => {
            return <PostShimmer key={i} />;
          })
      ) : (
        post?.map((post) => {
          return (
            <PostCard
              key={post?._id}
              post={post}
              setShowCommentBoxStatus={setShowCommentBoxStatus}
              showCommentBox={showCommentBox}
            />
          );
        })
      )}
    </div>
  );
};

export default MainComponent;
