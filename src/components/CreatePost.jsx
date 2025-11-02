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
        formData.append("postPhotoUrl", postDetails.postPhotoUrl); // same field name as multer.single()
      }
      formData.append("postVisibility", postDetails.postVisibility);

      await axios.post("http://localhost:1001/posts/create", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post Created!");
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "error occured");
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (e) => {
  
    const { name, value } = e.target;
    if (name === "postPhotoUrl") {
      setPostDetails((prev) => {
        return { ...prev, [name]: e.target.files[0] };
      });
    } else {
      setPostDetails((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center p-6 overflow-auto">
      <div className="bg-[#1E1E1E] text-white w-[70%] max-w-xl min-h-[500px] max-h-[90vh] rounded-lg shadow-lg p-8 relative">
  
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl font-bold"
          onClick={() => {
            navigate("/");
          }}
        >
          ×
        </button>

 
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col"
        >
   
          <div className="flex items-center mb-4">
            <img
              src={userData?.photoUrl || AVATAR_DEFAULT_URL}
              alt="Profile"
              className="w-12 h-12 rounded-full mr-3"
            />
            <span className="font-semibold text-lg">{userData?.fullName}</span>
          </div>

          <textarea
            className="w-full bg-[#252526] text-white p-3 rounded-md mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] max-h-[300px] overflow-y-auto"
            rows={8}
            name="postContent"
            placeholder="What do you want to talk about?"
            value={postDetails.postContent}
            onChange={handleOnChange}
            required
          />

          <div className="mb-4">
            <label className="flex items-center cursor-pointer text-gray-400 hover:text-white">
              <span className="mr-2">Add image</span>
              <span className="text-xs">(optional)</span>
              <input
                type="file"
                name="postPhotoUrl"
                accept="image/*"
                className="hidden"
                onChange={handleOnChange}
              />
            </label>
            {postDetails.postPhotoUrl && (
              <p className="text-sm mt-1 text-green-500">{"Uploaded"}</p>
            )}
          </div>

          <div className="flex items-center justify-start mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2"
                name="postVisibility"
                checked={postDetails.postVisibility}
                onChange={() =>
                  setPostDetails((prev) => {
                    return {
                      ...prev,
                      postVisibility: !postDetails.postVisibility,
                    };
                  })
                }
              />
              <span>{postDetails.postVisibility ? "Public" : "Private"}</span>
            </label>
          </div>

      
          {loading ? (
            <button type="button" class="bg-indigo-500 ..." disabled>
              <svg
                class="mr-3 size-5 animate-spin ..."
                viewBox="0 0 24 24"
              ></svg>
              Processing…
            </button>
          ) : (
            <button
              type="submit"
              className={`w-full py-2 rounded-md font-semibold bg-blue-600 hover:bg-blue-700
            `}
            >
              "Create Post"
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
