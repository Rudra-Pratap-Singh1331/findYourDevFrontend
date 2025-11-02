import React from "react";

const ProfileMainBox = ({
  user,
  setUser,
  formError,
  handleChange,
  handleOnSubmit,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">

      <div className="flex-1 bg-[#2C2C2C] p-8 rounded-xl shadow-lg overflow-y-auto max-h-[70vh]">
        <h2 className="text-3xl font-bold mb-6 text-blue-500">User Profile</h2>
        <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="input input-bordered w-full bg-[#3C3C3C] text-white border-gray-600"
          />
          <label className="block text-sm font-medium text-red-500 mb-1">
            {formError?.errors?.fullName}
          </label>

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            disabled
            className="input input-bordered w-full bg-[#2C2C2C] text-gray-300 border-gray-600"
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            disabled
            className="input input-bordered w-full bg-[#2C2C2C] text-gray-300 border-gray-600"
          />

          <label>Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={user.mobileNumber}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="input input-bordered w-full bg-[#3C3C3C] text-white border-gray-600"
          />
          <label className="block text-sm font-medium text-red-500 mb-1">
            {formError?.errors?.mobileNumber}
          </label>

          <label>Age</label>
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
            placeholder="Age"
            className="input input-bordered w-full bg-[#3C3C3C] text-white border-gray-600"
          />

          <label>Gender</label>
          <select
            name="gender"
            value={user.gender}
            onChange={handleChange}
            className="select select-bordered w-full bg-[#3C3C3C] text-white border-gray-600"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>

          <label>Tech Stack</label>
          <input
            type="text"
            name="techStack"
            value={user.techStack.join(", ")}
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                techStack: e.target.value.split(",").map((t) => t.trim()),
              }))
            }
            placeholder="Tech Stack (comma separated)"
            className="input input-bordered w-full bg-[#3C3C3C] text-white border-gray-600"
            required
          />

          <label>Designation</label>
          <input
            type="text"
            name="designation"
            value={user.designation}
            onChange={handleChange}
            placeholder="Current Designation"
            className="input input-bordered w-full bg-[#3C3C3C] text-white border-gray-600"
          />

          <label>Photo URL</label>
          <input
            type="text"
            name="photoUrl"
            value={user.photoUrl}
            onChange={handleChange}
            placeholder="Photo URL"
            className="input input-bordered w-full bg-[#3C3C3C] text-white border-gray-600"
          />

          <button
            type="submit"
            className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-white transition"
          >
            Update Profile
          </button>
        </form>
      </div>


      <div className="flex-1 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-500">Preview Card</h2>
        <div className="card w-[60%] bg-[#2C2C2C] shadow-xl rounded-xl overflow-hidden max-h-[90vh]">
     
          <div className="flex justify-center mt-6">
            <img
              src={user.photoUrl || "/default-avatar.png"}
              alt="Profile"
              className="rounded-full w-32 h-32 object-cover border-4 border-gray-600"
            />
          </div>

          <div className="p-4 flex flex-col gap-4 text-white">
            <div className="w-full flex justify-center">
              <h2
                className="card-title text-center overflow-hidden break-words"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {user.fullName}
              </h2>
            </div>

            <div className="w-full text-left pl-2 flex flex-col gap-2">
              <p
                className="overflow-hidden break-words"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
              >
                <strong>Designation:</strong>{" "}
                {user.designation || "Not available"}
              </p>
              <p
                className="overflow-hidden break-words"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
              >
                <strong>Age:</strong> {user.age || "Not available"}
              </p>
              <p
                className="overflow-hidden break-words"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                <strong>Tech Stack:</strong>{" "}
                {user.techStack.join(", ") || "Not available"}
              </p>

              <div className="flex justify-center mt-4 gap-2">
                <button className="btn btn-primary btn-sm">Connect</button>
                <button className="btn btn-primary btn-sm">Ignore</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMainBox;
