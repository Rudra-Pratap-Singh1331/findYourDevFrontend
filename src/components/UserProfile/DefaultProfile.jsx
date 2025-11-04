import React from "react";
import { addUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

import axios from "axios";
const DefaultProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((store) => store.user);
  const fetchLoggedInUser = async () => {
    try {
      const loggedInUser = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(loggedInUser?.data?.loggedInUser));
    } catch (err) {
      if (err.status === 401) {
        toast.error("Unauthorized!");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (!loggedInUser) {
      fetchLoggedInUser();
    }
  }, []);

  const user = {
    fullName: loggedInUser?.fullName || "",
    email: loggedInUser?.email || "",
    password: "********",
    mobileNumber: loggedInUser?.mobileNumber || "",
    age: loggedInUser?.age || "",
    gender: loggedInUser?.gender || "",
    techStack: loggedInUser?.techStack || [],
    designation: loggedInUser?.designation || "",
    photoUrl:
      loggedInUser?.photoUrl ||
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e] text-[#d4d4d4] p-6">
      <div className="bg-[#252526] shadow-xl rounded-2xl w-full max-w-3xl p-8 border border-[#3c3c3c]">
        <div className="flex flex-col items-center gap-3 mb-8">
          <img
            src={user.photoUrl}
            alt="User Profile"
            className="w-28 h-28 rounded-full border-4 border-[#007acc] shadow-md object-cover"
          />
          <h2 className="text-2xl font-semibold text-[#dcdcdc]">
            {user.fullName}
          </h2>
          <p className="text-[#9cdcfe] text-sm">{user.designation || "User"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ProfileField label="Full Name" value={user.fullName} />
          <ProfileField label="Email" value={user.email} />
          <ProfileField label="Password" value={user.password} />
          <ProfileField label="Mobile Number" value={user.mobileNumber} />
          <ProfileField label="Age" value={user.age} />
          <ProfileField label="Gender" value={user.gender} />
          <ProfileField
            label="Tech Stack"
            value={
              user.techStack.length
                ? user.techStack.join(", ")
                : "No tech stack added"
            }
          />
          <ProfileField label="Designation" value={user.designation} />
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link to="/updateprofile">
            <button className="px-6 py-2 rounded-lg bg-[#007acc] text-white font-medium hover:bg-[#0e639c] transition">
              Update Profile
            </button>
          </Link>

          <Link to="/updatepassword">
            <button className="px-6 py-2 rounded-lg bg-[#3c3c3c] text-[#d4d4d4] font-medium hover:bg-[#2d2d2d] transition">
              Update Password
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div>
    <label className="text-sm font-semibold text-[#9cdcfe]">{label}</label>
    <div className="w-full mt-1 px-4 py-2 bg-[#1e1e1e] text-[#d4d4d4] rounded-lg border border-[#3c3c3c] cursor-not-allowed">
      {value || "—"}
    </div>
  </div>
);

export default DefaultProfile;
