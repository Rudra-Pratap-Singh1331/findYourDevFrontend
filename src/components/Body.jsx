import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import { Users } from "lucide-react";
import { UserPlus } from "lucide-react";
const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1536);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchLoggedInUser = async () => {
    try {
      const loggedInUser = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(loggedInUser.data.loggedInUser));
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    if (leftOpen) setRightOpen(false);
  }, [leftOpen]);
  useEffect(() => {
    if (rightOpen) setLeftOpen(false);
  }, [rightOpen]);

  return (
    <>
      <Navbar
        onOpenLeft={() => setLeftOpen(true)}
        onOpenRight={() => setRightOpen(true)}
      />

      <div className="flex min-h-[calc(100vh-56px)] w-full bg-[#1E1E1E] text-[#d4d4d4] relative">
        <LeftSideBar isOpen={leftOpen} onClose={() => setLeftOpen(false)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

        <RightSideBar isOpen={rightOpen} onClose={() => setRightOpen(false)} />

        {!isDesktop && (
          <>
            <div className="fixed bottom-4 left-4 z-40">
              <button
                aria-label="Open left sidebar"
                onClick={() => setLeftOpen(true)}
                className="p-2 rounded-full bg-[#252526] border border-[#333] shadow-md text-white hover:bg-[#323232] transition"
              >
                <Users size={18} className="text-[#569cd6]" />
              </button>
            </div>

            <div className="fixed bottom-4 right-4 z-40">
              <button
                aria-label="Open right sidebar"
                onClick={() => setRightOpen(true)}
                className="p-2 rounded-full bg-[#252526] border border-[#333] shadow-md text-white hover:bg-[#323232] transition"
              >
                <UserPlus size={18} className="text-[#569cd6]" />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Body;
