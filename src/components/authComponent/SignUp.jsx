import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const onChangeHandlerForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/signup`, formData, {
        withCredentials: true,
      });
      navigate("/login");
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

      {/* Signup Card */}
      <form
        className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-[#252526] border border-[#3C3C3C] p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col gap-6"
        onSubmit={handleOnSubmit}
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-[#FFFFFF] text-center">
          Create an Account
        </h2>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-[#CCCCCC] mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onChangeHandlerForm}
            placeholder="Enter your fullname"
            className="w-full border border-[#3C3C3C] rounded-lg px-4 py-3 text-[#FFFFFF] placeholder-[#888888] bg-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#007ACC]"
            required
          />
          {formError?.errors?.fullName && (
            <p className="text-sm text-[#F44747]">
              {formError.errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[#CCCCCC] mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeHandlerForm}
            placeholder="mail@site.com"
            className="w-full border border-[#3C3C3C] rounded-lg px-4 py-3 text-[#FFFFFF] placeholder-[#888888] bg-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#007ACC]"
            required
          />
          {formError?.errors?.email && (
            <p className="text-sm text-[#F44747]">{formError.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-[#CCCCCC] mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChangeHandlerForm}
            placeholder="Enter password"
            className="w-full border border-[#3C3C3C] rounded-lg px-4 py-3 text-[#FFFFFF] placeholder-[#888888] bg-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#007ACC]"
            required
          />
          {formError?.errors?.password && (
            <ul className="text-sm text-[#F44747] list-disc list-inside">
              {formError.errors.password.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#007ACC] text-white rounded-lg font-medium hover:bg-[#3794FF] transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-[#CCCCCC] text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#9CDCFE] hover:underline hover:text-[#BFEFFF]"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
