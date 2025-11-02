import { IoClose } from "react-icons/io5";
import { AVATAR_DEFAULT_URL } from "../constant/constant";
import useFetchComment from "../hooks/useFetchComment";
import CommentCard from "./CommentCard";
import CommentCardShimmer from "./Shimmer/CommentCardShimmer";
const CommentSection = ({ setShowCommentBoxStatus, showCommentBox }) => {
  const { fetchedComments, loading } = useFetchComment(showCommentBox.postId);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
      <div className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-xl w-[400px] max-h-[500px] flex flex-col shadow-lg">
     
        <div className="flex justify-between items-center px-4 py-3 border-b border-[#2d2d2d]">
          <h2 className="text-[#e5e5e5] font-semibold text-lg">Comments</h2>
          <button
            className="text-[#9ca3af] hover:text-red-500 transition-colors"
            onClick={() => {
              setShowCommentBoxStatus(() => {
                return {
                  showCommentBoxStatus: !showCommentBox.showCommentBoxStatus,
                  postId: "",
                };
              });
            }}
          >
            <IoClose size={22} />
          </button>
        </div>

    
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
       
            Array.from({ length: 6 }).map((_, i) => (
              <CommentCardShimmer key={i} />
            ))
          ) : fetchedComments === null || fetchedComments.length === 0 ? (
       
            <p className="text-center text-[#9ca3af]">No comments yet</p>
          ) : (
          
            fetchedComments.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
