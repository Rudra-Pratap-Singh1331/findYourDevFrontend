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
    <div className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 relative min-h-[60vh]">
      {showCommentBox.showCommentBoxStatus ? (
        <CommentSection
          setShowCommentBoxStatus={setShowCommentBoxStatus}
          showCommentBox={showCommentBox}
        />
      ) : null}

      {chat ? (
        <div className="w-full h-full">
          <ChatWindow chat={chat} />
        </div>
      ) : isloading ? (
        Array(12)
          .fill(0)
          .map((_, i) => {
            return <PostShimmer key={i} />;
          })
      ) : (
        <div className="space-y-6">
          {post?.map((postItem) => {
            return (
              <PostCard
                key={postItem?._id}
                post={postItem}
                setShowCommentBoxStatus={setShowCommentBoxStatus}
                showCommentBox={showCommentBox}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MainComponent;
