import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaHammer, FaCode, FaFileAlt } from "react-icons/fa";
import { AVATAR_DEFAULT_URL } from "../constant/constant";
import { resetRdeuxStoreOnLogout } from "../helpers/resetReduxStoreOnLogout";

const Navbar = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const result = await axios.post(
        "http://localhost:1001/logout",
        {},
        {
          withCredentials: true,
        }
      );
      resetRdeuxStoreOnLogout(dispatch);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Oops Error Occured!");
    }
  };

  return (
    <div className="navbar bg-[#1e1e1e] shadow-md px-6 py-3 border-b border-[#333]">
      {/* Left Section */}
      <div className="flex-1 items-center flex gap-6">
        <Link
          to="/"
          className="text-2xl font-bold text-[#569cd6] hover:text-[#4fc1ff] transition"
        >
          DevTinder
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-10">
        <Link
          to="/hackathons"
          className="flex items-center gap-1 text-gray-300 hover:text-[#569cd6] font-medium transition"
        >
          <FaHammer /> Hackathons
        </Link>
        <Link
          to="/devs"
          className="flex items-center gap-1 text-gray-300 hover:text-[#569cd6] font-medium transition"
        >
          <FaCode /> Devs
        </Link>
        <Link
          to="/createpost"
          className="flex items-center gap-1 text-gray-300 hover:text-[#569cd6] font-medium transition"
        >
          <FaFileAlt /> Create Post
        </Link>

        {/* Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ring-2 ring-[#569cd6]">
              <img
                alt="User Avatar"
                src={userData?.photoUrl || AVATAR_DEFAULT_URL}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-[#252526] text-gray-200 rounded-xl z-50 mt-3 w-52 p-2 shadow-lg border border-[#333]"
          >
            <li>
              <Link
                to="/profile"
                className="justify-between hover:text-[#569cd6]"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/myposts"
                className="justify-between hover:text-[#569cd6]"
              >
                My Posts
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={handleLogout}
                className="hover:text-red-500"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
