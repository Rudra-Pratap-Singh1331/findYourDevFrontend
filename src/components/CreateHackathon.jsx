import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateHackathon = () => {
  const [formData, setFormData] = useState({
    hackathonTitle: "",
    hackathonType: "",
    hackathonDescription: "",
    hackathonDeadline: "",
    teamRequired: "",
    hackathonPostImage: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((p) => ({ ...p, hackathonPostImage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/hackathons/createhackathon`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        toast.success("Hackathon created successfully!");
        setFormData({
          hackathonTitle: "",
          hackathonType: "",
          hackathonDescription: "",
          hackathonDeadline: "",
          teamRequired: "",
          hackathonPostImage: null,
        });
        navigate("/hackathons");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create hackathon");
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl bg-[#252526] border border-[#2c2c2c] rounded-xl p-6 sm:p-8 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-400">
          Create Hackathon
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              name="hackathonTitle"
              value={formData.hackathonTitle}
              onChange={handleChange}
              required
              className="w-full bg-[#2D2D2D] text-gray-200 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <input
              name="hackathonType"
              value={formData.hackathonType}
              onChange={handleChange}
              placeholder="AI, Web Dev, Open Innovation..."
              required
              className="w-full bg-[#2D2D2D] text-gray-200 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="hackathonDescription"
              value={formData.hackathonDescription}
              onChange={handleChange}
              rows="4"
              required
              className="w-full bg-[#2D2D2D] text-gray-200 rounded-md px-3 py-2 outline-none resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Deadline</label>
              <input
                type="date"
                name="hackathonDeadline"
                value={formData.hackathonDeadline}
                onChange={handleChange}
                required
                className="w-full bg-[#2D2D2D] text-gray-200 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Team Members Required
              </label>
              <input
                type="number"
                name="teamRequired"
                value={formData.teamRequired}
                onChange={handleChange}
                min="1"
                required
                className="w-full bg-[#2D2D2D] text-gray-200 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Hackathon Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-blue-400"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
            >
              Create Hackathon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHackathon;
