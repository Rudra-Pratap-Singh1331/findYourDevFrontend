import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeHandlerForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_RESULT = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        formData,
        { withCredentials: true }
      );
      toast.success("Login Success!");
      dispatch(addUser(API_RESULT.data));

      if (API_RESULT.data.profileUpdateStatus === true) navigate("/");
      else navigate("/updateprofile");
    } catch (err) {
      setFormError(err.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="absolute top-6 left-6 sm:left-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#007ACC] tracking-tight">
          findYourDev
        </h1>
      </div>

      {/* Login Card */}
      <form
        className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-[#252526] border border-[#3C3C3C] p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col gap-6"
        onSubmit={handleOnSubmit}
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-[#FFFFFF] text-center">
          Log In
        </h2>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[#CCCCCC] mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="mail@site.com"
            value={formData.email}
            onChange={onChangeHandlerForm}
            className="w-full border border-[#3C3C3C] rounded-lg px-4 py-3 text-[#FFFFFF] placeholder-[#888888] bg-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#007ACC]"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-[#CCCCCC] mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={onChangeHandlerForm}
            className="w-full border border-[#3C3C3C] rounded-lg px-4 py-3 text-[#FFFFFF] placeholder-[#888888] bg-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#007ACC]"
            required
          />
        </div>

        {formError && (
          <p className="text-sm text-[#F44747] text-center">
            {formError?.message}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#007ACC] text-white rounded-lg font-medium hover:bg-[#3794FF] transition"
        >
          Log In
        </button>

        <p className="text-sm text-[#CCCCCC] text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#9CDCFE] hover:underline hover:text-[#BFEFFF]"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
