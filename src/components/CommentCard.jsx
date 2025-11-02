import React from "react";
import { AVATAR_DEFAULT_URL } from "../constant/constant";

const CommentCard = ({ comment }) => {
  const { commentData, createdAt, userId } = comment;
  const { fullName, photoUrl } = userId || {};
  const currdate = new Date(createdAt).toLocaleDateString();
  return (
    <div key={comment._id} className="flex gap-3">
      <img
        src={photoUrl || AVATAR_DEFAULT_URL}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="bg-[#252526] border border-[#2f2f2f] rounded-lg px-3 py-2 max-w-[calc(100%-56px)]">
        <p className="text-[#e5e5e5] text-sm font-semibold">
          {fullName || "Anonymous"}
          <span className=" ml-2 text-[10px] font-light">{currdate}</span>
        </p>

        <p className="text-[#d1d5db] text-sm leading-snug break-words whitespace-normal">
          {commentData}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
