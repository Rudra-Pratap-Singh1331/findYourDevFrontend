import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);
  const dispatch = useDispatch();

  const onChangeHandlerForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const API_RESULT = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Login Success!");

      dispatch(addUser(API_RESULT.data));
      if (API_RESULT.data.profileUpdateStatus === true) {
        navigate("/");
      } else {
        navigate("/updateprofile");
      }
    } catch (err) {
      setFormError(err.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex">

      <div className="absolute top-6 left-8">
        <h1 className="text-3xl font-bold tracking-tight font-sans text-[#007ACC]">
          DevTinder.
        </h1>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <form
          className="flex flex-col gap-6 p-10 bg-[#252526] rounded-2xl shadow-lg w-[420px] border border-[#3C3C3C]"
          onSubmit={handleOnSubmit}
        >
          <h2 className="text-2xl font-semibold text-[#FFFFFF] text-center">
            Log In
          </h2>

       
          <div>
            <label className="block text-sm font-medium text-[#CCCCCC] mb-1">
              Email
            </label>
            <input
              value={formData.email}
              type="email"
              name="email"
              placeholder="mail@site.com"
              className="w-full border border-[#3C3C3C] rounded-lg px-4 py-3 text-[#FFFFFF] placeholder-[#888888] bg-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#007ACC]"
              onChange={onChangeHandlerForm}
              required
            />
          </div>

      
          <div>
            <label className="block text-sm font-medium text-[#CCCCCC] mb-1">
              Password
            </label>
            <input
              value={formData.password}
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full border border-[#3C3C3C] rounded-lg px-4 py-3 text-[#FFFFFF] placeholder-[#888888] bg-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#007ACC]"
              onChange={onChangeHandlerForm}
              required
            />
          </div>

          {formError && (
            <label className="block text-sm font-medium text-[#F44747] mb-1">
              {formError?.message}
            </label>
          )}

 
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
    </div>
  );
};

export default Login;
