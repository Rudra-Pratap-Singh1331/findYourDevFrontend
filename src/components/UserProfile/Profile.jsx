import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../store/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ProfileMainBox from "./ProfileMainBox";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((store) => store.user);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "********",
    mobileNumber: "",
    age: "",
    gender: "",
    techStack: [],
    designation: "",
    photoUrl: "",
    profileUpdateStatus: false,
  });
  const [formError, setFormError] = useState(null);

  const fetchProfile = async () => {
    try {
      const loggedInUserResult = await axios.get(
        "http://localhost:1001/user/profile",
        { withCredentials: true }
      );
      dispatch(addUser(loggedInUserResult?.data?.loggedInUser));
    } catch (error) {
      if (error.status === 401) {
        toast.error("Unauthorized!");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      setUser({
        fullName: loggedInUser.fullName || "",
        email: loggedInUser.email || "",
        password: "********",
        mobileNumber: loggedInUser.mobileNumber || "",
        age: loggedInUser.age || "",
        gender: loggedInUser.gender || "",
        techStack: loggedInUser.techStack || [],
        designation: loggedInUser.designation || "",
        photoUrl: loggedInUser.photoUrl || "",
      });
    }
  }, [loggedInUser]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photoUrl") {
      setUser((prev) => ({ ...prev, photoUrl: files[0] })); 
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const formData = new FormData();
      Object.keys(user).forEach((key) => {
        if (key === "techStack" && Array.isArray(user[key])) {
          user[key].forEach((tech) => formData.append("techStack", tech));
        } else {
          formData.append(key, user[key]);
        }
      });

      const updatedUser = await axios.patch(
        "http://localhost:1001/user/profile/update",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      dispatch(addUser(updatedUser?.data?.value));
      navigate("/");
    } catch (error) {
      if (error.response?.status === 401) return toast.error("Unauthorized!");
      setFormError(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] p-6 flex flex-col items-center text-white">
      <div className="w-full max-w-6xl mb-8 bg-blue-700 text-white p-4 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-extrabold">Update Your Profile</h1>
        <p className="mt-2 text-lg">
          Keep your information up-to-date to get the best experience
        </p>
      </div>

      <ProfileMainBox
        user={user}
        setUser={setUser}
        formError={formError}
        setFormError={setFormError}
        handleChange={handleChange}
        handleOnSubmit={handleOnSubmit}
      />
    </div>
  );
};

export default UpdateProfile;
