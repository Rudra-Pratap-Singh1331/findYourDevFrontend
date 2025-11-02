import React, { useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LeftSideBar from "./leftSideBar";
import RightSideBar from "./RightSideBar";
const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchLoggedInUser = async () => {
    try {
      const loggedInUser = await axios.get(
        "http://localhost:1001/user/profile",
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(loggedInUser.data.loggedInUser));
    } catch (err) {
      if (err.status === 401) {
        toast.error("Unauthorized!");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex h-screen w-full bg-[#1E1E1E] text-[#d4d4d4]">

        <LeftSideBar />

        <Outlet />
    
        <RightSideBar />
      </div>
    </>
  );
};

export default Body;
