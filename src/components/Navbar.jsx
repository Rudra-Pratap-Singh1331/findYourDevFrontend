import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaUser,
  FaHammer,
  FaCode,
  FaFileAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { AVATAR_DEFAULT_URL } from "../constant/constant";
import { resetRdeuxStoreOnLogout } from "../helpers/resetReduxStoreOnLogout";

const Navbar = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await axios.post(
        "http://localhost:1001/logout",
        {},
        { withCredentials: true }
      );
      resetRdeuxStoreOnLogout(dispatch);
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Oops Error Occured!");
    }
  };

  return (
    <nav className="navbar bg-[#1e1e1e] shadow-md px-4 sm:px-6 py-3 border-b border-[#333] sticky top-0 z-50">
      <div className="flex-1 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold text-[#569cd6] hover:text-[#4fc1ff] transition"
        >
          findYourDev's
        </Link>

        <button
          className="sm:hidden text-gray-300 hover:text-[#569cd6] text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="hidden sm:flex items-center gap-8">
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

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#1e1e1e] border-t border-[#333] flex flex-col items-center gap-4 py-5 sm:hidden animate-fade-in">
          <Link
            to="/hackathons"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-gray-300 hover:text-[#569cd6] font-medium"
          >
            <FaHammer /> Hackathons
          </Link>
          <Link
            to="/devs"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-gray-300 hover:text-[#569cd6] font-medium"
          >
            <FaCode /> Devs
          </Link>
          <Link
            to="/createpost"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-gray-300 hover:text-[#569cd6] font-medium"
          >
            <FaFileAlt /> Create Post
          </Link>

          <div className="flex flex-col items-center gap-2">
            <img
              src={userData?.photoUrl || AVATAR_DEFAULT_URL}
              alt="User Avatar"
              className="w-10 h-10 rounded-full ring-2 ring-[#569cd6]"
            />
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-[#569cd6]"
            >
              Profile
            </Link>

            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-red-400 hover:text-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
