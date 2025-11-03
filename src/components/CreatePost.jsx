import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AVATAR_DEFAULT_URL } from "../constant/constant";
import { toast } from "react-toastify";

const CreatePost = () => {
  const userData = useSelector((store) => store.user);

  const [postDetails, setPostDetails] = useState({
    postContent: "",
    postPhotoUrl: null,
    postVisibility: true,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("postContent", postDetails.postContent);
      if (postDetails.postPhotoUrl) {
        formData.append("postPhotoUrl", postDetails.postPhotoUrl);
      }
      formData.append("postVisibility", postDetails.postVisibility);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/create`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Post Created!");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "postPhotoUrl") {
      setPostDetails((prev) => ({ ...prev, [name]: e.target.files[0] }));
    } else {
      setPostDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex justify-center items-center px-4 py-8 sm:px-6 lg:px-8 overflow-auto">
      <div className="bg-[#1E1E1E] text-white w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl font-bold"
          onClick={() => navigate("/")}
        >
          ×
        </button>

        {/* User Header */}
        <div className="flex items-center mb-6">
          <img
            src={userData?.photoUrl || AVATAR_DEFAULT_URL}
            alt="Profile"
            className="w-12 h-12 rounded-full mr-3 object-cover"
          />
          <span className="font-semibold text-lg sm:text-xl">
            {userData?.fullName}
          </span>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col gap-4"
        >
          {/* Post Content */}
          <textarea
            className="w-full bg-[#252526] text-white p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] sm:min-h-[150px] md:min-h-[180px] overflow-y-auto"
            name="postContent"
            placeholder="What do you want to talk about?"
            value={postDetails.postContent}
            onChange={handleOnChange}
            required
          />

          {/* Image Upload */}
          <div>
            <label className="flex flex-col sm:flex-row items-start sm:items-center gap-2 cursor-pointer text-gray-400 hover:text-white">
              <span className="font-medium">Add Image</span>
              <span className="text-xs text-gray-500">(optional)</span>
              <input
                type="file"
                name="postPhotoUrl"
                accept="image/*"
                className="hidden"
                onChange={handleOnChange}
              />
            </label>
            {postDetails.postPhotoUrl && (
              <p className="text-sm mt-1 text-green-500">Image selected</p>
            )}
          </div>

          {/* Visibility */}
          <div className="flex items-center mb-4">
            <label className="flex items-center cursor-pointer text-sm sm:text-base">
              <input
                type="checkbox"
                className="mr-2 accent-blue-600"
                name="postVisibility"
                checked={postDetails.postVisibility}
                onChange={() =>
                  setPostDetails((prev) => ({
                    ...prev,
                    postVisibility: !prev.postVisibility,
                  }))
                }
              />
              <span>{postDetails.postVisibility ? "Public" : "Private"}</span>
            </label>
          </div>

          {/* Submit */}
          {loading ? (
            <button
              type="button"
              disabled
              className="flex justify-center items-center py-2 bg-blue-600 rounded-lg font-semibold opacity-80 cursor-not-allowed"
            >
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Processing…
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Create Post
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
